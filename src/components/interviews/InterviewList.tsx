"use client";

import { Interview } from "@/lib/types";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import { Video, MapPin, Clock } from "lucide-react";

interface InterviewListProps {
    interviews: Interview[];
}

export function InterviewList({ interviews }: InterviewListProps) {
    // Sort by date and time
    const sortedInterviews = [...interviews].sort((a, b) => {
        return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime();
    });

    // Group by date
    const grouped = sortedInterviews.reduce((acc, interview) => {
        const date = interview.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(interview);
        return acc;
    }, {} as Record<string, Interview[]>);

    const formatDateHeader = (dateStr: string) => {
        const date = parseISO(dateStr);
        if (isToday(date)) return "Today";
        if (isTomorrow(date)) return "Tomorrow";
        return format(date, "EEEE, MMMM d, yyyy");
    };

    return (
        <div className="space-y-8">
            {Object.keys(grouped).map((date) => (
                <div key={date}>
                    <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{formatDateHeader(date)}</h3>
                    <div className="space-y-3">
                        {grouped[date].map((interview) => (
                            <div key={interview.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center justify-center rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
                                        <span className="text-xs font-semibold">{interview.time}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{interview.candidateName}</h4>
                                        <p className="text-sm text-gray-500">Interview with {interview.interviewer}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        {interview.mode === 'Online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                                        {interview.mode}
                                    </div>
                                    {interview.meetingLink && (
                                        <a
                                            href={interview.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-blue-600 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                                        >
                                            Join Meeting
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {interviews.length === 0 && (
                <div className="flex h-64 items-center justify-center rounded-xl bg-gray-50 border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">No upcoming interviews scheduled.</p>
                </div>
            )}
        </div>
    );
}
