"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Users, Calendar, MessageSquare, FileText, Settings } from "lucide-react";
import clsx from "clsx";

const navigation = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Open Positions", href: "/jobs", icon: Briefcase },
    { name: "Our Culture", href: "/#values", icon: Users },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
            <div className="flex h-16 items-center px-6">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    TalentOps
                </h1>
            </div>
            <div className="flex flex-1 flex-col gap-y-1 overflow-y-auto px-4 py-4">
                <nav className="flex-1 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    isActive
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200"
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        isActive ? "text-blue-400" : "text-gray-400 group-hover:text-white",
                                        "h-5 w-5 shrink-0"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="p-4 border-t border-gray-800">
                <div className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white cursor-pointer">
                    <Settings className="h-5 w-5 shrink-0" />
                    Settings
                </div>
                <div className="mt-4 flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium">TO</div>
                    <div className="text-xs">
                        <p className="font-medium text-white">TalentOps</p>
                        <p className="text-gray-500">Careers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
