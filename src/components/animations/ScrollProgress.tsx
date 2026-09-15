"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const backToTopRef = useRef<HTMLButtonElement | null>(null);
  const circleProgressRef = useRef<SVGCircleElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const progressEl = progressBarRef.current;
    const circleEl = circleProgressRef.current;
    const circumference = 2 * Math.PI * 18; // radius 18 => circumference ~113.1

    if (circleEl) {
      circleEl.style.strokeDasharray = `${circumference}`;
      circleEl.style.strokeDashoffset = `${circumference}`;
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const progress = self.progress;

        // Top bar update
        if (progressEl) {
          gsap.set(progressEl, { scaleX: progress, transformOrigin: "left center" });
        }

        // Circular gauge update
        if (circleEl) {
          const offset = circumference - progress * circumference;
          circleEl.style.strokeDashoffset = `${offset}`;
        }

        // Toggle back to top visibility
        if (self.scroll() > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[99990] pointer-events-none bg-slate-100">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-r from-[#2B64EC] via-[#00B4D8] to-[#10B981] origin-left scale-x-0"
        />
      </div>

      {/* Floating Back to Top Button */}
      <button
        ref={backToTopRef}
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#2B64EC] hover:scale-110 active:scale-95 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg className="w-full h-full -rotate-90 p-0.5" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="18"
            className="stroke-slate-100"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            ref={circleProgressRef}
            cx="22"
            cy="22"
            r="18"
            className="stroke-[#2B64EC] transition-all duration-75"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <ArrowUp className="w-4 h-4 absolute stroke-[2.5]" />
      </button>
    </>
  );
}

