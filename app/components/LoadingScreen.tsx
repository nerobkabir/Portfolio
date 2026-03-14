"use client";
import React, { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExit(true), 2800);
    const t2 = setTimeout(() => onComplete(),   3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div style={{
      position:       "fixed",
      inset:          0,
      zIndex:         9999,
      background:     "#000",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      opacity:        exit ? 0 : 1,
      transition:     exit ? "opacity 0.8s ease" : "none",
    }}>
      <style>{`
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-rev {
          to { transform: rotate(-360deg); }
        }
        @keyframes dash {
          0%   { stroke-dashoffset: 283; }
          50%  { stroke-dashoffset: 70;  }
          100% { stroke-dashoffset: 283; }
        }
        @keyframes dash2 {
          0%   { stroke-dashoffset: 0;   }
          50%  { stroke-dashoffset: 188; }
          100% { stroke-dashoffset: 0;   }
        }
        @keyframes pulse-core {
          0%,100% { r: 5;  opacity: 0.5; }
          50%     { r: 8;  opacity: 1;   }
        }
      `}</style>

      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">

        {/* outer ring */}
        <g style={{ transformOrigin:"50px 50px", animation:"rotate 2s linear infinite" }}>
          <circle
            cx="50" cy="50" r="45"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <circle
            cx="50" cy="50" r="45"
            stroke="url(#g1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="283"
            style={{ animation:"dash 2s ease-in-out infinite" }}
          />
        </g>

        {/* inner ring */}
        <g style={{ transformOrigin:"50px 50px", animation:"rotate-rev 1.4s linear infinite" }}>
          <circle
            cx="50" cy="50" r="30"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
          <circle
            cx="50" cy="50" r="30"
            stroke="url(#g2)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="188"
            style={{ animation:"dash2 1.4s ease-in-out infinite" }}
          />
        </g>

        {/* centre dot */}
        <circle
          cx="50" cy="50" r="5"
          fill="url(#g1)"
          style={{ animation:"pulse-core 1.6s ease-in-out infinite" }}
        />

        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#6366f1"/>
            <stop offset="100%" stopColor="#a78bfa"/>
          </linearGradient>
          <linearGradient id="g2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#a78bfa"/>
            <stop offset="100%" stopColor="#6366f1"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}