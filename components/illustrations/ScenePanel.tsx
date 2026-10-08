import type { CSSProperties, ReactNode } from "react";

export type SceneVariant =
  | "robotics"
  | "ai-coding"
  | "iot"
  | "arvr"
  | "innovation"
  | "teacher-training"
  | "curriculum"
  | "implementation";

/**
 * The "robot family" for solution pages — each variant is its own distinct
 * machine (a robotic arm, a neural network, a sensor rover, an AR visor, an
 * exploded-view assembly, an AI teaching puck, a skill-tree, a server rack),
 * not the same mascot recolored. Shares AnimatedRobot's visual DNA — angular
 * cut-corner plates, brushed-metal gradients, cyan/violet emissive glow —
 * but each has its own form appropriate to what it represents.
 *
 * `accent`/`accent2` are the two brand colors passed in per solution so each
 * page keeps its own color identity; the metal/glass tones are fixed so
 * every scene still reads as "the same machine family."
 */
const scenes: Record<SceneVariant, (accent: string, accent2: string, id: string) => ReactNode> = {
  // A segmented robotic arm reaching toward a workpiece — actuated joints,
  // not a cartoon robot character.
  robotics: (accent, accent2, id) => (
    <>
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#8892ab" />
        </linearGradient>
      </defs>
      <rect x="20" y="112" width="56" height="16" rx="4" fill={`url(#${id}-metal)`} />
      <rect x="40" y="70" width="16" height="46" rx="6" fill={`url(#${id}-metal)`} />
      <circle cx="48" cy="70" r="9" fill={accent} className="pf-glow" />
      <g transform="rotate(-28 48 70)">
        <rect x="44" y="26" width="8" height="46" rx="4" fill={`url(#${id}-metal)`} />
      </g>
      <circle cx="66" cy="34" r="7" fill={accent2} className="pf-glow" style={{ animationDelay: "0.4s" }} />
      <g transform="rotate(18 66 34)">
        <rect x="63" y="34" width="7" height="38" rx="3.5" fill={`url(#${id}-metal)`} />
      </g>
      <g transform="translate(78 62)">
        <path d="M0 0 L14 -6 L14 8 Z" fill={accent} />
        <path d="M0 0 L14 10 L14 -4 Z" fill={accent2} opacity="0.85" />
      </g>
      <rect x="150" y="96" width="34" height="30" rx="6" fill={accent2} opacity="0.9" />
      <circle cx="167" cy="111" r="3" fill="#0b1220" opacity="0.4" />
      <circle cx="35" cy="118" r="10" fill="none" stroke={accent} strokeWidth="2.5" className="pf-rotate" style={{ "--pf-rot-duration": "10s" } as CSSProperties} />
    </>
  ),

  // A neural-network / AI core — nodes, connections, traveling data pulses.
  "ai-coding": (accent, accent2, id) => {
    const nodes: [number, number][] = [
      [56, 40], [56, 96], [164, 40], [164, 96], [110, 24], [110, 112],
    ];
    return (
      <>
        <defs>
          <radialGradient id={`${id}-core`} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#eafcff" />
            <stop offset="45%" stopColor={accent} />
            <stop offset="100%" stopColor={accent2} />
          </radialGradient>
        </defs>
        {nodes.map(([x, y], i) => (
          <line key={i} x1="110" y1="68" x2={x} y2={y} stroke={accent} strokeWidth="1.2" opacity="0.4" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={i % 2 === 0 ? accent : accent2} opacity="0.85" className="pf-glow" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
        <path d="M110 46 L132 60 L132 76 L110 90 L88 76 L88 60 Z" fill={`url(#${id}-core)`} stroke="#0b1220" strokeOpacity="0.15" />
        {nodes.slice(0, 3).map(([x, y], i) => (
          <circle key={i} r="2" fill="#eafcff">
            <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={`M110 68 L${x} ${y}`} />
          </circle>
        ))}
      </>
    );
  },

  // Connected sensor network + a small autonomous rover.
  iot: (accent, accent2, id) => (
    <>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#8892ab" />
        </linearGradient>
      </defs>
      <path d="M110 50 L130 62 L130 84 L110 96 L90 84 L90 62 Z" fill={accent} opacity="0.9" />
      {[[50, 40], [50, 96], [170, 40], [170, 96]].map(([x, y], i) => (
        <g key={i}>
          <line x1="110" y1="73" x2={x} y2={y} stroke={accent2} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.5" />
          <rect x={x - 6} y={y - 6} width="12" height="12" rx="3" fill={accent2} className="pf-glow" style={{ animationDelay: `${i * 0.3}s` }} />
        </g>
      ))}
      <rect x="24" y="104" width="40" height="20" rx="6" fill={`url(#${id}-body)`} />
      <circle cx="32" cy="126" r="6" fill="#3f455e" />
      <circle cx="56" cy="126" r="6" fill="#3f455e" />
      <line x1="44" y1="104" x2="44" y2="94" stroke={`url(#${id}-body)`} strokeWidth="3" />
      <circle cx="44" cy="90" r="3" fill={accent} className="pf-glow" />
      <path d="M36 84 A 10 10 0 0 1 52 84" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M32 88 A 14 14 0 0 1 56 88" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.4" />
    </>
  ),

  // A floating AR visor amid layered translucent depth planes.
  arvr: (accent, accent2, id) => (
    <>
      <defs>
        <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#8892ab" />
        </linearGradient>
      </defs>
      <rect x="30" y="20" width="90" height="90" rx="10" fill={accent} opacity="0.12" transform="rotate(-6 75 65)" />
      <rect x="100" y="35" width="90" height="90" rx="10" fill={accent2} opacity="0.14" transform="rotate(5 145 80)" />
      <g className="pf-float">
        <rect x="58" y="58" width="104" height="44" rx="22" fill={`url(#${id}-visor)`} />
        <circle cx="92" cy="80" r="14" fill="#0b1220" opacity="0.88" />
        <circle cx="128" cy="80" r="14" fill="#0b1220" opacity="0.88" />
        <circle cx="92" cy="80" r="5" fill={accent} className="pf-glow" />
        <circle cx="128" cy="80" r="5" fill={accent2} className="pf-glow" style={{ animationDelay: "0.5s" }} />
        <rect x="108" y="74" width="12" height="8" rx="3" fill={`url(#${id}-visor)`} />
      </g>
      <circle cx="176" cy="34" r="3" fill={accent} className="pf-glow" />
      <circle cx="44" cy="106" r="3" fill={accent2} className="pf-glow" style={{ animationDelay: "0.7s" }} />
    </>
  ),

  // Exploded-view mechanical assembly on a blueprint grid.
  innovation: (accent, accent2, id) => (
    <>
      <defs>
        <pattern id={`${id}-grid`} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M14 0 H0 V14" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.25" />
        </pattern>
      </defs>
      <rect x="10" y="10" width="200" height="120" fill={`url(#${id}-grid)`} />
      <g className="pf-rotate" style={{ "--pf-rot-duration": "16s" } as CSSProperties}>
        <circle cx="70" cy="70" r="22" fill="none" stroke={accent} strokeWidth="5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect key={deg} x="67" y="42" width="6" height="10" fill={accent} transform={`rotate(${deg} 70 70)`} />
        ))}
      </g>
      <circle cx="70" cy="70" r="7" fill={accent2} />
      <line x1="94" y1="70" x2="128" y2="70" stroke="#8892ab" strokeWidth="1" strokeDasharray="3 3" />
      <rect x="128" y="58" width="30" height="24" rx="4" fill={accent2} opacity="0.85" />
      <line x1="158" y1="70" x2="184" y2="70" stroke="#8892ab" strokeWidth="1" strokeDasharray="3 3" />
      <rect x="184" y="62" width="14" height="16" rx="3" fill="#8892ab" />
      <circle cx="191" cy="70" r="2.4" fill={accent} className="pf-glow" />
    </>
  ),

  // A compact AI teaching puck beside a data-readout screen.
  "teacher-training": (accent, accent2, id) => (
    <>
      <defs>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#8892ab" />
        </linearGradient>
      </defs>
      <rect x="30" y="34" width="104" height="72" rx="10" fill={`url(#${id}-screen)`} />
      <rect x="42" y="46" width="80" height="48" rx="4" fill="#0b1220" opacity="0.85" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={50 + i * 18} y={82 - i * 8} width="10" height={8 + i * 8} fill={accent} opacity="0.9" />
      ))}
      <path d="M60 62 h50" stroke={accent2} strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
      <path d="M124 70 L150 70" stroke={accent} strokeWidth="1.4" opacity="0.5" />
      <path d="M150 40 A 30 30 0 0 1 150 100" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.3" />
      <circle cx="172" cy="70" r="24" fill={accent2} opacity="0.92" />
      <circle cx="172" cy="70" r="9" fill="#eafcff" className="pf-glow" />
      <circle cx="172" cy="70" r="24" fill="none" stroke="#eafcff" strokeWidth="1" opacity="0.4" className="pf-rotate" style={{ "--pf-rot-duration": "8s" } as CSSProperties} />
    </>
  ),

  // A branching skill-tree / curriculum roadmap.
  curriculum: (accent, accent2, id) => {
    const leaves: [number, number][] = [[52, 30], [52, 70], [52, 110]];
    return (
      <>
        <defs>
          <linearGradient id={`${id}-trunk`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={accent2} />
          </linearGradient>
        </defs>
        <rect x="164" y="60" width="20" height="20" rx="5" fill={`url(#${id}-trunk)`} />
        {leaves.map(([x, y], i) => (
          <path key={i} d={`M164 70 C ${120} 70, ${90} ${y}, ${x + 14} ${y}`} stroke={accent} strokeWidth="1.6" fill="none" opacity="0.5" />
        ))}
        {leaves.map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x} ${y - 10} L${x + 14} ${y - 10} L${x + 21} ${y} L${x + 14} ${y + 10} L${x} ${y + 10} L${x - 7} ${y} Z`} fill={i % 2 === 0 ? accent : accent2} opacity="0.85" />
            <circle cx={x + 7} cy={y} r="3" fill="#eafcff" className="pf-glow" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        ))}
        <circle r="2" fill="#eafcff">
          <animateMotion dur="4s" repeatCount="indefinite" path="M164 70 C 120 70, 90 30, 66 30" />
        </circle>
      </>
    );
  },

  // A server-rack / rollout status panel.
  implementation: (accent, accent2, id) => (
    <>
      <defs>
        <linearGradient id={`${id}-rack`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#8892ab" />
        </linearGradient>
      </defs>
      <rect x="30" y="24" width="60" height="96" rx="8" fill={`url(#${id}-rack)`} />
      {[36, 54, 72, 90, 108].map((y, i) => (
        <circle key={y} cx="42" cy={y} r="3" fill={i % 2 === 0 ? accent : accent2} className="pf-glow" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <rect x="52" y="30" width="30" height="84" rx="2" fill="#0b1220" opacity="0.12" />
      <rect x="120" y="46" width="70" height="62" rx="10" fill={accent2} opacity="0.9" />
      <path d="M136 78 l10 10 22 -26" stroke="#eafcff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" className="pf-dash" strokeDasharray="52" />
      <line x1="90" y1="70" x2="120" y2="70" stroke={accent} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.6" />
    </>
  ),
};

export function ScenePanel({
  variant,
  accent,
  accent2,
  className,
  instanceId,
}: {
  variant: SceneVariant;
  accent: string;
  accent2?: string;
  className?: string;
  /** Pass a distinct value when the SAME variant might render more than
   * once on one page (e.g. a desktop + mobile composition), so their
   * internal gradient ids don't collide — see the footer's identical
   * duplicate-SVG-id lesson. Not needed for the common case (each solution
   * page renders its own unique variant once). */
  instanceId?: string;
}) {
  const render = scenes[variant];
  const id = `scene-${variant}${instanceId ? `-${instanceId}` : ""}`;
  return (
    <svg viewBox="0 0 220 140" className={className} fill="none" aria-hidden="true">
      {render(accent, accent2 ?? accent, id)}
    </svg>
  );
}
