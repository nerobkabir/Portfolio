"use client";
import React, { useState, useEffect } from "react";

// ── Tab definitions ───────────────────────────────────────────────────────────
const TABS = [
  "Frontend",
  "Backend",
  "Database",
  "Development Tools",
  "Hosting & Deployment",
  "Version Control",
  "Languages",
] as const;
type Tab = (typeof TABS)[number];

// ── Skill SVG icons as components ─────────────────────────────────────────────
// Using inline SVG paths for crisp rendering (matching the screenshot's logo style)
const ICONS: Record<string, React.FC<{ size?: number }>> = {
  // ── Frontend
  React: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="24" rx="5" ry="5" fill="#61dafb" />
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#61dafb" strokeWidth="2" fill="none" />
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#61dafb" strokeWidth="2" fill="none" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#61dafb" strokeWidth="2" fill="none" transform="rotate(120 24 24)" />
    </svg>
  ),
  NextJS: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#000" stroke="#fff" strokeWidth="1.5" />
      <path d="M15 32V16l18 22H15zM29 16v10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Tailwind: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 12c-5.333 0-8.667 2.667-10 8 2-2.667 4.333-3.667 7-3 1.527.382 2.617 1.49 3.82 2.715C26.752 21.68 28.773 24 32 24c5.333 0 8.667-2.667 10-8-2 2.667-4.333 3.667-7 3-1.527-.382-2.617-1.49-3.82-2.715C29.248 14.32 27.227 12 24 12zM14 24c-5.333 0-8.667 2.667-10 8 2-2.667 4.333-3.667 7-3 1.527.382 2.617 1.49 3.82 2.715C16.752 33.68 18.773 36 22 36c5.333 0 8.667-2.667 10-8-2 2.667-4.333 3.667-7 3-1.527-.382-2.617-1.49-3.82-2.715C19.248 26.32 17.227 24 14 24z" fill="#38bdf8" />
    </svg>
  ),
  TypeScript: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="4" fill="#3178c6" />
      <path d="M10 23h10M15 23v12M26 35c1 .667 2 1 3.5 1 2.5 0 4.5-1.5 4.5-4 0-2-1.2-3-3.5-4S28 27 28 25.5c0-1.5 1-2.5 2.5-2.5 1 0 2 .5 2.5 1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  JavaScript: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="3" fill="#f7df1e" />
      <path d="M16 34c1 2 2.5 3 4.5 3 3 0 5-1.5 5-5.5V20M30 23.5c1-2 2.5-3 4.5-3 2 0 3 1 3 2.5 0 1.8-1.2 2.8-3.5 3.8-2 .8-3.5 2-3.5 4 0 .7.2 1.2.5 1.7" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  HTML: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M8 6l3.2 36L24 46l12.8-4L40 6H8z" fill="#e34f26" />
      <path d="M24 42.4V10H37.6l-2.56 29.2L24 42.4z" fill="#ef652a" />
      <path d="M24 21.2h-7.52l-.48-5.6H24v-5.2H10.8l1.44 16.4H24v-5.6zM24 33.6l-6.32-1.76-.4-4.72H12l.8 9.2 11.2 3.12v-5.84z" fill="#fff" />
      <path d="M24 21.2v5.6h6.72l-.64 7.04L24 35.52v5.84l11.2-3.12.8-9.44H24V21.2z" fill="#ebebeb" />
    </svg>
  ),
  CSS: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M8 6l3.2 36L24 46l12.8-4L40 6H8z" fill="#1572b6" />
      <path d="M24 42.4V10H37.6l-2.56 29.2L24 42.4z" fill="#33a9dc" />
      <path d="M24 21.2H11.2l.48 5.2H24v-5.2zM24 15.4H10.8l.48 5.2H24v-5.2zM24 33.6l-6.32-1.76-.4-4.24H12l.8 8.72 11.2 3.12v-5.84z" fill="#fff" />
      <path d="M24 26.4v5.2h6.08l-.56 6.24-5.52 1.52v5.88l11.2-3.12.16-1.92.8-9.44.16-1.68H24V26.4z" fill="#ebebeb" />
    </svg>
  ),
  // ── Backend
  NodeJS: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" fill="#215732" />
      <path d="M24 4L6 14l18 10 18-10L24 4z" fill="#338a3e" />
      <path d="M24 44V24L6 14v20l18 10z" fill="#3c9d4e" />
      <path d="M24 4v20l18-10L24 4z" fill="#52b865" />
      <path d="M24 24v20l18-10V14L24 24z" fill="#52b865" opacity=".7" />
      <path d="M20 18v9l4 2.5 4-2.5v-3l-4 2-4-2V18z" fill="#fff" opacity=".9" />
    </svg>
  ),
  ExpressJS: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="6" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
      <text x="7" y="27" fontFamily="monospace" fontSize="13" fontWeight="700" fill="#ccc" letterSpacing="-0.5">ex</text>
    </svg>
  ),
  JWT: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="6" fill="#1a1a1a" />
      <circle cx="24" cy="24" r="10" stroke="#d63aff" strokeWidth="2" fill="none" />
      <path d="M24 14v20M14 24h20" stroke="#d63aff" strokeWidth="1.5" />
      <circle cx="24" cy="14" r="2" fill="#d63aff" />
      <circle cx="24" cy="34" r="2" fill="#00b9f1" />
      <circle cx="14" cy="24" r="2" fill="#fb015b" />
      <circle cx="34" cy="24" r="2" fill="#d63aff" />
    </svg>
  ),
  Firebase: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M12 40L20 8l8 14-4 6 8-14 4 26L24 44 12 40z" fill="#ffca28" />
      <path d="M12 40L20 8l8 14-16 18z" fill="#ff8f00" />
      <path d="M36 40L32 14l-4 8 8 18z" fill="#f57c00" />
      <path d="M12 40l12 4 12-4-8-18-4 8-4-6-8 16z" fill="#ffca28" opacity=".5" />
    </svg>
  ),
  Gemini: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="gem" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285f4" />
          <stop offset="1" stopColor="#a8c7fa" />
        </linearGradient>
      </defs>
      <path d="M24 6C24 6 12 18 12 24s12 18 12 18 12-12 12-18S24 6 24 6z" fill="url(#gem)" />
      <path d="M6 24c0 0 12-12 18-12s18 12 18 12-12 12-18 12S6 24 6 24z" fill="url(#gem)" opacity=".6" />
    </svg>
  ),
  // ── Database
  MongoDB: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 6c0 0-10 10-10 22 0 6 4 10 10 14 6-4 10-8 10-14 0-12-10-22-10-22z" fill="#47a248" />
      <path d="M24 6v36" stroke="#a3d977" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="24" cy="28" rx="4" ry="2" fill="#a3d977" opacity=".6" />
    </svg>
  ),
  // ── Dev Tools
  VSCode: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M34 6L14 26l-8-6-4 4 8 6-8 6 4 4 8-6 20 20 8-4V10L34 6z" fill="#007acc" />
      <path d="M42 10L34 6 14 26l8 6 20-14v-8z" fill="#1ba1e2" opacity=".7" />
      <path d="M42 38l-8 4L22 32l8-6 12 8v4z" fill="#1ba1e2" opacity=".7" />
    </svg>
  ),
  Figma: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="16" y="6" width="10" height="10" rx="5" fill="#f24e1e" />
      <rect x="26" y="6" width="10" height="10" rx="5" fill="#ff7262" />
      <rect x="16" y="16" width="10" height="10" rx="0" fill="#a259ff" />
      <rect x="16" y="26" width="10" height="10" rx="5" fill="#0acf83" />
      <circle cx="31" cy="21" r="5" fill="#1abcfe" />
    </svg>
  ),
  Postman: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#ff6c37" />
      <path d="M28 20l-8 8m0-8l8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 24h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="16" r="3" fill="#fff" />
    </svg>
  ),
  // ── Hosting
  Vercel: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8L44 40H4L24 8z" fill="#fff" />
    </svg>
  ),
  Netlify: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M14 24l10-10 10 10-10 10L14 24z" fill="#00ad9f" />
      <path d="M14 24H4M44 24H34M24 14V4M24 44V34" stroke="#00ad9f" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  Render: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="8" fill="#46e3b7" />
      <path d="M14 34V14h12a8 8 0 010 16H14M26 30l8 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // ── Version Control
  Git: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M42.6 21.6L26.4 5.4a3 3 0 00-4.2 0L18 9.6l5.4 5.4a3.5 3.5 0 014.4 4.4l5.2 5.2a3.5 3.5 0 11-2 2l-4.8-4.8v12.6a3.5 3.5 0 11-3 0V21.6a3.5 3.5 0 01-1.9-4.6L16 11.6l-10.6 10.8a3 3 0 000 4.2L21.6 42.6a3 3 0 004.2 0L42.6 25.8a3 3 0 000-4.2z" fill="#f05032" />
    </svg>
  ),
  GitHub: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.954 4 4 13.178 4 24.5c0 9.065 5.734 16.754 13.686 19.48 1.001.19 1.366-.446 1.366-.99 0-.487-.017-1.776-.027-3.487-5.566 1.24-6.742-2.745-6.742-2.745-.91-2.369-2.22-2.999-2.22-2.999-1.815-1.272.138-1.246.138-1.246 2.007.145 3.063 2.112 3.063 2.112 1.784 3.134 4.679 2.228 5.82 1.703.18-1.324.697-2.228 1.269-2.74-4.444-.52-9.117-2.28-9.117-10.147 0-2.241.78-4.074 2.06-5.508-.207-.523-.894-2.604.196-5.428 0 0 1.68-.553 5.5 2.1a18.69 18.69 0 015-0.694c1.697.008 3.406.235 5 .694 3.818-2.653 5.494-2.1 5.494-2.1 1.092 2.824.405 4.905.199 5.428 1.283 1.434 2.058 3.267 2.058 5.508 0 7.885-4.68 9.62-9.138 10.131.718.634 1.357 1.888 1.357 3.804 0 2.746-.026 4.96-.026 5.633 0 .549.36 1.19 1.374.988C38.272 41.248 44 33.563 44 24.5 44 13.178 35.046 4 24 4z" fill="#e0e0e0" />
    </svg>
  ),
  // ── Languages
  CPP: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" fill="#00599c" />
      <path d="M18 28c1.5 2 3.5 3 6 3 2.5 0 4.5-1 6-3M20 24h-4M20 22v4M28 22v4M26 24h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  C: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" fill="#a8b9cc" />
      <path d="M30 18c-1.5-1.5-3.5-2.5-6-2.5-4.5 0-8 3.5-8 8.5s3.5 8.5 8 8.5c2.5 0 4.5-1 6-2.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  Python: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 6C15.2 6 16 10 16 10v8h16v2H12s-6 .6-6 8.5 5.2 8.5 5.2 8.5H15v-4.1S14.8 28 18 28h12s4 .1 4-4V14s.6-8-10-8z" fill="#3776ab" />
      <path d="M24 42c8.8 0 8-4 8-4v-8H16v-2h20s6-.6 6-8.5-5.2-8.5-5.2-8.5H33v4.1S33.2 20 30 20H18s-4-.1-4 4v10s-.6 8 10 8z" fill="#ffd43b" />
      <circle cx="20" cy="11" r="1.5" fill="#fff" />
      <circle cx="28" cy="37" r="1.5" fill="#3776ab" />
    </svg>
  ),
  NPM: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="14" width="40" height="20" rx="2" fill="#cb3837" />
      <rect x="14" y="20" width="6" height="14" fill="#fff" />
      <rect x="20" y="20" width="6" height="8" fill="#cb3837" />
      <rect x="28" y="20" width="6" height="8" fill="#fff" />
    </svg>
  ),
  Vite: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M44 8L26 44l-4-16L8 20 44 8z" fill="#646cff" />
      <path d="M44 8L24 16l2 12 18-20z" fill="#a78bfa" opacity=".7" />
      <path d="M8 20l14 8-4-16L8 20z" fill="#ffbd2e" />
    </svg>
  ),
};

