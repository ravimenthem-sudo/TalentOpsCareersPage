import { AtsResult, UploadedFile, FileType, InterviewQuestion, InterviewEvaluation } from "../types";
import { SKILL_DATABASE, COMMON_SKILLS } from "./skillDatabase";

/**
 * Extracts potential skills from text using a dictionary approach.
 */
function extractSkills(text: string): string[] {
    const normalizedText = text.toLowerCase();
    const foundSkills: Set<string> = new Set();

    // Check against our comprehensive list
    COMMON_SKILLS.forEach(skill => {
        if (normalizedText.includes(skill.toLowerCase())) {
            foundSkills.add(skill);
        }
    });

    // Also check keys in our question logic
    Object.keys(SKILL_DATABASE).forEach(key => {
        if (key !== 'default') {
            SKILL_DATABASE[key].patterns.forEach(pattern => {
                if (normalizedText.includes(pattern)) {
                    // Map back to a nice name if possible, or use the key
                    foundSkills.add(key.charAt(0).toUpperCase() + key.slice(1));
                }
            });
        }
    });

    return Array.from(foundSkills);
}

/**
 * Simulates AI Analysis using Logic/Math
 */
export const analyzeResumeLocal = async (file: UploadedFile, jobDescription: string): Promise<AtsResult> => {
    console.log("Starting Local Logic Analysis...");

    // 1. Decode File Content
    let resumeText = "";

    // Check for binary files that we can't easily parse in browser without heavy libs
    if (file.type === FileType.PDF || file.type === FileType.IMAGE) {
        console.warn("Local Brain cannot natively parse PDF/Image textual content accurately without API.");
        // We will attempt a very crude extraction or just warn.
        // For a better UX in "Offline Mode", we'll reject this or give a specific message.
        return {
            ats_score: 0,
            skills_detected: [],
            job_role_suggestions: [],
            message: "Offline Mode Error: Cannot analyze PDF/Image files without API Key.",
            mismatch_reason: "Please upload a .txt or .docx file for offline analysis, or add a valid API Key."
        };
    } else {
        // It's text or already extracted text (from docx)
        resumeText = file.content.toLowerCase();
    }

    const jdText = jobDescription.toLowerCase();

    // 2. Extract Skills from JD
    const requiredSkills = extractSkills(jdText);
    const candidateSkills = extractSkills(resumeText);

    // 3. Keyword Matching (Simple Frequency)
    // Extract significant words from JD (ignoring stop words)
    const stopWords = ["the", "and", "or", "in", "to", "a", "of", "for", "with", "on", "at", "is", "are", "be", "we", "you", "that", "this", "it"];
    const jdKeywords = jdText.match(/\b\w+\b/g)?.filter(w => w.length > 3 && !stopWords.includes(w)) || [];
    const uniqueJdKeywords = new Set(jdKeywords);

    let matchCount = 0;
    uniqueJdKeywords.forEach(word => {
        if (resumeText.includes(word)) { // resumeText is already lowercased
            matchCount++;
        }
    });

    // 4. Calculate Score
    // Formula: 60% based on Skill Match, 40% based on Keyword Match

    // Skill Score
    const missingSkills = requiredSkills.filter(s => !candidateSkills.map(cs => cs.toLowerCase()).includes(s.toLowerCase()));

    // Avoid division by zero
    const skillMatchRatio = requiredSkills.length > 0 ? (requiredSkills.length - missingSkills.length) / requiredSkills.length : (candidateSkills.length > 0 ? 0.5 : 0);

    // Keyword Score
    const keywordMatchRatio = uniqueJdKeywords.size > 0 ? matchCount / uniqueJdKeywords.size : 0;

    let totalScore = Math.round(((skillMatchRatio * 0.6) + (keywordMatchRatio * 0.4)) * 100);

    // Adjust for very short resumes (likely garbage)
    if (resumeText.length < 50) totalScore = 0;

    // Cap at 98
    if (totalScore > 98) totalScore = 98;
    // Floor at 10
    if (totalScore < 10 && resumeText.length > 50) totalScore = 15;

    // 5. Generate Message
    let message = "";
    if (totalScore >= 80) message = "Excellent Match! Your profile strongly aligns with the requirements.";
    else if (totalScore >= 60) message = "Good potential, but some key technical requirements seem missing.";
    else message = "Low compatibility detected. Your profile is missing significant required skills.";

    // 6. Generate Mismatch Reason
    let mismatch_reason = undefined;
    if (totalScore < 80) {
        if (missingSkills.length > 0) {
            mismatch_reason = `Missing critical skills: ${missingSkills.slice(0, 5).join(", ")}.`;
        } else if (matchCount < (uniqueJdKeywords.size * 0.3)) {
            mismatch_reason = "Resume content does not significantly overlap with the Job Description keywords.";
        } else {
            mismatch_reason = "General lack of depth in required areas compared to JD.";
        }
    }

    if (file.type === FileType.TEXT && resumeText.length < 50) {
        mismatch_reason = "Resume content appears to be empty or too short.";
    }

    // 7. Suggestions
    const job_role_suggestions = totalScore > 70 ? ["Recommended Candidate", "Potential Fit"] : [];

    // Wait 1.0s to simulate "Thinking"
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        ats_score: totalScore,
        skills_detected: candidateSkills,
        job_role_suggestions,
        message,
        mismatch_reason
    };
};

