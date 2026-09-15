import React from "react";
import Link from "next/link";
import { SERVICES_DATA } from "@/data/services";
import { ArrowLeft, ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";

export const metadata = {
  title: "Dental Services & Treatments — Smile Bright",
  description: "Explore all clinical dental treatments and specialized care offered by Dr. Shelley Robinson.",
};

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Minimal Header Nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-18 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Home</span>
          </Link>

          <Link
            href="/appointment"
            className="bg-[#2B64EC] hover:bg-[#1e52d1] active:scale-[0.98] text-white font-medium text-xs sm:text-sm px-5 py-2 rounded-full transition-all shadow-sm"
          >
            Book Appointment
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#2B64EC] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
            Treatments & Procedures
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Dental Care
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Every procedure is personally planned and performed by Dr. Shelley Robinson with unhurried clinical precision.
          </p>
        </div>

        {/* Minimalist Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group p-6 sm:p-7 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-[#2B64EC] transition-colors">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Minimalist Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Need diagnostic guidance?</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Consult Dr. Shelley Robinson to discuss the right treatment for your dental health.
            </p>
          </div>
          <Link
            href="/appointment"
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all inline-flex items-center gap-2 shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Consultation</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
