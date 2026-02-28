"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Candidate } from "@/lib/types";
import { MoreHorizontal, Paperclip } from "lucide-react";
import clsx from "clsx";

interface CandidateCardProps {
    candidate: Candidate;
    index: number;
    onClick: (candidate: Candidate) => void;
}

export function CandidateCard({ candidate, index, onClick }: CandidateCardProps) {
    return (
        <Draggable draggableId={candidate.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick(candidate)}
                    style={{ ...provided.draggableProps.style }}
                    className={clsx(
                        "group relative mb-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md",
                        snapshot.isDragging && "shadow-xl ring-2 ring-blue-500 rotate-2 opacity-90"
                    )}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                                {candidate.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">{candidate.name}</h4>
                                <p className="text-xs text-gray-500">{candidate.role}</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-400">{candidate.appliedDate}</span>
                        {candidate.resumeLink && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Paperclip className="h-3 w-3" /> Resume
                            </span>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
}
