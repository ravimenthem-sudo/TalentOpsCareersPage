import { GoogleGenAI, Schema, Type } from "@google/genai";
import { AtsResult, UploadedFile, FileType, InterviewQuestion, InterviewEvaluation } from "../types";
import { analyzeResumeLocal, generateInterviewQuestionsLocal, evaluateInterviewAnswersLocal } from "./localBrain";

const atsResponseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        ats_score: {
            type: Type.NUMBER,
            description: "The calculated ATS score from 0 to 100 based strictly on keyword match, skills match, and formatting. Be deterministic.",
        },
        skills_detected: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of professional skills extracted from the resume.",
        },
        job_role_suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Top 3 suitable job roles. Empty if score is 70 or below.",
        },
        message: {
            type: Type.STRING,
            description: "A message summarizing the result. If score <= 70, explain why it was rejected.",
        },
        mismatch_reason: {
            type: Type.STRING,
            description: "Detailed reason why the resume does not match the job description. Required if score < 80.",
            nullable: true
        }
    },
    required: ["ats_score", "skills_detected", "job_role_suggestions", "message"],
};

const interviewQuestionSchema: Schema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.NUMBER },
            question: { type: Type.STRING },
        },
        required: ["id", "question"],
    },
};

const interviewEvaluationSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        is_suitable: { type: Type.BOOLEAN },
        score: { type: Type.NUMBER },
        feedback: { type: Type.STRING },
    },
    required: ["is_suitable", "score", "feedback"],
};

/**
 * Computes a SHA-256 hash of the file content + JD to ensure unique caching
 */
async function getFileHash(content: string, jobDescription: string = ""): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(content + jobDescription);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const analyzeResume = async (file: UploadedFile, jobDescription: string = ""): Promise<AtsResult> => {
    // Use Next.js env variable
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
        console.log("API_KEY missing or is placeholder, using local brain for resume analysis.");
        return analyzeResumeLocal(file, jobDescription);
    }

    // 1. Check Local Cache (only if API is enabled, as local brain has its own logic)
    let cacheKey: string | null = null;
    try {
        const fileHash = await getFileHash(file.content, jobDescription);
        cacheKey = `ats_cache_v2_${fileHash}`; // v2 because we added JD support
        const cachedResult = localStorage.getItem(cacheKey);

        if (cachedResult) {
            console.log("Returning cached ATS result for hash:", fileHash);
            return JSON.parse(cachedResult) as AtsResult;
        }
    } catch (e) {
        console.warn("Hashing/Caching failed for API call, proceeding to direct analysis without cache.", e);
        cacheKey = null; // Disable caching for this run if hashing fails
    }

    try {
        return await fetchAnalysisFromAI(file, jobDescription, cacheKey, apiKey);
    } catch (e) {
        console.warn("API Failed, falling back to Local Brain for resume analysis.", e);
        return analyzeResumeLocal(file, jobDescription);
    }
};

