"use client";

import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { AnimatedRobot } from "./AnimatedRobot";
import { media } from "@/data/media";

/**
 * Univerzia's signature footer visual: a wide panoramic "STEM adventure" strip
 * — entirely code-generated (SVG paths, gradients, CSS transforms), no
 * raster image assets — sitting in its own fixed-height band between the
 * footer's CTA and its navigation columns. It never overlaps either.
 *
 * Every object here is procedural: the robot is the same angular sensor-visor
 * character used site-wide (AnimatedRobot), and the rest (rocket, wireframe
 * globe, orbital atom, mechanical gear, data-stream badge, wireframe cube,
 * energy-crystal "idea" glyph, satellite) are hand-built SVG/CSS shapes with
 * layered metallic gradients and cyan/violet emissive glow, matching the
 * homepage's "premium robotics lab" visual language.
 *
 * A light particle continuously travels the connecting path; as it nears
 * each object, that object "activates" (brightens, glows, scales up) via a
 * CSS animation timed to the particle's arrival — see the activateDelay
 * values below, each an approximate position along PATH_D converted to a
 * time offset.
 *
 * Client component (the only footer piece that needs to be): objects get a
 * subtle parallax response to mouse position only — deliberately no
 * scroll-linked motion, so the band stays put as the page scrolls past it.
 * The parallax offset lives on its OWN inner wrapper, separate from the
 * element carrying the CSS "activation" keyframe — two different elements,
 * so the two transforms never fight for the same property (see the
 * AtomIcon/Robot lesson elsewhere in this codebase: a CSS transform
 * animation always replaces, never composes with, another transform on the
 * same element). The mouse tracker bails out completely under
 * `prefers-reduced-motion` and on coarse (touch) pointers.
 */

function vars(style: Record<string, string | number>): CSSProperties {
  return style as CSSProperties;
}

function Obj({
  xPct,
  yPct,
  w = 32,
  h = 32,
  className,
  style,
  activateDelay,
  activateDuration = 3.333,
  activateClass = "adv-activate",
  parallaxDepth = 0,
  children,
}: {
  xPct: number;
  yPct: number;
  w?: number;
  h?: number;
  className?: string;
  style?: CSSProperties;
  activateDelay?: number;
  activateDuration?: number;
  activateClass?: string;
  parallaxDepth?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute ${activateDelay !== undefined ? activateClass : ""} ${className ?? ""}`}
      style={vars({
        left: `${xPct}%`,
        top: `${yPct}%`,
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        ...(activateDelay !== undefined
          ? { "--activate-delay": `${activateDelay}s`, "--activate-duration": `${activateDuration}s` }
          : {}),
        ...style,
      })}
    >
      <ParallaxInner depth={parallaxDepth}>{children}</ParallaxInner>
    </div>
  );
}

/**
 * Reads the `--mx`/`--my` CSS custom properties set by `SceneMotion` on an
 * ancestor and turns them into a small mouse-follow translate — kept on its
 * own element (never the Obj wrapper that carries the activation scale
 * animation) so the two transforms never collide. Deliberately has no
 * scroll-linked term: the band should sit still as the page scrolls past it,
 * not drift.
 */
function ParallaxInner({ depth, children }: { depth: number; children: ReactNode }) {
  if (depth === 0) return <>{children}</>;
  return (
    <div
      className="h-full w-full"
      style={{
        transform: `translate(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px))`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Tracks mouse position relative to this element, exposing it as CSS custom
 * properties on itself for descendants to read. One listener drives every
 * object's parallax instead of per-object listeners.
 */
function SceneMotion({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: ReactNode;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return;

    let frame = 0;
    function handleMove(e: MouseEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const nx = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        const ny = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
        el.style.setProperty("--mx", nx.toFixed(3));
        el.style.setProperty("--my", ny.toFixed(3));
      });
    }

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--mx": 0, "--my": 0 } as CSSProperties} {...rest}>
      {children}
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// ---------------------------------------------------------------------------
// Procedural objects — every shape below is hand-built SVG/CSS: gradients,
// paths and geometry, no raster assets. Shared metallic/glow language:
// steel-gradient bodies, cyan/violet emissive accents.
// ---------------------------------------------------------------------------

function useGradId(prefix: string) {
  const id = useId();
  return `${prefix}${id.replace(/:/g, "")}`;
}

function RocketIcon() {
  const flame = useGradId("flame");
  const hull = useGradId("hull");
  return (
    <svg viewBox="0 0 80 130" className="h-full w-full adv-idle-float-slow" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={hull} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7d87a8" />
          <stop offset="45%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#8f99ba" />
        </linearGradient>
        <linearGradient id={flame} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff6d6" />
          <stop offset="45%" stopColor="#ffc93c" />
          <stop offset="80%" stopColor="#ff7a45" />
          <stop offset="100%" stopColor="#ff7a45" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform="rotate(38 40 65)">
        {/* faceted nose + hull, panel seams instead of a cartoon rounded body */}
        <path d="M40 6 L52 24 L52 40 L28 40 L28 24 Z" fill={`url(#${hull})`} stroke="#4a5170" strokeWidth="0.6" />
        <path d="M28 40 L52 40 L54 78 L26 78 Z" fill={`url(#${hull})`} stroke="#4a5170" strokeWidth="0.6" />
        <line x1="30" y1="48" x2="50" y2="48" stroke="#4a5170" strokeWidth="0.5" opacity="0.5" />
        <line x1="29" y1="60" x2="51" y2="60" stroke="#4a5170" strokeWidth="0.5" opacity="0.5" />
        {/* sensor window */}
        <circle cx="40" cy="30" r="6" fill="#0a1330" />
        <circle cx="40" cy="30" r="4.4" fill="#3fe3f5" opacity="0.9" className="ar-glow-shared" />
        {/* angular fins */}
        <path d="M28 62 L12 80 L27 74 Z" fill="#5b6480" />
        <path d="M52 62 L68 80 L53 74 Z" fill="#5b6480" />
        {/* exhaust */}
        <path d="M30 78 Q40 112 50 78 Q40 96 30 78 Z" fill={`url(#${flame})`} className="adv-flame" />
      </g>
    </svg>
  );
}

