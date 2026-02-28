"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Globe, Users, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              We are hiring! <Link href="/jobs" className="font-semibold text-blue-600"><span className="absolute inset-0" aria-hidden="true" />View open roles <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Build the future of hiring with TalentOps
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join a team of passionate individuals dedicated to transforming how companies find and hire talent. We value impact, wellness, and continuous growth.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/jobs"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              See Open Positions
            </Link>
            <Link href="#values" className="text-sm font-semibold leading-6 text-gray-900">
              Our Values <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>



      {/* CTA Section */}
      <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ready to join use?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Check out our open roles and see if there is a match. We can't wait to meet you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/jobs"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              View Open Roles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