const fetchAnalysisFromAI = async (file: UploadedFile, jobDescription: string, cacheKey: string | null, apiKey: string): Promise<AtsResult> => {
    const ai = new GoogleGenAI({ apiKey });

    let prompt = `
    You are a strict and deterministic ATS (Applicant Tracking System) Resume Analyzer.
    
    Your task is to analyze the provided resume content.
    1. Extract clean text from the uploaded resume.
    2. Identify Skills, Experience, Education, and Projects.
  `;

    if (jobDescription) {
        prompt += `
    3. COMPARE the resume specifically against this JOB DESCRIPTION:
    "${jobDescription}"
    
    Calculate an ATS Score (0-100) based on:
       - Keyword Match (40%): How many keywords from the JD are present in the resume.
       - Skills Match (40%): Does the candidate have the SPECIFIC skills asked in the JD?
       - Formatting & Clarity (20%): Structure and readability.
       
    IMPORTANT: 
    - If the resume is missing key skills explicitly mentioned in the JD, the score MUST be low (< 70).
    - Provide a specific "mismatch_reason" if the score is < 80.
    `;
    } else {
        prompt += `
    3. Calculate an ATS Score (0-100) based strictly on these weights:
       - Keyword Match (40%): Presence of industry-standard keywords.
       - Skills Match (40%): Hard and soft skills relevant to the candidate's domain.
       - Formatting & Clarity (20%): Structure, readability, and lack of clutter.
    `;
    }

    prompt += `
    SCORING RULES:
    - You MUST be consistent.
    - Be critical.
    
    OUTPUT RULES:
    - If ATS score > 70:
        • Return the Score.
        • Return Top 3 suitable job roles.
        • Message: "Resume accepted. High compatibility detected."
    - If ATS score <= 70:
        • Return the Score.
        • job_role_suggestions MUST be an empty array [].
        • Message: "Your resume isn't accepted. ATS score is too low."
        
    Do NOT hallucinate information.
  `;

    try {
        const parts = [];

        // Add the file content
        if (file.type === FileType.IMAGE || file.type === FileType.PDF) {
            parts.push({
                inlineData: {
                    mimeType: file.mimeType,
                    data: file.content, // Base64 string
                },
            });
        } else {
            parts.push({
                text: file.content,
            });
        }

        // Add the prompt
        parts.push({ text: prompt });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: atsResponseSchema,
                temperature: 0,
                seed: 42,
            },
        });

        const text = response.text;
        if (!text) throw new Error("No response from Gemini");

        const result = JSON.parse(text) as AtsResult;

        // Save to cache if a key was generated and caching was successful
        if (cacheKey) {
            try {
                localStorage.setItem(cacheKey, text);
            } catch (e) {
                console.warn("Failed to save to localStorage", e);
            }
        }

        return result;
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        throw error;
    }
};

export const generateInterviewQuestions = async (jobDescription: string): Promise<InterviewQuestion[]> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
        console.log("API_KEY missing or is placeholder, using local brain for interview questions.");
        return generateInterviewQuestionsLocal(jobDescription);
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
      Generate 10 technical interview questions based on this Job Description to validate a candidate's skills.
      Job Description: "${jobDescription}"
      
      Questions should be specific and technical, not generic behavioral questions.
      They should test if the candidate actually knows the skills required.
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewQuestionSchema,
            },
        });

        const text = response.text;
        if (!text) throw new Error("No questions generated");
        return JSON.parse(text) as InterviewQuestion[];
    } catch (e) {
        console.warn("API Failed, falling back to Local Brain for interview questions.", e);
        return generateInterviewQuestionsLocal(jobDescription);
    }
};

export const evaluateInterviewAnswers = async (
    jobDescription: string,
    questions: InterviewQuestion[],
    answers: Record<number, string>
): Promise<InterviewEvaluation> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
        console.log("API_KEY missing or is placeholder, using local brain for interview evaluation.");
        return evaluateInterviewAnswersLocal(jobDescription, questions, answers);
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        const qaPairs = questions.map(q => `Q: ${q.question}\nA: ${answers[q.id] || "No Answer"}`).join("\n\n");

        const prompt = `
      You are a technical interviewer. Evaluate these candidate answers against the Job Description.
      Job Description: "${jobDescription}"
      
      Q&A:
      ${qaPairs}
      
      Task:
      1. Determine if the candidate demonstrates the required skills.
      2. Check for signs of AI-generated answers (generic, perfect grammar but shallow content).
      3. Score each question.
      4. Give a final suitability score (0-100). 
      5. CRITICAL: If the candidate answers at least 5 out of 10 questions correctly, set is_suitable to true. Otherwise false.
      6. Provide feedback.
      
      Output JSON with is_suitable (boolean), score (number), feedback (string).
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewEvaluationSchema,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Evaluation failed");
        return JSON.parse(text) as InterviewEvaluation;
    } catch (e) {
        console.warn("API Failed, falling back to Local Brain for interview evaluation.", e);
        return evaluateInterviewAnswersLocal(jobDescription, questions, answers);
    }
};
