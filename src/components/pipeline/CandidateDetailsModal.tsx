"use client";

import { Candidate, PROCESS_STAGES } from "@/lib/types";
import { Mail, Phone, Calendar, Paperclip, Clock } from "lucide-react";

interface CandidateDetailsModalProps {
    candidate: Candidate;
    onClose: () => void;
    onStatusChange: (status: Candidate['stage']) => void;
}

export function CandidateDetailsModal({ candidate, onClose, onStatusChange }: CandidateDetailsModalProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                        {candidate.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-500">{candidate.role}</p>
                    </div>
                </div>
                <select
                    className="rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={candidate.stage}
                    onChange={(e) => onStatusChange(e.target.value as any)}
                >
                    {PROCESS_STAGES.map((stage) => (
                        <option key={stage} value={stage}>{stage}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {candidate.email}
                    </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {candidate.phone}
                    </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        Applied: {candidate.appliedDate}
                    </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                    <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                        <Paperclip className="h-4 w-4" />
                        View Resume
                    </a>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900">Notes</h4>
                <textarea
                    className="mt-2 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={4}
                    placeholder="Add notes about this candidate..."
                    defaultValue={candidate.notes}
                />
            </div>

            <div className="border-t border-gray-100 pt-6 flex justify-end gap-3">
                <button onClick={onClose} className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    Close
                </button>
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Save Notes
                </button>
            </div>
        </div>
    );
}
