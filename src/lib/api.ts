import { supabase } from './supabase';
import { Job, Candidate, Interview, DashboardStats } from './types';

// Helper to simulate mock data if methods are not implemented
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    // JOBS (Real Data)
    getAllJobs: async (): Promise<Job[]> => {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('status', 'published') // FIXED: Database uses lowercase 'published'
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching jobs:', error);
            return [];
        }

        return (data || []).map((job: any) => ({
            id: job.id,
            title: job.title,
            department: job.department || 'Engineering',
            type: job.type || 'Full-time', // Database uses 'type'
            location: job.location,
            salaryRange: job.salary, // Database uses 'salary'
            description: job.description,
            status: 'Published', // Normalize for frontend
            applicantsCount: job.applicants || 0,
            requirements: job.requirements || [],
            experienceLevel: job.experience || 'Mid-Senior',
            postedDate: job.created_at ? new Date(job.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],

        }));
    },

    getJob: async (id: string): Promise<Job | null> => {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return null;

        return {
            id: data.id,
            title: data.title,
            department: data.department || 'Engineering',
            type: data.type || 'Full-time',
            location: data.location,
            salaryRange: data.salary, // Database uses 'salary'
            description: data.description,
            status: 'Published',
            applicantsCount: data.applicants || 0,
            requirements: data.requirements || [],
            experienceLevel: data.experience || 'Mid-Senior',
            postedDate: data.created_at ? new Date(data.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],

        };
    },

    // APPLICATIONS (Real Write)
    applyForJob: async (jobId: string, jobTitle: string, candidateData: any): Promise<void> => {
        let resumeUrl = null;

        // 1. Upload Resume if present
        if (candidateData.resume && candidateData.resume instanceof File) {
            const file = candidateData.resume;
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading resume:', uploadError);
                // Continue application without resume or throw error? 
                // Let's log it but try to save the profile anyway, or maybe throw.
                // For a candidate site, failing the upload should probably fail the application.
                throw new Error('Failed to upload resume. Please try again.');
            }

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath);

            resumeUrl = publicUrl;
        }

        // Construct Name from possibly separated fields
        const candidateName = candidateData.fullName ||
            [candidateData.firstName, candidateData.middleName, candidateData.lastName].filter(Boolean).join(' ');

        // 2. Insert Candidate
        const { error } = await supabase
            .from('candidates')
            .insert([
                {
                    job_id: jobId,
                    job_title: jobTitle,
                    name: candidateName,
                    email: candidateData.email,
                    phone: candidateData.primaryContact || candidateData.phone,
                    stage: 'applied', // Database seems to use lowercase 'interview', so 'applied' or 'new' might be better. 
                    status: 'active',
                    source: 'Website',
                    applied_date: new Date().toISOString(),
                    resume_url: resumeUrl,
                    // Store extra details in metadata if supported, or just ignore for now as we don't have columns
                }
            ]);

        if (error) {
            console.error('Error submitting application:', error);
            throw error;
        }
    },

    // MOCK METHODS 
    getStats: async (): Promise<DashboardStats> => {
        return {
            totalJobs: 0,
            candidatesInPipeline: 0,
            interviewsScheduled: 0,
            pendingOffers: 0
        };
    },

    getAllCandidates: async (): Promise<Candidate[]> => [],
    updateCandidateStage: async (...args: any[]) => { },
    getInterviews: async (): Promise<Interview[]> => [],
    scheduleInterview: async (...args: any[]) => { },
    createJob: async (...args: any[]) => { }
};