// A real photographic Earth (NASA "Blue Marble"-style) staged as the
// footer's climax object: an outer atmosphere halo and a tilted orbit ring
// with a traveling satellite particle sit OUTSIDE the sphere's own clipped
// circle (a separate, non-`overflow-hidden` wrapper), so they can extend past
// its edge the way a real atmosphere/orbit would, instead of being cropped by
// the same mask that keeps the photo circular. A slow-panning highlight
// layered over the photo itself reads as drifting cloud cover rather than a
// static, flat image.
// A real Earth, not a Saturn-like ring-and-orbit prop: just the photo sphere
// with an atmosphere halo. An earlier version added a tilted orbit ring
// around it for "space scene" flavor, but that read as a ring around the
// planet itself rather than a satellite trail — removed so this stays
// recognizably Earth.
function GlobeIcon() {
  return (
    <div className="relative flex h-full w-full items-center justify-center adv-idle-float-slow">
      <div
        className="absolute inset-[-16%] rounded-full opacity-70 blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(63,227,245,0.35) 0%, rgba(139,92,246,0.14) 55%, transparent 75%)",
        }}
      />

      <div className="relative h-full w-full overflow-hidden rounded-full">
        <Image src={media.earth} alt="" fill sizes="160px" className="object-cover" />
        {/* rim light for a lit-sphere feel over the photo */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.2), transparent 55%)" }}
        />
        <div className="absolute inset-0 adv-idle-cloud-pan" style={{ background: "radial-gradient(circle at 68% 62%, rgba(255,255,255,0.18), transparent 45%)" }} />
        <div className="absolute inset-0" style={{ boxShadow: "inset -6px -5px 14px rgba(0,0,0,0.45)" }} />
      </div>
    </div>
  );
}

function EnergyGlyph() {
  const core = useGradId("core");
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 80 90" className="h-full w-full adv-idle-pulse" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={core} cx="45%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#eafcff" />
          <stop offset="45%" stopColor="#3fe3f5" />
          <stop offset="100%" stopColor="#6a5cf0" />
        </radialGradient>
      </defs>
      <g stroke="#3fe3f5" strokeWidth="1.6" strokeLinecap="round" opacity="0.65">
        {rays.map((deg) => (
          <line key={deg} x1="40" y1="10" x2="40" y2="2" transform={`rotate(${deg} 40 40)`} />
        ))}
      </g>
      {/* faceted energy crystal, not a literal cartoon bulb */}
      <path d="M40 12 L58 32 L50 58 L30 58 L22 32 Z" fill={`url(#${core})`} stroke="#0a1330" strokeWidth="0.6" />
      <path d="M40 12 L58 32 L40 40 Z" fill="#ffffff" opacity="0.25" />
      <rect x="31" y="60" width="18" height="7" rx="2" fill="#5b6480" />
      <rect x="33" y="69" width="14" height="5" rx="2" fill="#3f455e" />
    </svg>
  );
}