// ── Skill data ─────────────────────────────────────────────────────────────────
const SKILLS: Record<Tab, { name: string; iconKey: string; accent: string }[]> = {
  Frontend: [
    { name: "React.js",     iconKey: "React",      accent: "#61dafb" },
    { name: "Next.js",      iconKey: "NextJS",     accent: "#ffffff" },
    { name: "Tailwind CSS", iconKey: "Tailwind",   accent: "#38bdf8" },
    { name: "TypeScript",   iconKey: "TypeScript", accent: "#3178c6" },
    { name: "JavaScript",   iconKey: "JavaScript", accent: "#f7df1e" },
    { name: "HTML / CSS",   iconKey: "HTML",       accent: "#e34f26" },
  ],
  Backend: [
    { name: "Express.js",   iconKey: "ExpressJS",  accent: "#cccccc" },
    { name: "Node.js",      iconKey: "NodeJS",     accent: "#68a063" },
    { name: "JWT Auth",     iconKey: "JWT",        accent: "#d63aff" },
    { name: "Firebase",     iconKey: "Firebase",   accent: "#ffca28" },
    { name: "Gemini AI",    iconKey: "Gemini",     accent: "#4285f4" },
  ],
  Database: [
    { name: "MongoDB",      iconKey: "MongoDB",    accent: "#47a248" },
  ],
  "Development Tools": [
    { name: "VS Code",      iconKey: "VSCode",     accent: "#007acc" },
    { name: "Figma",        iconKey: "Figma",      accent: "#f24e1e" },
    { name: "Postman",      iconKey: "Postman",    accent: "#ff6c37" },
    { name: "NPM",          iconKey: "NPM",        accent: "#cb3837" },
    { name: "Vite",         iconKey: "Vite",       accent: "#646cff" },
  ],
  "Hosting & Deployment": [
    { name: "Vercel",       iconKey: "Vercel",     accent: "#ffffff" },
    { name: "Netlify",      iconKey: "Netlify",    accent: "#00ad9f" },
    { name: "Render",       iconKey: "Render",     accent: "#46e3b7" },
  ],
  "Version Control": [
    { name: "Git",          iconKey: "Git",        accent: "#f05032" },
    { name: "GitHub",       iconKey: "GitHub",     accent: "#e0e0e0" },
  ],
  Languages: [
    { name: "JavaScript",   iconKey: "JavaScript", accent: "#f7df1e" },
    { name: "C++",          iconKey: "CPP",        accent: "#00599c" },
    { name: "C",            iconKey: "C",          accent: "#a8b9cc" },
    { name: "Python",       iconKey: "Python",     accent: "#3776ab" },
  ],
};

