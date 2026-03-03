"use client";
import React from "react";
import { Layers } from "lucide-react";

const jsEcosystem = [
  { name: "JavaScript", icon: "🟨", level: 90 },
  { name: "React", icon: "⚛️", level: 88 },
  { name: "Next.js", icon: "🏰", level: 82 },
  { name: "Node.js", icon: "🟢", level: 87 },
  { name: "Express", icon: "🚂", level: 85 },
  { name: "MongoDB", icon: "🍃", level: 83 },
];

const tools = [
  { name: "Git", icon: "📁", level: 90 },
  { name: "GitHub", icon: "🐙", level: 92 },
  { name: "VS Code", icon: "💻", level: 95 },
  { name: "Render", icon: "📬", level: 85 },
  { name: "Figma", icon: "🎨", level: 80 },
  { name: "Vercel", icon: "▲", level: 88 },
  { name: "Netlify", icon: "🌐", level: 85 },
  { name: "NPM", icon: "📦", level: 90 },
  { name: "Vite", icon: "⚡", level: 87 },
];

const languages = [
  { name: "C", icon: "🔵", level: 80, color: "cyan" },
  { name: "C++", icon: "⚡", level: 90, color: "blue" },
  { name: "JavaScript", icon: "🟨", level: 90, color: "yellow" },
  { name: "Python", icon: "🐍", level: 75, color: "green" },
];

const techStats = [
  { label: "JS Technologies", value: "7", icon: "🟨" },
  { label: "Tools & Others", value: "9", icon: "🛠️" },
  { label: "Languages", value: "4", icon: "💻" },
  { label: "Total Stack", value: "20+", icon: "🧩" },
];

function TechCard({ tech, accentColor }: { tech: { name: string; icon: string; level: number }; accentColor: string }) {
  return (
    <div className={`group/tech relative bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-${accentColor}-500/30 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{tech.icon}</span>
          <span className="font-medium text-white text-sm">{tech.name}</span>
        </div>
        <div className={`text-${accentColor}-400 font-bold text-sm`}>{tech.level}%</div>
      </div>
      <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-${accentColor}-500 to-${accentColor}-400`}
          style={{ width: `${tech.level}%` }}
        ></div>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${accentColor}-500/5 to-transparent -translate-x-full group-hover/tech:translate-x-full transition-transform duration-1000 rounded-xl`}></div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="tech-stack" className="py-3 md:py-3 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full border border-white/10 mb-6 backdrop-blur-sm">
            <Layers className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium tracking-wide">TECH STACK</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Technology</span> Arsenal
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">Tools and technologies I use to bring ideas to life</p>
          <div className="absolute -top-10 left-1/4 w-20 h-20 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-5 right-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative space-y-12">
          {/* JS Ecosystem */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-yellow-500/30 transition-all duration-500 overflow-hidden">
              <div className="relative p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-yellow-300">JS</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">JavaScript Ecosystem</h3>
                      <p className="text-gray-400 text-sm">Full-Stack JavaScript Development</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-yellow-500/10 rounded-full">
                    <span className="text-yellow-400 text-sm font-medium">8 Technologies</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Mastery Level</span>
                    <span className="text-yellow-400 text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {jsEcosystem.map((tech, i) => (
                    <TechCard key={i} tech={tech} accentColor="yellow" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-green-500/30 transition-all duration-500 overflow-hidden">
              <div className="relative p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-green-300">🛠️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Tools & Others</h3>
                      <p className="text-gray-400 text-sm">Development & Deployment Tools</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-500/10 rounded-full">
                    <span className="text-green-400 text-sm font-medium">9 Technologies</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Mastery Level</span>
                    <span className="text-green-400 text-sm font-medium">88%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tools.map((tech, i) => (
                    <TechCard key={i} tech={tech} accentColor="green" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
              <div className="relative p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-purple-300">💻</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Programming Languages</h3>
                      <p className="text-gray-400 text-sm">Languages I code in</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-purple-500/10 rounded-full">
                    <span className="text-purple-400 text-sm font-medium">4 Languages</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Mastery Level</span>
                    <span className="text-purple-400 text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {languages.map((tech, i) => (
                    <div key={i} className={`group/tech relative bg-white/5 hover:bg-white/10 rounded-xl p-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300`}>
                      <div className="text-center">
                        <div className="text-3xl mb-3">{tech.icon}</div>
                        <div className="text-xl font-bold text-white mb-2">{tech.name}</div>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <div key={idx} className={`w-2 h-2 rounded-full ${idx < Math.floor(tech.level / 20) ? `bg-${tech.color}-400` : "bg-white/10"}`}></div>
                            ))}
                          </div>
                          <span className={`text-${tech.color}-400 font-medium`}>{tech.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r from-${tech.color}-500 to-${tech.color}-400`} style={{ width: `${tech.level}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStats.map((stat, i) => (
            <div key={i} className="relative group bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
              <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-5 animate-float opacity-30"><span className="text-4xl">⚛️</span></div>
        <div className="absolute top-1/3 right-10 animate-float-delayed opacity-30"><span className="text-4xl">🐳</span></div>
        <div className="absolute bottom-1/4 left-20 animate-float-slow opacity-30"><span className="text-4xl">🛠️</span></div>
      </div>
    </section>
  );
}