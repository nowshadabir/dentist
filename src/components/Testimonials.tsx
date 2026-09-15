"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, CheckCircle2, Quote, ThumbsUp, MessageSquare, Award, Users, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  treatment: string;
  category: "all" | "implants" | "cosmetic" | "general";
  rating: number;
  date: string;
  avatar: string;
  review: string;
  verified: boolean;
  highlight?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Tanvir Ahmed",
    role: "Software Architect",
    treatment: "Dental Implants & Crown",
    category: "implants",
    rating: 5,
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    review: "Dr. Shelley Robinson made the entire implant procedure completely painless and effortless. From the 3D scan to the final crown fitting, the precision and gentleness was beyond anything I experienced before. My smile feels 100% natural!",
    verified: true,
    highlight: "Completely painless and effortless",
  },
  {
    id: "2",
    name: "Nusrat Jahan",
    role: "University Lecturer",
    treatment: "Cosmetic Smile Makeover",
    category: "cosmetic",
    rating: 5,
    date: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    review: "I was extremely self-conscious about my chipped front teeth for years. The cosmetic veneers and whitening Dr. Robinson provided gave me back my confidence to speak and smile freely in public. Highly recommended!",
    verified: true,
    highlight: "Gave me back my confidence",
  },
  {
    id: "3",
    name: "Farhan Chowdhury",
    role: "Financial Analyst",
    treatment: "Root Canal & Ceramic Cap",
    category: "general",
    rating: 5,
    date: "3 weeks ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    review: "I walked in with severe toothache on an emergency basis. The diagnosis was prompt, and the root canal treatment was executed smoothly in just one session without any lingering discomfort. True professional care.",
    verified: true,
    highlight: "Prompt emergency care",
  },
  {
    id: "4",
    name: "Anika Tabassum",
    role: "Brand Designer",
    treatment: "Laser Teeth Whitening",
    category: "cosmetic",
    rating: 5,
    date: "2 months ago",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    review: "The clinic environment is pristine, calming, and state-of-the-art. The 45-minute laser whitening brightened my teeth by 4 shades without making them sensitive. The best dental experience in town!",
    verified: true,
    highlight: "Brightened by 4 shades",
  },
  {
    id: "5",
    name: "Mahmudul Hasan",
    role: "Business Consultant",
    treatment: "Full Mouth Rehabilitation",
    category: "implants",
    rating: 5,
    date: "3 months ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    review: "Her FCPS and BCS credentials show in every step. The treatment roadmap was explained with full transparency and zero hidden costs. Eating food comfortably again after months feels miraculous.",
    verified: true,
    highlight: "Full transparency & expert care",
  },
  {
    id: "6",
    name: "Samira Rahman",
    role: "Architect",
    treatment: "Preventive Pediatric & Family Care",
    category: "general",
    rating: 5,
    date: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    review: "Dr. Shelley has an exceptional gentle manner with children. My 7-year-old daughter was previously terrified of dentists, but now she looks forward to our routine checkups with a bright smile!",
    verified: true,
    highlight: "Exceptional with kids",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Stories" },
  { id: "implants", label: "Implants & Surgery" },
  { id: "cosmetic", label: "Smile Makeover" },
  { id: "general", label: "General & Emergency" },
] as const;

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const statsContainerRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const filtered = TESTIMONIALS.filter((item) =>
    activeCategory === "all" ? true : item.category === activeCategory
  );

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

      // 2. Animated Stats Counters on Scroll
      const statItems = statsContainerRef.current?.querySelectorAll(".stat-value");
      if (statItems && statItems.length > 0) {
        statItems.forEach((el) => {
          const targetVal = parseFloat(el.getAttribute("data-target") || "0");
          const isDecimal = targetVal % 1 !== 0;
          const suffix = el.getAttribute("data-suffix") || "";

          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              el.textContent = `${isDecimal ? obj.val.toFixed(1) : Math.round(obj.val)}${suffix}`;
            },
          });
        });
      }

      // 3. Review Cards Reveal
      const cards = cardsGridRef.current?.querySelectorAll(".review-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Bottom Banner
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
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

  // Animate grid cards on category change
  useEffect(() => {
    if (cardsGridRef.current) {
      const cards = cardsGridRef.current.querySelectorAll(".review-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }
      );
    }
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full py-20 lg:py-28 bg-slate-50/60 overflow-hidden"
    >
      {/* Background Decorative Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 text-[#2B64EC] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
              <MessageSquare className="w-3.5 h-3.5" />
              Patient Stories & Reviews
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.18]">
              Trusted Smiles, <br />
              <span className="text-[#2B64EC]">Real Experiences</span>
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Read how our dedicated, patient-first approach transforms smiles and restores confidence every single day.
            </p>
          </div>

          {/* Google Overall Rating Badge */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-md flex items-center gap-5 shrink-0 self-start md:self-auto hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2B64EC] font-bold text-lg shadow-inner">
              5.0
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <span>Google Verified Reviews</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Based on 450+ patient ratings</p>
            </div>
          </div>
        </div>

        {/* Animated Clinical Metrics Strip */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Patient Trust</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="stat-value text-2xl sm:text-3xl font-extrabold text-slate-900" data-target="450" data-suffix="+">
              0+
            </div>
            <p className="text-xs text-slate-500 mt-1">Verified 5-Star Reviews</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Success Rate</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="stat-value text-2xl sm:text-3xl font-extrabold text-slate-900" data-target="99.8" data-suffix="%">
              0%
            </div>
            <p className="text-xs text-slate-500 mt-1">Procedure Precision</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Experience</span>
              <HeartHandshake className="w-4 h-4 text-amber-500" />
            </div>
            <div className="stat-value text-2xl sm:text-3xl font-extrabold text-slate-900" data-target="12" data-suffix="+ Years">
              0 Years
            </div>
            <p className="text-xs text-slate-500 mt-1">Surgical & Clinical Practice</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Doctor Dedication</span>
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="stat-value text-2xl sm:text-3xl font-extrabold text-slate-900" data-target="100" data-suffix="%">
              0%
            </div>
            <p className="text-xs text-slate-500 mt-1">Direct One-on-One Care</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#2B64EC] text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="review-card group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Quote Decorative Icon */}
              <div className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              <div>
                {/* Rating & Treatment Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {item.treatment}
                  </span>
                </div>

                {/* Highlight Tag */}
                {item.highlight && (
                  <p className="text-xs font-semibold text-[#2B64EC] mb-2 flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 inline" /> &ldquo;{item.highlight}&rdquo;
                  </p>
                )}

                {/* Review Text */}
                <p className="text-slate-600 text-[14px] sm:text-[14.5px] leading-relaxed font-normal">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Patient Profile */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      {item.verified && (
                        <span title="Verified Patient" className="inline-flex">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2B64EC]" />
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-slate-400">{item.role}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Action Banner */}
        <div
          ref={bannerRef}
          className="mt-14 bg-gradient-to-r from-[#2B64EC] to-[#1E4DB7] rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-blue-500/15 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Subtle animated light gleam */}
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 pointer-events-none animate-pulse" />

          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to experience gentle, personalized dental care?
            </h3>
            <p className="text-blue-100 text-sm max-w-xl font-normal">
              Book your consultation with Dr. Shelley Robinson today and take the first step towards a healthier, brighter smile.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <a
              href="#schedule"
              className="bg-white text-[#2B64EC] hover:bg-blue-50 active:scale-[0.98] font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
