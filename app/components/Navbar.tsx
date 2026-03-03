"use client";
import React, { useState } from "react";
import { Code, Sparkles, ArrowUpRight, ChevronRight } from "lucide-react";
import { scrollToSection } from "../utils/scrollTo";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#tech-stack" },
  { name: "CP Stats", href: "#cp-stats" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (href: string) => {
    setIsMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative group">
          {/* Animated Glow Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500 animate-pulse"></div>

          {/* Main Navbar Container */}
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
              {/* Logo */}
              <div className="relative group/logo cursor-pointer">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover/logo:opacity-30 blur-lg transition-all duration-500"></div>
                <div className="relative flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl border border-white/10 group-hover/logo:border-white/30 transition-all duration-300">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover/logo:scale-110 group-hover/logo:rotate-12 transition-all duration-300">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                      KABIR
                    </div>
                    <div className="text-[10px] text-gray-400 tracking-widest -mt-1">DEVELOPER</div>
                  </div>
                </div>
              </div>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.href)}
                    className="relative group/nav px-5 py-2.5 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover/nav:from-blue-500/10 group-hover/nav:to-purple-500/10 rounded-lg transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover/nav:w-3/4 transition-all duration-300 rounded-full"></div>
                    <span className="relative text-sm font-medium text-gray-300 group-hover/nav:text-white transition-colors duration-300 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"></span>
                      {item.name}
                    </span>
                  </button>
                ))}

                <button
                  onClick={() => handleNav("#contact")}
                  className="relative group/cta ml-3 px-6 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center gap-2 text-white">
                    <Sparkles size={16} />
                    <span>Let's Talk</span>
                    <ArrowUpRight size={16} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300" />
                  </span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : "w-full"}`}></span>
                  <span className={`h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-0" : "w-4 ml-auto"}`}></span>
                  <span className={`h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : "w-5 ml-auto"}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 animate-slideDown">
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
              <div className="relative space-y-2">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.href)}
                    className="w-full group relative overflow-hidden animate-fadeIn"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-3 text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></span>
                          {item.name}
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => handleNav("#contact")}
                  className="w-full mt-4"
                >
                  <div className="relative px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles size={18} />
                      <span>Get In Touch</span>
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}