"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Phone, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";

const NAV_LINKS = [
  {
    idx: "01",
    label: "About Dr. Shelley",
    sub: "Qualifications & solo practice philosophy",
    href: "/#about",
  },
  {
    idx: "02",
    label: "Dental Treatments",
    sub: "All procedures, timelines & comfort guides",
    href: "/services",
  },
  {
    idx: "03",
    label: "Clinical Gallery",
    sub: "Before & after surgical smile cases",
    href: "/#gallery",
  },
  {
    idx: "04",
    label: "Patient Reviews",
    sub: "450+ verified 5.0 Google ratings",
    href: "/#reviews",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Header entrance animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Mobile menu entrance stagger animation
  useEffect(() => {
    if (mobileMenuOpen) {
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power2.out" }
        );
      }
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );

        const items = mobileMenuRef.current.querySelectorAll(".mobile-nav-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out", delay: 0.05 }
        );
      }
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-1"
            : "bg-white/80 backdrop-blur-xs border-b border-slate-100 py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between transition-all duration-300">
          {/* Brand Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#1d4ed8] to-[#3b82f6] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C7.58 2 4 5.58 4 10c0 3.1 1.77 5.8 4.38 7.15.42.22.62.71.47 1.16l-.72 2.16c-.23.69.44 1.34 1.11 1.08l2.28-.88c.45-.17.96-.06 1.3.28C13.88 22.01 15 22.5 16 22.5c4.42 0 8-3.58 8-8s-3.58-8-8-8c-.68 0-1.34.09-1.97.25C13.43 3.32 12.74 2 12 2zm4 4.5c2.48 0 4.5 2.02 4.5 4.5s-2.02 4.5-4.5 4.5-4.5-2.02-4.5-4.5 2.02-4.5 4.5-4.5z" />
              </svg>
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                Smile Bright
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 hidden sm:block">
                Dental Clinic & Surgery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50/90 p-1.5 rounded-full border border-slate-200/80 shadow-2xs">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-slate-600 hover:text-[#2B64EC] hover:bg-white px-4 py-1.5 rounded-full transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/appointment"
              className="bg-[#2B64EC] hover:bg-[#1f52cf] active:scale-[0.98] text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm shadow-blue-500/20 inline-flex items-center gap-2 hover:shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>
          </div>

          {/* Sleek Animated Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200/80 active:scale-95 flex items-center justify-center transition-all duration-200 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            <div className="w-4 h-3.5 relative flex flex-col justify-between items-center">
              <span
                className={`w-4 h-[2px] bg-slate-900 rounded-full transition-all duration-300 transform origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`w-4 h-[2px] bg-slate-900 rounded-full transition-all duration-200 ${
                  mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`w-4 h-[2px] bg-slate-900 rounded-full transition-all duration-300 transform origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[5.5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Modern Slide-Down Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40">
          {/* Blurred Backdrop */}
          <div
            ref={backdropRef}
            onClick={closeMenu}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
          />

          {/* Drawer Sheet Card */}
          <div
            ref={mobileMenuRef}
            className="relative bg-white border-b border-slate-200/90 shadow-2xl rounded-b-3xl max-h-[calc(100vh-80px)] overflow-y-auto px-5 pt-4 pb-6 flex flex-col justify-between"
          >
            {/* Top Practice Pill */}
            <div className="mobile-nav-item flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Dr. Shelley Robinson Practice
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Open Today
              </span>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1 py-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="mobile-nav-item group flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 active:bg-blue-50/60 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-[11px] font-mono font-bold text-slate-300 group-hover:text-blue-600 transition-colors">
                      {item.idx}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.label}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </nav>

            {/* Bottom Booking Action & Chamber Info */}
            <div className="mobile-nav-item mt-4 pt-4 border-t border-slate-100 space-y-3">
              <Link
                href="/appointment"
                onClick={closeMenu}
                className="w-full bg-[#2B64EC] hover:bg-[#1e52d1] active:scale-[0.98] text-white font-semibold text-sm py-3.5 rounded-2xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </Link>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sat – Thu: 4:00 PM – 9:30 PM</span>
                </div>
                <a
                  href="tel:+8801700000000"
                  className="font-bold text-blue-600 flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