// Tab icons (small, inline)
const TAB_ICONS: Record<Tab, React.FC> = {
  Frontend:             () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Backend:              () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  Database:             () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0018 0V5"/><path d="M3 12a9 3 0 0018 0"/></svg>,
  "Development Tools":  () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z"/></svg>,
  "Hosting & Deployment":()=> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.67 19.79 19.79 0 01.14 2a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  "Version Control":    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 009 9"/></svg>,
  Languages:            () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
};

// Tab accent colors
const TAB_ACCENT: Record<Tab, string> = {
  Frontend:              "#22d3ee",
  Backend:               "#4ade80",
  Database:              "#22d3ee",
  "Development Tools":   "#fb923c",
  "Hosting & Deployment":"#a78bfa",
  "Version Control":     "#fb7185",
  Languages:             "#facc15",
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Tab>("Frontend");
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setAnimKey(k => k + 1);
  };

  const accent = TAB_ACCENT[activeTab];
  const skills = SKILLS[activeTab];

  return (
    <section id="tech-stack" className="py-6 md:py-8 px-4 relative overflow-hidden">
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .skill-card-anim { animation: cardIn 0.38s cubic-bezier(0.16,1,0.3,1) both; }
        .tab-underline {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          height: 2px;
          border-radius: 999px;
          transition: width 0.3s ease, opacity 0.3s ease;
        }
      `}</style>

      {/* bg glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl"
          style={{ background: accent, top: "10%", right: "-10%", transition: "background 0.5s ease" }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03] blur-3xl"
          style={{ background: accent, bottom: "5%", left: "-8%", transition: "background 0.5s ease" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: "rgba(156,163,175,0.55)" }}
          >
            — Tech Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Skills &amp;{" "}
            <span style={{ background: `linear-gradient(135deg, ${accent}, #818cf8)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", transition: "background 0.4s ease" }}>
              Technologies
            </span>
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            Hands-on toolkit I leverage for crafting responsive, modern web applications from front-end to back-end.
          </p>
        </div>

        {/* ── Tabs ─────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            const TabIcon = TAB_ICONS[tab];
            const tc = TAB_ACCENT[tab];
            return (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 overflow-visible"
                style={{
                  background: isActive
                    ? `${tc}18`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? `${tc}50` : "rgba(255,255,255,0.08)"}`,
                  color: isActive ? "#FFFFFF" : "rgba(156,163,175,0.5)",
                  boxShadow: isActive ? `0 0 18px ${tc}30` : "none",
                }}
              >
                <span style={{ color: isActive ? tc : "rgba(156,163,175,0.4)" }}>
                  <TabIcon />
                </span>
                {tab}
                {/* count badge */}
                <span
                  className="px-1.5 py-0.5 rounded-md text-xs font-bold"
                  style={{
                    background: isActive ? `${tc}25` : "rgba(255,255,255,0.05)",
                    color: isActive ? tc : "rgba(156,163,175,0.35)",
                  }}
                >
                  {SKILLS[tab].length}
                </span>
                {/* underline */}
                <span
                  className="tab-underline"
                  style={{
                    width: isActive ? "60%" : "0%",
                    background: tc,
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* ── Skill cards grid ─────────────────────────────── */}
        <div
          key={animKey}
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          }}
        >
          {skills.map((skill, i) => {
            const Icon = ICONS[skill.iconKey];
            return (
              <SkillCard
                key={skill.name}
                skill={skill}
                Icon={Icon}
                delay={i * 45}
                accent={accent}
              />
            );
          })}
        </div>

        {/* ── Bottom divider ───────────────────────────────── */}
        <div
          className="mt-14 h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}50, transparent)`,
            transition: "background 0.5s ease",
          }}
        />
      </div>
    </section>
  );
}

