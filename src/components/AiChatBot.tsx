"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  X, 
  ArrowUp, 
  Plus, 
  RotateCcw, 
  Calendar, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { ThinkingOrb, OrbState } from "@/components/ui/thinking-orb";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp?: string;
  action?: {
    label: string;
    href: string;
  };
  card?: {
    title: string;
    details: string[];
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "ai",
    text: "Hello! I'm SmileAI, Dr. Shelley Robinson's clinical assistant. How can I help with your dental care today?",
  },
];

const SUGGESTIONS = [
  "Dr. Shelley's qualifications",
  "Chamber hours & location",
  "Dental implants pricing",
  "Teeth whitening details",
  "Emergency appointment",
];

export default function AiChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [orbState, setOrbState] = useState<OrbState>("listening");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setOrbState("searching");

    setTimeout(() => {
      setOrbState("solving");
    }, 450);

    setTimeout(() => {
      setOrbState("composing");
      const lower = text.toLowerCase();
      let reply: Message;

      if (lower.includes("qualification") || lower.includes("doctor") || lower.includes("shelley") || lower.includes("degree")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Dr. Shelley Robinson is an experienced dental specialist with top credentials across clinical surgery and restorative care.",
          card: {
            title: "Qualifications & Credentials",
            details: [
              "BDS (Bachelor of Dental Surgery)",
              "BCS (Health Cadre)",
              "FCPS (Fellow of College of Physicians & Surgeons)",
              "MS in Oral & Maxillofacial Care",
              "Dhaka Medical College & Hospital Associate",
              "BMDC Registered Specialist"
            ],
          },
          action: {
            label: "View Full Profile",
            href: "#about",
          },
        };
      } else if (lower.includes("hour") || lower.includes("time") || lower.includes("when") || lower.includes("location") || lower.includes("where") || lower.includes("chamber")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Here is the chamber schedule and clinic location for Dr. Shelley Robinson:",
          card: {
            title: "Chamber Information",
            details: [
              "Saturday – Thursday: 4:00 PM – 9:30 PM",
              "Friday: Closed (Emergency triage available)",
              "Suite 402, MediCare Complex, DMC Area, Dhaka"
            ],
          },
          action: {
            label: "Book an Appointment",
            href: "#schedule",
          },
        };
      } else if (lower.includes("implant") || lower.includes("cost") || lower.includes("price") || lower.includes("fee")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "We offer Swiss and German titanium & zirconia dental implants with computer-guided micro-surgical precision. Transparent pricing plans are provided following an initial 3D digital scan.",
          card: {
            title: "Treatment Highlights",
            details: [
              "Long-term structural warranty",
              "Minimally invasive placement",
              "Flexible payment plans"
            ],
          },
          action: {
            label: "Book 3D Implant Assessment",
            href: "#schedule",
          },
        };
      } else if (lower.includes("whiten") || lower.includes("pain") || lower.includes("laser") || lower.includes("hurt")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Our laser teeth whitening is completely painless and gentle on sensitive teeth, brightening your smile by up to 8 shades in a single 45-minute visit.",
          action: {
            label: "Explore Services",
            href: "#services",
          },
        };
      } else if (lower.includes("emergency") || lower.includes("pain") || lower.includes("urgent") || lower.includes("broken")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "If you have severe swelling or acute tooth pain, same-day priority appointments are reserved for emergency triage.",
          action: {
            label: "Book Priority Emergency Slot",
            href: "#schedule",
          },
        };
      } else {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I can help you explore treatments, check chamber availability, or book a consultation with Dr. Shelley Robinson.",
          action: {
            label: "Book an Appointment",
            href: "#schedule",
          },
        };
      }

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
      setOrbState("listening");
    }, 1000);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setOrbState("listening");
  };

  return (
    <>
      {/* Floating Minimal Launcher (No Background, Black ThinkingOrb) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Chat"
          className="relative group flex items-center justify-center cursor-pointer bg-transparent border-none p-0 outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          {isOpen ? (
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg transition-all">
              <X className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-transparent">
              <ThinkingOrb state={orbState} size={64} theme="light" />
            </div>
          )}
        </button>
      </div>

      {/* ChatGPT Style Minimalist Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] max-h-[640px] h-[82vh] bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 flex flex-col overflow-hidden animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 flex items-center justify-center">
                <ThinkingOrb state={orbState} size={20} theme="light" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[13.5px] text-[#0d0d0d] tracking-tight">
                  SmileAI
                </span>
                <span className="text-[11px] font-normal text-slate-400">
                  Dr. Shelley Practice
                </span>
              </div>
            </div>

            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handleReset}
                title="New chat"
                className="p-1.5 text-slate-500 hover:text-black rounded-lg hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-slate-500 hover:text-black rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-5 bg-white text-[13.5px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {msg.sender === "user" ? (
                  /* User Message: ChatGPT Style Gray Capsule */
                  <div className="max-w-[85%] bg-[#f4f4f4] text-[#0d0d0d] rounded-3xl px-4 py-2.5 leading-relaxed font-normal">
                    {msg.text}
                  </div>
                ) : (
                  /* AI Message: ChatGPT Style Clean Minimalist Layout */
                  <div className="w-full space-y-2 text-[#0d0d0d] leading-relaxed font-normal">
                    <p>{msg.text}</p>

                    {/* Card Content if present */}
                    {msg.card && (
                      <div className="my-2 p-3.5 bg-[#fbfbfb] border border-slate-200/70 rounded-xl space-y-2">
                        <p className="font-semibold text-xs text-[#0d0d0d]">{msg.card.title}</p>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {msg.card.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-slate-400 mt-0.5">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Button */}
                    {msg.action && (
                      <div className="pt-1">
                        <a
                          href={msg.action.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-black bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          {msg.action.label}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Thinking / Typing State */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <div className="w-4 h-4 flex items-center justify-center">
                  <ThinkingOrb state={orbState} size={20} theme="light" />
                </div>
                <span>Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Minimal Suggestions Row */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  className="whitespace-nowrap text-[11.5px] font-normal bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 px-3 py-1 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* ChatGPT Style Input Container */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative flex items-center bg-[#f4f4f4] focus-within:bg-white focus-within:border-slate-400 border border-transparent rounded-3xl transition-all pl-4 pr-1.5 py-1.5"
            >
              <input
                ref={inputRef as any}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask SmileAI anything..."
                className="w-full bg-transparent text-[13px] text-[#0d0d0d] placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="w-8 h-8 rounded-full bg-black text-white disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center transition-colors shrink-0 ml-2 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-400 mt-2 font-normal">
              SmileAI provides general dental information • Consult Dr. Shelley for diagnosis
            </p>
          </div>

        </div>
      )}
    </>
  );
}
