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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div
                className={clsx(
                    "relative flex max-h-[90vh] w-full flex-col rounded-xl bg-white shadow-2xl ring-1 ring-gray-200",
                    {
                        "max-w-md": size === "sm",
                        "max-w-xl": size === "md",
                        "max-w-3xl": size === "lg",
                        "max-w-5xl": size === "xl",
                    }
                )}
            >
                <div className="flex items-center justify-between border-b border-gray-100 p-4 lg:p-6">
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
