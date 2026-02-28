import React, { useState, useEffect } from 'react';
import { generateInterviewQuestions, evaluateInterviewAnswers } from '../../lib/analyzer/geminiService';
import { InterviewQuestion, InterviewEvaluation } from '../../lib/types';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Loader2, Play, AlertTriangle } from 'lucide-react';

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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md p-4 animate-fade-in">
                <div className="bg-white p-10 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden">
                    <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors">
                        <XCircle className="w-6 h-6" />
                    </button>

                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-display">Skill Validation Protocol</h2>

                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            <h3 className="text-yellow-700 font-bold uppercase tracking-wider text-xs">Protocol Advisory</h3>
                        </div>
                        <ul className="text-gray-700 text-lg list-disc pl-5 space-y-2 font-serif">
                            <li>Provide authentic responses based on intrinsic knowledge.</li>
                            <li>Automated pattern detection is active for AI-generated content.</li>
                            <li className="text-red-600 font-medium">Candidates detected using external AI assistance will be blacklisted.</li>
                            <li>This is your opportunity to override the algorithmic rejection.</li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={startInterview}
                            className="flex-1 bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-medium shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <Play className="w-5 h-5" />
                            Acknowledge & Begin Assessment
                        </button>
                        <button
                            onClick={onClose}
                            className="px-8 py-4 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                        >
                            Withdraw
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
                </div>
            </div>
        );
    }

    if (step === 'loading' || step === 'evaluating') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-xl">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
                    <p className="text-gray-900 font-display text-xl animate-pulse">
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md p-4">
                <div className="bg-white p-10 rounded-3xl max-w-3xl w-full shadow-2xl relative">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1.5 bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>

                    <div className="flex justify-between items-center mb-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-mono font-bold uppercase tracking-wider">
                            Technical Probe {currentQuestion + 1}
                        </span>
                        <span className="text-gray-400 text-sm font-mono">Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                    </div>

                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-2xl font-display font-medium text-gray-900 mb-6 leading-tight">
                            {currentQ.question}
                        </h3>
                        <textarea
                            value={answers[currentQ.id] || ''}
                            onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all h-48 resize-none text-lg leading-relaxed shadow-inner font-serif"
                            placeholder="Articulate your technical solution here..."
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className={`text-gray-500 hover:text-gray-900 px-4 py-2 font-medium transition-colors flex items-center gap-2 ${currentQuestion === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {isLastQuestion ? (
                            <button
                                onClick={handleSubmit}
                                className="bg-black hover:bg-green-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                            >
                                Finalize Submission
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                Next Challenge
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
                </div>
            </div>
        );
    }

    if (step === 'result' && evaluation) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md p-4">
                <div className="bg-white p-10 rounded-3xl max-w-2xl w-full shadow-2xl text-center">
                    <div className="mb-8">
                        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-bold font-display mb-6 shadow-soft ${evaluation.is_suitable ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                            {evaluation.score}%
                        </div>
                        <h2 className="text-4xl font-display font-medium text-gray-900 mb-2">
                            {evaluation.is_suitable ? 'Calibration Successful' : 'Calibration Failed'}
                        </h2>
                        <p className="text-gray-500 font-serif text-lg">
                            {evaluation.is_suitable ? 'Manual review confirms technical alignment.' : 'Responses did not meet the required technical depth.'}
                        </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl mb-8 text-left">
                        <h3 className="text-gray-900 font-bold mb-4 uppercase tracking-wider text-xs border-b border-gray-200 pb-2">Analysis Report</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line font-serif text-lg">{evaluation.feedback}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-medium transition-all shadow-lg"
                    >
                        Close Protocol
                    </button>
                </div>
            </div>
        );
    }

    return null;
};