/**
 * Generates questions based on JD keywords using our Local DB
 */
export const generateInterviewQuestionsLocal = async (jobDescription: string): Promise<InterviewQuestion[]> => {
    const jdLower = jobDescription.toLowerCase();
    const questions: InterviewQuestion[] = [];
    let idCounter = 1;

    // Find relevant topics
    Object.keys(SKILL_DATABASE).forEach(key => {
        if (key === 'default') return;

        // Check if any pattern for this skill exists in JD
        const isRelevant = SKILL_DATABASE[key].patterns.some(p => jdLower.includes(p));

        if (isRelevant) {
            // Add 1-2 questions from this topic
            const topicQs = SKILL_DATABASE[key].questions;
            questions.push({ id: idCounter++, question: topicQs[0] });
            if (topicQs.length > 1 && Math.random() > 0.5) {
                questions.push({ id: idCounter++, question: topicQs[1] });
            }
        }
    });

    // Fill up to 10 questions with defaults if needed
    if (questions.length < 10) {
        const defaults = SKILL_DATABASE['default'].questions;
        defaults.forEach((q, idx) => {
            if (questions.length < 10) {
                questions.push({ id: idCounter++, question: q });
            }
        });
    }

    // Limit to 10
    return questions.slice(0, 10);
};

/**
 * Evaluates answers by checking for expected keywords
 */
export const evaluateInterviewAnswersLocal = async (
    jobDescription: string,
    questions: InterviewQuestion[],
    answers: Record<number, string>
): Promise<InterviewEvaluation> => {

    let scoreAccumulator = 0;
    let feedbackParts: string[] = [];

    questions.forEach(q => {
        const ans = (answers[q.id] || "").toLowerCase();

        // Find which topic this question belongs to
        let topic = 'default';
        for (const [key, details] of Object.entries(SKILL_DATABASE)) {
            if (details.questions.includes(q.question)) {
                topic = key;
                break;
            }
        }

        const expected = SKILL_DATABASE[topic].expectedKeywords;

        // Check matches
        const matches = expected.filter(k => ans.includes(k));

        if (ans.length < 20) {
            feedbackParts.push(`Q${q.id}: Answer too short.`);
        } else if (matches.length > 0) {
            scoreAccumulator += 100; // Full points for keyword match
            feedbackParts.push(`Q${q.id}: Good technical terminology detected.`);
        } else {
            scoreAccumulator += 40; // Partial credit for effort
            feedbackParts.push(`Q${q.id}: Vague answer, missing specific technical terms.`);
        }
    });

    const finalScore = Math.round(scoreAccumulator / questions.length);
    // User Requirement: "If candidate give 5 answers correctly then he'll shortlisted"
    // Assuming 10 questions, 5/10 is 50%.
    const is_suitable = finalScore >= 50;

    // Wait 1.5s to simulate "Thinking"
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        score: finalScore,
        is_suitable,
        feedback: feedbackParts.join("\n")
    };
};
