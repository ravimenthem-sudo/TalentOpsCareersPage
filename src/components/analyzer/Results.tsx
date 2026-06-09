import React from 'react';
import { AtsResult } from '../../lib/types';
import { CheckCircle, AlertTriangle, Award, Briefcase, RefreshCw, Play, ArrowRight } from 'lucide-react';

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
                <div className={`absolute -inset-4 rounded-[40px] blur-[60px] opacity-15 ${isAccepted ? 'bg-emerald-500' : 'bg-red-500'}`}></div>

                <div className={`relative bg-[#0D1528] border rounded-[30px] p-10 overflow-hidden shadow-2xl shadow-black/50 ${isAccepted ? 'border-emerald-500/30' : 'border-red-500/20'}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <span className={`inline-block px-4 py-1.5 rounded-full border mb-6 text-xs font-mono uppercase tracking-widest ${isAccepted ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-red-500/10 text-red-300 border-red-500/20'}`}>
                                {isAccepted ? 'Candidate Calibrated' : 'Calibration Warning'}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                                {isAccepted ? 'Profile Aligned' : 'Requirement Gap Detected'}
                            </h2>
                            <p className="text-slate-300 font-serif text-lg leading-relaxed opacity-90 max-w-lg mx-auto md:mx-0">
                                {result.message}
                            </p>
                        </div>

                        <div className="flex items-center justify-center relative">
                            {/* Ring Chart */}
                            <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 160 160">
                                <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                                <circle
                                    cx="80" cy="80" r="70"
                                    stroke="currentColor" strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * result.ats_score) / 100}
                                    className={`transition-all duration-1000 ease-out ${isAccepted ? 'text-emerald-400' : 'text-red-400'}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className={`text-6xl font-display font-bold ${isAccepted ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {result.ats_score}
                                </span>
                                <span className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-1">Match Index</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Detected Skills */}
                <div className="bg-[#0D1528] border border-white/5 rounded-3xl p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Award className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white font-display">Detected Capabilities</h3>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        {result.skills_detected.length > 0 ? (
                            result.skills_detected.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1.5 rounded-full bg-[#131E36]/50 border border-white/5 text-sm text-slate-300 font-medium hover:border-indigo-500/30 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-slate-500 italic font-serif text-lg">No specific skills detected that match the calibration.</span>
                        )}
                    </div>
                </div>

                {/* Rejection / Suggestions Panel */}
                {isAccepted ? (
                    <div className="bg-[#0D1528] border border-white/5 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-all"></div>

                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                                <Briefcase className="w-5 h-5 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white font-display">Role Recommendations</h3>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {result.job_role_suggestions.map((role, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-xl bg-[#131E36]/50 border border-white/5 hover:border-cyan-500/30 transition-colors group/item"
                                >
                                    <span className="text-white font-medium">{role}</span>
                                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover/item:text-cyan-400 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#0D1528] border border-red-500/20 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white font-display">Development Priority</h3>
                        </div>

                        {result.mismatch_reason && (
                            <div className="mb-6 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-red-300">
                                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wide block mb-2">Primary Gap</span>
                                <p className="text-slate-200 font-medium leading-relaxed">{result.mismatch_reason}</p>
                            </div>
                        )}

                        <p className="text-slate-400 font-serif italic opacity-85 mb-8 text-sm">
                            The profile score falls below the automated interview threshold. Consider addressing the identified gaps to meet the standard.
                        </p>

                        {/* Validate Skills Button */}
                        {result.ats_score < 55 && onValidateSkills && (
                            <div className="mt-auto">
                                <button
                                    onClick={onValidateSkills}
                                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 group"
                                >
                                    <span className="text-xs uppercase tracking-wider">Challenge Decision</span>
                                    <Play className="w-4 h-4 fill-white group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="px-8 py-3 rounded-full bg-transparent border border-white/10 text-slate-300 hover:border-indigo-500 hover:text-white transition-all uppercase tracking-widest text-xs font-semibold shadow-sm hover:shadow-md flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Initialize New Analysis
                </button>
            </div>
        </div>
    );
};
