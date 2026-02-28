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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
                <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Application Sent!</h3>
                    <p className="mt-2 text-gray-600">
                        Thanks for applying to <strong>{jobTitle}</strong>. We've received your application and will be in touch soon.
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-8 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    // Common input styles
    const inputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 border p-2.5";
    const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
    const sectionTitleClass = "text-lg font-bold text-gray-900 border-b pb-2 mb-4 mt-8";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-5xl rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200 my-8 h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 flex-shrink-0">
                    <h3 className="text-xl font-bold text-gray-900">Registration Form</h3>
                    <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-8 flex-1">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="rounded-md bg-red-50 p-4 mb-6">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">Submission Failed</h3>
                                        <div className="mt-2 text-sm text-red-700"><p>{error}</p></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Job Details */}
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Job Details</h4>
                            <div>
                                <label className={labelClass}>Job Role *</label>
                                <input type="text" value={jobTitle} disabled className={`${inputClass} bg-gray-100 cursor-not-allowed`} />
                                <p className="text-xs text-blue-600 mt-1 cursor-pointer font-medium">View Job Description</p>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div>
                            <h4 className={sectionTitleClass}>Personal Details</h4>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <label className={labelClass}>First Name *</label>
                                    <input type="text" name="firstName" required className={inputClass} placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                                    <p className="text-xs text-gray-500 mt-1">Name should be exactly as per PAN Only</p>
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
                                    <p className="text-xs text-gray-500 mt-1">Note that no changes will be allowed after submission</p>
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
                                <div className="flex items-center mt-2 p-3 border rounded-md bg-gray-50">
                                    <input type="checkbox" name="whatsappConsent" id="whatsapp" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={formData.whatsappConsent} onChange={handleChange} />
                                    <label htmlFor="whatsapp" className="ml-2 block text-sm text-gray-900">I consent to receive communication via WhatsApp</label>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className={labelClass}>Gender *</label>
                                <div className="flex gap-6 mt-2">
                                    <label className="flex items-center"><input type="radio" name="gender" value="Male" className="mr-2" onChange={handleChange} /> Male</label>
                                    <label className="flex items-center"><input type="radio" name="gender" value="Female" className="mr-2" onChange={handleChange} /> Female</label>
                                    <label className="flex items-center"><input type="radio" name="gender" value="Other" className="mr-2" onChange={handleChange} /> Other</label>
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
                                    <label className={labelClass}>Resume/CV *<span className="text-xs font-normal text-gray-500 ml-1">(Supported Format: doc/docx/pdf; Max size: 1 MB)</span></label>
                                    <div className="flex gap-2">
                                        <input type="file" required accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'resume')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                    </div>
                                    {formData.resume && <p className="text-sm text-green-600 mt-1">Uploaded: {formData.resume.name}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Passport size photograph *<span className="text-xs font-normal text-gray-500 ml-1">(Supported Format: jpg, jpeg, png; Max size: 3 MB)</span></label>
                                    <div className="flex gap-2">
                                        <input type="file" required accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                    </div>
                                    {formData.photo && <p className="text-sm text-green-600 mt-1">Uploaded: {formData.photo.name}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Declaration & Consent */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
                            <h4 className="font-bold text-gray-900 mb-4">Declaration & Consent</h4>
                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                                Note: In case of any queries regarding Registration form filling, please click here for Chat / call support.
                                Data Privacy: Accenture is committed to protecting your personal information. Your information will be collected...
                            </p>

                            <div className="flex items-start gap-3 mt-4">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="agree"
                                        name="agree"
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="agree" className="font-medium text-gray-900">
                                        I Agree
                                    </label>
                                    <p className="text-gray-500 text-xs mt-1">
                                        I hereby solemnly declare and affirm that the information shared by me...
                                    </p>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-gray-100 px-6 py-4 flex justify-end gap-3 flex-shrink-0 bg-gray-50 rounded-b-xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}
