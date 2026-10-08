import { motion } from "framer-motion";

/**
 * An original flat-illustration composition: two students building a robot
 * at a workbench. Built entirely from primitive shapes (no stock imagery),
 * standing in for hero photography until real campus photos are supplied.
 */
export function HeroScene() {
  return (
    <svg viewBox="0 0 640 560" fill="none" className="h-full w-full" role="img" aria-labelledby="hero-scene-title">
      <title id="hero-scene-title">
        Illustration of two students building a robot together at a workbench
      </title>

      <ellipse cx="320" cy="470" rx="230" ry="26" fill="#0a1330" opacity="0.08" />

      {/* desk */}
      <rect x="70" y="360" width="500" height="26" rx="6" fill="#d7cdbb" />
      <rect x="70" y="386" width="500" height="14" rx="3" fill="#c3b79f" />
      <rect x="100" y="400" width="16" height="70" fill="#c3b79f" />
      <rect x="524" y="400" width="16" height="70" fill="#c3b79f" />

      {/* desk-top items: laptop (student 1 side) */}
      <g>
        <rect x="130" y="318" width="120" height="80" rx="8" fill="#101c40" />
        <rect x="140" y="326" width="100" height="58" rx="4" fill="#17c3d6" opacity="0.16" />
        <path
          d="M172 340 L158 355 L172 370 M208 340 L222 355 L208 370"
          stroke="#17c3d6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="122" y="396" width="136" height="8" rx="4" fill="#0b1220" opacity="0.25" />
      </g>

      {/* circuit board prop (student 2 side) */}
      <g>
        <rect x="420" y="330" width="110" height="68" rx="8" fill="#0f9b6a" />
        <g stroke="#d9fff0" strokeWidth="2" opacity="0.8">
          <path d="M436 346 H468 V362 H500" />
          <path d="M436 378 H460" />
          <path d="M486 346 V378 H514" />
        </g>
        <circle cx="436" cy="346" r="3.5" fill="#ffc93c" />
        <circle cx="500" cy="362" r="3.5" fill="#ffc93c" />
        <circle cx="514" cy="378" r="3.5" fill="#ffc93c" />
        <rect x="420" y="330" width="110" height="68" rx="8" stroke="#0b1220" strokeOpacity="0.08" />
      </g>

      {/* Student 1 - seated, at laptop */}
      <g>
        <rect x="150" y="398" width="14" height="46" rx="6" fill="#6d28d9" />
        <path d="M150 444 q30 26 60 0" stroke="#6d28d9" strokeWidth="14" strokeLinecap="round" fill="none" />
        <rect x="140" y="300" width="80" height="72" rx="26" fill="#8b5cf6" />
        <circle cx="180" cy="278" r="30" fill="#f3d9c4" />
        <path d="M152 268 q28 -34 56 0" fill="#2a1b3d" />
        <path
          d="M160 330 q20 -18 40 0 l-4 30 h-32 z"
          fill="#8b5cf6"
        />
        <path d="M150 340 q10 20 -6 40" stroke="#8b5cf6" strokeWidth="12" strokeLinecap="round" fill="none" />
      </g>

      {/* Student 2 - standing, pointing at robot */}
      <g>
        <rect x="470" y="270" width="82" height="90" rx="28" fill="#1fb178" />
        <circle cx="511" cy="240" r="30" fill="#e8b48c" />
        <path d="M483 232 q28 -32 56 0" fill="#20140e" />
        <path
          d="M470 300 q-26 -6 -38 -34"
          stroke="#1fb178"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="428" cy="262" r="6" fill="#e8b48c" />
        <rect x="546" y="300" width="34" height="14" rx="7" fill="#1fb178" />
        <rect x="500" y="360" width="18" height="40" rx="7" fill="#15803d" />
        <rect x="530" y="360" width="18" height="40" rx="7" fill="#15803d" />
      </g>

      {/* Robot buddy on the desk between them */}
      <g>
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="270" y="252" width="100" height="86" rx="22" fill="#3457ff" />
          <rect x="286" y="196" width="68" height="60" rx="18" fill="#eaf0ff" />
          <circle cx="308" cy="224" r="7" fill="#0b1220" />
          <circle cx="336" cy="224" r="7" fill="#0b1220" />
          <path d="M304 240 q16 10 32 0" stroke="#0b1220" strokeWidth="3" strokeLinecap="round" fill="none" />
          <line x1="320" y1="196" x2="320" y2="176" stroke="#3457ff" strokeWidth="4" />
          <circle cx="320" cy="170" r="7" fill="#ffc93c" />
          <rect x="248" y="270" width="26" height="14" rx="7" fill="#3457ff" />
          <rect x="366" y="264" width="30" height="14" rx="7" fill="#3457ff" />
          <circle cx="400" cy="271" r="10" fill="#6a8bff" />
          <rect x="284" y="330" width="22" height="18" rx="6" fill="#101c40" />
          <rect x="334" y="330" width="22" height="18" rx="6" fill="#101c40" />
        </motion.g>
      </g>

      {/* floating concept badges */}
      {[
        { x: 96, y: 150, color: "#3457ff", d: "M-8 0 L0 -9 L8 0 L0 9 Z" },
        { x: 560, y: 120, color: "#8b5cf6" },
        { x: 470, y: 60, color: "#ffc93c" },
      ].map((b, i) => (
        <motion.circle
          key={i}
          cx={b.x}
          cy={b.y}
          r="5"
          fill={b.color}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <g stroke="#0a1330" strokeOpacity="0.12" strokeDasharray="4 6">
        <path d="M96 150 C 140 170, 200 220, 270 268" />
        <path d="M560 120 C 500 160, 440 200, 396 260" />
        <path d="M470 60 C 440 100, 400 140, 366 180" />
      </g>
    </svg>
  );
}
