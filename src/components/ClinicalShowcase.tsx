"use client";

import React, { useEffect, useRef } from "react";
import ZoomSlider from "@/components/ui/zoom-slider";
import { Sparkles, MoveHorizontal } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ClinicalShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Drag indicator badge pulse
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          scale: 1.04,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 bg-white overflow-hidden"
    >
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-sky-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2B64EC] px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Clinical Photo Gallery
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Inside Our Clinical Suite
          </h2>
          <p className="mt-2.5 sm:mt-3.5 text-slate-500 text-xs sm:text-base leading-relaxed px-2">
            Explore our state-of-the-art dental technology, hospital-grade Class-B sterilization, and calming operatory suite.
          </p>

          <div
            ref={badgeRef}
            className="mt-3.5 sm:mt-4 inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-500 bg-slate-100/90 px-3.5 py-1.5 rounded-full select-none shadow-2xs border border-slate-200/60"
          >
            <MoveHorizontal className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
            <span className="hidden sm:inline">Drag horizontally or use arrows to navigate gallery</span>
            <span className="sm:hidden">Swipe photos or use arrows to explore</span>
          </div>
        </div>

        {/* Responsive Dual-Mode Gallery Component */}
        <div className="w-full">
          <ZoomSlider
            scaleOnHover
            textOnHover
            size={1}
            easeScrollPercentage={100}
          />
        </div>
      </div>
    </section>
  );
}
