"use client";
import React, { useState } from "react";
import {
  Code, Github, ExternalLink, ChevronRight, ArrowUpRight,
  Layers, Target, Rocket, X, Globe, CheckCircle2, AlertCircle,
  Sparkles, ChevronUp, Eye,
} from "lucide-react";

type Project = {
  id: number;
  name: string;
  tagline: string;
  image: string;
  shortDesc: string;
  tech: string[];
  fullDesc: string;
  liveLink: string;
  githubLink: string;
  challenges: string;
  improvements: string;
  features: string[];
  category: string;
};

/* ─── Projects Data ─────────────────────────────────────────────────────────
   First 3 = shown by default: LocalChefBazaar, NexChat, GreenGadgets Hub
   Rest appear after "View All" click
 ─────────────────────────────────────────────────────────────────────────── */
const projects: Project[] = [
  {
    id: 1,
    name: "LocalChefBazaar",
    tagline: "Marketplace for Local Home-Cooked Meals",
    image: "https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png",
    shortDesc: "A full-stack MERN marketplace connecting home chefs with hungry customers in real time.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Stripe", "JWT"],
    fullDesc: "LocalChefBazaar is a comprehensive marketplace platform that empowers home chefs to showcase their culinary skills and earn income while providing customers with access to fresh, healthy, and affordable homemade meals. The platform features role-based access control, secure payment integration, real-time order tracking, and modern UI/UX design.",
    liveLink: "https://localchefbazaar-31da8.web.app",
    githubLink: "https://github.com/nerobkabir/Local-Chef-Bazar-Client.git",
    challenges: "Implementing real-time order updates, managing multiple user roles (Chef, Customer, Admin), secure payment processing with Stripe, and handling image uploads efficiently.",
    improvements: "Add AI-powered meal recommendations, in-app messaging system, subscription models, mobile app version, and advanced analytics dashboard.",
    features: [
      "Role-based authentication (User / Chef / Admin)",
      "Stripe payment integration",
      "Real-time order tracking",
      "Meal review & rating system",
      "Admin dashboard with analytics",
      "Chef revenue tracking",
    ],
    category: "Full-Stack",
  },
  {
    id: 4,
    name: "NexChat",
    tagline: "Real-time Messaging App",
    image: "https://i.ibb.co.com/Xx8fSjsf/Screenshot-168.png",
    shortDesc: "WhatsApp-like browser chat with instant messages, typing indicators & read receipts via Socket.io.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Zustand", "JWT", "Tailwind CSS"],
    fullDesc: "NexChat is a full-stack real-time chat application that lets users send messages instantly — no page refresh needed. It works like WhatsApp for the browser: send a message and the other person sees it immediately, start typing and they see a typing indicator, and read receipts turn green when the message is read. All powered by WebSockets (Socket.io) for persistent bi-directional communication.",
    liveLink: "https://nexchat-frontend-six.vercel.app",
    githubLink: "https://github.com/nerobkabir",
    challenges: "Implementing reliable WebSocket connections, managing real-time state across multiple users with Zustand, handling typing indicators without performance issues, and ensuring secure JWT-based auth via httpOnly cookies.",
    improvements: "Add group chats, media file sharing, message reactions, push notifications, and end-to-end encryption.",
    features: [
      "Instant messaging via Socket.io WebSockets",
      "Live typing indicator",
      "Read receipts with green double tick",
      "Online / offline user status",
      "JWT auth with httpOnly cookies",
      "Persistent message history with MongoDB",
    ],
    category: "Full-Stack",
  },
  {
    id: 5,
    name: "GreenGadgets Hub",
    tagline: "Eco-Friendly E-Commerce Platform",
    image: "https://i.ibb.co.com/Ng8V93wv/Screenshot-169.png",
    shortDesc: "Sustainable marketplace where every purchase tracks real CO₂ savings and plastic reduction.",
    tech: ["Next.js", "React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    fullDesc: "GreenGadgets Hub is a full-stack eco-friendly e-commerce platform where users can explore and purchase sustainable products while tracking their environmental impact, such as CO₂ savings and plastic reduction. The platform promotes conscious consumption by showcasing verified green products with transparent environmental benefits and real-time impact statistics.",
    liveLink: "https://green-gadgets-hub.vercel.app",
    githubLink: "https://github.com/nerobkabir",
    challenges: "Building real-time aggregated environmental impact counters, implementing cookie-based authentication for protected routes, and designing a transparent eco-verification system for products.",
    improvements: "Add shopping cart & checkout, Stripe payment integration, advanced admin dashboard, product reviews, wishlist functionality, and multi-language support.",
    features: [
      "Eco-friendly product marketplace",
      "Real-time CO₂ savings & plastic reduction tracker",
      "Trees equivalent visualization",
      "Protected product creation for authenticated users",
      "Toast notification system",
      "Fully responsive modern UI",
    ],
    category: "Full-Stack",
  },
  {
    id: 2,
    name: "Artify",
    tagline: "Creative Artwork Showcase Platform",
    image: "https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png",
    shortDesc: "A modern platform for artists to upload, showcase, and discover creative artworks.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Swiper.js"],
    fullDesc: "Artify is a creative platform where artists can showcase their artworks, explore other artist galleries, filter by categories, and interact with the community. The platform focuses on elegant UI, smooth user experience, and powerful content management features.",
    liveLink: "https://bejewelled-panda-60b4b5.netlify.app",
    githubLink: "https://github.com/nerobkabir/Showcase-flartform-client.git",
    challenges: "Implementing secure JWT authentication, managing artwork uploads with proper validation, creating an intuitive favorites system, and ensuring responsive design across all devices.",
    improvements: "Add social sharing features, artist collaboration tools, virtual gallery tours, NFT integration, and commission request system.",
    features: [
      "Artwork upload with image processing",
      "Advanced search & category filtering",
      "Favorites & bookmark system",
      "User authentication (Email & Google)",
      "Fully responsive UI",
      "Private routes for user content",
    ],
    category: "Full-Stack",
  },
  {
    id: 3,
    name: "Hero Apps",
    tagline: "Modern App Showcase Platform",
    image: "https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png",
    shortDesc: "An app discovery and management platform with install tracking and real-time feedback.",
    tech: ["React.js", "Tailwind CSS", "React Router", "LocalStorage", "Lucide React"],
    fullDesc: "Hero Apps is a modern React-based application that allows users to explore, install, and manage various trending apps. It provides an intuitive interface for discovering popular applications, viewing detailed information, and managing installed apps with real-time feedback.",
    liveLink: "https://candid-monstera-42301f.netlify.app",
    githubLink: "https://github.com/nerobkabir/Hero-Apps.git",
    challenges: "Creating a seamless app installation/uninstall system with LocalStorage, implementing real-time toast notifications, and building an intuitive sorting/filtering interface.",
    improvements: "Add user accounts with sync capabilities, app reviews & ratings, search functionality, dark mode, and backend API integration.",
    features: [
      "App installation/uninstall system",
      "Real-time toast notifications",
      "Sort by download count",
      "App details view",
      "Persistent data with LocalStorage",
      "Responsive mobile-friendly design",
    ],
    category: "Frontend",
  },
  {
    id: 6,
    name: "Skillswap",
    tagline: "Skill Sharing & Learning Platform",
    image: "https://i.ibb.co.com/Y7Dw25hD/Screenshot-170.png",
    shortDesc: "Community-driven platform connecting people who want to teach with those eager to learn.",
    tech: ["React.js", "React Router", "Firebase", "Tailwind CSS", "React Hot Toast", "Vite"],
    fullDesc: "Skillswap is a modern web platform designed to create a collaborative learning environment where users can showcase their skills, discover people with skills they want to learn, and connect to exchange knowledge. The platform emphasizes ease of use, responsive design, and seamless user experience to make skill sharing accessible to everyone.",
    liveLink: "https://harmonious-paprenjak-77441a.netlify.app",
    githubLink: "https://github.com/nerobkabir/Sunflower",
    challenges: "Implementing Firebase Google OAuth alongside email/password auth, building a real-time skill search and filter system, and creating a smooth profile management experience with context-based state.",
    improvements: "Add real-time messaging, skill endorsement system, scheduled video sessions, payment for premium exchanges, and community forums.",
    features: [
      "Email/Password & Google OAuth via Firebase",
      "User profile with skills & bio",
      "Browse & search users by skill",
      "User directory with skill offerings",
      "Real-time toast notifications",
      "Private routes for authenticated users",
    ],
    category: "Frontend",
  },
  {
    id: 7,
    name: "CareNext",
    tagline: "Baby Sitting & Elderly Care Platform",
    image: "https://i.ibb.co.com/jkDVZ4Yz/Screenshot-171.png",
    shortDesc: "Book reliable childcare & elderly care services with dynamic cost calc and booking status tracking.",
    tech: ["Next.js", "React", "Node.js", "MongoDB", "NextAuth", "Google OAuth", "Tailwind CSS", "Nodemailer"],
    fullDesc: "CareNext is a web application that helps users book reliable care services for children, elderly, or sick individuals. Users can easily book services based on their required duration and location. The platform features dynamic cost calculation (duration x service charge), real-time booking status tracking (Pending / Confirmed / Completed), and email invoice delivery — making caregiving simple, safe, and accessible.",
    liveLink: "https://care-nest-five.vercel.app/",
    githubLink: "https://github.com/nerobkabir",
    challenges: "Building a multi-step location selector (Division to District to City to Area), implementing dynamic total cost calculation, managing booking states securely, and setting up email invoice delivery with Nodemailer.",
    improvements: "Add Stripe payment, admin dashboard with analytics, caregiver profile verification, service reviews, and real-time booking notifications.",
    features: [
      "Dynamic booking with location selector",
      "Auto total cost calculation (duration x rate)",
      "Booking status: Pending / Confirmed / Completed",
      "Email & Google OAuth authentication",
      "Email invoice on booking confirmation",
      "My Bookings page with cancel option",
    ],
    category: "Full-Stack",
  },
];

