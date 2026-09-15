"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Star, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DentistShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const imgBoxRef = useRef<HTMLDivElement | null>(null);
  const ratingPillRef = useRef<HTMLDivElement | null>(null);
  const credentialsRef = useRef<HTMLDivElement | null>(null);
  const checkListRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLQuoteElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Scroll-triggered entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Left Column Image + Rating Pill
      tl.fromTo(
        imgBoxRef.current,
        { opacity: 0, scale: 0.9, y: 50, rotateY: -10 },
        { opacity: 1, scale: 1, y: 0, rotateY: 0, duration: 1.1, ease: "power3.out" }
      )
      .fromTo(
        ratingPillRef.current,
        { opacity: 0, scale: 0.5, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.8)" },
        "-=0.6"
      );

      // Right Column Header & Credentials
      const rightHeaders = rightColRef.current?.querySelectorAll(".dentist-header-el");
      if (rightHeaders && rightHeaders.length > 0) {
        tl.fromTo(
          rightHeaders,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          "-=0.8"
        );
      }

      // Credentials boxes stagger pop
      const credBoxes = credentialsRef.current?.querySelectorAll(".cred-box");
      if (credBoxes && credBoxes.length > 0) {
        tl.fromTo(
          credBoxes,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.4)" },
          "-=0.5"
        );
      }

      // Checklist items cascade
      const checkItems = checkListRef.current?.querySelectorAll(".check-item");
      if (checkItems && checkItems.length > 0) {
        tl.fromTo(
          checkItems,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Quote block
      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
      }

      // 2. Interactive 3D mouse parallax on Doctor Portrait
      const imgBox = imgBoxRef.current;
      if (imgBox) {
        const tiltX = gsap.quickTo(imgBox, "rotationY", { duration: 0.5, ease: "power2.out" });
        const tiltY = gsap.quickTo(imgBox, "rotationX", { duration: 0.5, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = imgBox.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / (rect.width / 2);
          const deltaY = (e.clientY - centerY) / (rect.height / 2);

          tiltX(deltaX * 8);
          tiltY(-deltaY * 8);
        };

        const handleMouseLeave = () => {
          tiltX(0);
          tiltY(0);
        };

        imgBox.addEventListener("mousemove", handleMouseMove);
        imgBox.addEventListener("mouseleave", handleMouseLeave);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-8 lg:px-12 bg-white overflow-hidden"
    >
      {/* 1. Dot Matrix Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          opacity: 0.65,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      {/* 2. Soft Ambient Color Glows */}
      <div className="absolute top-10 -left-20 w-[420px] h-[420px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-10 w-[380px] h-[380px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Dentist Portrait with Organic Curved Shape */}
          <div ref={leftColRef} className="lg:col-span-5 flex justify-center perspective-[1000px]">
            <div ref={imgBoxRef} className="relative w-full max-w-[440px] transform-gpu">
              {/* Organic Curved Image Container */}
              <div className="relative filter drop-shadow-xl">
                <div
                  className="relative w-full h-[470px] sm:h-[530px] overflow-hidden bg-slate-100 group transition-transform duration-300 hover:scale-[1.01]"
                  style={{ clipPath: "url(#dentistClip)" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80"
                    alt="Dr. Shelley Robinson - Lead Dentist"
                    className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay for high-end look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />

                  {/* Doctor badge at bottom of photo */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Dr. Shelley Robinson</h4>
                      <p className="text-[11px] text-blue-600 font-medium">BDS, FCPS (Surgery), MS</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Patient Trust Rating Pill */}
              <div
                ref={ratingPillRef}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white px-4 py-2.5 rounded-full shadow-xl border border-slate-100 flex items-center gap-2 z-20 hover:scale-105 transition-transform duration-200"
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">5.0 (450+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Modern Editorial Profile */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col justify-center">
            {/* Doctor Name & Current Designation */}
            <div>
              <span className="dentist-header-el text-xs uppercase font-bold tracking-widest text-[#2B64EC] block mb-2">
                Solo Practitioner & Surgeon
              </span>
              <h2 className="dentist-header-el text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Dr. Shelley Robinson
              </h2>
              <p className="dentist-header-el text-base sm:text-lg font-medium text-slate-600 mt-2">
                Senior Consultant — Dhaka Medical College & Hospital
              </p>
            </div>

            {/* Minimalist Academic Credentials Strip */}
            <div
              ref={credentialsRef}
              className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="cred-box bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Primary & Cadre
                </span>
                <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                  BDS, BCS (Health)
                </span>
              </div>
              <div className="cred-box bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Fellowship
                </span>
                <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                  FCPS (Surgery)
                </span>
              </div>
              <div className="cred-box bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Postgraduate
                </span>
                <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                  MS (Maxillofacial)
                </span>
              </div>
              <div className="cred-box bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Institution
                </span>
                <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                  Dhaka Med College
                </span>
              </div>
            </div>

            {/* Biography & Mission */}
            <p className="dentist-header-el mt-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              At Smile Bright, dental care isn't a rushed assembly line. Dr. Robinson combines hospital-grade surgical expertise with an unhurried, gentle approach — delivering precision dental restorations, pain-free treatments, and personalized smile care.
            </p>

            {/* Core Practice Highlights (Clean List) */}
            <div ref={checkListRef} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                {
                  title: "Direct One-on-One Care",
                  desc: "You will always see Dr. Robinson at every single visit without delegation.",
                },
                {
                  title: "Gentle & Pain-Free",
                  desc: "Modern localized comfort techniques designed for total peace of mind.",
                },
                {
                  title: "3D Digital Imaging",
                  desc: "High-precision digital optical scans with zero uncomfortable physical goo.",
                },
                {
                  title: "Transparent & Honest",
                  desc: "Clear treatment roadmaps with zero surprise costs or unneeded procedures.",
                },
              ].map((item, idx) => (
                <div key={idx} className="check-item flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2B64EC] transition-colors">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Quote */}
            <blockquote
              ref={quoteRef}
              className="mt-8 pl-4 border-l-2 border-[#2B64EC] bg-blue-50/40 py-2.5 pr-4 rounded-r-xl text-slate-700 text-sm italic leading-relaxed"
            >
              &ldquo;I believe the best dentistry happens when patients feel heard, respected, and completely at ease in the chair.&rdquo;
            </blockquote>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#schedule"
                className="group bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-medium text-sm sm:text-[15px] px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="#services"
                className="border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.98] font-medium text-sm sm:text-[15px] px-7 py-3.5 rounded-full transition-all duration-200 inline-flex items-center justify-center"
              >
                Explore Treatments
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Clip Path for Dentist Showcase Image */}
      <svg className="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="dentistClip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0.44 0 
                H 0.82 
                C 0.92 0, 1 0.06, 1 0.14 
                V 0.86 
                C 1 0.94, 0.92 1, 0.82 1 
                H 0.18 
                C 0.08 1, 0 0.94, 0 0.86 
                V 0.36 
                C 0 0.26, 0.05 0.19, 0.15 0.19 
                C 0.25 0.19, 0.31 0.13, 0.36 0.06 
                C 0.39 0.018, 0.42 0, 0.44 0 
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
