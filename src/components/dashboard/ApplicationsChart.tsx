"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', apps: 4 },
    { name: 'Tue', apps: 7 },
    { name: 'Wed', apps: 5 },
    { name: 'Thu', apps: 12 },
    { name: 'Fri', apps: 9 },
    { name: 'Sat', apps: 2 },
    { name: 'Sun', apps: 1 },
];

export function ApplicationsChart() {
    return (
        <div className="h-[300px] w-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Applications Received</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip
                        cursor={{ fill: '#f3f4f6' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="apps" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
