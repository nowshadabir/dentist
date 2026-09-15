"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  tag?: string;
  icon: (isActive: boolean) => React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: "whitening",
    title: "Teeth Whitening",
    shortDesc:
      "Teeth whitening is an effective solution to remove stains and discoloration. Perfect way to boost your confidence.",
    fullDesc:
      "Personalized in-office LED activation and custom-fitted maintenance trays formulated for zero enamel sensitivity.",
    benefits: ["Instant 6-8 shades brighter", "Gentle enamel-safe formula", "Personalized take-home kit"],
    tag: "Most Popular",
    icon: (isActive) => (
      <svg
        className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white fill-white" : "text-slate-800 fill-slate-800"}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2C8.5 2 7 4.5 7 7c0 2 .5 4 1 6.5s1 5.5 2 6.5c1 .9 2.1-.2 2-2-.1-1.5-.5-3.5 0-4.5.5-1 1-1 1.5-1s1 0 1.5 1c.5 1 .1 3 0 4.5-.1 1.8 1 2.9 2 2 1-1 1.5-4 2-6.5s1-4.5 1-6.5c0-2.5-1.5-5-5-5-1.2 0-2.2.6-3 1.2C14.2 2.6 13.2 2 12 2z" />
      </svg>
    ),
  },
  {
    id: "implant",
    title: "Dental Implant",
    shortDesc:
      "Dental implants provide a lasting fix for missing teeth. A reliable and long-lasting choice for your dental needs.",
    fullDesc:
      "Direct one-on-one surgical precision with biocompatible medical-grade titanium and hand-shaded porcelain crowns.",
    benefits: ["Permanent root replacement", "Preserves natural facial shape", "Feels & chews like natural teeth"],
    icon: (isActive) => (
      <svg
        className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white fill-white" : "text-slate-800 fill-slate-800"}`}
        viewBox="0 0 24 24"
      >
        <path d="M7 2h10v3H7V2zm1 4h8v2H8V6zm1 3h6v2H9V9zm1 3h4v2h-4v-2zm1 3h2v6h-2v-6z" />
      </svg>
    ),
  },
  {
    id: "exams",
    title: "Dental Exams",
    shortDesc:
      "Regular dental exams help protect your teeth and gums, catch problems early, and keep your smile bright and healthy.",
    fullDesc:
      "Comprehensive diagnostic reviews with HD intraoral cameras, painless ultrasonic scaling, and personalized preventive care.",
    benefits: ["HD digital cavity detection", "Oral cancer screening", "Unhurried doctor consultation"],
    icon: (isActive) => (
      <svg
        className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white fill-white" : "text-slate-800 fill-slate-800"}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    ),
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>("whitening");
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Entrance
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

      // 2. Cards 3D Perspective Entrance
      const cards = cardsContainerRef.current?.querySelectorAll(".service-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.94, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Bottom Banner Entrance
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-slate-50/80 py-24 sm:py-28 px-6 sm:px-8 lg:px-12 text-slate-900 border-t border-slate-100 overflow-hidden"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#2B64EC] bg-blue-50 border border-blue-100/80 px-3.5 py-1 rounded-full mb-4">
            Private Solo Practice
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Our Dental Services
          </h2>
          <p className="mt-4 text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
            Personalized, single-dentist care offering gentle treatments and advanced solutions tailored to your unique smile.
          </p>
        </div>

        {/* 3 Pillar Service Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch perspective-[1000px]"
        >
          {servicesData.map((service) => {
            const isActive = selectedService === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`service-card relative rounded-[32px] transition-all duration-300 cursor-pointer flex flex-col justify-between p-8 sm:p-9 bg-white border ${
                  isActive
                    ? "border-slate-900 shadow-2xl shadow-slate-300/70 scale-[1.02] ring-2 ring-slate-900/5"
                    : "border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Card Icon and optional tag */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/30 scale-105"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {service.icon(isActive)}
                    </div>

                    {service.tag && (
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors ${
                          isActive
                            ? "bg-slate-900 text-white"
                            : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}
                      >
                        {service.tag}
                      </span>
                    )}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl font-bold mb-3.5 tracking-tight text-slate-900">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-[15px] leading-relaxed mb-6 font-normal text-slate-600">
                    {service.shortDesc}
                  </p>

                  {/* Benefits Checklist */}
                  <ul className="space-y-2.5 mb-8 pt-4 border-t border-slate-100">
                    {service.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-xs sm:text-sm font-medium gap-2.5 text-slate-700"
                      >
                        <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <div>
                  <button
                    type="button"
                    className={`w-full py-3.5 px-6 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group ${
                      isActive
                        ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                        : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200/80"
                    }`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solo Dentist Trust Banner */}
        <div
          ref={bannerRef}
          className="mt-14 max-w-3xl mx-auto text-center bg-white rounded-2xl py-4 px-6 border border-slate-200/80 text-slate-600 text-xs sm:text-sm font-medium flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-shadow"
        >
          <Sparkles className="w-4 h-4 text-[#2B64EC] shrink-0 animate-pulse" />
          <span>Every treatment is personally planned and performed by Dr. Shelley Robinson without delegation.</span>
        </div>
      </div>
    </section>
  );
}
