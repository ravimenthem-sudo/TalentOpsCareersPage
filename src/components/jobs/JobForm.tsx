"use client";

import { useState } from "react";
import { Job } from "@/lib/types";
import clsx from "clsx";

interface JobFormProps {
    initialData?: Partial<Job>;
    onSubmit: (data: Partial<Job>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export function JobForm({ initialData, onSubmit, onCancel, isLoading }: JobFormProps) {
    const [formData, setFormData] = useState<Partial<Job>>({
        title: "",
        department: "",
        location: "",
        salaryRange: "",
        description: "",
        status: "Draft",
        experienceLevel: "Mid-Level",
        requirements: [],
        ...initialData,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Department</label>
                    <select
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Remote, New York"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Salary Range</label>
                    <input
                        type="text"
                        placeholder="e.g. $100k - $120k"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.salaryRange}
                        onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    required
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                    <select
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Experience Level</label>
                    <select
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    >
                        <option value="Junior">Junior</option>
                        <option value="Mid-Level">Mid-Level</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save Job"}
                </button>
            </div>
        </form>
    );
}
