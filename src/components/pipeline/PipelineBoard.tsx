"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { api } from "@/lib/api";
import { Candidate, PROCESS_STAGES } from "@/lib/types";
import { CandidateCard } from "@/components/pipeline/CandidateCard";
import { Modal } from "@/components/ui/Modal";
import { CandidateDetailsModal } from "@/components/pipeline/CandidateDetailsModal";
import clsx from "clsx";

export default function PipelineBoard() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = async () => {
        const data = await api.getAllCandidates();
        setCandidates(data);
        setIsLoading(false);
    };

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Optimistic Update
        const newStage = destination.droppableId as Candidate['stage'];
        const updatedCandidates = candidates.map(c =>
            c.id === draggableId ? { ...c, stage: newStage } : c
        );
        setCandidates(updatedCandidates);

        await api.updateCandidateStage(draggableId, newStage);
    };

    const getCandidatesByStage = (stage: string) => {
        return candidates.filter(c => c.stage === stage);
    };

    const handleStatusChange = async (newStage: Candidate['stage']) => {
        if (selectedCandidate) {
            await api.updateCandidateStage(selectedCandidate.id, newStage);
            setCandidates(candidates.map(c => c.id === selectedCandidate.id ? { ...c, stage: newStage } : c));
            // Update local selected candidate to reflect change
            setSelectedCandidate({ ...selectedCandidate, stage: newStage });
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex h-full gap-6 overflow-x-auto pb-6">
                    {PROCESS_STAGES.map((stage) => (
                        <div key={stage} className="flex h-full w-80 shrink-0 flex-col rounded-xl bg-gray-50/50 ring-1 ring-gray-200">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-700">{stage}</h3>
                                <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-gray-600 shadow-sm border border-gray-100">
                                    {getCandidatesByStage(stage).length}
                                </span>
                            </div>

                            <Droppable droppableId={stage}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={clsx(
                                            "flex-1 overflow-y-auto p-3 transition-colors",
                                            snapshot.isDraggingOver ? "bg-blue-50/50" : ""
                                        )}
                                    >
                                        {getCandidatesByStage(stage).map((candidate, index) => (
                                            <CandidateCard
                                                key={candidate.id}
                                                candidate={candidate}
                                                index={index}
                                                onClick={setSelectedCandidate}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>

            <Modal
                isOpen={!!selectedCandidate}
                onClose={() => setSelectedCandidate(null)}
                title="Candidate Details"
                size="lg"
            >
                {selectedCandidate && (
                    <CandidateDetailsModal
                        candidate={selectedCandidate}
                        onClose={() => setSelectedCandidate(null)}
                        onStatusChange={handleStatusChange}
                    />
                )}
            </Modal>
        </>
    );
}
