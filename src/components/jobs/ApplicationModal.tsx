"use client";

import { useState } from "react";
import { X, Upload, CheckCircle, HelpCircle } from "lucide-react";

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    jobTitle: string;
}

export function ApplicationModal({ isOpen, onClose, onSubmit, jobTitle }: ApplicationModalProps) {
    const [formData, setFormData] = useState({
        // Personal Details
        firstName: "",
        middleName: "",
        lastName: "",
        universityRegNo: "",
        email: "",
        primaryContact: "",
        whatsappConsent: false,
        alternateMobile: "",
        dob: "",
        residingStateCity: "",
        gender: "",

        // Address Details
        currentAddressLine1: "",
        currentPincode: "",
        currentCity: "",
        currentState: "",
        currentCountry: "",
        permanentAddressLine1: "",
        permanentPincode: "",
        permanentCity: "",
        permanentState: "",
        permanentCountry: "",

        // Education
        highestEducationType: "",
        educationMode: "",
        educationGap: "",

        // Professional
        totalExperience: "",
        latestCompany: "",

        // Skills
        primarySkill: "",
        secondarySkill: "",

        // Certifications
        certification1: "",
        certification2: "",

        // Languages & PLM
        foreignLanguage: "",
        foreignLanguageWait: "",
        foreignLanguageSecond: "",
        plm: "",

        // Locations
        prefLocation1: "",
        prefLocation2: "",
        prefLocation3: "",

        // Other
        degreeCompletion: "",
        standingBacklog: "",
        previousAccenture: "",
        recentAssessment: "",
        nationality: "",

        // Exam
        finalYearExam: "",

        // Attachments
        resume: null as File | null,
        photo: null as File | null,

        // ID & Disability
        govIdType: "",
        disability: "",

        // Consent
        agree: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Helper for input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        // Type assertion for checkbox since value doesn't capture it
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'photo') => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, [field]: e.target.files![0] }));
        }
    };

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agree) {
            setError("You must agree to the declaration to proceed.");
            return;
        }

        setError(null);
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            setIsSuccess(true);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-md rounded-2xl bg-[#0D1528] border border-white/10 p-8 text-center shadow-2xl shadow-black/50 animate-in fade-in zoom-in duration-200 text-white">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white">Application Sent!</h3>
                    <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                        Thanks for applying to <strong>{jobTitle}</strong>. We've received your application and will be in touch soon.
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-4 py-3 text-sm font-semibold text-white transition-all transform hover:-translate-y-0.5"
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    // Common input styles
    const inputClass = "mt-1 block w-full rounded-lg border border-white/10 bg-[#131E36]/50 p-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors";
    const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5";
    const sectionTitleClass = "text-base font-bold text-white border-b border-white/5 pb-2 mb-6 mt-10";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-5xl rounded-2xl bg-[#0D1528] border border-white/10 shadow-2xl shadow-black/50 animate-in fade-in zoom-in duration-200 my-8 h-[90vh] flex flex-col text-slate-300">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 flex-shrink-0">
                    <h3 className="text-xl font-bold text-white font-display">Registration Form</h3>
                    <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-8 flex-1">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 mb-6 text-red-300">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-bold">Submission Failed</h3>
                                        <div className="mt-2 text-xs text-red-400"><p>{error}</p></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Job Details */}
                        <div>
                            <h4 className="text-base font-bold text-white border-b border-white/5 pb-2 mb-6">Job Details</h4>
                            <div>
                                <label className={labelClass}>Job Role *</label>
                                <input type="text" value={jobTitle} disabled className={`${inputClass} opacity-50 bg-[#131E36]/30 cursor-not-allowed`} />
                                <p className="text-xs text-cyan-400 hover:text-cyan-300 mt-1.5 cursor-pointer font-medium transition-colors">View Job Description</p>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div>
                            <h4 className={sectionTitleClass}>Personal Details</h4>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <label className={labelClass}>First Name *</label>
                                    <input type="text" name="firstName" required className={inputClass} placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                                    <p className="text-xs text-slate-400 mt-1">Name should be exactly as per PAN Only</p>
                                </div>
                                <div>
                                    <label className={labelClass}>Middle Name</label>
                                    <input type="text" name="middleName" className={inputClass} placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClass}>Last Name *</label>
                                    <input type="text" name="lastName" required className={inputClass} placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
                                <div>
                                    <label className={labelClass}>University Registration No. *</label>
                                    <input type="text" name="universityRegNo" required className={inputClass} placeholder="Registration No." value={formData.universityRegNo} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClass}>Email Id *</label>
                                    <input type="email" name="email" required className={inputClass} placeholder="Email Id" value={formData.email} onChange={handleChange} />
                                    <p className="text-xs text-slate-400 mt-1">Note that no changes will be allowed after submission</p>
                                </div>
                                <div>
                                    <label className={labelClass}>Primary Contact Number *</label>
                                    <input type="tel" name="primaryContact" required className={inputClass} placeholder="Contact Number" value={formData.primaryContact} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClass}>Alternate Mobile Number</label>
                                    <input type="tel" name="alternateMobile" className={inputClass} placeholder="Alternate Number" value={formData.alternateMobile} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClass}>Date Of Birth *</label>
                                    <input type="date" name="dob" required className={inputClass} value={formData.dob} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClass}>Residing State-City *</label>
                                    <input type="text" name="residingStateCity" required className={inputClass} placeholder="e.g. Maharashtra - Mumbai" value={formData.residingStateCity} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className={labelClass}>WhatsApp Consent *</label>
                                <div className="flex items-center mt-2 p-3 border border-white/5 rounded-lg bg-[#131E36]/30">
                                    <input type="checkbox" name="whatsappConsent" id="whatsapp" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500/50 border-white/10 rounded" checked={formData.whatsappConsent} onChange={handleChange} />
                                    <label htmlFor="whatsapp" className="ml-2 block text-sm text-slate-300">I consent to receive communication via WhatsApp</label>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className={labelClass}>Gender *</label>
                                <div className="flex gap-6 mt-2">
                                    <label className="flex items-center text-slate-300"><input type="radio" name="gender" value="Male" className="mr-2 accent-indigo-500" onChange={handleChange} /> Male</label>
                                    <label className="flex items-center text-slate-300"><input type="radio" name="gender" value="Female" className="mr-2 accent-indigo-500" onChange={handleChange} /> Female</label>
                                    <label className="flex items-center text-slate-300"><input type="radio" name="gender" value="Other" className="mr-2 accent-indigo-500" onChange={handleChange} /> Other</label>
                                </div>
                            </div>
                        </div>

                        {/* Address Details */}
                        <div>
                            <h4 className={sectionTitleClass}>Address Details</h4>
                            <h5 className="font-semibold text-gray-900 mb-3">Current Address *</h5>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className={labelClass}>Address Line 1 *</label>
                                    <input type="text" name="currentAddressLine1" required className={inputClass} value={formData.currentAddressLine1} onChange={handleChange} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Pincode *</label>
                                        <input type="text" name="currentPincode" required className={inputClass} value={formData.currentPincode} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>City *</label>
                                        <input type="text" name="currentCity" required className={inputClass} value={formData.currentCity} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>State *</label>
                                        <input type="text" name="currentState" required className={inputClass} value={formData.currentState} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Country *</label>
                                        <input type="text" name="currentCountry" required className={inputClass} value={formData.currentCountry} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <h5 className="font-semibold text-gray-900 mt-6 mb-3">Permanent Address *</h5>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className={labelClass}>Address Line 1 *</label>
                                    <input type="text" name="permanentAddressLine1" required className={inputClass} value={formData.permanentAddressLine1} onChange={handleChange} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Pincode *</label>
                                        <input type="text" name="permanentPincode" required className={inputClass} value={formData.permanentPincode} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>City *</label>
                                        <input type="text" name="permanentCity" required className={inputClass} value={formData.permanentCity} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>State *</label>
                                        <input type="text" name="permanentState" required className={inputClass} value={formData.permanentState} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Country *</label>
                                        <input type="text" name="permanentCountry" required className={inputClass} value={formData.permanentCountry} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Educational Details */}
                        <div>
                            <h4 className={sectionTitleClass}>Educational Details</h4>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Highest Education Profile *</label>
                                    <select name="highestEducationType" required className={inputClass} value={formData.highestEducationType} onChange={handleChange}>
                                        <option value="">-- Select --</option>
                                        <option value="BE/BTech">BE/BTech</option>
                                        <option value="MCA">MCA</option>
                                        <option value="ME/MTech">ME/MTech</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Mode of Education *</label>
                                    <select name="educationMode" required className={inputClass} value={formData.educationMode} onChange={handleChange}>
                                        <option value="">-- Select --</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className={labelClass}>Gap In Education *</label>
                                    <input type="text" name="educationGap" placeholder="e.g., 0 years" required className={inputClass} value={formData.educationGap} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Professional & Work Experience */}
                        <div>
                            <h4 className={sectionTitleClass}>Professional Details</h4>
                            <div>
                                <label className={labelClass}>Total Professional Experience (Excluding Internships) *</label>
                                <input type="text" name="totalExperience" required className={inputClass} value={formData.totalExperience} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <h4 className={sectionTitleClass}>Work Experience</h4>
                            <div>
                                <label className={labelClass}>Latest Work Profile (Company)</label>
                                <input type="text" name="latestCompany" className={inputClass} placeholder="Company Name" value={formData.latestCompany} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Skills & Certifications */}
                        <div>
                            <h4 className={sectionTitleClass}>Skill Details</h4>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Primary Skill</label>
                                    <input type="text" name="primarySkill" className={inputClass} value={formData.primarySkill} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClass}>Secondary Skill</label>
                                    <select name="secondarySkill" className={inputClass} value={formData.secondarySkill} onChange={handleChange}>
                                        <option value="">-- Select --</option>
                                        <option value="Java">Java</option>
                                        <option value="Python">Python</option>
                                        <option value="React">React</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className={sectionTitleClass}>Certification Details</h4>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Certification 1 Name</label>
                                    <select name="certification1" className={inputClass} value={formData.certification1} onChange={handleChange}>
                                        <option value="">-- Select --</option>
                                        <option value="AWS">AWS Certified</option>
                                        <option value="Azure">Azure Certified</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Certification 2 Name</label>
                                    <select name="certification2" className={inputClass} value={formData.certification2} onChange={handleChange}>
                                        <option value="">-- Select --</option>
                                        <option value="GCP">GCP Certified</option>
                                        <option value="PMP">PMP</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Attachments */}
                        <div>
                            <h4 className={sectionTitleClass}>Attachments</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Resume/CV *<span className="text-xs font-normal text-slate-400 ml-1">(Supported Format: doc/docx/pdf; Max size: 1 MB)</span></label>
                                    <div className="flex gap-2">
                                        <input type="file" required accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'resume')} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-300 hover:file:bg-indigo-500/20" />
                                    </div>
                                    {formData.resume && <p className="text-sm text-emerald-400 font-semibold mt-1">Uploaded: {formData.resume.name}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Passport size photograph *<span className="text-xs font-normal text-slate-400 ml-1">(Supported Format: jpg, jpeg, png; Max size: 3 MB)</span></label>
                                    <div className="flex gap-2">
                                        <input type="file" required accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-300 hover:file:bg-indigo-500/20" />
                                    </div>
                                    {formData.photo && <p className="text-sm text-emerald-400 font-semibold mt-1">Uploaded: {formData.photo.name}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Declaration & Consent */}
                        <div className="bg-[#131E36]/30 p-6 rounded-xl border border-white/5 mt-8">
                            <h4 className="font-bold text-white mb-4">Declaration & Consent</h4>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                Note: In case of any queries regarding Registration form filling, please click here for Chat / call support.
                                Data Privacy: Accenture is committed to protecting your personal information. Your information will be collected...
                            </p>

                            <div className="flex items-start gap-3 mt-4">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="agree"
                                        name="agree"
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-white/10 text-indigo-600 focus:ring-indigo-500/50 bg-[#131E36]/50"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="agree" className="font-semibold text-white">
                                        I Agree
                                    </label>
                                    <p className="text-slate-500 text-xs mt-1">
                                        I hereby solemnly declare and affirm that the information shared by me...
                                    </p>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-white/5 px-6 py-4 flex justify-end gap-3 flex-shrink-0 bg-[#131E36]/30 rounded-b-2xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 bg-transparent border border-white/10 text-slate-300 hover:bg-white/5 rounded-xl text-sm font-semibold transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_8px_32px_rgba(79,70,229,0.35)] transform hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-200"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}
