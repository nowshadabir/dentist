"use client";

import React from "react";

export default function CircularBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#2B64EC] p-1.5 shadow-xl border-4 sm:border-[6px] border-white flex items-center justify-center select-none ${className}`}
    >
      {/* Rotating Circular Text */}
      <svg
        className="absolute inset-0 w-full h-full animate-spin-slow"
        viewBox="0 0 120 120"
      >
        <path
          id="circlePath"
          d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          fill="none"
        />
        <text className="text-[9.5px] font-bold fill-white uppercase tracking-[0.22em]">
          <textPath href="#circlePath" startOffset="0%">
            • SMILE BRIGHT CLINIC • 12+ YEARS EXPERIENCE
          </textPath>
        </text>
      </svg>

      {/* Center Tooth Icon */}
      <div className="relative z-10 w-10 h-10 flex items-center justify-center text-white">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8"
        >
          {/* Stylized Tooth SVG */}
          <path d="M12 2C8.5 2 7 4.5 7 7c0 2 .5 4 1 6.5s1 5.5 2 6.5c1 .9 2.1-.2 2-2-.1-1.5-.5-3.5 0-4.5.5-1 1-1 1.5-1s1 0 1.5 1c.5 1 .1 3 0 4.5-.1 1.8 1 2.9 2 2 1-1 1.5-4 2-6.5s1-4.5 1-6.5c0-2.5-1.5-5-5-5-1.2 0-2.2.6-3 1.2C14.2 2.6 13.2 2 12 2z" />
        </svg>
      </div>
    </div>
  );
}
