"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GsapLoader({ onComplete }: { onComplete?: () => void }) {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const topCurtainRef = useRef<HTMLDivElement | null>(null);
  const bottomCurtainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if user already saw the loader in this session to prevent annoyance on refresh, or play smoothly
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          if (onComplete) onComplete();
          window.dispatchEvent(new CustomEvent("loader-finished"));
        },
      });

      // Object to animate percentage
      const counterObj = { value: 0 };

      // Initial state
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0, y: 20 });
      gsap.set(textRef.current, { opacity: 0, y: 30, filter: "blur(8px)" });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: "left center" });

      // Step 1: Reveal logo and title
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      // Step 2: Progress line and counter animation
      .to(
        counterObj,
        {
          value: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              const val = Math.round(counterObj.value);
              counterRef.current.innerText = val < 10 ? `0${val}%` : `${val}%`;
            }
          },
        },
        "-=0.4"
      )
      .to(
        progressLineRef.current,
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      )
      // Step 3: Elements fade & scale out
      .to([logoRef.current, textRef.current, subtitleRef.current, counterRef.current?.parentElement], {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.in",
      })
      // Step 4: Split curtain slide open
      .to(
        topCurtainRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      .to(
        bottomCurtainRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Top Half Curtain */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#090d16] border-b border-blue-900/30 flex items-end justify-center pb-2 z-10"
      >
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Bottom Half Curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#090d16] border-t border-blue-900/30 flex items-start justify-center pt-2 z-10"
      >
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Center Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none">
        {/* Animated Brand Emblem */}
        <div
          ref={logoRef}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-sky-400 p-0.5 shadow-2xl shadow-blue-500/30 flex items-center justify-center mb-6"
        >
          <div className="w-full h-full bg-[#090d16] rounded-[22px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 fill-current relative z-10"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.5 2 7 4.5 7 7c0 2 .5 4 1 6.5s1 5.5 2 6.5c1 .9 2.1-.2 2-2-.1-1.5-.5-3.5 0-4.5.5-1 1-1 1.5-1s1 0 1.5 1c.5 1 .1 3 0 4.5-.1 1.8 1 2.9 2 2 1-1 1.5-4 2-6.5s1-4.5 1-6.5c0-2.5-1.5-5-5-5-1.2 0-2.2.6-3 1.2C14.2 2.6 13.2 2 12 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div ref={textRef} className="text-center mb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2.5 justify-center">
            <span>Smile Bright</span>
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="text-center mb-8">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-400 uppercase">
            Clinical Excellence & Surgical Dentistry
          </p>
        </div>

        {/* Progress Container & Counter */}
        <div className="w-64 sm:w-80 flex flex-col items-center gap-3">
          <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden relative">
            <div
              ref={progressLineRef}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-sky-400 to-teal-300 rounded-full"
            />
          </div>
          <div className="flex items-center justify-between w-full text-[11px] font-mono font-medium tracking-wider text-slate-400">
            <span>SYSTEM INITIALIZING</span>
            <span ref={counterRef} className="text-sky-400 font-bold text-xs">
              00%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
