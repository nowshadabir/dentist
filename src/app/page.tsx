import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartnerLogos from "@/components/PartnerLogos";
import DentistShowcase from "@/components/DentistShowcase";
import Services from "@/components/Services";
import ClinicalShowcase from "@/components/ClinicalShowcase";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AiChatBot from "@/components/AiChatBot";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import GsapCursor from "@/components/animations/GsapCursor";
import ScrollProgress from "@/components/animations/ScrollProgress";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* GSAP Magnetic Dynamic Cursor & Sparkles */}
      <GsapCursor />

      {/* GSAP Scroll Progress Bar & Floating Back-To-Top */}
      <ScrollProgress />

      <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Brand Partners Logos with Infinite GSAP Marquee */}
        <PartnerLogos />

        {/* Dentist Showcase Section (Dr. Shelley Robinson) */}
        <DentistShowcase />

        {/* Services Section */}
        <Services />

        {/* Professional Clinical Showcase (Zoom Slider) */}
        <ClinicalShowcase />

        {/* Patient Stories & Animated Metrics Section */}
        <Testimonials />

        {/* Footer with Consultation Banner & Quick Access */}
        <Footer />

        {/* Interactive AI Agent Live Chatbot */}
        <AiChatBot />
      </main>
    </SmoothScrollProvider>
  );
}