function OrbitalAtom() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full adv-idle-float" style={{ overflow: "visible" }}>
      <circle cx="40" cy="40" r="5.5" fill="#3fe3f5" className="ar-glow-shared" />
      <g stroke="#8b7bf5" strokeWidth="1.8" fill="none" opacity="0.85">
        <g>
          <ellipse cx="40" cy="40" rx="34" ry="14" className="adv-idle-rotate" style={vars({ "--rot-duration": "14s" })} />
        </g>
        <g transform="rotate(60 40 40)">
          <ellipse cx="40" cy="40" rx="34" ry="14" className="adv-idle-rotate" style={vars({ "--rot-duration": "20s" })} />
        </g>
        <g transform="rotate(120 40 40)">
          <ellipse cx="40" cy="40" rx="34" ry="14" className="adv-idle-rotate" style={vars({ "--rot-duration": "26s" })} />
        </g>
      </g>
      <circle r="1.4" fill="#eafcff">
        <animateMotion dur="6s" repeatCount="indefinite" path="M 40 40 m -34 0 a 34 14 0 1 0 68 0 a 34 14 0 1 0 -68 0" />
      </circle>
    </svg>
  );
}

// Generates an 8-tooth gear outline as an SVG path — a real mechanical gear
// silhouette rather than a circle with radial line "teeth".
function gearPath(cx: number, cy: number, rOuter: number, rInner: number, teeth: number): string {
  const step = (Math.PI * 2) / (teeth * 2);
  let d = "";
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const angle = i * step - Math.PI / 2;
    // Rounded to a fixed precision: Math.cos/sin can serialize to a
    // slightly different decimal string between server (Node) and client
    // (browser) engines at full float precision, which is a real hydration
    // mismatch for a value baked into SSR-ed markup — fixed precision keeps
    // the string deterministic.
    const x = (cx + r * Math.cos(angle)).toFixed(3);
    const y = (cy + r * Math.sin(angle)).toFixed(3);
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return d + " Z";
}

// Recolored from an earlier green to the scene's cool steel/cyan family —
// palette cohesion matters more here than variety: every object should read
// as part of one lab environment, not a rainbow of unrelated stickers.
function MechGear() {
  const grad = useGradId("gear");
  return (
    <svg viewBox="0 0 70 70" className="h-full w-full adv-idle-pulse" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={grad} x1="0.15" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="50%" stopColor="#8fb4c2" />
          <stop offset="100%" stopColor="#2c5c6e" />
        </linearGradient>
      </defs>
      <g className="adv-idle-rotate" style={vars({ "--rot-duration": "18s" })}>
        <path d={gearPath(35, 35, 26, 20, 10)} fill={`url(#${grad})`} stroke="#0a1330" strokeWidth="0.6" />
        <circle cx="35" cy="35" r="12" fill="#0a1330" />
        <circle cx="35" cy="35" r="9" fill="none" stroke={`url(#${grad})`} strokeWidth="2" />
        <circle cx="35" cy="35" r="3" fill="#3fe3f5" className="ar-glow-shared" />
      </g>
    </svg>
  );
}

function DataBadge() {
  const grad = useGradId("badge");
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full adv-idle-float" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3fe3f5" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6a5cf0" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={`${grad}-clip`}>
          <path d="M40 4 L72 22 V58 L40 76 L8 58 V22 Z" />
        </clipPath>
      </defs>
      <path d="M40 4 L72 22 V58 L40 76 L8 58 V22 Z" fill={`url(#${grad})`} stroke="#3fe3f5" strokeWidth="1.6" />
      <g clipPath={`url(#${grad}-clip)`}>
        {/* streaming data pulses behind the bracket glyph */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x="6" y={16 + i * 20} width="68" height="2.4" fill="#3fe3f5" opacity="0.35" className="adv-data-stream" style={vars({ animationDelay: `${i * 0.6}s` })} />
        ))}
      </g>
      <path
        d="M32 28 L18 40 L32 52 M48 28 L62 40 L48 52"
        stroke="#eafcff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// A genuine rotating wireframe cube using real CSS 3D transforms (GPU-cheap:
