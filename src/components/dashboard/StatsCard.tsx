import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                    <Icon className="h-6 w-6 text-blue-600" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={trendUp ? "text-green-600" : "text-red-600"}>
                        {trend}
                    </span>
                    <span className="ml-2 text-gray-400">vs last month</span>
                </div>
            )}
        </div>
    );
}
