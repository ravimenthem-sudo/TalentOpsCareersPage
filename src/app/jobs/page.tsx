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
            <div className="bg-[#070C1A] text-white min-h-[90vh] py-12 px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6">
                        <button onClick={handleResetAnalysis} className="text-slate-400 hover:text-white flex items-center gap-2 font-medium transition-colors">
                            &larr; Back to Jobs
                        </button>
                    </div>

                    {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                            <h2 className="text-2xl font-bold text-white animate-pulse font-display">Analyzing Profile Compatibility...</h2>
                            <p className="text-slate-400 mt-2 font-serif italic">Calibrating candidate data against executive requirements...</p>
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
                            <p className="text-red-400">Analysis failed or no result available.</p>
                            <button onClick={handleResetAnalysis} className="mt-4 text-indigo-400 hover:text-indigo-300 underline transition-colors">Return to Dashboard</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#070C1A] text-white min-h-[90vh] py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                        Join Our Team
                    </span>
                    <h2 className="text-3xl font-bold font-display mt-3 text-white sm:text-4xl">Open Positions</h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
                        Find your next role and join our growing team.
                    </p>
                </div>

                {/* Filters */}
                <div className="mx-auto max-w-2xl mb-12">
                    <div className="flex items-center gap-4 rounded-xl bg-[#0D1528] p-2 ring-1 ring-white/10 focus-within:ring-indigo-500/50 transition-all">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by role or department..."
                                className="w-full rounded-md border-0 bg-transparent py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Job List */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {isLoading ? (
                        <div className="col-span-full py-20 text-center text-slate-500">Loading open positions...</div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-slate-500">No open positions found.</div>
                    ) : (
                        filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                onClick={() => setSelectedJob(job)}
                                className="group relative flex flex-col justify-between rounded-2xl bg-[#0D1528]/80 p-6 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
                            >
                                <div>
                                    <div className="flex items-center justify-between text-xs mb-4">
                                        <span className={`relative z-10 rounded-full px-2.5 py-1 font-semibold tracking-wider text-[10px] uppercase border ${
                                            job.department.toLowerCase().includes("eng") ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" :
                                            job.department.toLowerCase().includes("prod") ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" :
                                            job.department.toLowerCase().includes("design") ? "bg-pink-500/10 text-pink-300 border-pink-500/20" :
                                            "bg-slate-500/10 text-slate-300 border-slate-500/20"
                                        }`}>
                                            {job.department}
                                        </span>
                                        <span className="text-slate-400 font-medium">{job.type}</span>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 text-slate-500" /> {job.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-3.5 w-3.5 text-cyan-400" /> {job.salaryRange}
                                            </div>
                                        </div>
                                        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-300 font-serif">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center gap-4 border-t border-white/5 pt-4">
                                    <span className="text-sm font-semibold text-indigo-400 group-hover:text-cyan-400 transition-colors">
                                        View Details &rarr;
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Reusable Modal (restyled to match dark theme in Modal.tsx) */}
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
        </div>
    );
}
