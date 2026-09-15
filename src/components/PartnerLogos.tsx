"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PARTNERS = [
  {
    name: "CVS Health",
    content: (
      <div className="flex items-center gap-2 text-slate-700 font-bold text-lg md:text-xl tracking-tight">
        <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="font-extrabold tracking-tighter">CVS</span>
        <span className="font-medium -ml-1.5">Health.</span>
      </div>
    ),
  },
  {
    name: "Allergan",
    content: (
      <div className="flex items-center gap-2 text-slate-700 font-semibold text-lg md:text-xl tracking-tight">
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            ))}
          </div>
        </div>
        <span className="font-semibold tracking-normal text-slate-800">Allergan</span>
      </div>
    ),
  },
  {
    name: "HORIZON",
    content: (
      <div className="flex items-center gap-2 text-slate-800 font-bold text-lg md:text-xl tracking-wider">
        <div className="flex gap-1 items-center h-5">
          <span className="w-1 h-5 bg-teal-600 rounded-sm"></span>
          <span className="w-1 h-3.5 bg-slate-600 rounded-sm"></span>
          <span className="w-1 h-5 bg-teal-600 rounded-sm"></span>
        </div>
        <span className="font-bold tracking-widest text-slate-800">HORIZON</span>
      </div>
    ),
  },
  {
    name: "Syngenta",
    content: (
      <div className="flex items-center gap-2 text-slate-700 font-semibold text-lg md:text-xl">
        <svg className="w-5 h-5 text-emerald-600 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
        <span className="font-bold text-slate-800 lowercase tracking-tight">syngenta</span>
      </div>
    ),
  },
  {
    name: "Shire",
    content: (
      <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-lg md:text-xl">
        <span className="text-2xl font-light italic text-blue-600">C</span>
        <span className="font-semibold text-slate-800 tracking-tight">Shire</span>
      </div>
    ),
  },
  {
    name: "Eurofins",
    content: (
      <div className="flex items-center gap-2 text-slate-700 font-semibold text-lg md:text-xl">
        <div className="w-5 h-5 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
        </div>
        <span className="font-semibold text-slate-800 tracking-tight lowercase">eurofins</span>
      </div>
    ),
  },
];

export default function PartnerLogos() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance animation on scroll
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Infinite Marquee Animation
      const track = trackRef.current;
      if (track) {
        const loop = gsap.to(track, {
          xPercent: -50,
          repeat: -1,
          duration: 25,
          ease: "none",
        });

        // Slow down on hover
        const handleMouseEnter = () => gsap.to(loop, { timeScale: 0.25, duration: 0.5 });
        const handleMouseLeave = () => gsap.to(loop, { timeScale: 1, duration: 0.5 });

        containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
        containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
          containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
          loop.kill();
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full pt-8 pb-14 overflow-hidden border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">
          Trusted Clinical Partners & Certified Equipment Providers
        </p>
      </div>

      <div className="relative w-full overflow-hidden mask-linear-fade">
        <div ref={trackRef} className="flex items-center gap-12 sm:gap-16 w-max py-2 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {/* Double list for seamless marquee loop */}
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              {partner.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
