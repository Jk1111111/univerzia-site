"use client";

import { useId } from "react";

/**
 * One of four themed robot characters (Builder / Coder / Connector /
 * Explorer) — deliberately distinct designs, not the shared AnimatedRobot
 * mascot reused again. Each one performs a small, continuous "creative
 * action" specific to its subject via pure CSS keyframes (no client JS),
 * so it stays server-renderable. BuilderBot: STEM/Robotics — tightens a
 * bolt with a wrench, a spark flashing on each turn.
 */
export function BuilderBot({ className }: { className?: string }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 120 120" className={`h-full w-full ${className ?? ""}`} style={{ overflow: "visible" }}>
      <style>{`
        @keyframes bb-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .bb-bob { animation: bb-bob 4.5s ease-in-out infinite; }
        @keyframes bb-wrench { 0%,20% { transform: rotate(-18deg); } 40%,60% { transform: rotate(14deg); } 80%,100% { transform: rotate(-18deg); } }
        .bb-wrench { animation: bb-wrench 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: 100% 50%; }
        @keyframes bb-spark { 0%,85%,100% { opacity: 0; transform: scale(0.4); } 90% { opacity: 1; transform: scale(1.3); } 95% { opacity: 0.6; transform: scale(0.9); } }
        .bb-spark { animation: bb-spark 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes bb-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .bb-glow { animation: bb-glow 3s ease-in-out infinite; }
      `}</style>
      <defs>
        <linearGradient id={`${uid}-steel`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="50%" stopColor="#a7b0c8" />
          <stop offset="100%" stopColor="#5b6480" />
        </linearGradient>
      </defs>

      <g className="bb-bob">
        <ellipse cx="52" cy="106" rx="30" ry="4" fill="#000" opacity="0.2" />

        {/* body */}
        <rect x="30" y="52" width="44" height="48" rx="14" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        <circle cx="52" cy="76" r="7" fill="#0a1330" />
        <circle cx="52" cy="76" r="5" fill="#f5a524" className="bb-glow" />

        {/* head */}
        <rect x="34" y="18" width="36" height="30" rx="10" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        <rect x="40" y="27" width="24" height="10" rx="4" fill="#0a1330" />
        <circle cx="47" cy="32" r="2.2" fill="#3fe3f5" className="bb-glow" />
        <circle cx="59" cy="32" r="2.2" fill="#3fe3f5" className="bb-glow" style={{ animationDelay: "0.5s" }} />

        {/* static arm holding the bolt */}
        <rect x="18" y="64" width="14" height="10" rx="4" fill="#8892ab" />
        <circle cx="20" cy="69" r="6" fill="#3a415a" stroke="#5b6480" strokeWidth="1.5" />

        {/* wrench arm — the creative action */}
        <g className="bb-wrench">
          <rect x="70" y="62" width="30" height="9" rx="4" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
          <path d="M96 60 L108 60 L108 74 L96 74 Q90 67 96 60 Z" fill="#8892ab" stroke="#3a415a" strokeWidth="1" />
        </g>

        {/* spark on contact */}
        <path className="bb-spark" d="M20 66 L23 69 L20 72 L17 69 Z" fill="#ffe27a" />
      </g>
    </svg>
  );
}
