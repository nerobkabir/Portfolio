"use client";
import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, TrendingUp, Code2, Target, Flame, Trophy, Globe2, ChevronRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const platforms = [
  {
    id: "cf",
    name: "Codeforces",
    handle: "kabir_hossain",
    link: "https://codeforces.com/profile/kabir_hossain",
    accent: "#3b82f6",
    accentDim: "rgba(59,130,246,0.12)",
    badge: "Pupil",                          // Newbie → Pupil
    badgeColor: "rgba(74,222,128,0.12)",      // gray → green
    badgeText: "#4ade80",                     // gray → green
    rating: 1213,                             // 1074 → 1213
    maxRating: 3500,
    solved: 190,                              // 179 → 190
    contests: 10,
    extra: "88 solved last year",             // 132 → 88
    logoChar: "CF",
  },
  {
    id: "lc",
    name: "LeetCode",
    handle: "kabirhossain",
    link: "https://leetcode.com/u/kabirhossain/",
    accent: "#f59e0b",
    accentDim: "rgba(245,158,11,0.12)",
    badge: "Beginner",
    badgeColor: "rgba(245,158,11,0.12)",
    badgeText: "#f59e0b",
    rating: 36,
    maxRating: 801,
    solved: 36,
    contests: 2,
    extra: "38 submissions last year",
    logoChar: "LC",
  },
  {
    id: "cc",
    name: "CodeChef",
    handle: "happy_resin_95",
    link: "https://www.codechef.com/users/happy_resin_95",
    accent: "#ef4444",
    accentDim: "rgba(239,68,68,0.12)",
    badge: "Div 4",
    badgeColor: "rgba(239,68,68,0.1)",
    badgeText: "#ef4444",
    rating: 1064,
    maxRating: 3000,
    solved: 0,
    contests: 3,
    extra: "Country Rank: #3,174",
    logoChar: "CC",
  },
];

const overallStats = [
  { label: "Problems Solved",  value: 226, suffix: "+", icon: Code2,    color: "#60a5fa", tip: "Across all platforms"         },
  { label: "Contests Entered", value: 15,  suffix: "",  icon: Trophy,   color: "#c084fc", tip: "CF + LC + CC combined"         },
  { label: "Max Streak",       value: 8,   suffix: "d", icon: Flame,    color: "#fb923c", tip: "Consecutive days of activity"  },
  { label: "Country Rank",     value: 3174,suffix: "",  prefix: "#", icon: Globe2, color: "#4ade80", tip: "CodeChef Bangladesh rank" },
];

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      // ease-out quad
      setVal(Math.round(target * (1 - Math.pow(1 - pct, 2))));
      if (pct < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration, active]);
  return val;
}

