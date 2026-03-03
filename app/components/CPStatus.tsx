"use client";
import React from "react";

const cpProfiles = [
  {
    label: "CF",
    platform: "Codeforces",
    handle: "@kabir_hossain",
    link: "https://codeforces.com/profile/kabir_hossain",
    color: "blue",
    stats: [
      { title: "Current Rating", value: "1074", sub: "Max: 1074 (Newbie)", barWidth: "28%" },
      { title: "Problems Solved", value: "179", sub: "132 solved last year" },
    ],
    footer: "Registered: 15 months ago",
  },
  {
    label: "LC",
    platform: "LeetCode",
    handle: "@kabirhossain",
    link: "https://leetcode.com/u/kabirhossain/",
    color: "yellow",
    stats: [
      { title: "Problems Solved", value: "36/801", barWidth: "4.5%" },
      { title: "Recent Activity", value: "38", sub: "Submissions in past year" },
    ],
    footer: "0 problems this month",
  },
  {
    label: "CC",
    platform: "CodeChef",
    handle: "@happy_rein_95",
    link: "https://www.codechef.com/users/happy_resin_95",
    color: "red",
    stats: [
      { title: "Current Rating", value: "1064", sub: "Highest: 1064 (Div 4)", barWidth: "27%" },
      { title: "Global Rank", value: "#119,244", sub: "Country Rank: #3,174" },
    ],
    footer: "From Bangladesh",
  },
];

const totalStats = [
  { value: "215+", label: "Total Problems", icon: "🧠", color: "text-blue-400" },
  { value: "8", label: "Max Streak", icon: "🔥", color: "text-orange-400" },
  { value: "15+", label: "Contests", icon: "🏆", color: "text-purple-400" },
  { value: "3,174", label: "Country Rank", icon: "🇧🇩", color: "text-green-400" },
];

export default function CPStatus() {
  return (
    <section id="cp-stats" className="py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Coding Profiles
            </span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Connect with me on competitive programming platforms
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cpProfiles.map((profile) => (
            <a
              key={profile.platform}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className={`relative bg-gradient-to-br from-${profile.color}-900/10 to-${profile.color}-900/5 rounded-xl p-6 border border-${profile.color}-500/20 hover:border-${profile.color}-400 transition-all duration-300 h-full`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${profile.color}-500/20 to-${profile.color}-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-xl font-bold">{profile.label}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{profile.platform}</h3>
                      <div className={`text-sm text-${profile.color}-400`}>{profile.handle}</div>
                    </div>
                  </div>
                  <div className={`text-${profile.color}-400 group-hover:translate-x-1 transition-transform duration-300`}>→</div>
                </div>

                {/* Stats */}
                <div className="space-y-5">
                  {profile.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-gray-400 text-sm">{stat.title}</div>
                        <div className={`text-${profile.color}-400 font-bold text-lg`}>{stat.value}</div>
                      </div>
                      {stat.barWidth && (
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r from-${profile.color}-500 to-${profile.color}-400 rounded-full`} style={{ width: stat.barWidth }}></div>
                        </div>
                      )}
                      {stat.sub && <div className="text-xs text-gray-500 mt-1">{stat.sub}</div>}
                      {!stat.barWidth && (
                        <div className="flex gap-1 mt-2">
                          {[...Array(10)].map((_, j) => (
                            <div key={j} className={`h-2 flex-1 rounded-sm bg-${profile.color}-500/30 group-hover:bg-${profile.color}-500/50 transition-all duration-300`} style={{ opacity: 0.3 + j * 0.07 }}></div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
                  <div className="text-sm text-gray-400">{profile.footer}</div>
                  <div className={`text-sm text-${profile.color}-400`}>Visit Profile</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Total Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {totalStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
            <span className="text-gray-400 text-sm">📍 Bangladesh | 🎓 Student</span>
          </div>
          <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto">
            Actively participating in competitive programming for 15+ months.
            Consistently solving problems across multiple platforms with 8 days max streak.
            Focused on improving algorithmic thinking and problem-solving skills.
          </p>
        </div>
      </div>
    </section>
  );
}