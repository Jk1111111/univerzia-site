"use client";

import { useId } from "react";

/**
 * CoderBot — AI & Coding's own character: a screen-headed robot typing on a
 * floating keyboard, code lines scrolling on its own head display and a
 * small idea-glyph pulsing above it. See BuilderBot.tsx for the shared
 * design philosophy (distinct per subject, pure CSS, no shared mascot).
 */
export function CoderBot({ className }: { className?: string }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 120 120" className={`h-full w-full ${className ?? ""}`} style={{ overflow: "visible" }}>
      <style>{`
        @keyframes cb-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .cb-bob { animation: cb-bob 4.8s ease-in-out infinite; }
        @keyframes cb-type-l { 0%,100% { transform: translateY(0); } 25% { transform: translateY(3px); } 50% { transform: translateY(0); } }
        .cb-type-l { animation: cb-type-l 0.9s ease-in-out infinite; transform-box: fill-box; }
        @keyframes cb-type-r { 0%,100% { transform: translateY(0); } 75% { transform: translateY(3px); } }
        .cb-type-r { animation: cb-type-r 0.9s ease-in-out infinite; transform-box: fill-box; }
        @keyframes cb-line { 0% { opacity: 0; transform: scaleX(0); } 15% { opacity: 1; } 90% { opacity: 1; transform: scaleX(1); } 100% { opacity: 0; transform: scaleX(1); } }
        .cb-line { animation: cb-line 3.6s ease-in-out infinite; transform-box: fill-box; transform-origin: 0% 50%; }
        @keyframes cb-idea { 0%,100% { opacity: 0.4; transform: scale(0.9) translateY(0); } 50% { opacity: 1; transform: scale(1.1) translateY(-3px); } }
        .cb-idea { animation: cb-idea 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
      `}</style>
      <defs>
        <linearGradient id={`${uid}-steel`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="50%" stopColor="#a7b0c8" />
          <stop offset="100%" stopColor="#5b6480" />
        </linearGradient>
        <radialGradient id={`${uid}-core`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#eafcff" />
          <stop offset="60%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </radialGradient>
      </defs>

      <g className="cb-bob">
        <ellipse cx="52" cy="106" rx="30" ry="4" fill="#000" opacity="0.2" />

        {/* idea glyph */}
        <path className="cb-idea" d="M52 4 L58 12 L52 20 L46 12 Z" fill={`url(#${uid}-core)`} />

        {/* body */}
        <rect x="32" y="52" width="40" height="46" rx="14" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        <circle cx="52" cy="74" r="6" fill={`url(#${uid}-core)`} />

        {/* screen head */}
        <rect x="30" y="16" width="44" height="32" rx="8" fill="#0a1330" stroke="#3a415a" strokeWidth="1.5" />
        <rect x="35" y="21" width="34" height="22" rx="2" fill="#141d42" />
        <rect className="cb-line" x="39" y="26" width="20" height="2.4" rx="1.2" fill="#8b7bf5" style={{ animationDelay: "0s" }} />
        <rect className="cb-line" x="39" y="31" width="26" height="2.4" rx="1.2" fill="#3fe3f5" style={{ animationDelay: "0.9s" }} />
        <rect className="cb-line" x="39" y="36" width="15" height="2.4" rx="1.2" fill="#3fe3f5" style={{ animationDelay: "1.8s" }} />

        {/* typing arms */}
        <rect className="cb-type-l" x="20" y="66" width="12" height="8" rx="3" fill="#8892ab" />
        <rect className="cb-type-r" x="76" y="66" width="12" height="8" rx="3" fill="#8892ab" />

        {/* floating keyboard */}
        <rect x="22" y="90" width="68" height="14" rx="3" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={26 + i * 9} y="94" width="6" height="6" rx="1.5" fill="#0a1330" opacity="0.7" />
        ))}
      </g>
    </svg>
  );
}
