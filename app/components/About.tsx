"use client";
import React from "react";
import { Code, Target, Rocket, GraduationCap } from "lucide-react";

const currentWork = [
  { icon: "🌟", text: "Exploring Next.js and advanced React patterns" },
  { icon: "💻", text: "Solving problems on Codeforces & LeetCode" },
  { icon: "📖", text: "Deepening DSA & Design Patterns knowledge" },
];

const stats = [
  { label: "Projects Completed", value: "10+", color: "blue" },
  { label: "CP Problems Solved", value: "300+", color: "purple" },
  { label: "Technologies Used", value: "10+", color: "pink" },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="relative mb-16 md:mb-20 text-center">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know more about my journey, skills, and what drives me
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 transform md:-translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-20">
            {/* Who I Am */}
            <div className="relative group">
              <div className="absolute left-1/2 md:left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
              </div>
              <div className="md:flex items-center gap-8">
                <div className="md:w-1/2 md:pr-8 flex justify-center md:justify-end mb-8 md:mb-0">
                  <div className="relative group/icon">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover/icon:border-blue-500/50 transition-all duration-300">
                      <Code className="w-12 h-12 text-blue-400 group-hover/icon:scale-110 group-hover/icon:rotate-12 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-blue-500/10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 rounded-full mb-4">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-400 text-sm font-medium">Background</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
                    <p className="text-gray-300 leading-relaxed">
                      I'm <span className="text-blue-400 font-semibold">Kabir Hossain</span>, a passionate Full-Stack Developer and Competitive Programmer.
                      I thrive on solving complex algorithmic challenges and building dynamic, user-centric web applications using modern technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Approach */}
            <div className="relative group">
              <div className="absolute left-1/2 md:left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform -translate-x-1/2 z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
              </div>
              <div className="md:flex items-center gap-8">
                <div className="md:w-1/2 md:pr-8 order-2 md:order-1">
                  <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-purple-500/50 transition-all duration-300 shadow-xl shadow-purple-500/10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 rounded-full mb-4">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-purple-400 text-sm font-medium">Methodology</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">My Approach</h3>
                    <p className="text-gray-300 leading-relaxed">
                      With a strong foundation in data structures and algorithms, I focus on creating
                      <span className="text-purple-400 font-semibold"> scalable, efficient solutions</span>.
                      I'm constantly learning new frameworks and best practices to build applications that
                      make a real impact in people's lives.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 order-1 md:order-2 mb-8 md:mb-0">
                  <div className="relative group/icon">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover/icon:border-purple-500/50 transition-all duration-300">
                      <Target className="w-12 h-12 text-purple-400 group-hover/icon:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative group">
              <div className="absolute left-1/2 md:left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full transform -translate-x-1/2 z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
              </div>
              <div className="md:flex items-center gap-8">
                <div className="md:w-1/2 md:pr-8 flex justify-center md:justify-end mb-8 md:mb-0">
                  <div className="relative group/icon">
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover/icon:border-pink-500/50 transition-all duration-300">
                      <GraduationCap className="w-12 h-12 text-pink-400 group-hover/icon:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-pink-500/50 transition-all duration-300 shadow-xl shadow-pink-500/10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 rounded-full mb-4">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                      <span className="text-pink-400 text-sm font-medium">Education</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Academic Background</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <span className="text-pink-400 font-semibold">Diploma in Computer Science & Technology</span>.
                      Currently expanding expertise through practical projects and competitive programming.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="px-3 py-1.5 bg-blue-500/10 rounded-full">
                        <span className="text-blue-400 text-sm">Web Development</span>
                      </div>
                      <div className="px-3 py-1.5 bg-purple-500/10 rounded-full">
                        <span className="text-purple-400 text-sm">Competitive Programming</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Work */}
        <div className="mt-24 md:mt-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full border border-white/10 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
                <Rocket className="w-5 h-5 text-blue-400 relative" />
              </div>
              <span className="text-blue-400 text-sm font-medium">Current Focus</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Currently</span> Working On
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here's a glimpse into my current projects and learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWork.map((item, index) => (
              <div key={index} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-blue-500/50 transition-all duration-300 h-full">
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl group-hover:animate-bounce">{item.icon}</span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed">{item.text}</p>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs text-blue-400 font-medium">{[75, 80, 70][index]}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${[75, 80, 70][index]}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center group hover:border-blue-500/50 transition-all duration-300">
                <div className={`text-3xl md:text-4xl font-bold text-${stat.color}-400 mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="mt-3 h-1 w-12 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative floating dots */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-40 right-10 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full animate-pulse opacity-20" style={{ animationDelay: "1s" }}></div>
      </div>
    </section>
  );
}