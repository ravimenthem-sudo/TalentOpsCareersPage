import React, { useState } from 'react';
import { generateInterviewQuestions, evaluateInterviewAnswers } from '../../lib/analyzer/geminiService';
import { InterviewQuestion, InterviewEvaluation } from '../../lib/types';
import { ArrowRight, ArrowLeft, Loader2, Play, AlertTriangle, X } from 'lucide-react';

interface InterviewModuleProps {
    jobDescription: string;
    onClose: () => void;
}

export const InterviewModule: React.FC<InterviewModuleProps> = ({ jobDescription, onClose }) => {
    const [step, setStep] = useState<'intro' | 'loading' | 'questions' | 'evaluating' | 'result'>('intro');
    const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const startInterview = async () => {
        setStep('loading');
        try {
            const q = await generateInterviewQuestions(jobDescription);
            setQuestions(q);
            setStep('questions');
        } catch (err) {
            setError("Failed to generate questions. Please try again.");
            setStep('intro');
        }
    };

    const handleSubmit = async () => {
        setStep('evaluating');
        try {
            const result = await evaluateInterviewAnswers(jobDescription, questions, answers);
            setEvaluation(result);
            setStep('result');
        } catch (err) {
            setError("Failed to evaluate answers.");
            setStep('questions');
        }
    };

    const handleAnswerChange = (id: number, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    if (step === 'intro') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
                <div className="bg-[#0D1528] border border-white/10 p-8 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden text-slate-300">
                    <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-3xl font-bold text-white mb-6 font-display">Skill Validation Protocol</h2>

                    <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                            <h3 className="text-amber-400 font-bold uppercase tracking-wider text-xs">Protocol Advisory</h3>
                        </div>
                        <ul className="text-slate-300 text-sm list-disc pl-5 space-y-2 font-serif">
                            <li>Provide authentic responses based on intrinsic knowledge.</li>
                            <li>Automated pattern detection is active for AI-generated content.</li>
                            <li className="text-red-400 font-medium">Candidates detected using external AI assistance will be blacklisted.</li>
                            <li>This is your opportunity to override the algorithmic rejection.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={startInterview}
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <Play className="w-4 h-4 fill-white" />
                            Acknowledge & Begin Assessment
                        </button>
                        <button
                            onClick={onClose}
                            className="px-8 py-3.5 border border-white/10 text-slate-300 hover:bg-white/5 rounded-xl font-semibold transition-colors text-sm"
                        >
                            Withdraw
                        </button>
                    </div>
                    {error && <p className="text-red-400 mt-4 text-center font-medium text-sm">{error}</p>}
                </div>
            </div>
        );
    }

    if (step === 'loading' || step === 'evaluating') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070C1A]/95 backdrop-blur-md">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-6" />
                    <p className="text-white font-display text-lg animate-pulse">
                        {step === 'loading' ? 'Synthesizing Technical Constraints...' : 'Analyzing Response Patterns...'}
                    </p>
                </div>
            </div>
        );
    }

    if (step === 'questions') {
        const currentQ = questions[currentQuestion];
        const isLastQuestion = currentQuestion === questions.length - 1;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                <div className="bg-[#0D1528] border border-white/10 p-8 rounded-3xl max-w-3xl w-full shadow-2xl relative text-slate-300">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1 bg-indigo-500 transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>

                    <div className="flex justify-between items-center mb-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
                            Technical Probe {currentQuestion + 1}
                        </span>
                        <span className="text-slate-500 text-xs font-mono">Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                    </div>

                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-display font-bold text-white mb-6 leading-relaxed">
                            {currentQ.question}
                        </h3>
                        <textarea
                            value={answers[currentQ.id] || ''}
                            onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                            className="w-full bg-[#131E36]/50 border border-white/10 rounded-xl p-5 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all h-48 resize-none text-base leading-relaxed font-serif"
                            placeholder="Articulate your technical solution here..."
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className={`text-slate-400 hover:text-white px-4 py-2 font-semibold transition-colors flex items-center gap-2 text-sm ${currentQuestion === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {isLastQuestion ? (
                            <button
                                onClick={handleSubmit}
                                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-sm"
                            >
                                Finalize Submission
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                                className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                            >
                                Next Challenge
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {error && <p className="text-red-400 mt-4 text-center font-medium text-sm">{error}</p>}
                </div>
            </div>
        );
    }

    if (step === 'result' && evaluation) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                <div className="bg-[#0D1528] border border-white/10 p-8 rounded-3xl max-w-2xl w-full shadow-2xl text-center text-slate-300">
                    <div className="mb-8">
                        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-bold font-display mb-6 shadow-soft ${evaluation.is_suitable ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {evaluation.score}%
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">
                            {evaluation.is_suitable ? 'Calibration Successful' : 'Calibration Failed'}
                        </h2>
                        <p className="text-slate-400 font-serif text-sm">
                            {evaluation.is_suitable ? 'Manual review confirms technical alignment.' : 'Responses did not meet the required technical depth.'}
                        </p>
                    </div>

                    <div className="bg-[#131E36]/30 border border-white/5 p-6 rounded-2xl mb-8 text-left max-h-[30vh] overflow-y-auto">
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px] border-b border-white/5 pb-2">Analysis Report</h3>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-line font-serif text-sm">{evaluation.feedback}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg"
                    >
                        Close Protocol
                    </button>
                </div>
            </div>
        );
    }

    return null;
};
