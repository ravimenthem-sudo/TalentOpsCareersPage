"use client";

import PipelineBoard from "@/components/pipeline/PipelineBoard";

export default function PipelinePage() {
    return (
        <div className="h-[calc(100vh-8rem)]">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Candidate Pipeline</h2>
                    <p className="text-gray-500">Track candidates through the recruitment process.</p>
                </div>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Add Candidate
                </button>
            </div>
            <PipelineBoard />
        </div>
    );
}
