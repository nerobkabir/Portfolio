"use client";
import React, { useState, useEffect, useRef } from "react";

// Platform data with static colors (to avoid Tailwind dynamic class issues)
const cpProfiles = [
  {
    label: "CF",
    platform: "Codeforces",
    handle: "@kabir_hossain",
    link: "https://codeforces.com/profile/kabir_hossain",
    color: "#3b82f6", // blue-500
    stats: [
      { title: "Current Rating", value: "1074", sub: "Max: 1074 (Newbie)", barWidth: 28 },
      { title: "Problems Solved", value: "179", sub: "132 solved last year" },
    ],
    footer: "Registered: 15 months ago",
  },
  {
    label: "LC",
    platform: "LeetCode",
    handle: "@kabirhossain",
    link: "https://leetcode.com/u/kabirhossain/",
    color: "#eab308", // yellow-500
    stats: [
      { title: "Problems Solved", value: "36/801", barWidth: 4.5 },
      { title: "Recent Activity", value: "38", sub: "Submissions in past year" },
    ],
    footer: "0 problems this month",
  },
  {
    label: "CC",
    platform: "CodeChef",
    handle: "@happy_rein_95",
    link: "https://www.codechef.com/users/happy_resin_95",
    color: "#ef4444", // red-500
    stats: [
      { title: "Current Rating", value: "1064", sub: "Highest: 1064 (Div 4)", barWidth: 27 },
      { title: "Global Rank", value: "#119,244", sub: "Country Rank: #3,174" },
    ],
    footer: "From Bangladesh",
  },
];

const totalStats = [
  { value: 215, label: "Total Problems", icon: "🧠", color: "#60a5fa" },
  { value: 8, label: "Max Streak", icon: "🔥", color: "#f97316" },
  { value: 15, label: "Contests", icon: "🏆", color: "#c084fc" },
  { value: 3174, label: "Country Rank", icon: "🇧🇩", color: "#4ade80" },
];

// Helper: Count‑up animation hook
function useCountUp(end: number, duration = 1000, startOnMount = true) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startOnMount) return;
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = end;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = startValue + (endValue - startValue) * progress;
      setCount(Math.floor(current));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, startOnMount]);

  return count;
}

export default function CPStatus() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger count‑up when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Individual stat values with count‑up
  const counts = {
    totalProblems: useCountUp(totalStats[0].value, 1500, visible),
    maxStreak: useCountUp(totalStats[1].value, 1000, visible),
    contests: useCountUp(totalStats[2].value, 1200, visible),
    countryRank: useCountUp(totalStats[3].value, 1400, visible),
  };

  return (
    <section
      id="cp-stats"
      ref={sectionRef}
      className="relative py-10 md:py-14 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
            </span>
            <span className="text-xs font-mono text-blue-300/80 tracking-wider">
              COMPETITIVE PROGRAMMING
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Coding Profiles
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            My journey across platforms — stats, rankings, and progress.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {cpProfiles.map((profile, idx) => (
            <a
              key={profile.platform}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block transform transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${profile.color}08, rgba(255,255,255,0.02))`,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${profile.color}20, transparent 70%)`,
                  }}
                />

                <div className="p-6 relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${profile.color}30, ${profile.color}10)`,
                          color: profile.color,
                        }}
                      >
                        {profile.label}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white tracking-tight">
                          {profile.platform}
                        </h3>
                        <div
                          className="text-xs font-mono"
                          style={{ color: `${profile.color}cc` }}
                        >
                          {profile.handle}
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-white/20 group-hover:text-white/40 transition-all duration-300 group-hover:translate-x-1"
                    >
                      →
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-5">
                    {profile.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-gray-400 uppercase tracking-wide">
                            {stat.title}
                          </span>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: profile.color }}
                          >
                            {stat.value}
                          </span>
                        </div>
                        {/* Progress bar (only if barWidth exists) */}
                        {typeof stat.barWidth === "number" && (
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${stat.barWidth}%`,
                                background: `linear-gradient(90deg, ${profile.color}, ${profile.color}80)`,
                              }}
                            />
                          </div>
                        )}
                        {stat.sub && (
                          <p className="text-[11px] text-gray-500 mt-1.5">{stat.sub}</p>
                        )}
                        {/* Activity bars for LeetCode (example) */}
                        {!stat.barWidth && (
                          <div className="flex gap-0.5 mt-2">
                            {[...Array(12)].map((_, j) => (
                              <div
                                key={j}
                                className="flex-1 h-1.5 rounded-sm transition-all duration-300"
                                style={{
                                  background: `${profile.color}${Math.floor(30 + j * 5)}`,
                                  opacity: 0.6 + j * 0.03,
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
                    <span className="text-xs text-gray-500">{profile.footer}</span>
                    <span
                      className="text-xs font-medium transition-colors duration-200 group-hover:text-white"
                      style={{ color: `${profile.color}cc` }}
                    >
                      Visit →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Total Stats – with count‑up */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {totalStats.map((stat, i) => {
            let value = 0;
            switch (i) {
              case 0: value = counts.totalProblems; break;
              case 1: value = counts.maxStreak; break;
              case 2: value = counts.contests; break;
              case 3: value = counts.countryRank; break;
              default: value = 0;
            }
            return (
              <div
                key={i}
                className="text-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.label === "Country Rank" ? `#${value.toLocaleString()}` : value.toLocaleString()}
                  {stat.label === "Total Problems" && "+"}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-xs text-gray-300">Active on all platforms</span>
          </div>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Actively participating in competitive programming for <strong className="text-white">15+ months</strong>. 
            Consistently solving problems across multiple platforms with a <strong className="text-white">8‑day max streak</strong>. 
            Focused on improving algorithmic thinking and problem‑solving skills.
          </p>
        </div>
      </div>
    </section>
  );
}