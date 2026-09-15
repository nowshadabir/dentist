"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GsapCursor() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const cursorTextRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Only activate custom cursor on devices with a mouse/trackpad
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    setHasFinePointer(true);

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const cursorText = cursorTextRef.current;
    if (!dot || !ring) return;

    // Fast 60fps tweens using quickTo
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power2.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power2.out" });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        isVisible = true;
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      isVisible = false;
    };

    // Magnetic and interactive hover listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], .cursor-pointer, input, select");
      const galleryEl = target.closest("#gallery, [data-cursor='drag']");

      if (galleryEl) {
        gsap.to(ring, {
          scale: 2.2,
          backgroundColor: "rgba(43, 100, 236, 0.15)",
          borderColor: "rgba(43, 100, 236, 0.6)",
          duration: 0.3,
        });
        if (cursorText) {
          cursorText.innerText = "DRAG";
          gsap.to(cursorText, { opacity: 1, duration: 0.2 });
        }
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else if (interactiveEl) {
        gsap.to(ring, {
          scale: 1.6,
          backgroundColor: "rgba(43, 100, 236, 0.08)",
          borderColor: "rgba(43, 100, 236, 0.4)",
          duration: 0.25,
        });
        if (cursorText) gsap.to(cursorText, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { scale: 1.3, backgroundColor: "#2B64EC", duration: 0.2 });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(15, 23, 42, 0.25)",
          duration: 0.25,
        });
        if (cursorText) gsap.to(cursorText, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { scale: 1, backgroundColor: "#0f172a", duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!hasFinePointer) return null;

  return (
    <>
      {/* Center Precision Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-slate-900 rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 opacity-0 shadow-xs transition-colors duration-150"
      />

      {/* Trailing Interactive Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-slate-900/30 pointer-events-none z-[99997] -translate-x-1/2 -translate-y-1/2 opacity-0 backdrop-blur-[0.5px] flex items-center justify-center transition-transform duration-100"
      >
        <span
          ref={cursorTextRef}
          className="text-[8px] font-extrabold uppercase tracking-tighter text-blue-600 opacity-0 select-none pointer-events-none"
        />
      </div>
    </>
  );
}
