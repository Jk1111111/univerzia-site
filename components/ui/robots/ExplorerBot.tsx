"use client";

import { useId } from "react";

/**
 * ExplorerBot — AR/VR's own character: a visored robot reaching toward a
 * small wireframe object that rotates continuously beside it, as if
 * examining it in mid-air. See BuilderBot.tsx for the shared design
 * philosophy.
 */
export function ExplorerBot({ className }: { className?: string }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 120 120" className={`h-full w-full ${className ?? ""}`} style={{ overflow: "visible" }}>
      <style>{`
        @keyframes ex-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .ex-bob { animation: ex-bob 4.6s ease-in-out infinite; }
        @keyframes ex-spin { from { transform: rotateY(0deg) rotate(0deg); } to { transform: rotateY(360deg) rotate(360deg); } }
        .ex-cube { animation: ex-spin 6s linear infinite; transform-style: preserve-3d; }
        @keyframes ex-reach { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-8deg); } }
        .ex-reach { animation: ex-reach 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: 0% 50%; }
        @keyframes ex-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .ex-glow { animation: ex-glow 2.6s ease-in-out infinite; }
      `}</style>
      <defs>
        <linearGradient id={`${uid}-steel`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="50%" stopColor="#a7b0c8" />
          <stop offset="100%" stopColor="#5b6480" />
        </linearGradient>
      </defs>

      <g className="ex-bob">
        <ellipse cx="52" cy="106" rx="32" ry="4" fill="#000" opacity="0.2" />

        {/* body */}
        <rect x="32" y="52" width="40" height="46" rx="14" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        <circle cx="52" cy="74" r="6" fill="#0a1330" />
        <circle cx="52" cy="74" r="4" fill="#d946ef" className="ex-glow" />

        {/* visored head */}
        <rect x="34" y="18" width="36" height="30" rx="10" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        <rect x="38" y="26" width="28" height="12" rx="6" fill="#0a1330" />
        <rect x="41" y="30" width="22" height="4" rx="2" fill="#d946ef" opacity="0.85" className="ex-glow" />

        {/* reaching arm */}
        <g className="ex-reach">
          <rect x="72" y="64" width="26" height="9" rx="4" fill="#8892ab" />
          <circle cx="96" cy="68" r="4" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        </g>

        {/* floating wireframe object being examined */}
        <g transform="translate(98 40)" style={{ perspective: 120 }}>
          <g className="ex-cube">
            <rect x="-9" y="-9" width="18" height="18" fill="none" stroke="#d946ef" strokeWidth="1.4" opacity="0.9" />
            <rect x="-6" y="-6" width="12" height="12" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.6" />
          </g>
        </g>
      </g>
    </svg>
  );
}
