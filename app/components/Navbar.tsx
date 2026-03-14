"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNav = (href: string, name: string) => {
    setIsMenuOpen(false);
    setActiveItem(name);
    scrollToSection(href);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .nav-font { font-family: 'Syne', sans-serif; }
        .mono-font { font-family: 'DM Mono', monospace; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
        }

        .nav-animate { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .mobile-item { animation: fadeSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

        .logo-text {
          background: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 40%, #e2e8f0 60%, #cbd5e1 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .nav-btn::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-btn:hover::after,
        .nav-btn.active::after {
          width: 80%;
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cta-btn:hover::before {
          opacity: 1;
        }

        .spotlight {
          background: radial-gradient(
            circle at var(--mx) var(--my),
            rgba(255,255,255,0.04) 0%,
            transparent 60%
          );
        }

        .mobile-menu-enter {
          animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .border-anim {
          animation: borderPulse 3s ease-in-out infinite;
        }

        .status-dot {
          animation: dotBlink 2s ease-in-out infinite;
        }
      `}</style>

      <nav className="nav-font fixed top-0 left-0 right-0 z-50 px-0 pt-4 pb-2">
        <div className="w-full px-4 md:px-8">
          {/* Main Bar */}
          <div
            ref={navRef}
            className="nav-animate relative"
            style={{ "--mx": `${mousePos.x}%`, "--my": `${mousePos.y}%` } as React.CSSProperties}
          >
            {/* Border glow */}
            <div
              className="absolute inset-0 rounded-2xl border-anim"
              style={{
                background: "linear-gradient(135deg, rgba(148,163,184,0.15), rgba(71,85,105,0.08), rgba(148,163,184,0.12))",
                borderRadius: "16px",
                padding: "1px",
              }}
            >
              <div className="w-full h-full rounded-2xl" style={{ background: "transparent" }} />
            </div>

            <div
              className="spotlight relative flex items-center justify-between px-6 py-3.5 rounded-2xl"
              style={{
                background: scrolled
                  ? "rgba(5, 8, 15, 0.92)"
                  : "rgba(5, 8, 15, 0.75)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
                boxShadow: scrolled
                  ? "0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05) inset"
                  : "0 4px 20px rgba(0,0,0,0.4)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* ── Logo ── */}
              <button
                onClick={() => handleNav("#home", "Home")}
                className="flex items-center gap-3 group"
              >
                <div
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(135deg, #1e293b, #0f172a)",
                    border: "1px solid rgba(148,163,184,0.2)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  <span
                    className="text-base font-black"
                    style={{
                      background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    K
                  </span>
                  <span
                    className="status-dot absolute -top-1 -right-1 w-2 h-2 rounded-full"
                    style={{ background: "#22d3ee", boxShadow: "0 0 6px #22d3ee" }}
                  />
                </div>

                <div className="hidden sm:block">
                  <span className="logo-text text-lg font-bold tracking-tight">KABIR</span>
                  <div
                    className="mono-font text-[9px] tracking-[0.2em] mt-[-3px]"
                    style={{ color: "rgba(100,116,139,0.8)" }}
                  >
                    DEVELOPER
                  </div>
                </div>
              </button>

              {/* ── Desktop Nav ── */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.href, item.name)}
                    className={`nav-btn relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg ${
                      activeItem === item.name
                        ? "active text-slate-100"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                    style={{
                      background:
                        activeItem === item.name
                          ? "rgba(148,163,184,0.08)"
                          : "transparent",
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* ── CTA ── */}
              <div className="hidden lg:flex items-center gap-3">
                <div
                  className="w-px h-6"
                  style={{ background: "rgba(148,163,184,0.15)" }}
                />
                <button
                  onClick={() => handleNav("#contact", "Contact")}
                  className="cta-btn flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wide rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
                    color: "#0f172a",
                    boxShadow: "0 4px 16px rgba(148,163,184,0.25), 0 1px 0 rgba(255,255,255,0.3) inset",
                  }}
                >
                  <span>Hire Me</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* ── Mobile Hamburger ── */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg transition-all duration-300"
                style={{
                  background: isMenuOpen ? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.06)",
                  border: "1px solid rgba(148,163,184,0.12)",
                }}
                aria-label="Menu"
              >
                <span
                  className="block h-px w-5 rounded-full transition-all duration-300 origin-center"
                  style={{
                    background: "rgba(226,232,240,0.8)",
                    transform: isMenuOpen ? "translateY(4px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="block h-px rounded-full transition-all duration-300"
                  style={{
                    background: "rgba(148,163,184,0.6)",
                    width: isMenuOpen ? "0" : "14px",
                    opacity: isMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block h-px w-5 rounded-full transition-all duration-300 origin-center"
                  style={{
                    background: "rgba(226,232,240,0.8)",
                    transform: isMenuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </div>
          </div>

          {/* ── Mobile Menu ── */}
          {isMenuOpen && (
            <div
              className="lg:hidden mobile-menu-enter mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(5, 8, 15, 0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(148,163,184,0.12)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
              }}
            >
              <div className="p-3 space-y-1">
                {navItems.map((item, i) => (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.href, item.name)}
                    className="mobile-item w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group"
                    style={{
                      animationDelay: `${i * 0.04}s`,
                      background:
                        activeItem === item.name
                          ? "rgba(148,163,184,0.1)"
                          : "transparent",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(148,163,184,0.08)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        activeItem === item.name
                          ? "rgba(148,163,184,0.1)"
                          : "transparent")
                    }
                  >
                    <span
                      className="text-sm font-semibold tracking-wide"
                      style={{
                        color:
                          activeItem === item.name
                            ? "rgba(226,232,240,0.95)"
                            : "rgba(148,163,184,0.7)",
                      }}
                    >
                      {item.name}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ color: "rgba(100,116,139,0.4)" }}
                    >
                      <path
                        d="M5 3L9 7L5 11"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}

                <div className="pt-2 pb-1 px-1">
                  <button
                    onClick={() => handleNav("#contact", "Contact")}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
                      color: "#0f172a",
                      boxShadow: "0 4px 16px rgba(148,163,184,0.2)",
                    }}
                  >
                    <span>Get In Touch</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}