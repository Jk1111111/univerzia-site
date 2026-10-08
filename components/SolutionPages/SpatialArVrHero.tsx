"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const STAGE_LABELS = [
  { label: "OBJECT", x: 90, y: 240 },
  { label: "SCAN", x: 195, y: 345 },
  { label: "MODEL", x: 355, y: 85 },
  { label: "LAYERS", x: 495, y: 110 },
  { label: "INTERACT", x: 345, y: 335 },
];

const HEART_PATH = "M 390 165 C 375 140, 335 140, 335 172 C 335 200, 365 220, 390 240 C 415 220, 445 200, 445 172 C 445 140, 405 140, 390 165 Z";

/**
 * The AR/VR hero: a real object (the heart from the page's own copy —
 * "from a beating heart to a solar system") gets scanned by a tablet into
 * a floating 3D hologram, whose layers separate and can be annotated —
 * REAL OBJECT → SCAN → MODEL → LAYERS → INTERACT. No robot, no network,
 * no code — depth, perspective and spatial UI are the whole visual
 * language here, in indigo/violet/magenta instead of cyan/metallic or
 * electric-blue/green.
 */
export function SpatialArVrHero({ className }: { className?: string }) {
  const uid = useId();

  return (
    <motion.svg
      viewBox="0 0 700 420"
      className={className}
      overflow="visible"
      aria-hidden="true"
      initial="dim"
      whileInView="bright"
      viewport={{ once: true, amount: 0.4 }}
    >
      <defs>
        <linearGradient id={`${uid}-device`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#7c7fa3" />
        </linearGradient>
        <radialGradient id={`${uid}-heart`} cx="40%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="45%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
        <radialGradient id={`${uid}-floor`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* spotlight floor — spatial, not a flat workbench */}
      <ellipse cx="390" cy="330" rx="230" ry="50" fill={`url(#${uid}-floor)`} />

      {/* ---- tablet scanning the real object ---- */}
      <g transform="rotate(-10 150 290)">
        <rect x="80" y="255" width="140" height="90" rx="10" fill={`url(#${uid}-device)`} stroke="#1c2338" strokeWidth="1.4" />
        <rect x="90" y="265" width="120" height="70" rx="4" fill="#0a1330" />
        <circle cx="150" cy="300" r="18" fill="none" stroke="#8b5cf6" strokeWidth="1.4" strokeDasharray="3 3" className="pf-rotate" style={{ transformOrigin: "150px 300px" }} />
        <motion.circle
          cx="150"
          cy="300"
          r="5"
          fill="#d946ef"
          variants={{ dim: { opacity: 0.2 }, bright: { opacity: 1, transition: { duration: 0.6 } } }}
          className="animate-pulse-soft"
        />
      </g>

      {/* scan marker on the surface */}
      <g opacity="0.85">
        <path d="M 155 335 L 155 328 L 162 328 M 195 328 L 202 328 L 202 335 M 202 352 L 202 359 L 195 359 M 162 359 L 155 359 L 155 352" stroke="#a78bfa" strokeWidth="1.6" fill="none" />
      </g>

      {/* scan beam rising from the marker toward the hologram */}
      <motion.path
        d="M 178 335 L 340 200"
        stroke="#d946ef"
        strokeWidth="1.2"
        strokeDasharray="4 6"
        variants={{ dim: { opacity: 0 }, bright: { opacity: 0.55, transition: { duration: 0.8, delay: 0.2 } } }}
      />

      {/* ---- digital layers: concentric shells peeling outward from the model ---- */}
      {[46, 66, 86].map((r, i) => (
        <ellipse
          key={r}
          cx="390"
          cy="190"
          rx={r}
          ry={r * 0.82}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1"
          strokeDasharray="2 5"
          opacity={0.5 - i * 0.13}
        />
      ))}

      {/* ---- the 3D model: a beating heart hologram ---- */}
      <motion.g
        className="ar-beat"
        style={{ transformOrigin: "390px 190px" }}
        variants={{ dim: { opacity: 0.25, scale: 0.85 }, bright: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } } }}
      >
        <path d={HEART_PATH} fill={`url(#${uid}-heart)`} stroke="#4c1d95" strokeWidth="1.2" opacity="0.92" />
        <path d="M 390 165 L 390 235" stroke="#4c1d95" strokeWidth="1" opacity="0.4" />
      </motion.g>

      {/* orbit ring beneath the model — suggests it can be rotated/explored */}
      <ellipse cx="390" cy="300" rx="110" ry="18" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.35" />
      <circle r="3.4" fill="#f5d0fe">
        <animateMotion dur="6s" repeatCount="indefinite" path="M 280 300 A 110 18 0 1 1 500 300 A 110 18 0 1 1 280 300" />
      </circle>

      {/* AR annotation callouts */}
      <motion.g variants={{ dim: { opacity: 0 }, bright: { opacity: 1, transition: { duration: 0.5, delay: 0.9 } } }}>
        <line x1="440" y1="168" x2="490" y2="155" stroke="#d946ef" strokeWidth="1" />
        <circle cx="440" cy="168" r="2.6" fill="#d946ef" />
        <rect x="490" y="144" width="76" height="20" rx="4" fill="#1e1b3a" stroke="#4c1d95" strokeWidth="1" />
        <text x="528" y="157" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#f5d0fe">
          CHAMBER
        </text>

        <line x1="425" y1="215" x2="490" y2="228" stroke="#6366f1" strokeWidth="1" />
        <circle cx="425" cy="215" r="2.6" fill="#6366f1" />
        <rect x="490" y="218" width="60" height="20" rx="4" fill="#1e1b3a" stroke="#4c1d95" strokeWidth="1" />
        <text x="520" y="231" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#c7d2fe">
          VALVE
        </text>
      </motion.g>

      {/* stage labels */}
      {STAGE_LABELS.map((s) => (
        <text key={s.label} x={s.x} y={s.y} fontFamily="monospace" fontSize="10" letterSpacing="2" fill="#6b6b8f">
          {s.label}
        </text>
      ))}

      <style>{`
        @keyframes ar-beat { 0%, 100% { transform: scale(1); } 15% { transform: scale(1.08); } 30% { transform: scale(1); } 45% { transform: scale(1.05); } 60% { transform: scale(1); } }
        .ar-beat { animation: ar-beat 2.4s ease-in-out infinite; }
      `}</style>
    </motion.svg>
  );
}
