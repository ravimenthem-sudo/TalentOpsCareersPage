"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import clsx from "clsx";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
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

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={clsx(
                    "fixed inset-y-0 right-0 z-50 w-full max-w-lg transform bg-white shadow-2xl transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
