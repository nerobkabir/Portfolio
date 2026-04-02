// FILE: app/components/Projects.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Github, ExternalLink, ChevronDown, Layers,
  Eye, ArrowUpRight, CheckCircle2, Zap,
  Code2, Star, AlertCircle, Rocket,
} from "lucide-react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "All" | "Full-Stack" | "Frontend" | "AI-Powered";

type Project = {
  id: number;
  name: string;
  tagline: string;
  image: string;
  images?: string[];
  shortDesc: string;
  tech: string[];
  fullDesc: string;
  liveLink: string;
  githubLink: string;
  challenges: string;
  improvements: string;
  features: string[];
  category: Category;
  year?: string;
  featured?: boolean;
  accent: string;
  accentDim: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const ALL_PROJECTS: Project[] = [
  {
    id: 0, featured: true,
    name: "DevHire",
    tagline: "AI-Powered Developer Hiring Platform",
    image: "https://i.ibb.co.com/V0XRyBTG/Screenshot-198.png",
    images: [
      "https://i.ibb.co.com/Jwxk2C6q/Screenshot-195.png",
      "https://i.ibb.co.com/BVrMQY3x/Screenshot-196.png",
      "https://i.ibb.co.com/NdzZGWsP/Screenshot-197.png",
      "https://i.ibb.co.com/V0XRyBTG/Screenshot-198.png",
      "https://i.ibb.co.com/1fTc9Kn4/Screenshot-199.png",
      "https://i.ibb.co.com/N6zvyJRN/Screenshot-200.png",
    ],
    shortDesc: "Full-stack hiring platform — Google Gemini AI powers resume analysis, job descriptions, chatbot & review summariser.",
    tech: ["Next.js 15","TypeScript","Node.js","MongoDB","JWT","Gemini AI","Recharts","Tailwind v4"],
    fullDesc: "DevHire is a production-grade full-stack hiring platform with three distinct roles (Developer, Recruiter, Admin). Developers browse, apply, and get AI resume analysis. Recruiters auto-generate job descriptions and manage applicant pipelines. Admins get live analytics with Recharts bar, line & pie charts.",
    liveLink: "https://devhire-client-app.vercel.app",
    githubLink: "https://github.com/nerobkabir",
    challenges: "Architecting 3-layer TypeScript backend · 4 Gemini AI flows · role-based access for 3 roles · live Recharts MongoDB aggregations",
    improvements: "Stripe subscriptions, Socket.io notifications, video interview scheduling, mobile app, ML candidate matching.",
    features: ["AI Resume Analyser — score, skill gaps & suggestions","AI Job Description Generator for recruiters","AI Review Summariser with sentiment analysis","Conversational AI Chatbot (Gemini 1.5 Flash)","Role-based: USER / RECRUITER / ADMIN","Admin dashboard — bar, line & pie analytics","Pipeline: Pending → Shortlisted → Hired"],
    category: "AI-Powered",
    year: "2025",
    accent: "#a78bfa",
    accentDim: "rgba(167,139,250,0.07)",
  },
  {
    id: 1,
    name: "LocalChefBazaar",
    tagline: "Marketplace for Home-Cooked Meals",
    image: "https://i.ibb.co.com/SwbFNfWz/Screenshot-201.png",
    images: ["https://i.ibb.co.com/SwbFNfWz/Screenshot-201.png",
      "https://i.ibb.co.com/HfHt7876/Screenshot-202.png",
      "https://i.ibb.co.com/sJ6ZBp6B/Screenshot-203.png",
      "https://i.ibb.co.com/bg1xMWF0/Screenshot-204.png",
      "https://i.ibb.co.com/0bpcnqZ/Screenshot-205.png",
      "https://i.ibb.co.com/99R3d1LL/Screenshot-206.png"],
    shortDesc: "MERN marketplace connecting home chefs with customers — Stripe payments & real-time order tracking.",
    tech: ["React.js","Node.js","Express.js","MongoDB","Firebase","Tailwind CSS","Stripe","JWT"],
    fullDesc: "LocalChefBazaar empowers home chefs to showcase culinary skills and earn income while customers get fresh homemade meals. Role-based access, Stripe payment, real-time order tracking, and admin analytics.",
    liveLink: "https://localchefbazaar-31da8.web.app",
    githubLink: "https://github.com/nerobkabir/Local-Chef-Bazar-Client.git",
    challenges: "Real-time order updates · multi-role Chef/Customer/Admin · Stripe payment flow · image uploads",
    improvements: "AI meal recommendations, in-app messaging, subscriptions, mobile app.",
    features: ["Role-based auth (User/Chef/Admin)","Stripe payment integration","Real-time order tracking","Meal reviews & ratings","Admin analytics dashboard","Chef revenue tracking"],
    category: "Full-Stack",
    year: "2024",
    accent: "#14b8a6",
    accentDim: "rgba(20,184,166,0.06)",
  },
  {
  id: 2,
  name: "GreenGadgets Hub",
  tagline: "Eco-Friendly E-Commerce Platform",
  image: "https://i.ibb.co.com/27vKkDTD/Screenshot-207.png",
  images: [
    "https://i.ibb.co.com/27vKkDTD/Screenshot-207.png",
    "https://i.ibb.co.com/DfQgmZjN/Screenshot-208.png",
    "https://i.ibb.co.com/ccBzNJGg/Screenshot-209.png",
    "https://i.ibb.co.com/ycFGnxpv/Screenshot-210.png",
    "https://i.ibb.co.com/qLZJVYZf/Screenshot-211.png",
    "https://i.ibb.co.com/LD6M52QG/Screenshot-212.png"
  ],
  shortDesc: "Sustainable marketplace where every purchase tracks real CO₂ savings and plastic reduction.",
  tech: ["Next.js","React","Node.js","Express.js","MongoDB","Tailwind CSS","JWT"],
  fullDesc: "GreenGadgets Hub lets users explore sustainable products while tracking CO₂ savings, plastic reduction, and tree equivalents.",
  liveLink: "https://green-gadgets-hub.vercel.app",
  githubLink: "https://github.com/nerobkabir",
  challenges: "Real-time aggregated environmental counters · cookie-based auth · eco-verification system",
  improvements: "Stripe checkout, wishlist, admin dashboard, reviews, multi-language.",
  features: ["Eco product marketplace","Real-time CO₂ savings tracker","Trees equivalent visualisation","Protected product creation","Toast notifications","Fully responsive UI"],
  category: "Full-Stack",
  year: "2024",
  accent: "#22c55e",
  accentDim: "rgba(34,197,94,0.06)",
},

{
  id: 3,
  name: "NexChat",
  tagline: "Real-time Messaging Application",
  image: "https://i.ibb.co.com/spjwrPwV/Screenshot-214.png",
  images: [
    "https://i.ibb.co.com/XrnNYtfY/Screenshot-213.png",
    "https://i.ibb.co.com/spjwrPwV/Screenshot-214.png",
    "https://i.ibb.co.com/99T4cD4k/Screenshot-215.png",
    "https://i.ibb.co.com/XrnNYtfY/Screenshot-213.png",
    "https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png",
    "https://i.ibb.co.com/99T4cD4k/Screenshot-215.png"
  ],
  shortDesc: "WhatsApp-like browser chat — instant messages, typing indicators & read receipts via Socket.io.",
  tech: ["Next.js","Node.js","Express.js","MongoDB","Socket.io","Zustand","JWT","Tailwind CSS"],
  fullDesc: "NexChat is a full-stack real-time chat app.",
  liveLink: "https://nexchat-frontend-six.vercel.app",
  githubLink: "https://github.com/nerobkabir",
  challenges: "Reliable WebSocket connections · Zustand real-time state · typing indicators without lag · JWT httpOnly cookies",
  improvements: "Group chats, media sharing, message reactions, push notifications, E2E encryption.",
  features: ["Socket.io WebSocket messaging","Live typing indicator","Read receipts (double tick)","Online/offline status","JWT httpOnly cookies","Persistent MongoDB history"],
  category: "Full-Stack",
  year: "2024",
  accent: "#3b82f6",
  accentDim: "rgba(59,130,246,0.06)",
},
  {
    id: 4,
    name: "Artify",
    tagline: "Creative Artwork Showcase Platform",
    image: "https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png",
    images: ["https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png",
      "https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png",
      "https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png",
      "https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png",
      "https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png",
      "https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png"],
    shortDesc: "Platform for artists to upload, showcase, and discover creative artworks with gallery browsing.",
    tech: ["React.js","Node.js","Express.js","MongoDB","Firebase","Tailwind CSS","Swiper.js"],
    fullDesc: "Artify is a creative platform where artists showcase artworks, explore galleries, filter by categories, and interact with the community. Elegant UI with powerful content management.",
    liveLink: "https://bejewelled-panda-60b4b5.netlify.app",
    githubLink: "https://github.com/nerobkabir/Showcase-flartform-client.git",
    challenges: "JWT auth · artwork upload validation · intuitive favourites system · cross-device responsiveness",
    improvements: "Social sharing, NFT integration, virtual gallery tours, commission requests.",
    features: ["Artwork upload & processing","Search & category filtering","Favourites & bookmark system","Email & Google OAuth","Private routes","Fully responsive"],
    category: "Full-Stack",
    year: "2024",
    accent: "#f59e0b",
    accentDim: "rgba(245,158,11,0.06)",
  },
  {
    id: 5,
    name: "Skillswap",
    tagline: "Skill Sharing & Learning Platform",
    image: "https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png",
    images: ["https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png",
      "https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png",
      "https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png",
      "https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png",
      "https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png",
      "https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png"],
    shortDesc: "Community platform connecting teachers with learners — knowledge exchanged for knowledge.",
    tech: ["React.js","React Router","Firebase","Tailwind CSS","React Hot Toast","Vite"],
    fullDesc: "Skillswap creates a collaborative environment where users showcase skills, discover others, and exchange knowledge.",
    liveLink: "https://harmonious-paprenjak-77441a.netlify.app",
    githubLink: "https://github.com/nerobkabir/Sunflower",
    challenges: "Firebase Google OAuth + email auth · real-time skill search · context-based state management",
    improvements: "Real-time messaging, skill endorsements, video sessions, premium exchanges, forums.",
    features: ["Email & Google OAuth (Firebase)","User profile with skills & bio","Browse & search by skill","User directory","Toast notifications","Private routes"],
    category: "Frontend",
    year: "2024",
    accent: "#ec4899",
    accentDim: "rgba(236,72,153,0.06)",
  },
  {
    id: 6,
    name: "CareNext",
    tagline: "Childcare & Elderly Care Booking",
    image: "https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png",
    images: ["https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png",
      "https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png",
      "https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png",
      "https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png",
      "https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png",
      "https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png"],
    shortDesc: "Book care services with dynamic cost calc, status tracking & email invoice delivery.",
    tech: ["Next.js","React","Node.js","MongoDB","NextAuth","Google OAuth","Tailwind CSS","Nodemailer"],
    fullDesc: "CareNext helps users book reliable care services with dynamic cost calculation, status tracking, and email invoices.",
    liveLink: "https://care-nest-five.vercel.app/",
    githubLink: "https://github.com/nerobkabir",
    challenges: "Multi-step location selector · dynamic pricing · booking state management · Nodemailer invoices",
    improvements: "Stripe payment, admin analytics, caregiver verification, reviews, notifications.",
    features: ["Dynamic booking with location selector","Auto cost calc (duration × rate)","Status: Pending/Confirmed/Done","NextAuth (Google + Email)","Email invoice on confirmation","Bookings with cancel option"],
    category: "Full-Stack",
    year: "2024",
    accent: "#06b6d4",
    accentDim: "rgba(6,182,212,0.06)",
  },
  {
    id: 7,
    name: "Hero Apps",
    tagline: "Modern App Discovery Platform",
    image: "https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png",
    images: ["https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png",
      "https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png",
      "https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png",
      "https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png",
      "https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png",
      "https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png"],
    shortDesc: "App discovery & management with install tracking, sort/filter, and real-time toast feedback.",
    tech: ["React.js","Tailwind CSS","React Router","LocalStorage","Lucide React"],
    fullDesc: "Hero Apps lets users explore, install, and manage trending apps with intuitive interface and persistent LocalStorage state.",
    liveLink: "https://candid-monstera-42301f.netlify.app",
    githubLink: "https://github.com/nerobkabir/Hero-Apps.git",
    challenges: "Install/uninstall with LocalStorage · real-time toasts · intuitive sort/filter UI",
    improvements: "User accounts, sync, reviews, dark mode, backend API.",
    features: ["App install/uninstall system","Real-time toast notifications","Sort by downloads","App details view","LocalStorage persistence","Mobile-friendly design"],
    category: "Frontend",
    year: "2024",
    accent: "#f97316",
    accentDim: "rgba(249,115,22,0.06)",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function getSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

// ── IntersectionObserver hook ─────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ── Carousel (macOS-style) with compact dimensions ───────────────────────────
function Carousel({ images, liveLink, accent }: { images: string[]; liveLink: string; accent: string }) {
  const slides = images.length >= 3 ? images : Array(3).fill(images[0] ?? "");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => setActive(p => (p + 1) % slides.length), 3200);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [playing, slides.length]);

  return (
    <div
      className="rounded-xl overflow-hidden w-full"
      style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)` }}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06]"
        style={{ background: "#0e1420" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="px-3 py-1 rounded-md font-mono text-[10px] truncate"
            style={{ background: "#1a2235", color: "rgba(156,163,175,0.45)" }}>
            {liveLink.replace(/^https?:\/\//, "").slice(0, 40)}
          </div>
        </div>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
      </div>

      {/* Slide area – height reduced to 190px for compactness */}
      <div className="relative overflow-hidden" style={{ height: 190 }}>
        <div className="flex h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((src, i) => (
            <div key={i} className="w-full h-full flex-shrink-0">
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {/* Counter */}
        <div className="absolute bottom-2 right-3 text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.4)", backdropFilter: "blur(4px)" }}>
          {active + 1} / {slides.length}
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((active + 1) / slides.length) * 100}%`, background: accent }} />
        </div>
      </div>

      {/* Thumbnails – more compact */}
      <div className="flex gap-1.5 p-1.5 border-t border-white/[0.05]"
        style={{ background: "#080d16" }}>
        {slides.map((src, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setPlaying(false); }}
            className="relative flex-shrink-0 rounded overflow-hidden transition-all duration-200"
            style={{
              width: 36,
              height: 24,
              outline: `2px solid ${i === active ? accent : "transparent"}`,
              outlineOffset: "1px",
              opacity: i === active ? 1 : 0.38,
              transform: i === active ? "scale(1.04)" : "scale(1)",
            }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Info Tabs ────────────────────────────────────────────────────────────────
type InfoTab = "overview" | "features" | "challenges";

function InfoPanel({ project, hovered }: { project: Project; hovered: boolean }) {
  const [tab, setTab] = useState<InfoTab>("overview");
  const tags = project.challenges.split("·").map(s => s.trim()).filter(Boolean);

  const tabs: { id: InfoTab; label: string }[] = [
    { id: "overview",   label: "Overview"   },
    { id: "features",   label: "Features"   },
    { id: "challenges", label: "Challenges" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 p-1 rounded-xl"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-250"
            style={{
              background: tab === t.id ? `${project.accent}22` : "transparent",
              color: tab === t.id ? project.accent : "rgba(156,163,175,0.45)",
              border: tab === t.id ? `1px solid ${project.accent}35` : "1px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="min-h-[110px] transition-all duration-300">
        {tab === "overview" && (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed" style={{ color: "rgba(156,163,175,0.7)" }}>
              {project.shortDesc}
            </p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: `${project.accent}0d`, border: `1px solid ${project.accent}25` }}>
              <Zap className="w-3.5 h-3.5 flex-shrink-0" style={{ color: project.accent }} />
              <p className="text-xs leading-relaxed" style={{ color: `${project.accent}cc` }}>
                {project.fullDesc.slice(0, 120)}…
              </p>
            </div>
          </div>
        )}
        {tab === "features" && (
          <ul className="space-y-2">
            {project.features.slice(0, 5).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: project.accent }} />
                <span style={{ color: "rgba(209,213,219,0.65)" }}>{f}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === "challenges" && (
          <div className="space-y-2">
            {tags.map((tag, i) => (
              <div key={i} className="flex items-start gap-2.5 px-3 py-2 rounded-xl text-xs"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
                <span style={{ color: "rgba(209,213,219,0.6)" }}>{tag}</span>
              </div>
            ))}
            <p className="text-xs pt-1" style={{ color: "rgba(156,163,175,0.35)" }}>
              Roadmap: {project.improvements.slice(0, 80)}…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Project Card (with working Details button) ────────────────────────────────
// FILE: app/components/Projects.tsx
// (Only the modified ProjectCard and the main component remain the same, but I'll show the full file with the updated card for clarity)
// ... (rest of imports, types, data, Carousel, InfoPanel removed, etc.)

// ── Simplified Project Card ───────────────────────────────────────────────────
export function ProjectCard({ project, index, delay }: { project: Project; index: number; delay: number }) {
  const { ref, vis } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const isOdd = index % 2 === 1;
  const images = project.images ?? Array(6).fill(project.image);

  return (
    <div
      ref={ref}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 70% 60% at ${isOdd ? "80%" : "20%"} 40%, ${project.accentDim} 0%, transparent 70%), #030508`,
        border: `1px solid ${hovered ? `${project.accent}30` : "rgba(255,255,255,0.055)"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${project.accent}18, 0 24px 60px -12px ${project.accent}20, 0 8px 32px rgba(0,0,0,0.7)`
          : "0 4px 24px rgba(0,0,0,0.55)",
        transform: vis ? (hovered ? "translateY(-5px)" : "translateY(0)") : "translateY(28px)",
        opacity: vis ? 1 : 0,
        transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms, box-shadow .3s ease, border-color .3s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-350"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${project.accent}70 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
        }} />

      {project.featured && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}40`, color: project.accent }}>
          <Star className="w-2.5 h-2.5 fill-current" /> Featured
        </div>
      )}

      <div className={`flex flex-col ${isOdd ? "md:flex-row-reverse" : "md:flex-row"}`}>
        {/* Carousel side – 45% */}
        <div className="md:w-[45%] p-4 md:p-5 flex items-center">
          <Carousel images={images} liveLink={project.liveLink} accent={project.accent} />
        </div>

        {/* Text side – 55% – simplified */}
        <div
          className="md:w-[55%] p-6 md:p-8 flex flex-col justify-center gap-4"
          style={{
            borderLeft: isOdd ? "none" : "1px solid rgba(255,255,255,0.04)",
            borderRight: isOdd ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border"
              style={{ color: project.accent, borderColor: `${project.accent}35`, background: `${project.accent}0f` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.accent }} />
              {project.category}
            </span>
            {project.year && (
              <span className="font-mono text-xs" style={{ color: "rgba(156,163,175,0.35)" }}>{project.year}</span>
            )}
          </div>

          <div>
            <h3 className="text-2xl md:text-[1.65rem] font-bold leading-tight mb-1.5 transition-colors duration-200"
              style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.88)" }}>
              {project.name}
            </h3>
            <p className="text-sm font-medium" style={{ color: `${project.accent}99` }}>
              {project.tagline}
            </p>
          </div>

          {/* Short description – just one paragraph */}
          <p className="text-sm leading-relaxed text-gray-400 line-clamp-3">
            {project.shortDesc}
          </p>

          {/* Tech stack – only 4 pills */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] border transition-colors duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: hovered ? `${project.accent}28` : "rgba(255,255,255,0.08)",
                  color: "rgba(209,213,219,0.6)",
                }}>
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2.5 py-1 text-[11px]" style={{ color: "rgba(156,163,175,0.25)" }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Action buttons – GitHub, Live Demo, Details */}
          <div className="flex flex-wrap gap-2.5 items-center pt-2">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{ border: "1px solid rgba(255,255,255,0.11)", background: "rgba(255,255,255,0.04)", color: "rgba(209,213,219,0.75)" }}>
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: project.accent,
                color: "#000",
                boxShadow: hovered ? `0 0 18px ${project.accent}55` : "none",
              }}>
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
            <Link
              href={`/projects/${getSlug(project.name)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ml-auto"
              style={{ border: `1px solid ${project.accent}28`, background: `${project.accent}0a`, color: `${project.accent}cc` }}>
              <Eye className="w-4 h-4" /> Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const { ref: hRef, vis: hVis } = useInView(0.1);
  const visible = showAll ? ALL_PROJECTS : ALL_PROJECTS.slice(0, 3);
  const remaining = ALL_PROJECTS.length - 3;

  return (
    <section id="projects" className="py-10 md:py-14 px-4 relative overflow-hidden" style={{ background: "#000" }}>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatDot { 0%,100%{transform:translateY(0) scale(1);opacity:.35} 50%{transform:translateY(-16px) scale(1.1);opacity:.6} }
        @keyframes scanLine { from{transform:translateX(-100%)} to{transform:translateX(220%)} }
      `}</style>

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "linear-gradient(rgba(20,184,166,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,.5) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: 900, height: 500, background: "radial-gradient(ellipse at 50% 0%,rgba(20,184,166,.055) 0%,transparent 70%)" }} />
        {[
          { x: "6%", y: "12%", s: 4, d: 0, c: "#14b8a6" },
          { x: "93%", y: "18%", s: 3, d: 1.1, c: "#a78bfa" },
          { x: "4%", y: "68%", s: 2, d: 2.3, c: "#14b8a6" },
          { x: "96%", y: "58%", s: 4, d: 0.7, c: "#ec4899" },
          { x: "50%", y: "92%", s: 3, d: 1.7, c: "#a78bfa" },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full"
            style={{ left: d.x, top: d.y, width: d.s, height: d.s, background: d.c, animation: `floatDot ${5 + i * 0.7}s ease-in-out ${d.d}s infinite` }} />
        ))}
        <div className="absolute top-0 left-0 h-px w-1/3"
          style={{ background: "linear-gradient(to right,transparent,rgba(20,184,166,0.45),transparent)", animation: "scanLine 7s linear 1.5s infinite" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Centered Header ── */}
        <div
          ref={hRef}
          className="text-center mb-16"
          style={{
            opacity: hVis ? 1 : 0,
            transform: hVis ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-4 h-px" style={{ background: "#14b8a6" }} />
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "rgba(156,163,175,0.45)" }}>
              Featured Work
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
            Things I've Built<br />
            <span style={{ color: "#14b8a6" }}>for Real Impact.</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "rgba(156,163,175,0.55)" }}>
            A curated set of projects — each solving a genuine problem, each with its own story.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm mt-4" style={{ color: "rgba(156,163,175,0.3)" }}>
            <Rocket className="w-4 h-4" />
            {ALL_PROJECTS.length} projects shipped
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} delay={i * 80} />
          ))}
        </div>

        {/* Show more/less */}
        {ALL_PROJECTS.length > 3 && (
          <div className="flex justify-center mt-14">
            <button onClick={() => setShowAll(v => !v)}
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(209,213,219,0.7)" }}>
              {showAll ? (
                <><ChevronDown className="w-4 h-4 rotate-180 text-teal-400" /> Show Less</>
              ) : (
                <>
                  <Layers className="w-4 h-4 text-teal-400" />
                  See All Projects
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "rgba(20,184,166,0.14)", color: "#14b8a6", border: "1px solid rgba(20,184,166,0.3)" }}>
                    +{remaining}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}