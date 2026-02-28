"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Job, AtsResult } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { JobDetailsView } from "@/components/jobs/JobDetailsView";
import { ApplicationModal } from "@/components/jobs/ApplicationModal";
import { Search, MapPin, DollarSign } from "lucide-react";
import { Results } from "@/components/analyzer/Results";
import { InterviewModule } from "@/components/analyzer/InterviewModule";
import { analyzeResume } from "@/lib/analyzer/geminiService";
import { processFile } from "@/lib/analyzer/fileProcessor";

export default function JobPostingsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

    // Analysis State
    const [viewMode, setViewMode] = useState<'list' | 'analysis'>('list');
    const [analysisResult, setAnalysisResult] = useState<AtsResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showInterview, setShowInterview] = useState(false);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        setIsLoading(true);
        const data = await api.getAllJobs();
        // Filter only published jobs for candidates
        const publishedJobs = data.filter(job => job.status === 'Published');
        setJobs(publishedJobs);
        setIsLoading(false);
    };

    const handleApply = async (applicationData: any) => {
        if (!selectedJob) return;

        // 1. Submit application to backend
        await api.applyForJob(selectedJob.id, selectedJob.title, applicationData);

        // 2. Start Analysis Workflow
        setIsApplicationModalOpen(false);
        // Keep selectedJob for the description
        setViewMode('analysis');
        setIsAnalyzing(true);

        try {
            const file = applicationData.resume;
            if (file) {
                const uploadedFile = await processFile(file);
                if (uploadedFile) {
                    const result = await analyzeResume(uploadedFile, selectedJob.description);
                    setAnalysisResult(result);
                } else {
                    console.error("File processing failed");
                    // Assuming local fallback handle or just error
                }
            } else {
                console.warn("No file provided in application data");
            }
        } catch (e) {
            console.error("Analysis failed:", e);
            // In a real app, show a toast error
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleResetAnalysis = () => {
        setAnalysisResult(null);
        setViewMode('list');
        setSelectedJob(null);
        setShowInterview(false);
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (viewMode === 'analysis') {
        return (
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="mb-6">
                    <button onClick={handleResetAnalysis} className="text-gray-500 hover:text-gray-900 flex items-center gap-2 font-medium">
                        &larr; Back to Jobs
                    </button>
                </div>

                {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-gray-900 animate-pulse font-display">Analyzing Profile Compatibility...</h2>
                        <p className="text-gray-500 mt-2 font-serif italic">Calibrating candidate data against executive requirements...</p>
                    </div>
                ) : analysisResult ? (
                    <>
                        <Results
                            result={analysisResult}
                            onReset={handleResetAnalysis}
                            onValidateSkills={() => setShowInterview(true)}
                        />
                        {showInterview && selectedJob && (
                            <InterviewModule
                                jobDescription={selectedJob.description}
                                onClose={() => setShowInterview(false)}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-red-500">Analysis failed or no result available.</p>
                        <button onClick={handleResetAnalysis} className="mt-4 text-blue-600 underline">Return to Dashboard</button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display">Open Positions</h2>
                <p className="mt-4 text-lg leading-8 text-gray-600 font-serif">
                    Find your next role and join our growing team.
                </p>
            </div>

            {/* Filters */}
            <div className="mx-auto max-w-2xl mb-10">
                <div className="flex items-center gap-4 rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-200">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by role or department..."
                            className="w-full rounded-md border-0 bg-transparent py-2.5 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Job List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <div className="col-span-full py-20 text-center text-gray-500">Loading open positions...</div>
                ) : (
                    filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                            className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-blue-100 cursor-pointer"
                        >
                            <div>
                                <div className="flex items-center gap-x-4 text-xs">
                                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                        {job.department}
                                    </span>
                                    <span className="text-gray-500">{job.type}</span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600 font-display">
                                        <span className="absolute inset-0" />
                                        {job.title}
                                    </h3>
                                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" /> {job.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4" /> {job.salaryRange}
                                        </div>
                                    </div>
                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 font-serif">
                                        {job.description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-4">
                                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500">
                                    View Details <span aria-hidden="true">&rarr;</span>
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Only show modal if NOT in analysis mode (though handled by return above) */}
            <Modal
                isOpen={!!selectedJob && viewMode === 'list'}
                onClose={() => setSelectedJob(null)}
                title="Job Details"
                size="lg"
            >
                {selectedJob && (
                    <JobDetailsView
                        job={selectedJob}
                        onApply={() => setIsApplicationModalOpen(true)}
                    />
                )}
            </Modal>

            <ApplicationModal
                isOpen={isApplicationModalOpen}
                onClose={() => setIsApplicationModalOpen(false)}
                onSubmit={handleApply}
                jobTitle={selectedJob?.title || ""}
            />
        </div>
    );
}
