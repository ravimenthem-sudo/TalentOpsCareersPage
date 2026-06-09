"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Database, FileText, Globe, MessageSquare, Play, Sparkles, TrendingUp, Users } from "lucide-react";
import { ParticleNetwork } from "@/components/layout/ParticleNetwork";

export default function LandingPage() {
  return (
    <div className="bg-[#070C1A] text-white min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden text-center">
        {/* Canvas Particle Background */}
        <ParticleNetwork />
        
        {/* Glowing Radial Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(79,70,229,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-8 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-dot" />
            AI-Powered Hiring Intelligence Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 font-display">
            Build the <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">future of hiring</span> <br />
            with <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">TalentOps</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Where great careers begin. Get instant AI resume analysis, simulate real technical interviews, and join companies that are redefining what work looks like.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 w-full max-w-md">
            <Link
              href="/jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(79,70,229,0.3),0_4px_24px_rgba(79,70,229,0.25)] hover:shadow-[0_0_0_1px_rgba(79,70,229,0.4),0_8px_32px_rgba(79,70,229,0.35)]"
            >
              Explore Open Roles
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-white/10 hover:border-white/25 hover:bg-white/5 text-slate-200 font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              How It Works
            </Link>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y-0 divide-x-0 md:divide-x divide-white/10 w-full max-w-5xl border-t border-white/10 pt-10">
            <div className="flex flex-col items-center justify-center px-4">
              <span className="text-3xl md:text-4xl font-bold font-display text-white">
                2.<span className="text-cyan-400">4k</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-500 mt-1.5">
                Active Roles
              </span>
            </div>
            <div className="flex flex-col items-center justify-center px-4">
              <span className="text-3xl md:text-4xl font-bold font-display text-white">
                98<span className="text-cyan-400">%</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-500 mt-1.5">
                Match Accuracy
              </span>
            </div>
            <div className="flex flex-col items-center justify-center px-4">
              <span className="text-3xl md:text-4xl font-bold font-display text-white">
                48<span className="text-cyan-400">hr</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-500 mt-1.5">
                Avg. Response
              </span>
            </div>
            <div className="flex flex-col items-center justify-center px-4">
              <span className="text-3xl md:text-4xl font-bold font-display text-white">
                120<span className="text-cyan-400">+</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-500 mt-1.5">
                Partner Companies
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR / MARQUEE */}
      <div className="border-y border-white/5 py-6 bg-white/[0.01] relative overflow-hidden flex flex-col items-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">
          Trusted by teams at
        </p>
        <div className="flex w-full max-w-7xl overflow-hidden relative">
          {/* Gradient fade borders */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070C1A] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070C1A] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-16 whitespace-nowrap animate-marquee">
            {[
              "Stripe", "Notion", "Figma", "Linear", "Vercel", "Anthropic", "OpenAI", "Databricks", "Confluent", "Snowflake",
              "Stripe", "Notion", "Figma", "Linear", "Vercel", "Anthropic", "OpenAI", "Databricks", "Confluent", "Snowflake"
            ].map((company, index) => (
              <span key={index} className="flex items-center gap-2 font-display text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BENTO GRID FEATURES SECTION */}
      <section className="py-24 px-6 lg:px-8 bg-[#0D1528] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-4">
              Everything you need to land the right role
            </h2>
            <p className="text-slate-400 leading-relaxed">
              From smart resume scanning to live interview simulations — our AI-powered pipeline gives you the edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Card A: ATS Analyzer */}
            <div className="md:col-span-7 bg-[#0D1528]/80 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 mb-6">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                AI Resume Analyzer
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Instant ATS scoring powered by Gemini 2.5 Flash. Know exactly how your resume stacks up against any job description before you hit submit.
              </p>
              
              {/* ATS Preview Simulation */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3.5">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
                    <span>Keyword Match</span>
                    <span className="text-white">87%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-500" style={{ width: '87%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
                    <span>Skills Match</span>
                    <span className="text-white">74%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500" style={{ width: '74%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
                    <span>Formatting</span>
                    <span className="text-white">92%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-indigo-500/10 blur-xl group-hover:bg-indigo-500/15 transition-all duration-300" />
            </div>

            {/* Card B: Interview Sim */}
            <div className="md:col-span-5 bg-[#0D1528]/80 border border-white/5 hover:border-cyan-500/30 rounded-2xl p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Live Interview Simulation
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                10 tailored technical questions. AI-evaluated answers. Real feedback before the real thing.
              </p>
              
              {/* Interview dialogue simulation */}
              <div className="space-y-3.5">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl rounded-bl-sm text-xs text-slate-300 leading-relaxed max-w-[90%]">
                  What's your approach to designing scalable APIs?
                </div>
                <div className="p-3 bg-cyan-500/5 border border-cyan-500/15 rounded-2xl rounded-br-sm text-xs text-slate-300 leading-relaxed max-w-[90%] ml-auto">
                  I start with clear contracts, REST principles, and proper pagination...
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/15 transition-all duration-300" />
            </div>

            {/* Card C: One-click Apply */}
            <div className="md:col-span-4 bg-[#0D1528]/80 border border-white/5 hover:border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                One-click Apply
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Upload your resume once. Apply to hundreds of roles instantly with your saved profile.
              </p>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-all duration-300" />
            </div>

            {/* Card D: Smart Matching */}
            <div className="md:col-span-4 bg-[#0D1528]/80 border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Smart Role Matching
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                AI suggests the top 3 roles you're best suited for based on your skills, experience, and career trajectory.
              </p>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-amber-500/5 blur-xl group-hover:bg-amber-500/10 transition-all duration-300" />
            </div>

            {/* Card E: Application Tracking */}
            <div className="md:col-span-4 bg-[#0D1528]/80 border border-white/5 hover:border-pink-500/30 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Real-time Tracking
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Follow your application through every stage — Applied, Interview, Offer — with live updates.
              </p>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-pink-500/5 blur-xl group-hover:bg-pink-500/10 transition-all duration-300" />
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how" className="py-24 px-6 lg:px-8 bg-[#070C1A] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-4">
              From application to offer in 4 steps
            </h2>
            <p className="text-slate-400">
              Our automated, transparent pipeline removes guesswork from job hunting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 01 */}
            <div className="bg-[#0D1528]/50 border border-white/5 hover:border-white/10 rounded-2xl p-6 relative transition-all duration-200">
              <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-4">
                Step 01
              </div>
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-base font-bold text-white mb-2">
                Browse & Apply
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Find a role that fits. Fill out a quick application form and upload your resume — PDF, DOCX, or image.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-[#0D1528]/50 border border-white/5 hover:border-white/10 rounded-2xl p-6 relative transition-all duration-200">
              <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-4">
                Step 02
              </div>
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-base font-bold text-white mb-2">
                AI Analyzes Resume
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gemini 2.5 Flash scores your resume instantly — keywords, skills, and formatting against the exact job description.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-[#0D1528]/50 border border-white/5 hover:border-white/10 rounded-2xl p-6 relative transition-all duration-200">
              <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-4">
                Step 03
              </div>
              <div className="text-3xl mb-4">🎤</div>
              <h3 className="text-base font-bold text-white mb-2">
                Simulate the Interview
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Optionally take a 10-question AI interview. Get a pass/fail score and written feedback on every answer.
              </p>
            </div>

            {/* Step 04 */}
            <div className="bg-[#0D1528]/50 border border-white/5 hover:border-white/10 rounded-2xl p-6 relative transition-all duration-200">
              <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-4">
                Step 04
              </div>
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-base font-bold text-white mb-2">
                Track Application
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow your progress in real-time — from applied to offer. The recruiter sees your AI-verified score.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 to-cyan-500/10 pointer-events-none" />
        <div className="absolute left-[-200px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 inline-block">
            Ready to Start?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight">
            Your next role is <br />
            <span className="text-indigo-400">one application</span> away
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto leading-relaxed mb-10">
            Join thousands of candidates who've used TalentOps to land their dream job with AI-backed confidence.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(79,70,229,0.3),0_4px_24px_rgba(79,70,229,0.25)]"
          >
            Browse All Openings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
