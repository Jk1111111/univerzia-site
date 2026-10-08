"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const STAGE_LABELS = [
  { label: "SENSOR", x: 70, y: 196 },
  { label: "CONNECT", x: 232, y: 95 },
  { label: "DATA", x: 400, y: 100 },
  { label: "RESPOND", x: 555, y: 145 },
];

/**
 * The IoT hero — a smart-irrigation environment, tied to the real "Smart
 * Agriculture" student project (soil sensor waters a plant automatically).
 * Deliberately not a robot and not a neural network: the story here is
 * SENSE → CONNECT → DATA → DEVICE → RESPOND, told through real connected
 * hardware (a moisture probe, a gateway, a dashboard, a valve), with
 * wireless signal arcs standing in for "connectivity" — a purposeful,
 * recognizable wifi-ping motif, not the site's old decorative curved line.
 */
export function IotSmartHero({ className }: { className?: string }) {
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
          <stop offset="100%" stopColor="#8891a8" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0e7490" />
        </radialGradient>
      </defs>

      {/* ---- bench ---- */}
      <rect x="20" y="330" width="660" height="10" rx="4" fill="#0f2a2e" />

      {/* ---- planter + moisture sensor: SENSE ---- */}
      <path d="M 70 330 L 84 280 L 150 280 L 164 330 Z" fill="#3a2a1f" />
      <ellipse cx="117" cy="280" rx="34" ry="7" fill="#4a3527" />
      <path d="M 105 275 Q 112 250 100 230" stroke="#1fb178" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="98" cy="228" rx="10" ry="7" fill="#1fb178" />
      <line x1="130" y1="278" x2="130" y2="245" stroke="#3a415a" strokeWidth="3" />
      <rect x="115" y="212" width="30" height="34" rx="6" fill={`url(#${uid}-device)`} stroke="#1c2338" strokeWidth="1.4" />
      <motion.circle
        cx="130"
        cy="228"
        r="5"
        fill="#5eead4"
        variants={{ dim: { opacity: 0.15 }, bright: { opacity: 1, transition: { duration: 0.6 } } }}
        className="animate-pulse-soft"
      />

      {/* wifi-style signal pings: sensor -> gateway */}
      <g style={{ transformOrigin: "145px 220px" }}>
        {[8, 15, 22].map((r, i) => (
          <circle key={r} cx="145" cy="220" r={r} fill="none" stroke="#5eead4" strokeWidth="1.6" className="iot-ping" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
      </g>

      {/* ---- gateway hub: CONNECT ---- */}
      <rect x="230" y="150" width="60" height="46" rx="8" fill={`url(#${uid}-device)`} stroke="#1c2338" strokeWidth="1.4" />
      <line x1="245" y1="150" x2="238" y2="128" stroke="#3a415a" strokeWidth="3" strokeLinecap="round" />
      <line x1="275" y1="150" x2="282" y2="128" stroke="#3a415a" strokeWidth="3" strokeLinecap="round" />
      <motion.circle
        cx="238"
        cy="126"
        r="4"
        fill="#f5a524"
        variants={{ dim: { opacity: 0.15 }, bright: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } } }}
        className="animate-pulse-soft"
      />
      <motion.circle
        cx="282"
        cy="126"
        r="4"
        fill="#f5a524"
        variants={{ dim: { opacity: 0.15 }, bright: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } } }}
        className="animate-pulse-soft"
      />
      <rect x="242" y="164" width="36" height="18" rx="3" fill="#0a1330" />
      <line x1="248" y1="173" x2="272" y2="173" stroke="#5eead4" strokeWidth="1.4" opacity="0.7" />

      {/* signal pings: gateway -> dashboard */}
      <g style={{ transformOrigin: "300px 170px" }}>
        {[8, 15, 22].map((r, i) => (
          <circle key={r} cx="300" cy="170" r={r} fill="none" stroke="#17c3d6" strokeWidth="1.6" className="iot-ping" style={{ animationDelay: `${0.4 + i * 0.5}s` }} />
        ))}
      </g>

      {/* ---- dashboard: DATA ---- */}
      <rect x="360" y="120" width="150" height="110" rx="10" fill="#0a1330" stroke="#134e4a" strokeWidth="1.4" />
      <text x="375" y="142" fontFamily="monospace" fontSize="9" letterSpacing="1.5" fill="#5eead4">
        SOIL MOISTURE
      </text>
      <motion.text
        x="375"
        y="172"
        fontFamily="monospace"
        fontSize="22"
        fontWeight={700}
        fill="#f5a524"
        variants={{ dim: { opacity: 0.2 }, bright: { opacity: 1, transition: { duration: 0.6, delay: 0.5 } } }}
      >
        32%
      </motion.text>
      <path d="M 375 210 L 400 200 L 420 214 L 445 195 L 470 205 L 495 198" stroke="#17c3d6" strokeWidth="1.6" fill="none" />
      <circle cx="495" cy="198" r="3" fill="#5eead4" className="animate-pulse-soft" />

      {/* signal pings: dashboard -> valve */}
      <g style={{ transformOrigin: "525px 190px" }}>
        {[8, 15, 22].map((r, i) => (
          <circle key={r} cx="525" cy="190" r={r} fill="none" stroke="#f5a524" strokeWidth="1.6" className="iot-ping" style={{ animationDelay: `${0.8 + i * 0.5}s` }} />
        ))}
      </g>

      {/* ---- smart valve + second plant: RESPOND ---- */}
      <rect x="555" y="160" width="40" height="50" rx="6" fill={`url(#${uid}-device)`} stroke="#1c2338" strokeWidth="1.4" />
      <motion.rect
        x="565"
        y="172"
        width="20"
        height="8"
        rx="2"
        fill="#f5a524"
        variants={{ dim: { opacity: 0.2 }, bright: { opacity: 1, transition: { duration: 0.5, delay: 1 } } }}
        className="animate-pulse-soft"
      />
      <path d="M 575 210 L 575 250 L 610 250 L 610 280" stroke="#3a415a" strokeWidth="5" fill="none" strokeLinecap="round" />
      {[0, 0.4, 0.8].map((d) => (
        <circle key={d} cx="610" cy="282" r="3" fill="#3b82f6" className="iot-drip" style={{ animationDelay: `${d}s` }} />
      ))}
      <path d="M 590 330 L 604 288 L 636 288 L 650 330 Z" fill="#3a2a1f" />
      <ellipse cx="620" cy="288" rx="24" ry="6" fill="#4a3527" />
      <path d="M 618 285 Q 610 265 622 250" stroke="#1fb178" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="623" cy="248" rx="9" ry="6" fill="#1fb178" />

      {/* stage labels — clear of every element above, learned from the AI page's overlap bug */}
      {STAGE_LABELS.map((s) => (
        <text key={s.label} x={s.x} y={s.y} fontFamily="monospace" fontSize="10" letterSpacing="2" fill="#4a6b70">
          {s.label}
        </text>
      ))}

      <style>{`
        @keyframes iot-ping { 0% { opacity: 0.9; transform: scale(0.6); } 100% { opacity: 0; transform: scale(1.6); } }
        .iot-ping { animation: iot-ping 2.2s ease-out infinite; }
        @keyframes iot-drip { 0% { opacity: 0; transform: translateY(-4px); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(14px); } }
        .iot-drip { animation: iot-drip 1.8s ease-in infinite; }
      `}</style>
    </motion.svg>
  );
}
