"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Briefcase, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Open Positions", href: "/jobs" },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isHome = true; // Always use dark glassmorphism for careers site

    return (
        <header className={clsx(
            "sticky top-0 z-50 transition-colors duration-300",
            isHome 
                ? "bg-[#070C1A]/85 backdrop-blur-xl border-b border-white/10 text-white" 
                : "bg-white shadow-sm text-gray-900"
        )}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <Briefcase className={clsx("h-8 w-8 transition-colors", isHome ? "text-cyan-400" : "text-blue-600")} />
                        <span className={clsx("text-xl font-bold transition-colors", isHome ? "text-white" : "text-gray-900")}>
                            TalentOps <span className={isHome ? "text-cyan-400" : "text-blue-600"}>Careers</span>
                        </span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className={clsx(
                            "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors",
                            isHome ? "text-white hover:text-slate-300" : "text-gray-700 hover:text-gray-900"
                        )}
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "text-sm font-semibold leading-6 transition-colors",
                                isHome
                                    ? pathname === item.href ? "text-cyan-400" : "text-slate-300 hover:text-white"
                                    : pathname === item.href ? "text-blue-600" : "text-gray-900 hover:text-blue-600"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="/jobs"
                        className={clsx(
                            "text-sm font-semibold leading-6 transition-colors",
                            isHome ? "text-white hover:text-cyan-400" : "text-gray-900 hover:text-blue-600"
                        )}
                    >
                        View Openings <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-50 bg-[#070C1A]/40 backdrop-blur-sm" />
                    <div className={clsx(
                        "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10",
                        isHome ? "bg-[#0D1528] text-white" : "bg-white text-gray-900"
                    )}>
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                <Briefcase className={clsx("h-6 w-6", isHome ? "text-cyan-400" : "text-blue-600")} />
                                <span className="font-bold">TalentOps</span>
                            </Link>
                            <button
                                type="button"
                                className={clsx("-m-2.5 rounded-md p-2.5", isHome ? "text-white" : "text-gray-700")}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={clsx(
                                                "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors",
                                                isHome 
                                                    ? "text-slate-300 hover:bg-white/5 hover:text-white" 
                                                    : "text-gray-900 hover:bg-gray-50"
                                            )}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Link
                                        href="/jobs"
                                        className={clsx(
                                            "-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 transition-colors",
                                            isHome 
                                                ? "text-white hover:bg-white/5 hover:text-cyan-400" 
                                                : "text-gray-900 hover:bg-gray-50"
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        View Openings
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

