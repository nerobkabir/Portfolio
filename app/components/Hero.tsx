"use client";
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MapPin, Zap, MessageCircle, Trophy, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "../utils/scrollTo";

const roles = [
  "Full-Stack Developer",
  "Competitive Programmer",
  "Problem Solver",
  "MERN Stack Developer",
];

const socials = [
  { icon: Github, label: "GitHub", color: "hover:bg-gray-800", borderColor: "border-gray-700", gradient: "from-gray-800 to-gray-900", link: "https://github.com/nerobkabir" },
  { icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-700", borderColor: "border-blue-700", gradient: "from-blue-700 to-blue-800", link: "https://www.linkedin.com/in/kabir-hossain123" },
  { icon: Mail, label: "Email", color: "hover:bg-red-600", borderColor: "border-red-600", gradient: "from-red-600 to-red-700", link: "mailto:nerob2308@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", color: "hover:bg-green-600", borderColor: "border-green-600", gradient: "from-green-600 to-green-700", link: "https://wa.me/8801856846615" },
  { icon: Trophy, label: "Codeforces", color: "hover:bg-orange-600", borderColor: "border-orange-600", gradient: "from-orange-600 to-orange-700", link: "https://codeforces.com/profile/kabir_hossain" },
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const role = roles[currentRole];
    const interval = setInterval(() => {
      if (currentIndex <= role.length) {
        setDisplayedText(role.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [currentRole]);

  // এই function টা replace করো
const handleResumeView = () => {
  window.open("/MD. Kabir Hossain Resume.pdf", "_blank");
};

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-26 pt-35 relative">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left space-y-6 animate-fadeInUp">
            <p className="text-blue-400 text-lg flex items-center justify-center md:justify-start gap-2 font-medium">
              <Zap className="w-5 h-5 animate-pulse" /> Hello, I'm
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Kabir Hossain
            </h1>

            <div className="h-12">
              <p className="text-xl md:text-2xl text-gray-300 font-medium">
                {displayedText}
                <span className="animate-blink">|</span>
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>Feni, Bangladesh</span>
            </div>

            <p className="text-gray-300 max-w-xl leading-relaxed">
              Passionate Full-Stack Developer & Competitive Programmer focused on
              building scalable, high-performance web applications with modern technologies.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <button
                onClick={() => scrollToSection("#contact")}
                className="px-7 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition"
              >
                <Mail size={18} /> Get In Touch
              </button>
              <button
  onClick={handleResumeView}
  className="px-7 py-3 bg-white/5 border border-white/20 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10 transition"
>
  <ArrowUpRight size={18} /> View Resume
</button>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="text-sm text-gray-400">Follow me on</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              <div className="flex gap-4 justify-center md:justify-start">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>
                    <div className={`relative w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border ${social.borderColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-transparent ${social.color}`}>
                      <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                        {social.label}
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-white/30 transition-all duration-500"></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-1 flex justify-center animate-fadeInUp">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src="/kabir.png"
                    alt="Kabir Hossain"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.style.display = "none";
                      const fallback = document.createElement("div");
                      fallback.className = "w-full h-full flex items-center justify-center text-7xl md:text-8xl";
                      fallback.textContent = "👨‍💻";
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                </div>
                <div className="absolute -inset-2 rounded-full border-2 border-blue-500/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 animate-float-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}