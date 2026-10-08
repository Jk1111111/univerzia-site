"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const STAGE_LABELS = [
  { label: "CODE", x: 20, y: 20 },
  { label: "DATA", x: 195, y: 60 },
  { label: "AI", x: 360, y: 40 },
  { label: "DECISION", x: 520, y: 60 },
  { label: "RESULT", x: 595, y: 308 },
];

const OUTPUT_LABELS = ["PLASTIC", "METAL", "PAPER"];

/**
 * The AI & Coding hero — a computer-vision pipeline, not a mechanical scene.
 * A scanner reads a physical object (tied to the real "AI Vision" student
 * project: sorting recyclable waste by material), extracts feature points,
 * feeds them through a neural network, and the network settles on a
 * classification. This is the CODE → DATA → AI → DECISION → RESULT story
 * made physical, laid out left-to-right instead of the Robotics page's
 * mechanical-arm-in-depth composition — a deliberately different visual
 * language for a deliberately different technology.
 */
export function AiVisionHero({ className }: { className?: string }) {
  const uid = useId();
  const objectPath = "M 90 250 L 120 232 L 150 250 L 150 286 L 120 304 L 90 286 Z";

  return (
    <motion.svg
      viewBox="0 0 700 460"
      className={className}
      overflow="visible"
      aria-hidden="true"
      initial="dim"
      whileInView="bright"
      viewport={{ once: true, amount: 0.4 }}
    >
      <defs>
        <linearGradient id={`${uid}-object`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#3457ff" />
        </linearGradient>
        <linearGradient id={`${uid}-scan`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fe9f5" stopOpacity="0" />
          <stop offset="50%" stopColor="#8fe9f5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8fe9f5" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-node-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1fb178" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
      </defs>

      {/* ---- code panel: the process starts as written logic ---- */}
      <rect x="20" y="30" width="120" height="70" rx="8" fill="#0a1330" stroke="#2c396b" strokeWidth="1.2" />
      <rect x="30" y="42" width="46" height="3" rx="1.5" fill="#8b5cf6" opacity="0.8" />
      <rect x="30" y="50" width="70" height="3" rx="1.5" fill="#5b6480" opacity="0.7" />
      <rect x="36" y="58" width="54" height="3" rx="1.5" fill="#3fe3f5" opacity="0.8" />
      <rect x="36" y="66" width="30" height="3" rx="1.5" fill="#3fe3f5" opacity="0.5" />
      <rect x="30" y="74" width="40" height="3" rx="1.5" fill="#5b6480" opacity="0.7" />
      <motion.rect
        x="30"
        y="82"
        width="6"
        height="9"
        fill="#8fe9f5"
        variants={{ dim: { opacity: 0.2 }, bright: { opacity: 1 } }}
        className="animate-pulse-soft"
      />

      {/* ---- the scanned object, on a small pedestal ---- */}
      <ellipse cx="120" cy="320" rx="46" ry="8" fill="#000" opacity="0.25" />
      <rect x="100" y="304" width="40" height="10" rx="2" fill="#1a2340" />
      <path d={objectPath} fill={`url(#${uid}-object)`} stroke="#1c2338" strokeWidth="1.5" />

      {/* scanner + sweeping beam */}
      <rect x="95" y="150" width="50" height="20" rx="5" fill="#2c3348" />
      <circle cx="120" cy="160" r="6" fill="#8fe9f5" className="animate-pulse-soft" />
      <rect x="90" y="170" width="60" height="110" fill={`url(#${uid}-scan)`} className="ai-scan-sweep" />

      {/* feature points, appear as the beam passes */}
      {[
        { x: 100, y: 245, d: "0s" },
        { x: 138, y: 240, d: "0.3s" },
        { x: 120, y: 232, d: "0.6s" },
        { x: 95, y: 275, d: "0.9s" },
        { x: 145, y: 280, d: "1.2s" },
      ].map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r="2.6" fill="#3fe3f5" className="animate-pulse-soft" style={{ animationDelay: f.d }} />
      ))}
      <rect x="82" y="222" width="76" height="90" rx="4" fill="none" stroke="#3fe3f5" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

      {/* data flowing from the object toward the network */}
      <path id={`${uid}-datapath`} d="M 160 260 C 210 260, 210 220, 260 220" stroke="#3457ff" strokeWidth="1.2" strokeDasharray="4 6" fill="none" opacity="0.4" />
      <circle r="3.5" fill="#8fe9f5" style={{ offsetPath: `path('M 160 260 C 210 260, 210 220, 260 220')` }} className="pf-travel" />

      {/* ---- neural network: input -> hidden -> output ---- */}
      <g>
        {/* connections, input->hidden */}
        {[150, 190, 230, 270].flatMap((hy) =>
          [200, 260].map((iy) => (
            <line key={`${hy}-${iy}`} x1="290" y1={iy} x2="380" y2={hy} stroke="#2c396b" strokeWidth="1" />
          ))
        )}
        {/* connections, hidden->output */}
        {[150, 190, 230, 270].flatMap((hy) =>
          [160, 220, 280].map((oy) => (
            <line key={`o-${hy}-${oy}`} x1="380" y1={hy} x2="470" y2={oy} stroke="#2c396b" strokeWidth="1" />
          ))
        )}
        {/* the winning path, highlighted */}
        <path d="M 290 260 L 380 190 L 470 160" stroke="#1fb178" strokeWidth="2" fill="none" opacity="0.85" />

        {/* input layer */}
        {[200, 260].map((y, i) => (
          <circle key={y} cx="290" cy={y} r="9" fill="#3457ff" className="animate-pulse-soft" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
        {/* hidden layer */}
        {[150, 190, 230, 270].map((y, i) => (
          <circle key={y} cx="380" cy={y} r="8" fill="#8b5cf6" className="animate-pulse-soft" style={{ animationDelay: `${0.4 + i * 0.25}s` }} />
        ))}
        {/* output layer */}
        {[160, 220, 280].map((y, i) => (
          <g key={y}>
            <circle
              cx="470"
              cy={y}
              r={i === 0 ? 12 : 9}
              fill={i === 0 ? `url(#${uid}-node-glow)` : "#2c3348"}
              stroke={i === 0 ? "#1fb178" : "#3a415a"}
              strokeWidth="1.4"
            />
            <text x="490" y={y + 4} fontFamily="monospace" fontSize="11" fill={i === 0 ? "#1fb178" : "#6b7390"} fontWeight={i === 0 ? 700 : 400}>
              {OUTPUT_LABELS[i]}
            </text>
          </g>
        ))}
      </g>

      {/* result confirmation — settles in once the hero is in view */}
      <motion.g
        variants={{ dim: { opacity: 0, scale: 0.85 }, bright: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.9 } } }}
        style={{ transformOrigin: "610px 340px" }}
      >
        <rect x="560" y="320" width="100" height="34" rx="8" fill="#0a1330" stroke="#1fb178" strokeWidth="1.4" />
        <circle cx="578" cy="337" r="5" fill="#1fb178" />
        <text x="592" y="341" fontFamily="monospace" fontSize="11" fill="#1fb178" fontWeight={700}>
          98% MATCH
        </text>
      </motion.g>

      {/* stage labels — the pipeline read left to right, not stacked in one box */}
      {STAGE_LABELS.map((s) => (
        <text key={s.label} x={s.x} y={s.y} fontFamily="monospace" fontSize="10" letterSpacing="2" fill="#5b6480">
          {s.label}
        </text>
      ))}

      <style>{`
        @keyframes ai-scan-sweep { 0%,10% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 90%,100% { transform: translateY(110px); opacity: 0; } }
        .ai-scan-sweep { animation: ai-scan-sweep 4.5s ease-in-out infinite; }
      `}</style>
    </motion.svg>
  );
}
