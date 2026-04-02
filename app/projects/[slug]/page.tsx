// FILE: app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Github, ExternalLink, Home, ChevronLeft, Code2, AlertTriangle, Sparkles } from "lucide-react";
import Link from "next/link";

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
};

function getSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const ALL_PROJECTS: Project[] = [
  {
    id: 0, featured: true,
    name: "DevHire",
    tagline: "AI-Powered Developer Hiring Platform",
    image: "https://i.ibb.co.com/V0XRyBTG/Screenshot-198.png",
    images: ["https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png","https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png","https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png","https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png","https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png","https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png"],
    shortDesc: "Full-stack hiring platform — Google Gemini AI powers resume analysis, job descriptions, chatbot & review summariser.",
    tech: ["Next.js 15","TypeScript","Node.js","MongoDB","JWT","Gemini AI","Recharts","Tailwind v4"],
    fullDesc: "DevHire is a production-grade full-stack hiring platform with three distinct roles (Developer, Recruiter, Admin). Developers browse, apply, and get AI resume analysis. Recruiters auto-generate job descriptions and manage applicant pipelines. Admins get live analytics with Recharts bar, line & pie charts.",
    liveLink: "https://devhire-client-app.vercel.app",
    githubLink: "https://github.com/nerobkabir",
    challenges: "Architecting a clean 3-layer TypeScript backend. Integrating 4 Gemini AI flows with prompt engineering. Role-based access for 3 roles. Wiring live Recharts to MongoDB aggregations.",
    improvements: "Stripe subscriptions. Socket.io notifications. Video interview scheduling. Mobile app. ML candidate matching.",
    features: ["AI Resume Analyser — score, skill gaps & job suggestions","AI Job Description Generator for recruiters","AI Review Summariser with sentiment analysis","Conversational AI Chatbot (Gemini 1.5 Flash)","Role-based access: USER / RECRUITER / ADMIN","Admin dashboard — bar, line & pie analytics"],
    category: "AI-Powered", year: "2025",
  },
  {
    id: 1, name: "LocalChefBazaar", tagline: "Marketplace for Home-Cooked Meals",
    image: "https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png",
    images: ["https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png","https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png","https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png","https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png","https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png","https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png"],
    shortDesc: "MERN marketplace connecting home chefs with customers — Stripe payments & real-time order tracking.",
    tech: ["React.js","Node.js","Express.js","MongoDB","Firebase","Tailwind CSS","Stripe","JWT"],
    fullDesc: "LocalChefBazaar empowers home chefs to showcase culinary skills and earn income while customers get fresh homemade meals. Features role-based access, Stripe payment, real-time order tracking, and admin analytics.",
    liveLink: "https://localchefbazaar-31da8.web.app", githubLink: "https://github.com/nerobkabir/Local-Chef-Bazar-Client.git",
    challenges: "Real-time order updates. Multi-role system (Chef/Customer/Admin). Stripe payment flow. Efficient image uploads.",
    improvements: "AI meal recommendations. In-app messaging. Subscriptions. Mobile app.",
    features: ["Role-based auth (User/Chef/Admin)","Stripe payment integration","Real-time order tracking","Meal reviews & ratings"],
    category: "Full-Stack", year: "2024",
  },
  {
    id: 2, name: "NexChat", tagline: "Real-time Messaging Application",
    image: "https://i.ibb.co.com/27vKkDTD/Screenshot-207.png",
    images: ["https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png","https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png","https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png","https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png","https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png","https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png"],
    shortDesc: "WhatsApp-like browser chat — instant messages, typing indicators & read receipts via Socket.io.",
    tech: ["Next.js","Node.js","Express.js","MongoDB","Socket.io","Zustand","JWT","Tailwind CSS"],
    fullDesc: "NexChat is a full-stack real-time chat app. Messages appear instantly, typing indicators show live, and read receipts confirm delivery — all via Socket.io WebSockets.",
    liveLink: "https://nexchat-frontend-six.vercel.app", githubLink: "https://github.com/nerobkabir",
    challenges: "Reliable WebSocket connections. Zustand real-time state across users. Typing indicators without lag. JWT via httpOnly cookies.",
    improvements: "Group chats. Media sharing. Message reactions. Push notifications. E2E encryption.",
    features: ["Socket.io WebSocket messaging","Live typing indicator","Read receipts (double tick)","Online/offline status"],
    category: "Full-Stack", year: "2024",
  },
  {
    id: 3, name: "GreenGadgets Hub", tagline: "Eco-Friendly E-Commerce Platform",
    image: "https://i.ibb.co.com/spjwrPwV/Screenshot-214.png",
    images: ["https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png","https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png","https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png","https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png","https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png","https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png"],
    shortDesc: "Sustainable marketplace where every purchase tracks real CO₂ savings and plastic reduction.",
    tech: ["Next.js","React","Node.js","Express.js","MongoDB","Tailwind CSS","JWT"],
    fullDesc: "GreenGadgets Hub lets users explore sustainable products while tracking CO₂ savings, plastic reduction, and tree equivalents.",
    liveLink: "https://green-gadgets-hub.vercel.app", githubLink: "https://github.com/nerobkabir",
    challenges: "Real-time aggregated environmental counters. Cookie-based auth. Eco-verification system design.",
    improvements: "Stripe checkout. Wishlist. Admin dashboard. Reviews. Multi-language support.",
    features: ["Eco product marketplace","Real-time CO₂ savings tracker","Trees equivalent visualisation","Protected product creation"],
    category: "Full-Stack", year: "2024",
  },
  {
    id: 4, name: "Artify", tagline: "Creative Artwork Showcase Platform",
    image: "https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png",
    images: ["https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png","https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png","https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png","https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png","https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png","https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png"],
    shortDesc: "Platform for artists to upload, showcase, and discover creative artworks with gallery browsing.",
    tech: ["React.js","Node.js","Express.js","MongoDB","Firebase","Tailwind CSS","Swiper.js"],
    fullDesc: "Artify is a creative platform where artists showcase artworks, explore galleries, filter by categories, and interact with the community.",
    liveLink: "https://bejewelled-panda-60b4b5.netlify.app", githubLink: "https://github.com/nerobkabir/Showcase-flartform-client.git",
    challenges: "JWT auth and upload validation. Intuitive favourites system. Cross-device responsiveness.",
    improvements: "Social sharing. NFT integration. Virtual gallery tours. Commission requests.",
    features: ["Artwork upload & processing","Search & category filtering","Favourites & bookmark system","Private routes"],
    category: "Full-Stack", year: "2024",
  },
  {
    id: 5, name: "Skillswap", tagline: "Skill Sharing & Learning Platform",
    image: "https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png",
    images: ["https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png","https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png","https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png","https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png","https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png","https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png"],
    shortDesc: "Community platform connecting teachers with learners — knowledge exchanged for knowledge.",
    tech: ["React.js","React Router","Firebase","Tailwind CSS","React Hot Toast","Vite"],
    fullDesc: "Skillswap creates a collaborative environment where users showcase skills, discover others, and exchange knowledge.",
    liveLink: "https://harmonious-paprenjak-77441a.netlify.app", githubLink: "https://github.com/nerobkabir/Sunflower",
    challenges: "Firebase Google OAuth + email auth. Real-time skill search. Context-based state management.",
    improvements: "Real-time messaging. Skill endorsements. Video sessions. Premium exchanges. Forums.",
    features: ["Email & Google OAuth (Firebase)","User profile with skills & bio","Browse & search by skill","Private routes"],
    category: "Frontend", year: "2024",
  },
  {
    id: 6, name: "CareNext", tagline: "Childcare & Elderly Care Booking",
    image: "https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png",
    images: ["https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png","https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png","https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png","https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png","https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png","https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png"],
    shortDesc: "Book care services with dynamic cost calc, status tracking & email invoice delivery.",
    tech: ["Next.js","React","Node.js","MongoDB","NextAuth","Google OAuth","Tailwind CSS","Nodemailer"],
    fullDesc: "CareNext helps users book reliable care services with multi-step location selection, dynamic cost calculation, status tracking, and email invoices.",
    liveLink: "https://care-nest-five.vercel.app/", githubLink: "https://github.com/nerobkabir",
    challenges: "Multi-step location selector (Division→City). Dynamic pricing logic. Booking state management. Nodemailer invoice delivery.",
    improvements: "Stripe payment. Admin analytics. Caregiver verification. Reviews. Real-time notifications.",
    features: ["Dynamic booking with location selector","Auto cost calc (duration × rate)","Status: Pending/Confirmed/Done","Email invoice on confirmation"],
    category: "Full-Stack", year: "2024",
  },
  {
    id: 7, name: "Hero Apps", tagline: "Modern App Discovery Platform",
    image: "https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png",
    images: ["https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png","https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png","https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png","https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png","https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png","https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png"],
    shortDesc: "App discovery & management with install tracking, sort/filter, and real-time toast feedback.",
    tech: ["React.js","Tailwind CSS","React Router","LocalStorage","Lucide React"],
    fullDesc: "Hero Apps lets users explore, install, and manage trending apps with real-time feedback and persistent LocalStorage state.",
    liveLink: "https://candid-monstera-42301f.netlify.app", githubLink: "https://github.com/nerobkabir/Hero-Apps.git",
    challenges: "Install/uninstall system with LocalStorage. Real-time toast notifications. Intuitive sort/filter UI.",
    improvements: "User accounts, sync, reviews, dark mode, backend API.",
    features: ["App install/uninstall system","Real-time toast notifications","Sort by downloads","LocalStorage persistence"],
    category: "Frontend", year: "2024",
  },
];

