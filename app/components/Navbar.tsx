"use client";
import React, { useState, useEffect } from "react";
import { scrollToSection } from "../utils/scrollTo";

const NAV_ITEMS = [
  { name: "Home",     href: "#home"      },
  { name: "About",    href: "#about"     },
  { name: "Skills",   href: "#tech-stack"},
  { name: "CP Stats", href: "#cp-stats"  },
  { name: "Projects", href: "#projects"  },
  { name: "Contact",  href: "#contact"   },
];

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string, name: string) => {
    setMenuOpen(false);
    setActiveItem(name);
    scrollToSection(href);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes menuIn {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .nav-root  { animation: slideDown .35s cubic-bezier(.16,1,.3,1) both; }
        .menu-root { animation: menuIn  .3s  cubic-bezier(.16,1,.3,1) both; }

        /* subtle shimmer on logo text */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .logo-shimmer {
          background: linear-gradient(90deg, #60a5fa 0%, #a78bfa 40%, #f472b6 60%, #a78bfa 80%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        /* active nav underline */
        .nav-active-line::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 1px;
          border-radius: 999px;
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6);
        }

        /* mobile item hover */
        .mob-item:hover { background: rgba(255,255,255,0.04); }
      `}</style>

      <nav className="nav-root fixed top-0 left-0 right-0 z-50">

        {/* ── Main bar ── */}
        <div
          className="flex items-center justify-between px-6 md:px-10 h-[60px] transition-all duration-300"
          style={{
            background: scrolled ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0.50)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)"}`,
          }}
        >
          {/* Logo */}
          <button onClick={() => go("#home", "Home")} className="flex items-center gap-2.5 group">
            {/* K badge — matches About's blue/purple/pink gradient */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black transition-transform duration-200 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#60a5fa,#a78bfa,#f472b6)",
                color: "#fff",
                boxShadow: "0 0 14px rgba(167,139,250,0.3)",
              }}
            >
              K
            </div>

            <div className="hidden sm:flex flex-col leading-none">
              <span className="logo-shimmer text-sm font-bold tracking-tight">Kabir</span>
              <span className="text-[9px] tracking-[0.18em] uppercase" style={{ color: "rgba(148,163,184,0.45)" }}>
                Developer
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map(item => {
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => go(item.href, item.name)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive ? "nav-active-line" : ""}`}
                  style={{
                    color: isActive
                      ? "rgba(192,132,252,0.92)"   // purple-400 — matches About accent
                      : "rgba(148,163,184,0.48)",
                    background: isActive ? "rgba(167,139,250,0.07)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.72)";
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(148,163,184,0.48)";
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* Hire Me — matches About's gradient style */}
            <button
              onClick={() => go("#contact", "Contact")}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg,#3b82f6,#8b5cf6,#ec4899)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(139,92,246,0.35)",
              }}
            >
              Hire Me
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-all duration-200"
              style={{
                border: "1px solid rgba(167,139,250,0.15)",
                background: menuOpen ? "rgba(167,139,250,0.08)" : "transparent",
              }}
              aria-label="Toggle menu"
            >
              <span className="block w-4 h-px rounded-full transition-all duration-300"
                style={{
                  background: "rgba(192,132,252,0.8)",
                  transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none",
                }} />
              <span className="block h-px rounded-full transition-all duration-300"
                style={{
                  background: "rgba(148,163,184,0.4)",
                  width: menuOpen ? 0 : 12,
                  opacity: menuOpen ? 0 : 1,
                }} />
              <span className="block w-4 h-px rounded-full transition-all duration-300"
                style={{
                  background: "rgba(244,114,182,0.8)",
                  transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none",
                }} />
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div
            className="lg:hidden menu-root mx-4 mt-1 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(3,5,16,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(167,139,250,0.1)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(167,139,250,0.08)",
            }}
          >
            <div className="p-2 space-y-0.5">
              {NAV_ITEMS.map(item => {
                const isActive = activeItem === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => go(item.href, item.name)}
                    className="mob-item w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color: isActive ? "rgba(192,132,252,0.95)" : "rgba(148,163,184,0.55)",
                      background: isActive ? "rgba(167,139,250,0.1)" : "transparent",
                    }}
                  >
                    <span>{item.name}</span>
                    {isActive
                      ? <span className="w-1.5 h-1.5 rounded-full" style={{ background:"linear-gradient(135deg,#60a5fa,#a78bfa,#f472b6)" }} />
                      : <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M5 3L9 6.5L5 10" stroke="rgba(100,116,139,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    }
                  </button>
                );
              })}

              <div className="px-2 pt-2 pb-1">
                <button
                  onClick={() => go("#contact", "Contact")}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#3b82f6,#8b5cf6,#ec4899)",
                    color: "#fff",
                    boxShadow: "0 4px 14px rgba(139,92,246,0.3)",
                  }}
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}