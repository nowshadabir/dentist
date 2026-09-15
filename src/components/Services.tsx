"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES_DATA } from "@/data/services";

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>("whitening");
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // Take the primary 3 featured services for the home page showcase
  const featuredServices = SERVICES_DATA.slice(0, 3);

  const getServiceIcon = (id: string, isActive: boolean) => {
    if (id === "whitening") {
      return (
        <svg
          className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white fill-white" : "text-slate-800 fill-slate-800"}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2C8.5 2 7 4.5 7 7c0 2 .5 4 1 6.5s1 5.5 2 6.5c1 .9 2.1-.2 2-2-.1-1.5-.5-3.5 0-4.5.5-1 1-1 1.5-1s1 0 1.5 1c.5 1 .1 3 0 4.5-.1 1.8 1 2.9 2 2 1-1 1.5-4 2-6.5s1-4.5 1-6.5c0-2.5-1.5-5-5-5-1.2 0-2.2.6-3 1.2C14.2 2.6 13.2 2 12 2z" />
        </svg>
      );
    }
    if (id === "implant") {
      return (
        <svg
          className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white fill-white" : "text-slate-800 fill-slate-800"}`}
          viewBox="0 0 24 24"
        >
          <path d="M7 2h10v3H7V2zm1 4h8v2H8V6zm1 3h6v2H9V9zm1 3h4v2h-4v-2zm1 3h2v6h-2v-6z" />
        </svg>
      );
    }
    return (
      <svg
        className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white fill-white" : "text-slate-800 fill-slate-800"}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Cards Stagger Entrance
      const cards = cardsContainerRef.current?.querySelectorAll(".service-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
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
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      className="relative w-full bg-slate-50/70 py-20 sm:py-24 px-6 sm:px-8 lg:px-12 text-slate-900 border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#2B64EC] bg-blue-50 border border-blue-100/80 px-3 py-1 rounded-full mb-3">
              Private Solo Practice
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Our Dental Services
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              Personalized, single-dentist care offering gentle treatments and advanced solutions tailored to your smile.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B64EC] hover:text-[#1e52d1] transition-colors self-start md:self-auto group"
          >
            <span>Explore All Treatments</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Pillar Service Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {featuredServices.map((service) => {
            const isActive = selectedService === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setSelectedService(service.id)}
                className={`service-card relative rounded-3xl transition-all duration-200 flex flex-col justify-between p-7 sm:p-8 bg-white border ${
                  isActive
                    ? "border-slate-900 shadow-xl shadow-slate-200/50"
                    : "border-slate-200/80 hover:border-slate-300 shadow-xs"
                }`}
              >
                <div>
                  {/* Card Icon and tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {getServiceIcon(service.id, isActive)}
                    </div>

                    {service.tag && (
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
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
                  <h3 className="text-xl font-bold mb-2 tracking-tight text-slate-900">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-sm leading-relaxed mb-6 font-normal text-slate-600">
                    {service.shortDesc}
                  </p>

                  {/* Benefits Checklist */}
                  <ul className="space-y-2 mb-8 pt-4 border-t border-slate-100">
                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-xs font-medium gap-2 text-slate-700"
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Link to Minimal Service Info Page */}
                <div className="pt-2">
                  <Link
                    href={`/services/${service.id}`}
                    className={`w-full py-3 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 group cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
                        : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200/80"
                    }`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solo Dentist Trust Banner */}
        <div
          ref={bannerRef}
          className="mt-12 max-w-2xl mx-auto text-center bg-white rounded-2xl py-3.5 px-6 border border-slate-200/80 text-slate-600 text-xs font-medium flex items-center justify-center gap-2 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2B64EC] shrink-0" />
          <span>Every treatment is personally planned and performed by Dr. Shelley Robinson.</span>
        </div>
      </div>
    </section>
  );
}


