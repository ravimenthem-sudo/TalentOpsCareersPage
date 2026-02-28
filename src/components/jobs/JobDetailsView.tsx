import { Job } from "@/lib/types";
import { MapPin, Briefcase, DollarSign } from "lucide-react";

export function JobDetailsView({ job, onApply }: { job: Job; onApply: () => void }) {
    return (
        <div className="space-y-8 pb-8">
            <div className="border-b border-gray-100 pb-6">
                <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {job.salaryRange}</span>
                </div>
            </div>

            <div className="prose prose-blue max-w-none text-gray-600">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">About the Role</h4>
                <p className="mb-6 leading-relaxed">{job.description}</p>

                <h4 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h4>
                <ul className="space-y-2 list-disc pl-5 mb-6">
                    {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>

            <div className="rounded-xl bg-gray-50 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Job Overview</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                        <span className="block text-gray-500">Department</span>
                        <span className="font-medium text-gray-900">{job.department}</span>
                    </div>
                    <div>
                        <span className="block text-gray-500">Experience</span>
                        <span className="font-medium text-gray-900">{job.experienceLevel}</span>
                    </div>
                    <div>
                        <span className="block text-gray-500">Posted</span>
                        <span className="font-medium text-gray-900">{job.postedDate}</span>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-100 mt-auto">
                <button
                    onClick={onApply}
                    className="w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all"
                >
                    Apply for this Job
                </button>
            </div>
        </div>
    );
}
