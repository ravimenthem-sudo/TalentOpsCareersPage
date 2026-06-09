"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070C1A] border-t border-white/10 py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-xs font-extrabold text-white">
                TO
              </div>
              TalentOps
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI-powered hiring intelligence platform connecting top talent with forward-thinking companies.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/85 tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/jobs" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <span className="text-sm text-slate-500 cursor-not-allowed">
                  Resume Analyzer (Post-apply)
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-500 cursor-not-allowed">
                  Interview Sim (Post-apply)
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-500 cursor-not-allowed">
                  Offer Tracker
                </span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/85 tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/85 tracking-wider uppercase mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} TalentOps Inc. All rights reserved.
          </p>
          <div className="flex gap-3">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#4F46E5] hover:text-white hover:border-[#4F46E5] transition-all"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#4F46E5] hover:text-white hover:border-[#4F46E5] transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#4F46E5] hover:text-white hover:border-[#4F46E5] transition-all"
            >
              <Github className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
