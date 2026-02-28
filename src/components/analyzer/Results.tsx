import React from 'react';
import { AtsResult } from '../../lib/types';
import { CheckCircle, AlertTriangle, AlertCircle, Award, Briefcase, RefreshCw, Play } from 'lucide-react';

interface ResultsProps {
    result: AtsResult;
    onReset: () => void;
    onValidateSkills?: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onReset, onValidateSkills }) => {
    const isAccepted = result.ats_score > 70;

    return (
        <div className="max-w-5xl mx-auto mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Score Card / Main Status */}
            <div className="relative">
                {/* Subtle Ambient Glow */}
                <div className={`absolute -inset-4 rounded-[40px] blur-[60px] opacity-20 ${isAccepted ? 'bg-green-500' : 'bg-red-500'}`}></div>

                <div className={`relative bg-white border rounded-[30px] p-10 overflow-hidden shadow-xl ${isAccepted ? 'border-green-100' : 'border-red-100'}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <span className={`inline-block px-4 py-1.5 rounded-full border mb-6 text-xs font-mono uppercase tracking-widest ${isAccepted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                {isAccepted ? 'Candidate Calibrated' : 'Calibration Warning'}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-medium text-gray-900 mb-4 leading-tight">
                                {isAccepted ? 'Profile Aligned' : 'Requirement Gap Detected'}
                            </h2>
                            <p className="text-gray-700 font-serif text-xl leading-relaxed opacity-80 max-w-lg mx-auto md:mx-0">
                                {result.message}
                            </p>
                        </div>

                        <div className="flex items-center justify-center relative">
                            {/* Ring Chart */}
                            <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 160 160">
                                <circle cx="80" cy="80" r="70" stroke="#F3F4F6" strokeWidth="8" fill="transparent" />
                                <circle
                                    cx="80" cy="80" r="70"
                                    stroke="currentColor" strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * result.ats_score) / 100}
                                    className={`transition-all duration-1000 ease-out ${isAccepted ? 'text-green-500' : 'text-red-500'}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className={`text-6xl font-display font-semibold ${isAccepted ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.ats_score}
                                </span>
                                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest mt-1">Match Index</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Detected Skills */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                            <Award className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-display font-medium text-gray-900">Detected Capabilities</h3>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        {result.skills_detected.length > 0 ? (
                            result.skills_detected.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-700 font-medium hover:border-purple-200 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 italic font-serif text-lg">No specific skills detected that match the calibration.</span>
                        )}
                    </div>
                </div>

                {/* Rejection / Suggestions Panel */}
                {isAccepted ? (
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 blur-[50px] rounded-full pointer-events-none group-hover:bg-cyan-100 transition-all"></div>

                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <div className="p-2.5 bg-cyan-50 rounded-xl border border-cyan-100">
                                <Briefcase className="w-5 h-5 text-cyan-600" />
                            </div>
                            <h3 className="text-xl font-display font-medium text-gray-900">Role Recommendations</h3>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {result.job_role_suggestions.map((role, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-cyan-200 transition-colors group/item"
                                >
                                    <span className="text-gray-900 font-medium">{role}</span>
                                    <AlertCircle className="w-4 h-4 text-gray-400 group-hover/item:text-cyan-600 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-red-100 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-red-50 rounded-xl">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="text-xl font-display font-medium text-gray-900">Development Priority</h3>
                        </div>

                        {result.mismatch_reason && (
                            <div className="mb-6 bg-red-50 p-4 rounded-xl border border-red-100">
                                <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wide block mb-2">Primary Gap</span>
                                <p className="text-gray-900 font-medium leading-relaxed">{result.mismatch_reason}</p>
                            </div>
                        )}

                        <p className="text-gray-500 font-serif italic opacity-80 mb-8">
                            The profile score falls below the automated interview threshold. Consider addressing the identified gaps to meet the standard.
                        </p>

                        {/* Validate Skills Button */}
                        {result.ats_score < 55 && onValidateSkills && (
                            <div className="mt-auto">
                                <button
                                    onClick={onValidateSkills}
                                    className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium shadow-lg transition-all flex items-center justify-center gap-3 group"
                                >
                                    <span className="font-mono text-sm uppercase tracking-wide">Challenge Decision</span>
                                    <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-all uppercase tracking-widest text-xs font-semibold shadow-sm hover:shadow-md flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Initialize New Analysis
                </button>
            </div>
        </div>
    );
};