// only `transform`), not a flat isometric SVG illusion. Recolored from an
// earlier orange to violet, in line with the scene's cyan/violet palette.
function WireCube() {
  const faceBase: CSSProperties = {
    position: "absolute",
    inset: 0,
    border: "1.4px solid #b7a6f7",
    background: "linear-gradient(135deg, rgba(139,92,246,0.16), transparent)",
  };
  return (
    <div className="adv-cube-scene h-full w-full" style={{ perspective: 220 }}>
      <div className="adv-cube h-full w-full">
        <div style={{ ...faceBase, transform: "translateZ(18px)" }} />
        <div style={{ ...faceBase, transform: "rotateY(180deg) translateZ(18px)" }} />
        <div style={{ ...faceBase, transform: "rotateY(90deg) translateZ(18px)" }} />
        <div style={{ ...faceBase, transform: "rotateY(-90deg) translateZ(18px)" }} />
        <div style={{ ...faceBase, transform: "rotateX(90deg) translateZ(18px)" }} />
        <div style={{ ...faceBase, transform: "rotateX(-90deg) translateZ(18px)" }} />
      </div>
    </div>
  );
}

function SatelliteIcon() {
  const grad = useGradId("sat");
  return (
    <svg viewBox="0 0 70 50" className="h-full w-full adv-idle-float" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#8892ab" />
        </linearGradient>
      </defs>
      <rect x="26" y="18" width="18" height="14" rx="2" fill={`url(#${grad})`} />
      <circle cx="35" cy="25" r="2" fill="#3fe3f5" className="ar-glow-shared" />
      <g stroke="#6a5cf0" strokeWidth="0.6" fill="none" opacity="0.7">
        <rect x="2" y="12" width="18" height="26" rx="1.5" transform="rotate(-20 11 25)" />
        <line x1="6" y1="16" x2="16" y2="34" transform="rotate(-20 11 25)" />
        <rect x="50" y="12" width="18" height="26" rx="1.5" transform="rotate(20 59 25)" />
        <line x1="54" y1="16" x2="64" y2="34" transform="rotate(20 59 25)" />
      </g>
      <line x1="26" y1="24" x2="12" y2="20" stroke="#8892ab" strokeWidth="1" />
      <line x1="44" y1="24" x2="58" y2="20" stroke="#8892ab" strokeWidth="1" />
      <line x1="35" y1="18" x2="35" y2="6" stroke="#8892ab" strokeWidth="1.4" />
      <circle cx="35" cy="4" r="2.2" fill="#3fe3f5" className="ar-glow-shared" />
    </svg>
  );
}

function Diamond({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} className="adv-idle-float">
      <path d="M10 1 L18 10 L10 19 L2 10 Z" fill="none" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// The flowing curved path + traveling light particles
// ---------------------------------------------------------------------------

const PATH_D = "M 3 78 C 10 60, 18 60, 24 66 C 30 74, 36 50, 44 46 C 52 42, 56 58, 64 50 C 70 44, 74 34, 80 26 C 85 20, 90 24, 95 28";

// Fixed points sampled along PATH_D for glowing hex/diamond network nodes —
// a "robotics network trajectory" feel rather than a plain line.
const PATH_NODES: [number, number][] = [
  [8, 74], [21, 70], [40, 47], [61, 51], [78, 27], [92, 26],
];

function FlowPath() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3457ff" />
          <stop offset="45%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#17c3d6" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#cfe6ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#cfe6ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* layered strokes standing in for a real blur, plus an animated dash
          flow along the base line for a constant "data trajectory" feel */}
      <path d={PATH_D} stroke="url(#pathGrad)" strokeWidth="1.6" opacity="0.1" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      <path d={PATH_D} stroke="url(#pathGrad)" strokeWidth="0.9" opacity="0.16" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      <path
        d={PATH_D}
        stroke="url(#pathGrad)"
        strokeWidth="0.25"
        opacity="0.6"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeDasharray="1.2 1.6"
        className="adv-data-flow"
      />
      {PATH_NODES.map(([nx, ny], i) => (
        <g key={i} transform={`translate(${nx} ${ny})`}>
          <circle r="2.2" fill="url(#nodeGlow)" />
          <path
            d={i % 2 === 0 ? "M -0.9 0 L 0 -0.9 L 0.9 0 L 0 0.9 Z" : "M 0 -0.8 L 0.7 0 L 0 0.8 L -0.7 0 Z"}
            fill="#e8fdff"
            opacity="0.9"
          />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          r="0.75"
          fill="#f0f9ff"
          className="adv-travel"
          style={vars({ offsetPath: `path("${PATH_D}")`, animationDelay: `${i * 3.333}s` })}
        />
      ))}
    </svg>
  );
}

