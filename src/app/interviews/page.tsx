"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Interview } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { ScheduleInterviewModal } from "@/components/interviews/ScheduleInterviewModal";
import { InterviewList } from "@/components/interviews/InterviewList";
import { Plus, Calendar as CalendarIcon } from "lucide-react";

export default function InterviewsPage() {
    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadInterviews();
    }, []);

    const loadInterviews = async () => {
        setLoading(true);
        const data = await api.getInterviews();
        setInterviews(data);
        setLoading(false);
    };

    const handleSchedule = async (data: Partial<Interview>) => {
        // In real app, api.scheduleInterview would return the new object
        await api.scheduleInterview(data as any);
        setIsModalOpen(false);
        loadInterviews();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Interviews</h2>
                    <p className="text-gray-500">Schedule and manage upcoming interviews.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Schedule Interview
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <InterviewList interviews={interviews} />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Schedule Interview"
                size="md"
            >
                <ScheduleInterviewModal
                    onSchedule={handleSchedule}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