/* ─── Category badge styles ─────────────────────────────────────────────────── */
const categoryStyle: Record<string, string> = {
  "Full-Stack": "from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-300",
  "Frontend": "from-pink-500/20 to-orange-500/20 border-pink-500/30 text-pink-300",
};

/* ─── Professional Modal ────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
        style={{ background: "linear-gradient(135deg, #0d1117 0%, #111827 60%, #0d1117 100%)" }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent z-10" />

        {/* ─ Hero image header ─ */}
        <div className="relative flex-shrink-0">
          <div className="relative h-52 overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/95" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-500/30 hover:border-red-500/60 transition-all duration-200 group"
            >
              <X className="w-4 h-4 text-gray-300 group-hover:text-red-300" />
            </button>

            {/* Category */}
            <div className="absolute top-4 left-4 z-20">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r ${categoryStyle[project.category] ?? categoryStyle["Full-Stack"]}`}>
                {project.category}
              </span>
            </div>

            {/* Title over image */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
                {project.name}
              </h2>
              <p className="text-blue-300 text-sm font-medium">{project.tagline}</p>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.025] border-b border-white/8">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Globe className="w-4 h-4" />
              Live Demo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 rounded-lg text-sm font-semibold text-gray-300 hover:text-white transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-500">
              <Code className="w-3.5 h-3.5" />
              <span>{project.tech.length} technologies</span>
            </div>
          </div>
        </div>

        {/* ─ Scrollable body ─ */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 grid md:grid-cols-2 gap-5">

            {/* LEFT */}
            <div className="space-y-5">
              {/* Overview */}
              <div className="rounded-xl bg-white/[0.025] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Overview</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{project.fullDesc}</p>
              </div>

              {/* Tech stack */}
              <div className="rounded-xl bg-white/[0.025] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-gradient-to-b from-pink-400 to-orange-400 rounded-full" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 border border-white/10 hover:border-blue-400/40 transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className="rounded-xl bg-white/[0.025] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Challenges</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{project.challenges}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-5">
              {/* Features */}
              <div className="rounded-xl bg-white/[0.025] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-gradient-to-b from-green-400 to-teal-400 rounded-full" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Key Features</h3>
                </div>
                <ul className="space-y-2.5">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Future plans */}
              <div className="rounded-xl bg-white/[0.025] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Future Plans</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{project.improvements}</p>
              </div>

              {/* Quick links */}
              <div className="rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/15 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Quick Access</h3>
                </div>
                <div className="space-y-2.5">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-400/50 rounded-xl transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm text-blue-300 font-medium">Live Application</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-xl transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300 font-medium">GitHub Repository</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>
    </div>
  );
}

/* ─── Project Card ──────────────────────────────────────────────────────────── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div className="group relative cursor-pointer" onClick={onClick}>
      <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 h-full hover:-translate-y-1">

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 z-20">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r ${categoryStyle[project.category] ?? categoryStyle["Full-Stack"]}`}>
              {project.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-20">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full border border-white/20">
              <Code className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-gray-300">{project.tech.length}</span>
            </div>
          </div>
          <div className="absolute inset-0 z-10 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                {project.name}
              </h3>
              <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <p className="text-blue-400/80 text-xs font-medium">{project.tagline}</p>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{project.shortDesc}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-gray-400 border border-white/8 group-hover:border-blue-500/25 transition-colors duration-300">
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2.5 py-1 bg-white/3 rounded-lg text-xs text-gray-500 border border-white/5">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/8">
            <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold group-hover:gap-2.5 transition-all duration-300">
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </div>
            <div className="flex gap-1.5">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 bg-white/5 hover:bg-white/15 rounded-lg border border-white/8 hover:border-white/20 transition-all duration-200 hover:scale-110 group/gh"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5 text-gray-400 group-hover/gh:text-white transition-colors" />
              </a>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 bg-white/5 hover:bg-green-500/20 rounded-lg border border-white/8 hover:border-green-500/40 transition-all duration-200 hover:scale-110 group/live"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover/live:text-green-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);
  const hiddenCount = projects.length - 3;

  return (
    <section id="projects" className="py-20 md:py-24 px-4 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-blue-500 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Featured{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Projects
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Real-world applications built with modern technologies
          </p>
          <p className="text-gray-600 text-sm mt-3">
            Showing {visibleProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* View All / Collapse */}
        <div className="text-center mt-14">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/15 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 text-blue-400 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="text-gray-300 group-hover:text-white text-sm font-medium">
                  Show Less
                </span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 group-hover:text-white text-sm font-medium">
                  View All Projects
                </span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full font-semibold border border-blue-500/30">
                  +{hiddenCount} more
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}