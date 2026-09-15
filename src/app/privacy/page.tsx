import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Smile Bright Dental Practice",
  description: "Patient data confidentiality and medical record privacy standards.",
};

export default function PrivacyPage() {
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
          Privacy & Medical Records Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-10 pb-6 border-b border-slate-100">
          Last updated: September 2026 • BMDC Standard Healthcare Compliance
        </p>

        <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Patient Confidentiality</h2>
            <p>
              At Smile Bright Dental Practice, led by Dr. Shelley Robinson, patient health records, diagnostic radiographs, 3D intraoral scans, and consultation notes are strictly confidential and encrypted under medical data protection regulations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Information We Collect</h2>
            <p>
              When scheduling an appointment or consulting online, we collect basic contact information (name, phone number, email address) and clinical history to prepare your treatment roadmap.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Zero Third-Party Sharing</h2>
            <p>
              We never share, sell, or disclose your personal details or dental records to third-party advertisers or commercial entities.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Contact & Inquiries</h2>
            <p>
              For questions regarding medical privacy or record transfer, please contact our clinic team directly at <strong className="text-slate-800">care@smilebrightdental.com</strong>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