function Stars({ count, seedBase }: { count: number; seedBase: number }) {
  const stars = Array.from({ length: count }, (_, i) => {
    const seed = (i + seedBase) * 37.13;
    const x = (seed * 13) % 100;
    const y = ((seed * 7) % 60) + 5;
    const size = 1 + ((i * 5) % 3) * 0.4;
    const dur = 3 + ((i * 3) % 5);
    return { x, y, size, dur, delay: (i % 6) * 0.5 };
  });
  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white adv-idle-twinkle"
          style={vars({ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: 0.35, "--twinkle-duration": `${s.dur}s`, "--twinkle-delay": `${s.delay}s` })}
        />
      ))}
    </>
  );
}

function Caption() {
  return (
    <div
      className="pointer-events-none select-none text-right font-display text-[11px] italic leading-tight text-cyan/80"
      style={{ transform: "rotate(-3deg)" }}
    >
      Big Ideas
      <br />
      Brighter Futures
    </div>
  );
}

export function StemAdventure() {
  return (
    <SceneMotion className="relative h-52 w-full overflow-hidden sm:h-60 lg:h-72" aria-hidden="true">
      <StemAdventureStyles />

      {/* one shared atmosphere behind every object — a deep vignette plus a
          faint cyan/violet nebula wash — so the scene reads as objects
          floating in one lit environment rather than icons dropped on a flat
          dark rectangle. Every object's own glow now sits inside this same
          light, instead of being the only source of color in the frame. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 140% at 15% 100%, rgba(52,87,255,0.16) 0%, transparent 55%), radial-gradient(90% 120% at 88% 0%, rgba(139,92,246,0.14) 0%, transparent 55%), radial-gradient(160% 100% at 50% 50%, rgba(5,8,20,0.4) 0%, transparent 70%)",
        }}
      />

      {/* ambient glows */}
      <div className="absolute -left-10 top-0 h-40 w-40 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
      <div className="absolute right-0 top-0 h-52 w-52 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #3457ff 0%, transparent 70%)" }} />

      {/* a low horizon plane — a thin glowing line plus a soft fade beneath
          it — so the whole strip reads as one physical space the objects
          occupy (a deck/platform the scene sits on) rather than icons
          scattered over empty black. Purely atmospheric: objects are not
          clipped or aligned to it, it just grounds the environment. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, rgba(52,87,255,0.1) 0%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[9%] h-px opacity-40"
        style={{ background: "linear-gradient(to right, transparent 0%, #3fe3f5 20%, #8b7bf5 55%, #3fe3f5 80%, transparent 100%)" }}
      />

      {/* top edge containment — a soft darkening so the whole band reads as
          one enclosed stage/environment rather than objects that could
          drift past an invisible top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{ background: "linear-gradient(to bottom, rgba(5,8,20,0.5) 0%, transparent 100%)" }}
      />

      <Stars count={26} seedBase={1} />

      {/* Desktop / tablet composition — activateDelay values are each object's
          approximate position along PATH_D converted to a time offset within
          the 3.333s gap between the three traveling particles, so the pulse
          fires right as a particle passes that object. */}
      <div className="hidden h-full w-full sm:block">
        <FlowPath />

        {/* soft contact shadow so the robot reads as standing on the path
            rather than floating like a pasted sticker — the one object here
            that's meant to be grounded rather than orbital/airborne */}
        <div
          className="absolute rounded-[50%] opacity-50 blur-md"
          style={{ left: "7%", top: "86%", width: 88, height: 16, marginLeft: -44, background: "radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 75%)" }}
        />
        <Obj xPct={7} yPct={68} w={114} h={120} activateDelay={0.33} parallaxDepth={6}>
          <AnimatedRobot />
        </Obj>
        <Obj xPct={19} yPct={86} parallaxDepth={2}>
          <Diamond color="#8b5cf6" size={14} />
        </Obj>
        <Obj xPct={28} yPct={42} w={52} h={52} activateDelay={2.5} parallaxDepth={-8}>
          <OrbitalAtom />
        </Obj>
        <Obj xPct={37} yPct={66} w={36} h={36} activateDelay={0.15} parallaxDepth={10}>
          <WireCube />
        </Obj>
        <Obj xPct={46} yPct={38} w={50} h={50} activateDelay={1.24} parallaxDepth={-6}>
          <DataBadge />
        </Obj>
        <Obj xPct={57} yPct={45} w={40} h={40} activateDelay={2.43} parallaxDepth={8}>
          <MechGear />
        </Obj>
        <Obj xPct={68} yPct={20} w={50} h={62} activateDelay={0.4} parallaxDepth={-10}>
          <EnergyGlyph />
        </Obj>
        <Obj xPct={80} yPct={11} w={58} h={71} activateDelay={1.81} activateClass="adv-activate-rocket" parallaxDepth={12}>
          <RocketIcon />
        </Obj>
        <div className="hidden lg:block">
          <Obj xPct={95} yPct={9} w={42} h={26} parallaxDepth={-6}>
            <SatelliteIcon />
          </Obj>
          <Obj xPct={97} yPct={40} parallaxDepth={4}>
            <Diamond color="#17c3d6" size={12} />
          </Obj>
          <Obj xPct={89} yPct={58} w={158} h={158} activateDelay={2.9} parallaxDepth={-14}>
            <GlobeIcon />
          </Obj>
          <Obj xPct={95} yPct={20} w={90} h={40} className="pointer-events-none">
            <Caption />
          </Obj>
        </div>
      </div>

      {/* Simplified mobile composition — robot, atom, energy glyph, rocket.
          Only two particles share this shorter path, so the full 10s lap
          duration is used directly as the activation cycle. */}
      <div className="block h-full w-full sm:hidden">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="pathGradMobile" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3457ff" />
              <stop offset="100%" stopColor="#17c3d6" />
            </linearGradient>
          </defs>
          <path d="M 8 70 C 30 40, 55 40, 62 55 C 70 70, 82 30, 92 18" stroke="url(#pathGradMobile)" strokeWidth="0.28" opacity="0.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" fill="none" />
          {[0, 1].map((i) => (
            <circle key={i} r="0.8" fill="#f0f9ff" className="adv-travel" style={vars({ offsetPath: `path("M 8 70 C 30 40, 55 40, 62 55 C 70 70, 82 30, 92 18")`, animationDelay: `${i * 5}s` })} />
          ))}
        </svg>

        <Obj xPct={12} yPct={70} w={65} h={68} activateDelay={0.24} activateDuration={10}>
          <AnimatedRobot />
        </Obj>
        <Obj xPct={42} yPct={36} w={42} h={42} activateDelay={3.81} activateDuration={10}>
          <OrbitalAtom />
        </Obj>
        <Obj xPct={65} yPct={58} w={42} h={52} activateDelay={6.67} activateDuration={10}>
          <EnergyGlyph />
        </Obj>
        <Obj xPct={90} yPct={16} w={42} h={51} activateDelay={9.76} activateDuration={10} activateClass="adv-activate-rocket">
          <RocketIcon />
        </Obj>
      </div>
    </SceneMotion>
  );
}

