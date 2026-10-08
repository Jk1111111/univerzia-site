"use client";

import { usePathname } from "next/navigation";

type Variant = "energetic" | "tech" | "playful" | "calm" | "data" | "minimal";

const VARIANTS: Record<Variant, { colors: [string, string]; shapes: number }> = {
  energetic: { colors: ["#3457ff", "#ff7a45"], shapes: 8 }, // home
  tech: { colors: ["#17c3d6", "#3457ff"], shapes: 6 }, // solutions
  playful: { colors: ["#8b5cf6", "#1fb178"], shapes: 6 }, // programs
  calm: { colors: ["#6a8bff", "#8b5cf6"], shapes: 5 }, // about
  data: { colors: ["#1fb178", "#17c3d6"], shapes: 6 }, // resources
  minimal: { colors: ["#6a8bff", "#17c3d6"], shapes: 4 }, // contact / for-schools
};

function variantForPath(pathname: string): Variant {
  if (pathname === "/") return "energetic";
  if (pathname.startsWith("/solutions")) return "tech";
  if (pathname.startsWith("/programs")) return "playful";
  if (pathname.startsWith("/about")) return "calm";
  if (pathname.startsWith("/resources")) return "data";
  return "minimal";
}

// Deterministic layout per shape count — no Math.random, so server and client
// markup match exactly (this only matters for the very first paint; the
// component is a client component regardless, but a mismatch would still
// cause a visible layout flash on hydration).
const POSITIONS = [
  { x: 10, y: 18 }, { x: 85, y: 14 }, { x: 70, y: 65 }, { x: 18, y: 74 },
  { x: 46, y: 38 }, { x: 92, y: 55 }, { x: 32, y: 12 }, { x: 58, y: 82 },
];

/**
 * A subtle, page-aware ambient background: a couple of slow-drifting blurred
 * gradient blobs plus a handful of faint geometric shapes, auto-varied by
 * route (see `variantForPath`) so different sections of the site feel
 * related but not identical. Sits absolutely within whatever section renders
 * it (typically `PageHero`) — NOT a fixed full-page layer, since every
 * section on this site already paints its own opaque background, which
 * would otherwise hide a globally-fixed ambient layer completely.
 *
 * Opacity is intentionally low and colors are the existing brand palette —
 * this is meant to be felt, not read. Pure CSS transform/opacity animation,
 * so it's GPU-cheap and freezes correctly under `prefers-reduced-motion`.
 */
export function StemAmbient({
  className,
  dark = false,
  showLine = false,
}: {
  className?: string;
  dark?: boolean;
  /** The reused cyan curved-line/traveling-pulse motif — now off by default
   * everywhere. It was the site's one generic decorative element repeated
   * across every page; pages get their own technology-specific visual story
   * instead (see StemRoboticsPage, AiCodingPage, IotPage, ArVrPage). Kept as
   * an opt-in escape hatch rather than deleted outright. */
  showLine?: boolean;
}) {
  const pathname = usePathname();
  const variant = VARIANTS[variantForPath(pathname ?? "/")];
  const blobOpacity = dark ? 0.28 : 0.18;
  const shapeOpacity = dark ? 0.85 : 0.7;
  const lineOpacity = dark ? 0.5 : 0.35;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <style>{`
        @keyframes stem-drift-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%,-4%) scale(1.12); } }
        @keyframes stem-drift-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-7%,5%) scale(1.08); } }
        .stem-drift-a { animation: stem-drift-a 18s ease-in-out infinite; }
        .stem-drift-b { animation: stem-drift-b 21s ease-in-out infinite; }
        @keyframes stem-shape-float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-18px) rotate(10deg); } }
        .stem-shape-float { animation: stem-shape-float 8s ease-in-out infinite; }
        @keyframes stem-travel { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
        .stem-travel { animation: stem-travel 8s linear infinite; }
      `}</style>

      <div
        className="stem-drift-a absolute -left-16 top-0 size-80 rounded-full blur-[90px]"
        style={{ background: `radial-gradient(circle, ${variant.colors[0]} 0%, transparent 70%)`, opacity: blobOpacity }}
      />
      <div
        className="stem-drift-b absolute -right-16 bottom-0 size-80 rounded-full blur-[90px]"
        style={{ background: `radial-gradient(circle, ${variant.colors[1]} 0%, transparent 70%)`, opacity: blobOpacity * 0.85 }}
      />

      {/* a faint diagonal "data stream" line with a traveling pulse of light —
          reads clearly as motion even at a glance, unlike the drifting blobs */}
      {showLine && (
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            id="stem-line"
            d="M -5 70 C 25 55, 45 85, 75 50 C 90 32, 95 40, 105 20"
            fill="none"
            stroke={variant.colors[0]}
            strokeWidth="0.3"
            opacity={lineOpacity}
          />
          <circle r="0.9" fill={variant.colors[1]}>
            <animateMotion dur="8s" repeatCount="indefinite" path="M -5 70 C 25 55, 45 85, 75 50 C 90 32, 95 40, 105 20" />
          </circle>
        </svg>
      )}

      {POSITIONS.slice(0, variant.shapes).map((p, i) => (
        <span
          key={i}
          className="stem-shape-float absolute block border-[1.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 12 + (i % 3) * 6,
            height: 12 + (i % 3) * 6,
            borderColor: i % 2 === 0 ? variant.colors[0] : variant.colors[1],
            opacity: shapeOpacity,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${7 + (i % 3)}s`,
            borderRadius: i % 3 === 0 ? "9999px" : i % 3 === 1 ? "6px" : "2px",
            transform: i % 4 === 0 ? "rotate(45deg)" : undefined,
          }}
        />
      ))}

      {/* a small, occasional status readout — reads as "this is a live system,"
          not decoration; kept to dark sections only, where a HUD-style detail
          fits, and low-opacity enough to be felt rather than read. Top-right,
          not bottom-right — several sections (FinalCTA among them) already
          anchor a robot illustration to the bottom-right corner. */}
      {dark && (
        <div className="absolute right-5 top-5 hidden select-none flex-col gap-1 font-mono text-[9px] uppercase tracking-wider text-white/35 sm:flex">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 animate-pulse-soft rounded-full" style={{ background: variant.colors[0] }} />
            SYS.PWR // ONLINE
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 animate-pulse-soft rounded-full" style={{ background: variant.colors[1], animationDelay: "0.6s" }} />
            NET // STABLE
          </span>
        </div>
      )}
    </div>
  );
}
