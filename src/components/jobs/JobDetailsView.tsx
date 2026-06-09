import { Job } from "@/lib/types";
import { MapPin, Briefcase, DollarSign } from "lucide-react";

export function JobDetailsView({ job, onApply }: { job: Job; onApply: () => void }) {
    return (
        <div className="space-y-8 pb-8 text-slate-300">
            <div className="border-b border-white/5 pb-6">
                <h3 className="text-2xl font-bold text-white font-display">{job.title}</h3>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-slate-500" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4 text-slate-500" /> {job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-cyan-400" /> {job.salaryRange}</span>
                </div>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300">
                <h4 className="text-base font-bold text-white mb-2">About the Role</h4>
                <p className="mb-6 leading-relaxed font-serif">{job.description}</p>

                <h4 className="text-base font-bold text-white mb-2">Requirements</h4>
                <ul className="space-y-2 list-disc pl-5 mb-6 text-sm leading-relaxed">
                    {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>

            <div className="rounded-xl bg-[#131E36]/40 border border-white/5 p-6">
                <h4 className="font-bold text-white mb-4 text-sm">Job Overview</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs">
                    <div>
                        <span className="block text-slate-400 mb-0.5">Department</span>
                        <span className="font-semibold text-white">{job.department}</span>
                    </div>
                    <div>
                        <span className="block text-slate-400 mb-0.5">Experience</span>
                        <span className="font-semibold text-white">{job.experienceLevel}</span>
                    </div>
                    <div>
                        <span className="block text-slate-400 mb-0.5">Posted</span>
                        <span className="font-semibold text-white">{job.postedDate}</span>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 bg-[#0D1528] pt-4 border-t border-white/5 mt-auto">
                <button
                    onClick={onApply}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] transition-all transform hover:-translate-y-0.5 duration-200"
                >
                    Apply for this Job
                </button>
            </div>
        </div>
    );
}
