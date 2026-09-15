import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Care — Smile Bright Dental Practice",
  description: "Clinical guidelines, consultation standards, and appointment policies.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 h-18 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Practice</span>
          </Link>
          <span className="text-xs font-semibold text-slate-400">Dr. Shelley Robinson</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Terms of Clinical Care
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-10 pb-6 border-b border-slate-100">
          Last updated: September 2026 • Private Solo Practice Protocols
        </p>

        <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Dedicated Solo Practitioner Care</h2>
            <p>
              All consultations, diagnosis, treatment roadmaps, surgical implantations, and cosmetic procedures are personally performed by Dr. Shelley Robinson (BDS, BCS, FCPS, MS) without delegation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Transparent Treatment Roadmaps</h2>
            <p>
              Prior to initiating any treatment, patients receive a clear explanation of clinical findings, expected timeline, and fixed transparent pricing with zero surprise charges.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Cancellation & Rescheduling Courtesy</h2>
            <p>
              We request at least 2 hours advance notice for cancellations so emergency triage patients can utilize the open chamber slot.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Emergency Dental Triage</h2>
            <p>
              Same-day priority appointments are reserved for acute swelling, broken restorations, and dental trauma.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
