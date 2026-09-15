import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/data/services";
import { 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  HelpCircle,
  Stethoscope,
  ArrowRight
} from "lucide-react";

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    id: service.id,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = SERVICES_DATA.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Minimal Header Nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-18 flex items-center justify-between">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Practice</span>
          </Link>

          <Link
            href={`/appointment?service=${service.id}`}
            className="bg-[#2B64EC] hover:bg-[#1e52d1] active:scale-[0.98] text-white font-medium text-xs sm:text-sm px-5 py-2 rounded-full transition-all shadow-sm"
          >
            Book This Treatment
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {/* Category & Title */}
        <div className="mb-10 pb-8 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider bg-blue-50 text-[#2B64EC] px-3 py-1 rounded-full border border-blue-100">
              {service.category}
            </span>
            {service.tag && (
              <span className="text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                {service.tag}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            {service.headline}
          </p>
        </div>

        {/* Minimal Metrics Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-100 text-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100/70 text-[#2B64EC] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">{service.duration}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Recovery</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">{service.recovery}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Comfort</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">{service.comfortLevel}</span>
            </div>
          </div>
        </div>

        {/* Treatment Overview */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Clinical Overview
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {service.overview}
          </p>
        </section>

        {/* Clinical Steps */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            How Treatment Works
          </h2>
          <div className="space-y-4">
            {service.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-slate-200/80 rounded-2xl flex items-start gap-4 hover:border-blue-200 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Key Patient Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-[#2B64EC] shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Doctor Note */}
        <section className="mb-12 p-6 bg-slate-900 text-white rounded-2xl shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm italic text-slate-200 leading-relaxed">
              &ldquo;{service.doctorNote}&rdquo;
            </p>
            <p className="text-xs text-blue-300 font-bold mt-2">
              Dr. Shelley Robinson (BDS, BCS, FCPS, MS)
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Common Questions
          </h2>
          <div className="space-y-4 border-t border-slate-100 pt-2">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-4">
                <h4 className="font-semibold text-slate-900 text-sm">{faq.q}</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Booking CTA */}
        <div className="p-8 bg-slate-50 border border-slate-200/80 rounded-3xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Ready to schedule your {service.title}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Direct one-on-one consultation with Dr. Shelley Robinson.
            </p>
          </div>

          <Link
            href={`/appointment?service=${service.id}`}
            className="bg-[#2B64EC] hover:bg-[#1e52d1] active:scale-[0.98] text-white font-medium text-sm px-7 py-3 rounded-full transition-all inline-flex items-center gap-2 shrink-0 shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
