export type JobStatus = 'Published' | 'Draft' | 'Closed';

export interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    status: JobStatus;
    salaryRange: string;
    description: string;
    requirements: string[];
    experienceLevel: string;
    applicantsCount: number;
    postedDate: string;
}

export const PROCESS_STAGES = ['Applied', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'] as const;

export type CandidateStage = typeof PROCESS_STAGES[number];

export interface Candidate {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    stage: CandidateStage;
    resumeLink: string;
    avatar?: string;
    appliedDate: string;
    notes?: string;
}

export type InterviewMode = 'Online' | 'Offline';

export interface Interview {
    id: string;
    candidateId: string;
    candidateName: string; // Denormalized for easier display
    interviewer: string;
    date: string; // ISO Date string
    time: string;
    mode: InterviewMode;
    meetingLink?: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface Feedback {
    id: string;
    candidateId: string;
    interviewer: string;
    rating: number; // 1-5
    summary: string;
    decision: 'Hire' | 'No Hire';
    date: string;
}

export interface DashboardStats {
    totalJobs: number;
    candidatesInPipeline: number;
    interviewsScheduled: number;
    pendingOffers: number;
}

// Analyzer Types
export interface AtsResult {
    ats_score: number;
    skills_detected: string[];
    job_role_suggestions: string[];
    message: string;
    mismatch_reason?: string;
}

export interface InterviewQuestion {
    id: number;
    question: string;
}

export interface InterviewEvaluation {
    is_suitable: boolean;
    score: number;
    feedback: string;
}

export enum FileType {
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
    PDF = 'PDF',
    UNKNOWN = 'UNKNOWN'
}

export interface UploadedFile {
    name: string;
    type: FileType;
    content: string; // Base64 or Text content
    mimeType: string;
}