function StemAdventureStyles() {
  return (
    <style>{`
      @keyframes adv-idle-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      .adv-idle-bob { animation: adv-idle-bob 6.5s ease-in-out infinite; }

      @keyframes adv-idle-float { 0%,100% { transform: translate(0,0); } 33% { transform: translate(3px,-4px); } 66% { transform: translate(-3px,3px); } }
      .adv-idle-float { animation: adv-idle-float 7.5s ease-in-out infinite; }

      @keyframes adv-idle-float-slow { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(0,-6px) rotate(1.2deg); } }
      .adv-idle-float-slow { animation: adv-idle-float-slow 14s ease-in-out infinite; }

      @keyframes adv-idle-pulse { 0%,100% { opacity: 1; filter: brightness(1); } 50% { opacity: 0.86; filter: brightness(1.18); } }
      .adv-idle-pulse { animation: adv-idle-pulse 4.5s ease-in-out infinite; opacity: 1; }

      @keyframes adv-idle-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .adv-idle-rotate { animation: adv-idle-rotate var(--rot-duration,20s) linear infinite; transform-box: fill-box; transform-origin: center; }

      @keyframes adv-idle-twinkle { 0%,100% { opacity: 0.15; } 50% { opacity: 0.7; } }
      .adv-idle-twinkle { animation: adv-idle-twinkle var(--twinkle-duration,4s) ease-in-out infinite; animation-delay: var(--twinkle-delay,0s); }

      @keyframes ar-glow-shared { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      .ar-glow-shared { animation: ar-glow-shared 3s ease-in-out infinite; }

      /* slow-drifting highlight over the Earth photo, standing in for moving
         cloud cover so the sphere doesn't read as a static image */
      @keyframes adv-idle-cloud-pan { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-6%,4%) scale(1.08); } }
      .adv-idle-cloud-pan { animation: adv-idle-cloud-pan 22s ease-in-out infinite; }

      /* streaming data pulses inside the code badge */
      @keyframes adv-data-stream { 0% { transform: translateX(-100%); opacity: 0; } 15% { opacity: 0.6; } 85% { opacity: 0.6; } 100% { transform: translateX(100%); opacity: 0; } }
      .adv-data-stream { animation: adv-data-stream 2.4s linear infinite; transform-box: fill-box; }

      /* dash-flow along the connecting trajectory line */
      @keyframes adv-data-flow { to { stroke-dashoffset: -28; } }
      .adv-data-flow { animation: adv-data-flow 3s linear infinite; }

      /* rotating wireframe cube — real CSS 3D transforms, GPU-cheap */
      .adv-cube-scene { display: flex; align-items: center; justify-content: center; }
      @keyframes adv-cube-spin { from { transform: rotateX(-24deg) rotateY(0deg); } to { transform: rotateX(-24deg) rotateY(360deg); } }
      .adv-cube { position: relative; width: 36px; height: 36px; transform-style: preserve-3d; animation: adv-cube-spin 12s linear infinite; }

      /* Object "activation" pulse — fired once per lap, timed so it lands the
         moment a traveling particle passes that object. Lives on the Obj
         wrapper <div>, never on the icon itself, so it never fights that
         icon's own idle transform animation (a different element) or the
         parallax translate (also a different, inner element). */
      @keyframes adv-activate {
        0% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0)); }
        6% { transform: scale(1.1); filter: brightness(1.5) drop-shadow(0 0 10px rgba(255,255,255,0.85)); }
        22% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0)); }
        100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0)); }
      }
      .adv-activate { animation: adv-activate var(--activate-duration,3.333s) ease-out infinite; animation-delay: var(--activate-delay,0s); }

      /* Rocket gets a bigger reaction: a held upward "launch" arc plus a
         warm glow. Held for ~55% of the cycle (not a single-frame flicker)
         so the ignite-and-fly moment actually reads at a glance. */
      @keyframes adv-activate-rocket {
        0% { transform: translateY(0) scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(255,201,60,0)); }
        4% { transform: translateY(-4px) scale(1.03); filter: brightness(1.3) drop-shadow(0 0 8px rgba(255,201,60,0.6)); }
        12% { transform: translateY(-17px) scale(1.1); filter: brightness(1.7) drop-shadow(0 0 20px rgba(255,201,60,0.95)); }
        30% { transform: translateY(-11px) scale(1.05); filter: brightness(1.3) drop-shadow(0 0 10px rgba(255,201,60,0.6)); }
        55% { transform: translateY(-2px) scale(1.01); filter: brightness(1.05) drop-shadow(0 0 3px rgba(255,201,60,0.25)); }
        100% { transform: translateY(0) scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(255,201,60,0)); }
      }
      .adv-activate-rocket { animation: adv-activate-rocket var(--activate-duration,3.333s) ease-out infinite; animation-delay: var(--activate-delay,0s); }

      @keyframes adv-flame { 0%,100% { transform: scaleY(1); opacity: 0.55; } 50% { transform: scaleY(1.2); opacity: 0.8; } }
      .adv-flame { animation: adv-flame 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: top center; }

      @keyframes adv-travel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 94% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
      .adv-travel { offset-rotate: 0deg; animation: adv-travel 10s linear infinite; opacity: 0; }
    `}</style>
  );
}
