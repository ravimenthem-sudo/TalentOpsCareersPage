"use client";

import { useState } from "react";
import { Candidate, Interview } from "@/lib/types";
import { mockCandidates } from "@/lib/mock-data";

interface ScheduleInterviewModalProps {
    initialDate?: Date;
    onSchedule: (data: Partial<Interview>) => void;
    onCancel: () => void;
}

export function ScheduleInterviewModal({ initialDate, onSchedule, onCancel }: ScheduleInterviewModalProps) {
    // In a real app we'd fetch candidates to select from
    const [formData, setFormData] = useState<Partial<Interview>>({
        candidateId: "",
        interviewer: "",
        date: initialDate ? initialDate.toISOString().split('T')[0] : "",
        time: "10:00",
        mode: "Online",
        meetingLink: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lookup candidate name
        const candidate = mockCandidates.find(c => c.id === formData.candidateId);
        onSchedule({
            ...formData,
            candidateName: candidate?.name || "Unknown",
            status: "Scheduled"
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                        <option key={c.id} value={c.id}>{c.name} - {c.role}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Interviewer</label>
                <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.interviewer}
                    onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Mode</label>
                    <select
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.mode}
                        onChange={(e) => setFormData({ ...formData, mode: e.target.value as any })}
                    >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Meeting Link / Location</label>
                    <input
                        type="text"
                        placeholder={formData.mode === 'Online' ? "https://meet.google.com/..." : "Room 302"}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.meetingLink}
                        onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Schedule Interview
                </button>
            </div>
        </form>
    );
}
