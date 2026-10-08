"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const HUD_ITEMS = [
  { label: "BUILD", delay: "0s" },
  { label: "PROGRAM", delay: "0.5s" },
  { label: "TEST", delay: "1s" },
  { label: "SOLVE", delay: "1.5s" },
];

/**
 * The STEM & Robotics page's own hero machine — a heavy industrial arm on a
 * rotating turret base, deliberately NOT the homepage's small utility arm or
 * rover. Idle motion (turret creep, joint breathing, cable/LED pulse) is
 * plain CSS so it's alive at rest; the "power-on" brighten is a one-time
 * `whileInView` trigger (same idea as `Reveal` elsewhere), not a pinned
 * scroll sequence — this page explicitly isn't getting another of those.
 */
export function RoboticArmHero({ className }: { className?: string }) {
  const uid = useId();

  return (
    <motion.svg
      viewBox="0 0 600 640"
      className={className}
      overflow="visible"
      aria-hidden="true"
      initial="dim"
      whileInView="bright"
      viewport={{ once: true, amount: 0.4 }}
    >
      <defs>
        <linearGradient id={`${uid}-metal`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="45%" stopColor="#9aa4bd" />
          <stop offset="100%" stopColor="#4c5570" />
        </linearGradient>
        <linearGradient id={`${uid}-metal-dark`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#3a4260" />
          <stop offset="100%" stopColor="#1c2338" />
        </linearGradient>
        <radialGradient id={`${uid}-core`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#eafcff" />
          <stop offset="50%" stopColor="#3fe3f5" />
          <stop offset="100%" stopColor="#3457ff" />
        </radialGradient>
      </defs>

      {/* floor glow */}
      <ellipse cx="260" cy="580" rx="220" ry="34" fill="#3457ff" opacity="0.12" />

      {/* base plinth */}
      <rect x="140" y="558" width="240" height="24" rx="6" fill={`url(#${uid}-metal-dark)`} stroke="#0f1424" strokeWidth="1.5" />
      {[170, 210, 250, 290, 330, 370].map((x) => (
        <circle key={x} cx={x} cy="570" r="2.2" fill="#0f1424" />
      ))}

      {/* rotating turret ring — very slow constant creep, reads as "always live" */}
      <g
        style={{ transformOrigin: "260px 545px", ["--pf-rot-duration" as string]: "40s" }}
        className="pf-rotate"
      >
        <circle cx="260" cy="545" r="66" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="2" />
        <circle cx="260" cy="545" r="66" fill="none" stroke="#3fe3f5" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
        {[0, 90, 180, 270].map((deg) => (
          <circle
            key={deg}
            cx={260 + 52 * Math.cos((deg * Math.PI) / 180)}
            cy={545 + 52 * Math.sin((deg * Math.PI) / 180)}
            r="3"
            fill="#2c3348"
          />
        ))}
      </g>
      <circle cx="260" cy="545" r="30" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="1.5" />
      <motion.circle
        cx="260"
        cy="545"
        r="10"
        fill={`url(#${uid}-core)`}
        variants={{ dim: { opacity: 0.15 }, bright: { opacity: 1, transition: { duration: 1 } } }}
        className="animate-pulse-soft"
      />

      {/* shoulder tower + first joint — slow breathing sway */}
      <g className="arm-sway-1" style={{ transformOrigin: "260px 545px" }}>
        <rect x="240" y="420" width="40" height="130" rx="14" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="1.5" />
        <line x1="252" y1="440" x2="252" y2="530" stroke="#0f1424" strokeWidth="2" opacity="0.4" />
        <line x1="268" y1="440" x2="268" y2="530" stroke="#0f1424" strokeWidth="2" opacity="0.4" />
        <circle cx="260" cy="420" r="26" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="1.5" />

        {/* upper arm — cable conduit + bolt detail */}
        <g className="arm-sway-2" style={{ transformOrigin: "260px 420px" }}>
          <rect x="246" y="270" width="28" height="152" rx="10" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="1.5" />
          <path d="M 252 285 Q 262 350 252 410" stroke="#0f1424" strokeWidth="2.5" fill="none" opacity="0.35" />
          <path d="M 252 285 Q 262 350 252 410" stroke="#3fe3f5" strokeWidth="1" fill="none" opacity="0.5" className="pf-dash" />
          <circle cx="260" cy="272" r="20" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="1.5" />

          {/* elbow + forearm */}
          <g className="arm-sway-3" style={{ transformOrigin: "260px 272px" }}>
            <rect x="248" y="160" width="24" height="114" rx="9" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="1.5" />
            <circle cx="260" cy="162" r="15" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="1.5" />
            <motion.circle
              cx="260"
              cy="162"
              r="5"
              fill="#ffc93c"
              variants={{ dim: { opacity: 0.15 }, bright: { opacity: 1, transition: { duration: 1, delay: 0.2 } } }}
              className="animate-pulse-soft"
            />

            {/* wrist + gripper holding the component it's assembling */}
            <g style={{ transformOrigin: "260px 162px" }}>
              <rect x="252" y="128" width="16" height="38" rx="6" fill={`url(#${uid}-metal)`} stroke="#0f1424" strokeWidth="1.5" />
              <g style={{ transformOrigin: "260px 128px" }} className="gripper-open">
                <rect x="236" y="98" width="10" height="34" rx="3" fill="#2c3348" />
              </g>
              <g style={{ transformOrigin: "260px 128px" }} className="gripper-close">
                <rect x="274" y="98" width="10" height="34" rx="3" fill="#2c3348" />
              </g>
              <motion.g
                variants={{ dim: { opacity: 0.2, scale: 0.9 }, bright: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6 } } }}
                style={{ transformOrigin: "260px 112px" }}
              >
                <rect x="246" y="98" width="28" height="26" rx="5" fill={`url(#${uid}-core)`} stroke="#0b1220" strokeWidth="1.4" />
                <line x1="252" y1="105" x2="268" y2="105" stroke="#0b1220" strokeWidth="1" opacity="0.5" />
                <line x1="252" y1="112" x2="268" y2="112" stroke="#0b1220" strokeWidth="1" opacity="0.5" />
              </motion.g>
            </g>
          </g>
        </g>
      </g>

      {/* floating technical HUD — small embedded readout, not a giant word */}
      <motion.g
        variants={{ dim: { opacity: 0 }, bright: { opacity: 1, transition: { duration: 0.6, delay: 0.8 } } }}
      >
        <rect x="400" y="140" width="150" height="112" rx="10" fill="#0a1330" stroke="#2c396b" strokeWidth="1.2" opacity="0.9" />
        {HUD_ITEMS.map((item, i) => (
          <g key={item.label} transform={`translate(414, ${168 + i * 24})`}>
            <circle cx="0" cy="0" r="3.4" fill="#3fe3f5" className="animate-pulse-soft" style={{ animationDelay: item.delay }} />
            <text x="14" y="4" fontFamily="monospace" fontSize="12" letterSpacing="1.5" fill="#8fe9f5">
              {item.label}
            </text>
          </g>
        ))}
      </motion.g>

      <style>{`
        /* Baseline angles (not 0) so the arm holds a bent, articulated pose —
           shoulder tilted ~40deg out, elbow folded back ~70deg relative to
           that — instead of stacking straight up into an unreadable pole.
           Each still sways a few degrees around its own baseline for idle life. */
        @keyframes arm-sway-1 { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes arm-sway-2 { 0%,100% { transform: rotate(38deg); } 50% { transform: rotate(42deg); } }
        @keyframes arm-sway-3 { 0%,100% { transform: rotate(-72deg); } 50% { transform: rotate(-68deg); } }
        .arm-sway-1 { animation: arm-sway-1 9s ease-in-out infinite; }
        .arm-sway-2 { animation: arm-sway-2 7s ease-in-out infinite; }
        .arm-sway-3 { animation: arm-sway-3 6s ease-in-out infinite; }
        @keyframes gripper-open-anim { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-2px); } }
        @keyframes gripper-close-anim { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
        .gripper-open { animation: gripper-open-anim 6s ease-in-out infinite; }
        .gripper-close { animation: gripper-close-anim 6s ease-in-out infinite; }
      `}</style>
    </motion.svg>
  );
}
