"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Calendar } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

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

  // Mobile menu stagger animation
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll("a");
      gsap.fromTo(
        links,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-1"
          : "bg-white/80 backdrop-blur-xs border-b border-slate-100 py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-22 flex items-center justify-between transition-all duration-300">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1d4ed8] to-[#3b82f6] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C7.58 2 4 5.58 4 10c0 3.1 1.77 5.8 4.38 7.15.42.22.62.71.47 1.16l-.72 2.16c-.23.69.44 1.34 1.11 1.08l2.28-.88c.45-.17.96-.06 1.3.28C13.88 22.01 15 22.5 16 22.5c4.42 0 8-3.58 8-8s-3.58-8-8-8c-.68 0-1.34.09-1.97.25C13.43 3.32 12.74 2 12 2zm4 4.5c2.48 0 4.5 2.02 4.5 4.5s-2.02 4.5-4.5 4.5-4.5-2.02-4.5-4.5 2.02-4.5 4.5-4.5z" />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 block leading-tight">
              Smile Bright
            </span>
            <span className="text-[11px] font-medium text-slate-400 hidden sm:block">
              Dental Clinic & Surgery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/90 p-1.5 rounded-full border border-slate-200/80 shadow-2xs">
          <Link
            href="#about"
            className="text-[14px] font-medium text-slate-600 hover:text-[#2B64EC] hover:bg-white px-4 py-1.5 rounded-full transition-all duration-200"
          >
            About Dr. Shelley
          </Link>
          <Link
            href="#services"
            className="text-[14px] font-medium text-slate-600 hover:text-[#2B64EC] hover:bg-white px-4 py-1.5 rounded-full transition-all duration-200"
          >
            Our Services
          </Link>
          <Link
            href="#gallery"
            className="text-[14px] font-medium text-slate-600 hover:text-[#2B64EC] hover:bg-white px-4 py-1.5 rounded-full transition-all duration-200"
          >
            Clinical Gallery
          </Link>
          <Link
            href="#reviews"
            className="text-[14px] font-medium text-slate-600 hover:text-[#2B64EC] hover:bg-white px-4 py-1.5 rounded-full transition-all duration-200"
          >
            Reviews
          </Link>
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#schedule"
            className="bg-[#2B64EC] hover:bg-[#1f52cf] active:scale-[0.98] text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm shadow-blue-500/20 inline-flex items-center gap-2 hover:shadow-md"
          >
            <Calendar className="w-4 h-4" />
            Book Appointment
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white/98 backdrop-blur-lg border-b border-slate-200 px-6 py-6 space-y-3 shadow-xl"
        >
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-[#2B64EC] hover:bg-blue-50/50 p-2.5 rounded-xl transition-all"
          >
            About Dr. Shelley
          </Link>
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-[#2B64EC] hover:bg-blue-50/50 p-2.5 rounded-xl transition-all"
          >
            Our Services
          </Link>
          <Link
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-[#2B64EC] hover:bg-blue-50/50 p-2.5 rounded-xl transition-all"
          >
            Clinical Gallery
          </Link>
          <Link
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-[#2B64EC] hover:bg-blue-50/50 p-2.5 rounded-xl transition-all"
          >
            Patient Reviews
          </Link>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#2B64EC] text-white font-medium py-3 rounded-full shadow-sm text-sm"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