const CAT_COLOR: Record<string, string> = {
  "AI-Powered": "#a78bfa",
  "Full-Stack":  "#14b8a6",
  "Frontend":    "#f472b6",
};

function TechIcon({ tech }: { tech: string }) {
  const map: Record<string, [string, string]> = {
    "React.js": ["#61dafb","R"], React: ["#61dafb","R"],
    "Next.js 15": ["#ffffff","N"], "Next.js": ["#ffffff","N"], Next: ["#ffffff","N"],
    "Node.js": ["#68a063","N"], Node: ["#68a063","N"],
    TypeScript: ["#3178c6","T"],
    MongoDB: ["#47a248","M"],
    Firebase: ["#ffca28","F"],
    "Tailwind CSS": ["#38bdf8","T"], "Tailwind v4": ["#38bdf8","T"], Tailwind: ["#38bdf8","T"],
    "Express.js": ["#aaaaaa","E"], Express: ["#aaaaaa","E"],
    JWT: ["#d63aff","J"],
    "Gemini AI": ["#4285f4","G"],
    Recharts: ["#22c55e","R"],
    Stripe: ["#635bff","S"],
    "Socket.io": ["#25c2a0","S"], Socket: ["#25c2a0","S"],
    Zustand: ["#e8701a","Z"],
    Vite: ["#646cff","V"],
    NextAuth: ["#333333","A"],
    Nodemailer: ["#0f9d58","N"],
    "Swiper.js": ["#0080ff","S"], Swiper: ["#0080ff","S"],
    LocalStorage: ["#f59e0b","L"],
    "React Router": ["#ca4245","R"],
    "React Hot Toast": ["#ff6154","T"],
    "Lucide React": ["#f472b6","L"],
    "Google OAuth": ["#4285f4","G"],
  };
  let bg = "#14b8a6", letter = tech.charAt(0).toUpperCase();
  for (const [key, [color, ltr]] of Object.entries(map)) {
    if (tech === key || tech.startsWith(key)) { bg = color; letter = ltr; break; }
  }
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
      style={{ background: `${bg}20`, border: `1px solid ${bg}50`, color: bg }}
    >
      {letter}
    </div>
  );
}

