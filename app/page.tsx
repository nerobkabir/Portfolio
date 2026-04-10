"use client";
import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MessageCircle, Trophy, ArrowUpRight, ChevronDown } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import CPStatus from "./components/CPStatus";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import CursorTrail from "./components/CursorTrail";
import PortfolioChat from "./components/PortfolioChat";

// ─── Footer nav / project data (kept minimal here) ───────────────────────────
const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#tech-stack" },
  { name: "CP Stats", href: "#cp-stats" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const techBadges = ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Firebase", "Git"];

const socialLinks = [
  { icon: Github, href: "https://github.com/nerobkabir", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kabir-hossain123", label: "LinkedIn" },
  { icon: Mail, href: "mailto:nerob2308@gmail.com", label: "Email" },
  { icon: MessageCircle, href: "https://wa.me/8801856846615", label: "WhatsApp" },
  { icon: Trophy, href: "https://codeforces.com/profile/kabir_hossain", label: "Codeforces" },
];

// ─── Background (isolated so it doesn't re-render other sections) ─────────────
function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div
        className="absolute w-[600px] h-[600px] rounded-full transition-all duration-500 ease-out opacity-40"
        style={{
          background: "radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)",
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
          transform: `translate(0, ${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`,
        }}
      />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-float opacity-30"></div>
      <div className="absolute top-2/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[90px] animate-float-delayed opacity-30"></div>
      <div className="absolute bottom-1/4 left-1/2 w-60 h-60 bg-pink-500/10 rounded-full blur-[70px] animate-float-slow opacity-25"></div>

      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-blue-400/20 rounded-full animate-twinkle"
          style={{
            left: `${(i * 37 + 5) % 100}%`,
            top: `${(i * 53 + 10) % 100}%`,
            animationDelay: `${(i * 0.4) % 5}s`,
            animationDuration: `${3 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>

      <div className="relative py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main row */}
          

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-white/10">
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="group relative" aria-label={social.label}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-300">
                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Kabir Hossain. All rights reserved.</p>
              <p className="text-gray-600 text-xs mt-1">Crafted with React, Tailwind CSS & lots of inspiration</p>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <span className="text-gray-400 group-hover:text-white text-sm">Back to Top</span>
              <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 pt-8 border-t border-white/10">
            {techBadges.map((tech, index) => (
              <div key={index} className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────
export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Loading screen — unmounts itself after fade-out completes */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* Main site — rendered in background, becomes visible after load */}
      <div
        className="min-h-screen bg-black text-white overflow-x-hidden relative"
        style={{
          opacity:    isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
      <CursorTrail />
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <CPStatus />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <PortfolioChat />

      {/* Global CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px) translateX(0px); } 33% { transform: translateY(-20px) translateX(10px); } 66% { transform: translateY(10px) translateX(-10px); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px) translateX(0px); } 33% { transform: translateY(-15px) translateX(-15px); } 66% { transform: translateY(15px) translateX(15px); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px) translateX(0px); } 33% { transform: translateY(-25px) translateX(5px); } 66% { transform: translateY(5px) translateX(-25px); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

        .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-gradient { background-size: 300% 300%; animation: gradient 4s ease infinite; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 9s ease-in-out infinite; animation-delay: 1s; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; animation-delay: 2s; }
        .animate-twinkle { animation: twinkle 5s ease-in-out infinite; }
        .animate-slideDown { animation: slideDown 0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards; }

        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #3b82f6, #8b5cf6); border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #2563eb, #7c3aed); }
      `}</style>
      </div>
    </>
  );
}