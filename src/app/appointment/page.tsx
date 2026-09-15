"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SERVICES_DATA } from "@/data/services";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw,
  ExternalLink,
  MessageCircle
} from "lucide-react";

const TIME_SLOTS = [
  { time: "4:00 PM", status: "available" },
  { time: "4:45 PM", status: "available" },
  { time: "5:30 PM", status: "filling-fast" },
  { time: "6:15 PM", status: "available" },
  { time: "7:00 PM", status: "available" },
  { time: "7:45 PM", status: "filling-fast" },
  { time: "8:30 PM", status: "available" },
  { time: "9:15 PM", status: "available" },
];

function getUpcomingDays() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const isFriday = d.getDay() === 5;
    days.push({
      dateStr: d.toISOString().split("T")[0],
      dayName,
      monthDay,
      isClosed: isFriday,
    });
  }
  return days;
}

function AppointmentContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const daysList = getUpcomingDays();
  const defaultDay = daysList.find((d) => !d.isClosed) || daysList[0];

  const [selectedService, setSelectedService] = useState<string>("whitening");
  const [selectedDate, setSelectedDate] = useState<string>(defaultDay.dateStr);
  const [selectedTime, setSelectedTime] = useState<string>("5:30 PM");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientNotes, setPatientNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingId: string;
    serviceName: string;
    date: string;
    time: string;
    patientName: string;
    patientPhone: string;
  } | null>(null);

  useEffect(() => {
    if (serviceParam) {
      const match = SERVICES_DATA.find(
        (s) => s.id === serviceParam || s.title.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (match) setSelectedService(match.id);
    }
  }, [serviceParam]);

  const activeServiceObj = SERVICES_DATA.find((s) => s.id === selectedService) || SERVICES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomCode = `SB-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedBooking({
        bookingId: randomCode,
        serviceName: activeServiceObj.title,
        date: selectedDate,
        time: selectedTime,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
    setPatientNotes("");
  };

  const getGoogleCalendarUrl = () => {
    if (!confirmedBooking) return "#";
    const title = encodeURIComponent(`Dental Appointment: ${confirmedBooking.serviceName} with Dr. Shelley Robinson`);
    const details = encodeURIComponent(
      `Appointment Code: ${confirmedBooking.bookingId}\nDoctor: Dr. Shelley Robinson (BDS, FCPS, MS)\nPatient: ${confirmedBooking.patientName}\nLocation: Suite 402, MediCare Complex, Dhaka.`
    );
    const location = encodeURIComponent("Smile Bright Dental Clinic, Suite 402, MediCare Complex, Dhaka");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const getWhatsAppUrl = () => {
    if (!confirmedBooking) return "#";
    const msg = encodeURIComponent(
      `Hello Dr. Shelley Robinson Dental Practice,\nI have reserved an appointment:\n- Ref: ${confirmedBooking.bookingId}\n- Treatment: ${confirmedBooking.serviceName}\n- Date: ${confirmedBooking.date} (${confirmedBooking.time})\n- Patient: ${confirmedBooking.patientName} (${confirmedBooking.patientPhone})\nLooking forward to the visit!`
    );
    return `https://wa.me/8801700000000?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Minimal Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 h-18 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Practice</span>
          </Link>

          <span className="text-xs font-semibold text-slate-400">
            Dr. Shelley Robinson
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {confirmedBooking ? (
          /* ================= SUCCESS CONFIRMATION ================= */
          <div className="p-8 sm:p-12 border border-slate-200/90 rounded-3xl bg-white shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Appointment Reserved
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              We Look Forward to Seeing You
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your consultation with Dr. Shelley Robinson has been confirmed.
            </p>

            {/* Ticket Card */}
            <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider">Reference Code</span>
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  {confirmedBooking.bookingId}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Treatment</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.serviceName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Patient</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Date</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Time</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.time}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Suite 402, MediCare Complex, Dhaka Medical College Area, Dhaka.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2B64EC] hover:bg-[#1e52d1] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Add to Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Confirmation</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Book Another</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= MINIMAL BOOKING FORM ================= */
          <div>
            <div className="mb-10 pb-6 border-b border-slate-100">
              <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#2B64EC] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
                Online Reservation
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Schedule Your Appointment
              </h1>
              <p className="mt-2 text-slate-500 text-xs sm:text-sm">
                Dr. Shelley Robinson • Saturday – Thursday (4:00 PM – 9:30 PM)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* 1. Select Service */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  1. Select Treatment
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES_DATA.map((s) => {
                    const isSelected = selectedService === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                            : "border-slate-200 hover:border-slate-300 bg-white text-slate-800"
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold">{s.title}</p>
                        <p className={`text-[11px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                          {s.duration} • {s.category}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Choose Date & Time */}
              <div className="pt-6 border-t border-slate-100">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  2. Select Date & Time Slot
                </label>

                {/* Day selector */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar">
                  {daysList.map((d, i) => {
                    const isSelected = selectedDate === d.dateStr;
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={d.isClosed}
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`p-3 rounded-xl border text-center transition-all min-w-[85px] shrink-0 ${
                          d.isClosed
                            ? "opacity-35 bg-slate-50 border-slate-200 cursor-not-allowed"
                            : isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold block">{d.dayName}</span>
                        <span className="text-xs font-semibold block mt-0.5">{d.monthDay}</span>
                        {d.isClosed && (
                          <span className="text-[9px] uppercase text-rose-500 font-bold block mt-0.5">Closed</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Slots */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot, idx) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 opacity-70" />
                          {slot.time}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-white" : slot.status === "filling-fast" ? "bg-amber-400" : "bg-emerald-500"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Patient Info */}
              <div className="pt-6 border-t border-slate-100">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  3. Patient Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +880 1712 345678"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="e.g. sarah@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Notes / Symptoms (Optional)
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Tooth sensitivity, checkup"
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  No advance payment needed • Free cancellation anytime
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting || !patientName.trim() || !patientPhone.trim()}
                  className="w-full sm:w-auto bg-[#2B64EC] hover:bg-[#1e52d1] disabled:bg-slate-200 disabled:text-slate-400 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-full transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Confirming Slot...</span>
                  ) : (
                    <>
                      <span>Confirm Appointment</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs text-slate-400">Loading booking...</div>}>
      <AppointmentContent />
    </Suspense>
  );
}