export async function generateStaticParams() {
  return ALL_PROJECTS.map(p => ({ slug: getSlug(p.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = ALL_PROJECTS.find(x => getSlug(x.name) === slug);
  if (!p) return { title: "Project Not Found" };
  return { title: `${p.name} | Portfolio`, description: p.shortDesc };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find(p => getSlug(p.name) === slug);
  if (!project) notFound();

  const accent = CAT_COLOR[project.category] ?? "#14b8a6";
  const challengeItems = project.challenges.split(/\.\s+/).map(s => s.replace(/\.$/, "").trim()).filter(Boolean);
  const improvementItems = project.improvements.split(/\.\s+/).map(s => s.replace(/\.$/, "").trim()).filter(Boolean);

  return (
    <div className="min-h-screen text-white" style={{ background: "#000000" }}>
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: revealUp 0.65s cubic-bezier(0.16,1,0.3,1) both; }

        /*
          IMAGE PAN ANIMATION — THE CORRECT APPROACH:
          ─────────────────────────────────────────────
          The outer .img-viewport has overflow:hidden and a fixed height (420px).
          The inner .img-track has NO height constraint — it takes the image's
          natural full height (width:100%, height:auto).
          We animate .img-track from translateY(0) → translateY(-50%) so it
          scrolls from the TOP of the image to roughly the BOTTOM.
          "alternate" makes it return smoothly — creating a continuous loop.
        */
        @keyframes panUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .img-track {
          animation: panUp 12s ease-in-out infinite alternate;
          will-change: transform;
          /* remove any default inline-block gap */
          line-height: 0;
          font-size: 0;
        }
      `}</style>

      {/* Fixed grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.06) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* ── Top bar ── */}
      <div
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/#projects"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "rgba(156,163,175,0.65)" }}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Projects
            </Link>
            <span
              className="hidden md:block text-[10px] font-mono tracking-[0.2em] uppercase"
              style={{ color: "rgba(156,163,175,0.28)" }}
            >
              PROJECT / {project.name.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {([
              { href: project.githubLink, el: <Github className="w-4 h-4" />,      blank: true  },
              { href: project.liveLink,   el: <ExternalLink className="w-4 h-4" />, blank: true  },
              { href: "/",               el: <Home className="w-4 h-4" />,          blank: false },
            ] as const).map((b, i) => (
              <a
                key={i}
                href={b.href}
                target={b.blank ? "_blank" : undefined}
                rel={b.blank ? "noopener noreferrer" : undefined}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(209,213,219,0.65)",
                }}
              >
                {b.el}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 relative z-10">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 xl:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-10">

            {/* Title */}
            <div className="fade-in" style={{ animationDelay: "0ms" }}>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                  style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }}
                >
                  {project.category}
                </span>
                {project.year && (
                  <span className="text-xs font-mono" style={{ color: "rgba(156,163,175,0.35)" }}>
                    {project.year}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                {project.name}
              </h1>
              <p className="text-base font-medium" style={{ color: accent, opacity: 0.82 }}>
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <div className="fade-in" style={{ animationDelay: "70ms" }}>
              <p className="text-sm leading-[1.9]" style={{ color: "rgba(156,163,175,0.82)" }}>
                {project.fullDesc}
              </p>
            </div>

            {/* Tech stack */}
            <div className="fade-in" style={{ animationDelay: "140ms" }}>
              <div className="flex items-center gap-2 mb-5">
                <Code2 className="w-4 h-4" style={{ color: accent }} />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Technology Stack</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.tech.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.075)" }}
                  >
                    <TechIcon tech={t} />
                    <span className="text-sm font-medium" style={{ color: "rgba(229,231,235,0.9)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            {challengeItems.length > 0 && (
              <div className="fade-in" style={{ animationDelay: "210ms" }}>
                <div className="flex items-center gap-2 mb-5">
                  <AlertTriangle className="w-4 h-4" style={{ color: accent }} />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Development Challenges</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challengeItems.map((s, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.075)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full mt-[6px] flex-shrink-0" style={{ background: accent }} />
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(156,163,175,0.78)" }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Future Improvements */}
            {improvementItems.length > 0 && (
              <div className="fade-in" style={{ animationDelay: "280ms" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4" style={{ color: accent }} />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Future Improvements</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {improvementItems.map((s, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.075)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full mt-[6px] flex-shrink-0" style={{ background: accent }} />
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(156,163,175,0.78)" }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN (sticky) ── */}
          <div className="fade-in" style={{ animationDelay: "100ms" }}>
            <div className="sticky top-[72px] space-y-4">

              {/* Browser frame */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${accent}25`,
                  boxShadow: `0 0 0 1px ${accent}10, 0 32px 64px -16px rgba(0,0,0,0.9)`,
                }}
              >
                {/* macOS chrome bar */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 border-b"
                  style={{ background: "#0d1117", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
                  </div>
                  <div className="flex-1 mx-2">
                    <div
                      className="px-3 py-1 text-[10px] font-mono rounded-md truncate"
                      style={{ background: "#161b22", color: "rgba(156,163,175,0.5)" }}
                    >
                      {project.liveLink.replace(/^https?:\/\//, "").slice(0, 42)}
                    </div>
                  </div>
                </div>

                {/*
                  ── IMAGE VIEWPORT ──────────────────────────────────────────────
                  This is a fixed-height "window" with overflow:hidden.
                  Inside, .img-track contains the image at its FULL natural size
                  (width:100%, height:auto — NO objectFit, NO fixed height on img).
                  The CSS animation moves .img-track upward so the full image
                  scrolls past the window — top to bottom, then back.
                  ────────────────────────────────────────────────────────────────
                */}
                <div
                  className="img-viewport"
                  style={{
                    height: "420px",
                    overflow: "hidden",
                    position: "relative",
                    background: "#050a12",
                  }}
                >
                  {/* Animated track — contains full-size image */}
                  <div className="img-track" style={{ width: "100%" }}>
                    <img
                      src={project.image}
                      alt={project.name}
                      style={{
                        width: "100%",
                        height: "auto",       /* ← CRITICAL: natural height, no crop */
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Top vignette */}
                  <div
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: "50px",
                      background: "linear-gradient(to bottom, #0d1117 0%, transparent 100%)",
                      pointerEvents: "none", zIndex: 2,
                    }}
                  />
                  {/* Bottom vignette */}
                  <div
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      height: "70px",
                      background: "linear-gradient(to top, #000000 0%, transparent 100%)",
                      pointerEvents: "none", zIndex: 2,
                    }}
                  />
                  {/* Subtle accent color wash */}
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(160deg, ${accent}08 0%, transparent 55%)`,
                      pointerEvents: "none", zIndex: 3,
                    }}
                  />
                </div>
              </div>

              {/* CTA buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(229,231,235,0.85)",
                  }}
                >
                  <Github className="w-4 h-4" /> View Code
                </a>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
                  style={{ background: accent, color: "#000" }}
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Tech used", value: String(project.tech.length) },
                  { label: "Type",      value: project.category === "AI-Powered" ? "AI" : project.category.split("-")[0] },
                  { label: "Year",      value: project.year ?? "2024" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="text-center py-3 px-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(156,163,175,0.4)" }}>
                      {s.label}
                    </div>
                    <div className="text-sm font-bold" style={{ color: accent }}>{s.value}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}