// ── Skill Card ────────────────────────────────────────────────────────────────
function SkillCard({
  skill,
  Icon,
  delay,
  accent,
}: {
  skill: { name: string; accent: string };
  Icon: React.FC<{ size?: number }> | undefined;
  delay: number;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="skill-card-anim relative flex flex-col items-center justify-center gap-4 p-6 rounded-2xl cursor-default transition-all duration-300 select-none"
      style={{
        animationDelay: `${delay}ms`,
        background: hovered
          ? `linear-gradient(135deg, ${skill.accent}18, rgba(255,255,255,0.04))`
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? `${skill.accent}45` : "rgba(255,255,255,0.07)"}`,
        backdropFilter: "blur(12px)",
        boxShadow: hovered
          ? `0 0 28px ${skill.accent}30, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${skill.accent}20`
          : "0 4px 16px rgba(0,0,0,0.25)",
        transform: hovered ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
        minHeight: "140px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* top accent line on hover */}
      {hovered && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px rounded-full"
          style={{ width: "60%", background: skill.accent, opacity: 0.7 }}
        />
      )}

      {/* icon */}
      <div
        className="transition-all duration-300"
        style={{
          transform: hovered ? "scale(1.12) translateY(-2px)" : "scale(1)",
          filter: hovered ? `drop-shadow(0 0 10px ${skill.accent}70)` : "none",
        }}
      >
        {Icon ? <Icon size={48} /> : (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${skill.accent}20`, border: `1px solid ${skill.accent}40` }}
          >
            ?
          </div>
        )}
      </div>

      {/* name */}
      <span
        className="text-sm font-semibold text-center leading-tight transition-colors duration-200"
        style={{ color: hovered ? "#FFFFFF" : "#FFFFFF" }}  // now always pure white
      >
        {skill.name}
      </span>
    </div>
  );
}