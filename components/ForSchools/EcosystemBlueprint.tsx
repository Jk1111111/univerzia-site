"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { ConnectorBot } from "@/components/ui/robots/ConnectorBot";
import { media } from "@/data/media";

const NODES = [
  { x: 8, y: 78, label: "Consultation", icon: "search" },
  { x: 28, y: 22, label: "Lab Setup", icon: "wrench" },
  { x: 52, y: 68, label: "Teacher Training", icon: "graduation-cap" },
  { x: 74, y: 20, label: "Classroom", icon: "book-open" },
  { x: 94, y: 62, label: "Outcomes", icon: "trending-up" },
] as const;

const PHOTO_STAGES = [
  { image: media.teacherTraining[2], caption: "A consultation, mapped to your space and timetable." },
  { image: media.teacherTraining[0], caption: "Teachers certified before they ever lead a session." },
  { image: media.scienceLab[0], caption: "A real classroom, running week after week." },
] as const;

/**
 * For Schools' own scroll story: a technical blueprint diagram draws itself
 * — node by node, line by line — over real school photography that
 * crossfades beneath it through three implementation stages. Neither the
 * whole-photo crossfade (homepage) nor the wipe-mask reveal (Programs) nor
 * any of the four solution-page devices: this is diagram-over-photography,
 * built for the "trustworthy AND technologically advanced" read a school
 * principal needs.
 */
export function EcosystemBlueprint() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const outcomesOpacity = useTransform(p, [0.86, 0.96], [0, 1]);

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-navy py-24 text-center sm:py-28">
        <p className="mx-auto max-w-md text-white/60">
          Consultation, lab setup, teacher training, classroom delivery and measured outcomes — one connected,
          managed partnership.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[340vh] bg-navy">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {PHOTO_STAGES.map((stage, i) => (
          // index, not `stage.image` — two stages happen to reference the
          // same underlying Unsplash photo via different media.ts arrays,
          // which made the URL itself a colliding React key
          <PhotoLayer key={i} stage={stage} index={i} total={PHOTO_STAGES.length} progress={p} />
        ))}
        <div className="absolute inset-0 bg-navy/55" />
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />

        <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan backdrop-blur">
            One Managed Partnership
          </span>

          <svg viewBox="0 0 100 100" className="h-[46vh] w-full max-w-2xl overflow-visible" preserveAspectRatio="xMidYMid meet">
            {NODES.slice(0, -1).map((n, i) => (
              <BlueprintLine key={n.label} from={n} to={NODES[i + 1]} index={i} total={NODES.length - 1} progress={p} />
            ))}
            {NODES.map((n, i) => (
              <BlueprintNode key={n.label} node={n} index={i} total={NODES.length} progress={p} />
            ))}
          </svg>

          <div className="pointer-events-none absolute right-0 top-1/2 hidden h-28 w-28 -translate-y-1/2 drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)] lg:block">
            <ConnectorBot />
          </div>

          <motion.div style={{ opacity: outcomesOpacity }} className="mt-4 flex items-center gap-8 text-center">
            <div>
              <p className="font-display text-3xl font-bold text-white">9</p>
              <p className="text-xs font-medium uppercase tracking-wide text-white/50">Managed Stages</p>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <p className="font-display text-3xl font-bold text-white">1</p>
              <p className="text-xs font-medium uppercase tracking-wide text-white/50">Single Point of Contact</p>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-40 max-w-[70vw] overflow-hidden bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-cyan via-electric to-violet" style={{ scaleX: p, transformOrigin: "left" }} />
        </div>
      </div>
    </section>
  );
}

function PhotoLayer({
  stage,
  index,
  total,
  progress,
}: {
  stage: (typeof PHOTO_STAGES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.04, 1.14]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image src={stage.image} alt={stage.caption} fill sizes="100vw" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

function BlueprintLine({
  from,
  to,
  index,
  total,
  progress,
}: {
  from: (typeof NODES)[number];
  to: (typeof NODES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.06 + (index / total) * 0.72;
  const end = start + 0.72 / total;
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="#3fe3f5"
      strokeWidth="0.6"
      strokeLinecap="round"
      style={{ pathLength }}
    />
  );
}

function BlueprintNode({
  node,
  index,
  total,
  progress,
}: {
  node: (typeof NODES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Node 0 (the chain's start) activates over its own [0, 0.04] window
  // rather than an instantaneous point — a zero-width [0, 0] range is a
  // degenerate useTransform input (both breakpoints equal), which throws
  // "Offsets must be monotonically non-decreasing".
  const activateStart = index === 0 ? 0 : Math.max(0.06 + ((index - 1) / (total - 1)) * 0.72 + 0.72 / (total - 1) - 0.03, 0);
  const activateEnd = index === 0 ? 0.04 : activateStart + 0.03;
  const scale = useTransform(progress, [activateStart, activateEnd], [0, 1]);
  const opacity = useTransform(progress, [activateStart, activateEnd], [0, 1]);

  const originStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={node.x} cy={node.y} r="4.5" fill="#0a1330" stroke="#3fe3f5" strokeWidth="0.6" style={{ scale, ...originStyle }} />
      <motion.circle cx={node.x} cy={node.y} r="1.6" fill="#3fe3f5" style={{ scale, ...originStyle }} />
      <text x={node.x} y={node.y - 7} textAnchor="middle" fontSize="3.2" fill="#eafcff" fontFamily="monospace">
        {node.label}
      </text>
    </motion.g>
  );
}
