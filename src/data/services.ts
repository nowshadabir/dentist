export interface ServiceItem {
  id: string;
  title: string;
  tag?: string;
  category: string;
  shortDesc: string;
  headline: string;
  overview: string;
  duration: string;
  recovery: string;
  comfortLevel: string;
  priceEstimate?: string;
  benefits: string[];
  steps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  doctorNote: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "whitening",
    title: "Teeth Whitening",
    tag: "Popular",
    category: "Cosmetic Dentistry",
    shortDesc: "Effective cold laser & LED solution to remove deep stains and discoloration for a brighter smile.",
    headline: "Hospital-Grade Cold Laser Smile Brightening in a Single 45-Minute Session",
    overview: "Our in-office teeth whitening combines non-thermal cold laser activation with an enamel-safe, pH-balanced formulation. It gently lifts years of stains from coffee, tea, and natural aging without eroding your dental enamel or creating tooth sensitivity.",
    duration: "45 Minutes",
    recovery: "Immediate",
    comfortLevel: "Sensitivity-Free",
    priceEstimate: "Consultation & Custom Kit included",
    benefits: [
      "Instant 6 to 8 shades brighter result",
      "Gentle, enamel-safe medical formulation",
      "Includes personalized take-home maintenance kit",
      "Results last 18 to 24+ months with routine care",
    ],
    steps: [
      {
        title: "1. Baseline Shade Scan",
        desc: "We digitally record your initial enamel shade and apply a protective barrier gel over your gums.",
      },
      {
        title: "2. Laser Gel Activation",
        desc: "The medical-grade whitening gel is applied and gently activated across three 15-minute intervals.",
      },
      {
        title: "3. Enamel Nourishment Polish",
        desc: "A post-treatment mineral varnish seals the enamel tubules to ensure zero lingering sensitivity.",
      },
    ],
    faqs: [
      {
        q: "Will this treatment make my teeth sensitive?",
        a: "Dr. Robinson utilizes a buffered, pH-neutral formula containing desensitizing agents, so over 95% of patients experience zero discomfort.",
      },
      {
        q: "How long will the results stay bright?",
        a: "With routine hygiene and occasional use of the included maintenance trays, results typically last up to two years.",
      },
    ],
    doctorNote: "We focus on protecting your enamel health first, creating a naturally vibrant smile rather than an artificial look.",
  },
  {
    id: "implant",
    title: "Dental Implants",
    tag: "Permanent Solution",
    category: "Restorative Surgery",
    shortDesc: "Biocompatible medical-grade titanium and hand-crafted porcelain crowns for missing teeth.",
    headline: "Precision Guided Single & Multi-Tooth Titanium Implant Restorations",
    overview: "Dental implants provide the most durable, natural-feeling replacement for missing teeth. Dr. Shelley Robinson uses 3D digital bone mapping and computer-guided micro-surgical placement to restore your smile's full chewing power and natural facial aesthetics.",
    duration: "60 – 90 Minutes",
    recovery: "1 – 3 Days mild healing",
    comfortLevel: "Painless Localized Comfort",
    priceEstimate: "Personalized 3D surgical plan",
    benefits: [
      "Permanent root replacement built for a lifetime",
      "Preserves natural jawbone structure and facial shape",
      "Feels, bites, and chews exactly like natural teeth",
      "Zero shaving or damage to adjacent healthy teeth",
    ],
    steps: [
      {
        title: "1. 3D Digital Bone Mapping",
        desc: "High-resolution digital CBCT imaging evaluates bone density and maps optimal implant placement.",
      },
      {
        title: "2. Computer-Guided Placement",
        desc: "The titanium or zirconia fixture is gently placed with sub-millimeter surgical precision under localized numbing.",
      },
      {
        title: "3. Custom Crown Artistry",
        desc: "A handcrafted ceramic crown is custom-shaded to seamlessly blend with your surrounding natural teeth.",
      },
    ],
    faqs: [
      {
        q: "Is dental implant placement painful?",
        a: "The procedure is performed under gentle local anesthesia. Most patients report feeling only mild pressure, comparable to a routine filling.",
      },
      {
        q: "What is the clinical success rate?",
        a: "Under Dr. Robinson's protocol at Smile Bright, our documented implant osseointegration success rate exceeds 99%.",
      },
    ],
    doctorNote: "Implant dentistry restores your bite and confidence from the root up. It's the gold standard for lasting dental health.",
  },
  {
    id: "exams",
    title: "Dental Exams & Hygiene",
    tag: "Preventive Care",
    category: "Diagnostic & Preventive",
    shortDesc: "Comprehensive checkups with HD intraoral cameras, painless ultrasonic scaling, and preventive care.",
    headline: "Unhurried 360° Diagnostic Checkup & Gentle Ultrasonic Air-Scaling",
    overview: "Regular comprehensive examinations are the cornerstone of lifelong dental health. Dr. Robinson personally conducts every diagnostic review, utilizing HD intraoral cameras and low-radiation digital imaging to detect micro-cavities, periodontal changes, and oral tissue health long before they cause pain.",
    duration: "30 – 45 Minutes",
    recovery: "Immediate",
    comfortLevel: "Completely Painless",
    priceEstimate: "Comprehensive checkup & scaling",
    benefits: [
      "Early detection of hidden decay and gum inflammation",
      "Low-radiation instant digital radiograph analysis",
      "Gentle ultrasonic warm-water cleaning without scraping",
      "Direct one-on-one doctor consultation with zero rush",
    ],
    steps: [
      {
        title: "1. Chairside HD Camera Tour",
        desc: "We inspect your teeth together on a chairside HD monitor with complete transparency.",
      },
      {
        title: "2. Ultrasonic Gentle Scaling",
        desc: "Cavitation sound waves effortlessly lift plaque and tartar buildup without enamel scratching.",
      },
      {
        title: "3. Oral Health Roadmap",
        desc: "A personalized preventive roadmap is tailored to your unique dietary and dental needs.",
      },
    ],
    faqs: [
      {
        q: "How often should I schedule an exam?",
        a: "We recommend a routine diagnostic checkup and cleaning every 6 months to maintain optimal gum and tooth health.",
      },
      {
        q: "Will ultrasonic cleaning hurt sensitive gums?",
        a: "We use temperature-regulated warm water scaling tips that soothe sensitive roots, ensuring a relaxing, painless session.",
      },
    ],
    doctorNote: "Preventive care is the easiest and most affordable way to keep your smile healthy and avoid painful dental emergencies.",
  },
  {
    id: "root-canal",
    title: "Painless Root Canal",
    tag: "Single Visit",
    category: "Endodontics",
    shortDesc: "Gentle nerve relief and restorative ceramic seal to save infected or painful teeth.",
    headline: "Microscopic Endodontic Care Designed for Immediate Pain Relief",
    overview: "When deep decay or injury reaches the dental pulp, a root canal saves the natural tooth from extraction. Dr. Robinson employs rotary nickel-titanium instruments and localized numbing to thoroughly clean and hermetically seal the root canals in a quiet, pain-free single visit.",
    duration: "45 – 60 Minutes",
    recovery: "Immediate relief",
    comfortLevel: "Pain-Free Local Anesthesia",
    priceEstimate: "Tooth-saving therapy & seal",
    benefits: [
      "Immediate relief from acute throbbing toothache",
      "Preserves your natural tooth structure for decades",
      "Completed smoothly in a single comfortable visit",
      "Reinforced with high-strength aesthetic ceramic crown",
    ],
    steps: [
      {
        title: "1. Digital Radiograph & Anesthetic",
        desc: "Pinpoint diagnosis of the canal system followed by localized, rapid-acting comfort numbing.",
      },
      {
        title: "2. Micro-Rotary Canal Cleansing",
        desc: "Gentle flexible instruments remove infected tissue and disinfect canal walls thoroughly.",
      },
      {
        title: "3. Bio-Ceramic Hermetic Seal",
        desc: "Canals are sealed with biocompatible material and restored for full bite strength.",
      },
    ],
    faqs: [
      {
        q: "Is a root canal painful?",
        a: "No. Modern root canal treatment is designed to relieve pain, not cause it. You will be completely numb throughout.",
      },
      {
        q: "Can I eat normally afterwards?",
        a: "Yes, once the localized numbness wears off in a few hours, you can resume normal eating.",
      },
    ],
    doctorNote: "Saving your natural tooth is always our first priority. A well-done root canal lasts just as long as a natural tooth.",
  },
  {
    id: "cosmetic",
    title: "Cosmetic Smile Makeover",
    tag: "Aesthetics",
    category: "Cosmetic Dentistry",
    shortDesc: "Custom hand-layered porcelain veneers and alignment mapping for natural smile symmetry.",
    headline: "Handcrafted Porcelain Veneers & Digital Aesthetic Symmetry Design",
    overview: "A cosmetic smile makeover combines artistry and dental science. Whether addressing chipped, worn, uneven, or discolored teeth, Dr. Robinson custom-crafts ultra-thin porcelain veneers that blend seamlessly with your facial contours.",
    duration: "2 Appointments",
    recovery: "Zero Downtime",
    comfortLevel: "Ultra Gentle",
    priceEstimate: "Custom aesthetic design",
    benefits: [
      "Transforms chipped, uneven, or spaced teeth",
      "Stain-resistant high-luster European porcelain",
      "Natural translucency mimicking real enamel",
      "Designed specifically for your facial geometry",
    ],
    steps: [
      {
        title: "1. Digital Smile Preview",
        desc: "We analyze facial proportions and simulate your ideal smile shape before touching any enamel.",
      },
      {
        title: "2. Micro-Preparation & Impressions",
        desc: "Minimal surface preparation is performed and high-precision optical digital scans are captured.",
      },
      {
        title: "3. Final Bonding & Curing",
        desc: "The handcrafted veneers are bonded with permanent medical resin for a radiant finish.",
      },
    ],
    faqs: [
      {
        q: "How long do porcelain veneers last?",
        a: "High-grade porcelain veneers typically last 15 to 20+ years with standard oral hygiene and checkups.",
      },
      {
        q: "Will they look unnatural or bulky?",
        a: "No. Each veneer is custom-tapered to 0.3mm thickness, ensuring natural translucency and depth.",
      },
    ],
    doctorNote: "The best cosmetic dentistry doesn't look like dentistry at all — it just looks like your best natural smile.",
  },
  {
    id: "pediatric",
    title: "Pediatric & Family Care",
    tag: "Family",
    category: "Preventive Care",
    shortDesc: "Compassionate, gentle dental checkups, sealants, and cavity prevention for children and families.",
    headline: "Positive, Fear-Free Dental Experiences for Kids and Families",
    overview: "Building lifelong dental confidence starts in childhood. Dr. Robinson provides an exceptionally calm, friendly environment where children feel safe and excited about brushing, hygiene, and regular checkups.",
    duration: "30 Minutes",
    recovery: "Immediate",
    comfortLevel: "Warm & Fun",
    priceEstimate: "Family-friendly preventive care",
    benefits: [
      "Gentle, stress-free checkups tailored to kids",
      "Protective fissure sealants preventing early cavities",
      "Fluoride varnish strengthens developing enamel",
      "Educational guidance on oral habits and nutrition",
    ],
    steps: [
      {
        title: "1. Friendly Introduction & Tour",
        desc: "We introduce young patients to the dental chair in a relaxed, playful, unhurried manner.",
      },
      {
        title: "2. Gentle Count & Polish",
        desc: "A soft, gentle cleaning with flavorful polishing pastes removes plaque effortlessly.",
      },
      {
        title: "3. Protective Shield Sealant",
        desc: "A painless clear coating is applied to molar grooves to block food debris and decay.",
      },
    ],
    faqs: [
      {
        q: "At what age should a child first visit the dentist?",
        a: "We recommend bringing your child around their first birthday or when their first tooth appears.",
      },
      {
        q: "What if my child is afraid of dentists?",
        a: "Dr. Robinson uses positive reinforcement and unhurried pacing so children build comfort and trust naturally.",
      },
    ],
    doctorNote: "Our goal is for children to leave our clinic with a smile and zero anxiety about visiting the dentist.",
  },
];
