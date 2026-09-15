"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Heart,
  Calendar,
  Send,
  Sparkles
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Consultation Banner Entrance
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Footer Columns Stagger Entrance
      if (gridRef.current) {
        const cols = gridRef.current.children;
        gsap.fromTo(
          cols,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[#f8fafc] text-slate-600 relative overflow-hidden border-t border-slate-200/80">
      {/* Background Soft Dot Matrix Graphics */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 10%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 10%, transparent 80%)",
        }}
      />

      {/* Soft Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-sky-100/60 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-12 relative z-10">
        
        {/* Top Appointment / Consultation Banner (Light Theme) */}
        <div
          ref={bannerRef}
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 mb-16 shadow-xl shadow-slate-200/60 flex flex-col lg:flex-row items-center justify-between gap-6 hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2B64EC] shrink-0 shadow-inner">
              <Calendar className="w-6 h-6 text-[#2B64EC]" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#2B64EC] uppercase flex items-center gap-1.5 justify-center sm:justify-start">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Specialist Consultation
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Book Your Visit Today
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-4 py-2.5 rounded-full border border-slate-200 shadow-2xs">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Sat – Thu: 4:00 PM – 9:30 PM</span>
            </div>
            <Link
              href="#schedule"
              className="bg-[#2B64EC] hover:bg-[#1e52d1] active:scale-[0.98] text-white font-medium text-sm px-7 py-3 rounded-full transition-all duration-200 shadow-md shadow-blue-500/25 inline-flex items-center gap-2 hover:shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-200">
          
          {/* Column 1: Brand & Doctor Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1d4ed8] to-[#3b82f6] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 3.1 1.77 5.8 4.38 7.15.42.22.62.71.47 1.16l-.72 2.16c-.23.69.44 1.34 1.11 1.08l2.28-.88c.45-.17.96-.06 1.3.28C13.88 22.01 15 22.5 16 22.5c4.42 0 8-3.58 8-8s-3.58-8-8-8c-.68 0-1.34.09-1.97.25C13.43 3.32 12.74 2 12 2zm4 4.5c2.48 0 4.5 2.02 4.5 4.5s-2.02 4.5-4.5 4.5-4.5-2.02-4.5-4.5 2.02-4.5 4.5-4.5z" />
                </svg>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Smile Bright
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed font-normal">
              Specialized clinical dental practice led by <strong className="text-slate-800 font-semibold">Dr. Shelley Robinson</strong> (BDS, BCS, FCPS, MS). Committed to gentle, precision dentistry with state-of-the-art diagnostic technology.
            </p>

            <div className="flex items-center gap-3 text-xs pt-1">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full text-emerald-700 font-medium shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                BMDC Registered Specialist
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#about" className="text-slate-500 hover:text-[#2B64EC] transition-colors">
                  About Dr. Shelley
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-500 hover:text-[#2B64EC] transition-colors">
                  Dental Treatments
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-slate-500 hover:text-[#2B64EC] transition-colors">
                  Clinical Gallery
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="text-slate-500 hover:text-[#2B64EC] transition-colors">
                  Patient Reviews
                </Link>
              </li>
              <li>
                <Link href="#schedule" className="text-slate-500 hover:text-[#2B64EC] transition-colors">
                  Schedule Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Treatments (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
              Key Treatments
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-500 hover:text-[#2B64EC] transition-colors flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-[#2B64EC]" /> Dental Implants & Crowns
              </li>
              <li className="text-slate-500 hover:text-[#2B64EC] transition-colors flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-[#2B64EC]" /> Laser Teeth Whitening
              </li>
              <li className="text-slate-500 hover:text-[#2B64EC] transition-colors flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-[#2B64EC]" /> Painless Root Canal
              </li>
              <li className="text-slate-500 hover:text-[#2B64EC] transition-colors flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-[#2B64EC]" /> Invisalign & Aligners
              </li>
              <li className="text-slate-500 hover:text-[#2B64EC] transition-colors flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-[#2B64EC]" /> Pediatric Dental Care
              </li>
            </ul>
          </div>

          {/* Column 4: Chamber & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
              Chamber Location
            </h4>
            <div className="space-y-3 text-sm text-slate-500">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2B64EC] shrink-0 mt-0.5" />
                <span>Suite 402, MediCare Complex, Dhaka Medical College Area, Dhaka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2B64EC] shrink-0" />
                <span>care@smilebrightdental.com</span>
              </div>
            </div>

            {/* Dental Tips Newsletter */}
            <div className="pt-2">
              <p className="text-xs text-slate-700 font-semibold mb-2">
                Get monthly oral health & smile tips:
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2B64EC] focus:ring-2 focus:ring-blue-500/10 transition-all shadow-xs"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-[#2B64EC] hover:bg-[#1e52d1] active:scale-[0.96] text-white p-2.5 rounded-full shrink-0 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Smile Bright Dental Practice. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-slate-800 transition-colors">
              Terms of Care
            </Link>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" /> for healthy smiles
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
