"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import CircularBadge from "./CircularBadge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const leftImageRef = useRef<HTMLDivElement | null>(null);
  const rightImageContainerRef = useRef<HTMLDivElement | null>(null);
  const rightImageRef = useRef<HTMLImageElement | null>(null);
  const badgeWrapperRef = useRef<HTMLAnchorElement | null>(null);
  const sparkle1Ref = useRef<HTMLDivElement | null>(null);
  const sparkle2Ref = useRef<HTMLDivElement | null>(null);
  const glow1Ref = useRef<HTMLDivElement | null>(null);
  const glow2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Master Entrance Timeline (listens for loader-finished or mounts directly)
      const playEntrance = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Set initial states
        gsap.set([paragraphRef.current, buttonsRef.current], { opacity: 0, y: 30 });
        gsap.set(leftImageRef.current, { opacity: 0, scale: 0.9, y: 40, rotate: -2 });
        gsap.set(rightImageRef.current, { opacity: 0, scale: 0.92, y: 50 });
        gsap.set(badgeWrapperRef.current, { opacity: 0, scale: 0.4, rotation: -45 });
        gsap.set([sparkle1Ref.current, sparkle2Ref.current], { opacity: 0, scale: 0 });

        // Staggered Headline Lines
        const titleSpans = headlineRef.current?.querySelectorAll(".hero-line-item");
        if (titleSpans && titleSpans.length > 0) {
          gsap.set(titleSpans, { opacity: 0, y: 45, rotateX: -20 });
          tl.to(titleSpans, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "back.out(1.4)",
          });
        }

        // Paragraph & CTA buttons
        tl.to(
          paragraphRef.current,
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.6"
        )
        .to(
          buttonsRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.5)" },
          "-=0.5"
        )
        // Images reveal
        .to(
          leftImageRef.current,
          { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        )
        .to(
          rightImageRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "-=0.8"
        )
        // Badge Pop-in
        .to(
          badgeWrapperRef.current,
          { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.6)" },
          "-=0.6"
        )
        // Sparkles pop
        .to(
          [sparkle1Ref.current, sparkle2Ref.current],
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(2)" },
          "-=0.5"
        );
      };

      // Play entrance immediately on page mount with a crisp delay
      const timer = setTimeout(playEntrance, 100);

      // 2. Continuous Floating Animations for Sparkles & Glows
      if (sparkle1Ref.current) {
        gsap.to(sparkle1Ref.current, {
          y: -12,
          rotation: 15,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (sparkle2Ref.current) {
        gsap.to(sparkle2Ref.current, {
          y: 10,
          rotation: -20,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
      }

      // Background ambient glow float
      if (glow1Ref.current) {
        gsap.to(glow1Ref.current, {
          x: 40,
          y: 30,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (glow2Ref.current) {
        gsap.to(glow2Ref.current, {
          x: -30,
          y: -40,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      // 3. 3D Mouse Parallax on Right Image Container
      const imgContainer = rightImageContainerRef.current;
      if (imgContainer) {
        const tiltX = gsap.quickTo(imgContainer, "rotationY", { duration: 0.6, ease: "power2.out" });
        const tiltY = gsap.quickTo(imgContainer, "rotationX", { duration: 0.6, ease: "power2.out" });
        const moveX = gsap.quickTo(imgContainer, "x", { duration: 0.8, ease: "power2.out" });
        const moveY = gsap.quickTo(imgContainer, "y", { duration: 0.8, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = imgContainer.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
          const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

          tiltX(deltaX * 10);
          tiltY(-deltaY * 10);
          moveX(deltaX * 15);
          moveY(deltaY * 15);
        };

        const handleMouseLeave = () => {
          tiltX(0);
          tiltY(0);
          moveX(0);
          moveY(0);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        imgContainer.addEventListener("mouseleave", handleMouseLeave);
      }

      // 4. ScrollTrigger Scrub Parallax on Scroll Down
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          animation: gsap.timeline()
            .to(rightImageRef.current, { y: 80, scale: 0.96, ease: "none" }, 0)
            .to(leftImageRef.current, { y: -40, ease: "none" }, 0)
            .to(headlineRef.current, { y: -30, opacity: 0.7, ease: "none" }, 0)
            .to(badgeWrapperRef.current, { y: 60, rotation: 30, ease: "none" }, 0),
        });
      }

      return () => {
        clearTimeout(timer);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-6 sm:pt-10 pb-16 overflow-hidden bg-white"
    >
      {/* Background Soft Graphics */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0.55,
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 40%, black 10%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 40%, black 10%, transparent 80%)",
        }}
      />

      {/* Soft Ambient Radial Glows */}
      <div
        ref={glow1Ref}
        className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none z-0"
      />
      <div
        ref={glow2Ref}
        className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-sky-50/60 rounded-full blur-3xl pointer-events-none z-0"
      />

      {/* Decorative Floating Sparkle Glyphs - hidden on mobile to avoid text overlap */}
      <div
        ref={sparkle1Ref}
        className="hidden sm:block absolute top-8 left-12 text-blue-400 pointer-events-none z-0"
      >
        <svg className="w-8 h-8 fill-current drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      <div
        ref={sparkle2Ref}
        className="hidden sm:block absolute top-40 right-1/3 text-sky-300 pointer-events-none z-0"
      >
        <svg className="w-6 h-6 fill-current drop-shadow-xs" viewBox="0 0 24 24">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* Left Column: Heading, CTA, and Secondary Image */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            {/* Text Header */}
            <div>
              <h1
                ref={headlineRef}
                className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0f172a] leading-[1.14] tracking-tight perspective-[1000px]"
              >
                <span className="hero-line-item inline-block">
                  Welcome to Smile
                </span>{" "}
                <span className="hero-line-item inline-flex items-center align-middle text-[#2B64EC] ml-1">
                  <svg
                    className="w-6 h-6 sm:w-9 sm:h-9 fill-current animate-pulse"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
                  </svg>
                </span>
                <br />
                <span className="hero-line-item inline-block">
                  Bright Dental Care
                </span>
              </h1>

              <p
                ref={paragraphRef}
                className="mt-4 sm:mt-5 text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg font-normal"
              >
                Our experienced dental team offers a blend of extensive knowledge and
                personalized professional care tailored to your specific needs.
              </p>

              {/* Action Buttons */}
              <div
                ref={buttonsRef}
                className="mt-6 sm:mt-8 grid grid-cols-2 sm:flex sm:flex-row items-center gap-2.5 sm:gap-4"
              >
                <Link
                  href="/services"
                  className="group relative bg-[#2B64EC] hover:bg-[#1e52d1] active:scale-[0.98] text-white font-semibold text-xs sm:text-[15px] px-3 sm:px-8 py-3.5 rounded-full shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-200 inline-flex items-center justify-center overflow-hidden text-center"
                >
                  <span className="relative z-10">View Services</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
                <Link
                  href="/appointment"
                  className="group border-2 border-[#00B4D8] text-[#00B4D8] hover:bg-sky-50 active:scale-[0.98] font-semibold text-xs sm:text-[15px] px-3 sm:px-8 py-3.5 rounded-full transition-all duration-200 inline-flex items-center justify-center text-center"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                    Schedule a Call
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom-Left Image Container with curved organic cutout */}
            <div
              ref={leftImageRef}
              className="mt-8 sm:mt-12 max-w-[280px] sm:max-w-[350px] relative filter drop-shadow-md hidden sm:block"
            >
              <div
                className="relative w-full h-[220px] sm:h-[300px] overflow-hidden bg-slate-100 group transition-transform duration-300 hover:scale-[1.02]"
                style={{ clipPath: "url(#heroLeftClip)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                  alt="Dental care examination examination"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Main Hero Image and Circular Badge */}
          <div className="lg:col-span-6 flex flex-col justify-end items-center lg:items-end h-full mt-4 lg:mt-0">
            <div
              ref={rightImageContainerRef}
              className="relative w-full max-w-[540px] transform-gpu perspective-[1200px]"
            >
              {/* Direct Main Hero Image bottom-aligned */}
              <div className="relative flex justify-center lg:justify-end items-end">
                <img
                  ref={rightImageRef}
                  src="/hero-img.png"
                  alt="Smile Bright Dental Care Hero"
                  className="w-full h-auto object-contain max-h-[380px] sm:max-h-[580px] lg:max-h-[620px] drop-shadow-xl"
                />
              </div>

              {/* Floating Circular Badge on bottom-right - hidden on mobile */}
              <Link
                href="/#about"
                aria-label="Learn about Dr. Shelley Robinson"
                ref={badgeWrapperRef}
                className="hidden sm:block absolute -bottom-6 -right-4 z-20 cursor-pointer"
              >
                <CircularBadge className="hover:scale-105 transition-transform duration-300 shadow-xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Clip Path Definitions for Exact Curved Cropping */}
      <svg className="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="heroMainClip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0.46 0 
                H 0.82 
                C 0.92 0, 1 0.06, 1 0.14 
                V 0.86 
                C 1 0.94, 0.92 1, 0.82 1 
                H 0.18 
                C 0.08 1, 0 0.94, 0 0.86 
                V 0.36 
                C 0 0.26, 0.05 0.19, 0.15 0.19 
                C 0.25 0.19, 0.31 0.13, 0.36 0.06 
                C 0.39 0.018, 0.42 0, 0.46 0 
                Z
              "
            />
          </clipPath>

          <clipPath id="heroLeftClip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0.44 0 
                H 0.80 
                C 0.91 0, 1 0.07, 1 0.16 
                V 0.84 
                C 1 0.93, 0.91 1, 0.80 1 
                H 0.20 
                C 0.09 1, 0 0.93, 0 0.84 
                V 0.36 
                C 0 0.26, 0.05 0.19, 0.14 0.19 
                C 0.24 0.19, 0.29 0.13, 0.34 0.06 
                C 0.37 0.018, 0.40 0, 0.44 0 
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