// ── Animated progress bar ─────────────────────────────────────────────────────
function Bar({ pct, color, active }: { pct: number; color: string; active: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setW(pct), 80);
      return () => clearTimeout(t);
    }
  }, [active, pct]);
  return (
    <div className="relative w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${w}%`,
          background: `linear-gradient(90deg, ${color}cc, ${color})`,
          boxShadow: `0 0 6px ${color}80`,
          transition: "width 1.1s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span
        className="inline-flex w-3.5 h-3.5 rounded-full text-[8px] font-bold items-center justify-center"
        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(156,163,175,0.7)" }}
      >
        ?
      </span>
      {show && (
        <span
          className="absolute bottom-5 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap z-20 pointer-events-none"
          style={{
            background: "rgba(15,23,42,0.97)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(226,232,240,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {text}
          <span
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
            style={{ background: "rgba(15,23,42,0.97)", borderRight: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          />
        </span>
      )}
    </span>
  );
}

// ── Platform Card ─────────────────────────────────────────────────────────────
function PlatformCard({ p, active }: { p: typeof platforms[0]; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  const ratingPct = Math.min((p.rating / p.maxRating) * 100, 100);

  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer"
      style={{
        background: hovered ? `linear-gradient(135deg, ${p.accentDim}, rgba(255,255,255,0.025))` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? `${p.accent}40` : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 0 1px ${p.accent}20, 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 30px -8px ${p.accent}25` : "0 4px 20px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}60, transparent)`, opacity: hovered ? 1 : 0.3, transition: "opacity 0.3s ease" }} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${p.accent}28, ${p.accent}10)`,
                border: `1px solid ${p.accent}40`,
                color: p.accent,
                transform: hovered ? "scale(1.08)" : "scale(1)",
              }}
            >
              {p.logoChar}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{p.name}</div>
              <div className="text-[11px] font-mono mt-0.5" style={{ color: `${p.accent}cc` }}>
                @{p.handle}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: p.badgeColor, color: p.badgeText, border: `1px solid ${p.badgeText}30` }}
            >
              {p.badge}
            </span>
            <ExternalLink
              className="w-3.5 h-3.5 transition-all duration-200"
              style={{ color: hovered ? p.accent : "rgba(100,116,139,0.5)", transform: hovered ? "translate(1px,-1px)" : "none" }}
            />
          </div>
        </div>

        {/* Rating / solved stat */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-gray-500 uppercase tracking-wider">
              {p.id === "lc" ? "Problems Solved" : "Rating"}
            </span>
            <span className="text-sm font-bold" style={{ color: p.accent }}>
              {p.id === "lc" ? `${p.solved} / ${p.maxRating}` : p.rating}
            </span>
          </div>
          <Bar pct={ratingPct} color={p.accent} active={active} />
          <div className="text-[10px] text-gray-600 mt-1.5">{p.extra}</div>
        </div>

        {/* Mini stats row */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-center py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="text-lg font-bold text-white">{p.id === "lc" ? p.solved : p.solved || "—"}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Solved</div>
          </div>
          <div className="text-center py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="text-lg font-bold text-white">{p.contests}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Contests</div>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Overall stat card ─────────────────────────────────────────────────────────
function StatCard({ stat, active, idx }: { stat: typeof overallStats[0]; active: boolean; idx: number }) {
  const val = useCountUp(stat.value, 1200 + idx * 100, active);
  const Icon = stat.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl p-5 text-center transition-all duration-300 cursor-default"
      style={{
        background: hovered ? `linear-gradient(135deg, ${stat.color}10, rgba(255,255,255,0.02))` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? `${stat.color}35` : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 20px -4px ${stat.color}30` : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300"
        style={{
          background: `${stat.color}18`,
          border: `1px solid ${stat.color}30`,
          transform: hovered ? "scale(1.1) rotate(5deg)" : "none",
        }}
      >
        <Icon className="w-5 h-5" style={{ color: stat.color }} />
      </div>

      {/* Value */}
      <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>
        {stat.prefix ?? ""}{val.toLocaleString()}{stat.suffix}
      </div>

      {/* Label + tooltip */}
      <div className="flex items-center justify-center gap-1">
        <span className="text-xs text-gray-500">{stat.label}</span>
        <Tip text={stat.tip} />
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CPStatus() {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter]   = useState<string>("all");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const shown = filter === "all"
    ? platforms
    : platforms.filter(p => p.id === filter);

  return (
    <section
      id="cp-stats"
      ref={ref}
      className="relative py-16 md:py-24 px-4 overflow-hidden"
    >
      <style>{`
        @keyframes floatY {
          0%,100% { transform: translateY(0) scale(1); opacity:.35; }
          50%      { transform: translateY(-14px) scale(1.1); opacity:.6; }
        }
        @keyframes cpFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .cp-appear { animation: cpFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      {/* BG decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x:"10%",  y:"20%", s:280, c:"#3b82f6", d:0 },
          { x:"80%",  y:"15%", s:200, c:"#8b5cf6", d:1.5 },
          { x:"60%",  y:"75%", s:240, c:"#f59e0b", d:0.8 },
        ].map((b,i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              left:b.x, top:b.y, width:b.s, height:b.s,
              background:`radial-gradient(circle, ${b.c}12 0%, transparent 70%)`,
              animation:`floatY ${7+i}s ease-in-out ${b.d}s infinite`,
              filter:"blur(1px)",
            }}
          />
        ))}
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:"linear-gradient(rgba(99,102,241,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.4) 1px,transparent 1px)",
            backgroundSize:"60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className={`text-center mb-12 ${visible ? "cp-appear" : "opacity-0"}`}>
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 text-xs font-medium"
            style={{ background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.2)", color:"#818cf8" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
            </span>
            Competitive Programming
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Coding{" "}
            <span
              style={{
                background:"linear-gradient(135deg,#60a5fa,#a78bfa,#f472b6)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}
            >
              Profiles
            </span>
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Stats, ratings, and milestones across competitive programming platforms.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className={`flex justify-center gap-2 mb-10 ${visible ? "cp-appear" : "opacity-0"}`} style={{ animationDelay:"0.1s" }}>
          {[{ id:"all", label:"All Platforms" }, ...platforms.map(p=>({ id:p.id, label:p.name }))].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: filter === tab.id ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === tab.id ? "rgba(129,140,248,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: filter === tab.id ? "#c7d2fe" : "rgba(156,163,175,0.7)",
                boxShadow: filter === tab.id ? "0 0 14px rgba(99,102,241,0.2)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Platform cards ── */}
        <div
          className={`grid gap-5 mb-14 ${visible ? "cp-appear" : "opacity-0"}`}
          style={{
            gridTemplateColumns: shown.length === 1 ? "1fr" : shown.length === 2 ? "repeat(2,1fr)" : "repeat(auto-fit,minmax(280px,1fr))",
            animationDelay:"0.2s",
          }}
        >
          {shown.map(p => (
            <PlatformCard key={p.id} p={p} active={visible} />
          ))}
        </div>

        {/* ── Overall stats ── */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 ${visible ? "cp-appear" : "opacity-0"}`} style={{ animationDelay:"0.35s" }}>
          {overallStats.map((s, i) => (
            <StatCard key={s.label} stat={s} active={visible} idx={i} />
          ))}
        </div>

        {/* ── Footer callout ── */}
        <div
          className={`rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${visible ? "cp-appear" : "opacity-0"}`}
          style={{
            background:"linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06), rgba(244,114,182,0.05))",
            border:"1px solid rgba(99,102,241,0.15)",
            animationDelay:"0.45s",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:"rgba(74,222,128,0.15)", border:"1px solid rgba(74,222,128,0.3)" }}>
              <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow:"0 0 6px #4ade80" }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Active on all platforms</div>
              <div className="text-xs text-gray-500">15+ months of consistent practice · 8-day max streak</div>
            </div>
          </div>
          <a
            href="https://codeforces.com/profile/kabir_hossain"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap"
            style={{
              background:"rgba(99,102,241,0.15)",
              border:"1px solid rgba(129,140,248,0.3)",
              color:"#c7d2fe",
            }}
          >
            View Full Profile <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}