"use client";

import { useId } from "react";

/**
 * ConnectorBot — IoT's own character: a dish-headed robot broadcasting
 * pulsing signal rings, holding a small sensor node that blinks in sync
 * with each pulse. See BuilderBot.tsx for the shared design philosophy.
 */
export function ConnectorBot({ className }: { className?: string }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 120 120" className={`h-full w-full ${className ?? ""}`} style={{ overflow: "visible" }}>
      <style>{`
        @keyframes cn-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .cn-bob { animation: cn-bob 5s ease-in-out infinite; }
        @keyframes cn-ping { 0% { opacity: 0.7; transform: scale(0.3); } 100% { opacity: 0; transform: scale(1.6); } }
        .cn-ping { animation: cn-ping 2.4s ease-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes cn-sensor { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .cn-sensor { animation: cn-sensor 1.2s ease-in-out infinite; }
        @keyframes cn-dish { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
        .cn-dish { animation: cn-dish 4s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
      `}</style>
      <defs>
        <linearGradient id={`${uid}-steel`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="50%" stopColor="#a7b0c8" />
          <stop offset="100%" stopColor="#5b6480" />
        </linearGradient>
      </defs>

      <g className="cn-bob">
        <ellipse cx="52" cy="106" rx="30" ry="4" fill="#000" opacity="0.2" />

        {/* signal rings, from the dish */}
        <circle className="cn-ping" cx="52" cy="16" r="8" fill="none" stroke="#17c3d6" strokeWidth="1.4" style={{ animationDelay: "0s" }} />
        <circle className="cn-ping" cx="52" cy="16" r="8" fill="none" stroke="#17c3d6" strokeWidth="1.4" style={{ animationDelay: "0.8s" }} />
        <circle className="cn-ping" cx="52" cy="16" r="8" fill="none" stroke="#17c3d6" strokeWidth="1.4" style={{ animationDelay: "1.6s" }} />

        {/* body */}
        <rect x="32" y="52" width="40" height="46" rx="14" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        <circle cx="52" cy="74" r="6" fill="#0a1330" />
        <circle cx="52" cy="74" r="4" fill="#5eead4" className="cn-sensor" />

        {/* head + dish */}
        <rect x="36" y="24" width="32" height="26" rx="9" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        <rect x="42" y="32" width="20" height="9" rx="3" fill="#0a1330" />
        <circle cx="47" cy="36.5" r="1.8" fill="#5eead4" className="cn-sensor" />
        <circle cx="57" cy="36.5" r="1.8" fill="#5eead4" className="cn-sensor" style={{ animationDelay: "0.3s" }} />

        <g className="cn-dish">
          <line x1="52" y1="24" x2="52" y2="12" stroke="#5b6480" strokeWidth="2" />
          <path d="M52 4 A10 6 0 0 1 62 10 L52 12 Z" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        </g>

        {/* arm holding a small blinking sensor node */}
        <rect x="78" y="68" width="10" height="18" rx="4" fill="#8892ab" transform="rotate(18 83 77)" />
        <rect x="90" y="78" width="14" height="10" rx="3" fill={`url(#${uid}-steel)`} stroke="#3a415a" strokeWidth="1" />
        <circle cx="97" cy="83" r="2.4" fill="#5eead4" className="cn-sensor" style={{ animationDelay: "0.15s" }} />
      </g>
    </svg>
  );
}
