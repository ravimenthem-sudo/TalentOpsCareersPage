"use client";

import { useState } from "react";
import { mockCandidates } from "@/lib/mock-data";
import { Star } from "lucide-react";
import clsx from "clsx";

export default function FeedbackPage() {
    const [formData, setFormData] = useState({
        candidateId: "",
        rating: 0,
        summary: "",
        decision: "Hire",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Mimic API call
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ candidateId: "", rating: 0, summary: "", decision: "Hire" });
            alert("Feedback submitted successfully!");
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Candidate Feedback</h2>
                <p className="text-gray-500">Submit your evaluation and hiring recommendation.</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Candidate</label>
                        <select
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.candidateId}
                            onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                        >
                            <option value="">Select Candidate</option>
                            {mockCandidates.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={clsx(
                                            "h-8 w-8 transition-colors",
                                            star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Evaluation Summary</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Describe the candidate's strengths and weaknesses..."
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Recommendation</label>
                        <select
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.decision}
                            onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
                        >
                            <option value="Hire">Strong Hire</option>
                            <option value="Hire">Hire</option>
                            <option value="No Hire">No Hire</option>
                            <option value="Abstain">Abstain</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={submitted}
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {submitted ? "Submitting..." : "Submit Feedback"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
