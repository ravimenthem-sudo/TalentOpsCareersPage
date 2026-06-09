"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import clsx from "clsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div
                className={clsx(
                    "relative flex max-h-[90vh] w-full flex-col rounded-2xl bg-[#0D1528] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden",
                    {
                        "max-w-md": size === "sm",
                        "max-w-xl": size === "md",
                        "max-w-3xl": size === "lg",
                        "max-w-5xl": size === "xl",
                    }
                )}
            >
                <div className="flex items-center justify-between border-b border-white/5 p-4 lg:p-6">
                    <h2 className="text-lg font-bold text-white font-display">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 lg:p-6 text-slate-300">
                    {children}
                </div>
            </div>
        </div>
    );
}
