"use client";

import { useState } from "react";
import { mockCandidates } from "@/lib/mock-data";
import { Download, RefreshCw } from "lucide-react";

export default function OffersPage() {
    const [formData, setFormData] = useState({
        candidateId: "",
        role: "",
        salary: "",
        equity: "",
        startDate: "",
        manager: "",
    });

    const selectedCandidate = mockCandidates.find(c => c.id === formData.candidateId);
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="grid h-[calc(100vh-8rem)] gap-6 lg:grid-cols-2">
            {/* Form Panel */}
            <div className="overflow-y-auto rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Generate Offer Letter</h2>
                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Candidate</label>
                        <select
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

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Role Title</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                placeholder="e.g. Senior Engineer"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Reporting Manager</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={formData.manager}
                                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                                placeholder="e.g. Sarah Connor"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Annual Salary</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                placeholder="$150,000"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Equity (Options)</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={formData.equity}
                                onChange={(e) => setFormData({ ...formData, equity: e.target.value })}
                                placeholder="10,000"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 flex items-center justify-center gap-2">
                            <Download className="h-4 w-4" /> Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Panel */}
            <div className="overflow-y-auto rounded-xl bg-gray-50 p-8 shadow-inner ring-1 ring-gray-200 font-serif">
                <div className="bg-white p-12 shadow-sm min-h-full">
                    <div className="mb-8 border-b-2 border-gray-900 pb-4">
                        <h1 className="text-2xl font-bold uppercase tracking-widest">TalentOps Inc.</h1>
                    </div>

                    {selectedCandidate ? (
                        <div className="space-y-6 text-gray-800 leading-relaxed">
                            <p>{currentDate}</p>
                            <p>
                                <strong>{selectedCandidate.name}</strong><br />
                                {selectedCandidate.email}
                            </p>

                            <p>Dear {selectedCandidate.name.split(' ')[0]},</p>

                            <p>
                                We are pleased to offer you the position of <strong>{formData.role || "[Role]"}</strong> at TalentOps Inc,
                                reporting to {formData.manager || "[Manager Name]"}.
                                We believe your skills and experience will be an ideal fit for our creative team.
                            </p>

                            <p>
                                <strong>Compensation Package:</strong><br />
                                - Annual Base Salary: {formData.salary || "[Salary]"}<br />
                                - Stock Options: {formData.equity || "[Equity]"} shares<br />
                                - Start Date: {formData.startDate || "[Date]"}
                            </p>

                            <p>
                                This offer is contingent upon successful completion of reference checks.
                                We look forward to welcoming you to the team.
                            </p>

                            <div className="mt-12">
                                <p>Sincerely,</p>
                                <div className="h-16"></div>
                                <p className="border-t border-gray-300 pt-2 w-48 font-bold">TalentOps Recruiting</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-64 items-center justify-center text-gray-400 italic">
                            Select a candidate to preview offer letter...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
