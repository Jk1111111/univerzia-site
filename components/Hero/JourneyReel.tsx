"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { CircuitOverlay } from "@/components/ui/CircuitOverlay";
import { BuilderBot } from "@/components/ui/robots/BuilderBot";
import { CoderBot } from "@/components/ui/robots/CoderBot";
import { ConnectorBot } from "@/components/ui/robots/ConnectorBot";
import { ExplorerBot } from "@/components/ui/robots/ExplorerBot";
import { media } from "@/data/media";

// Weighted toward the more visibly robotics/electronics-coded real photos in
// the curated set (a robot-build lab, circuit macros, an actual robot) —
// the earlier version leaned on generic classroom shots that read as "school"
// rather than "robotics", even though this is a robotics/STEM brand. Each
// stage also gets its OWN robot character (not the shared mascot repeated)
// performing an action that matches that beat of the story.
const STAGES = [
  { word: "Curious.", caption: "Every build starts as a question.", image: media.kidsCoding[3], accent: "#3457ff", Bot: CoderBot, botLabel: "sketching an idea" },
  { word: "Hands-On.", caption: "Concepts stick once you've actually wired them.", image: media.kidsCoding[0], accent: "#17c3d6", Bot: BuilderBot, botLabel: "tightening the first bolt" },
  { word: "Building.", caption: "A working prototype, not a worksheet.", image: media.circuitMacro[0], accent: "#8b5cf6", Bot: ConnectorBot, botLabel: "wiring it up" },
  { word: "Ready.", caption: "For the next problem, and the one after that.", image: media.retroRobotToy, accent: "#ff7a45", Bot: ExplorerBot, botLabel: "eyeing what's next" },
] as const;

/**
 * The homepage's own flagship scroll moment — deliberately NOT the same
 * mechanism as any of the four solution pages (no machine assembly, no data
 * pipeline, no signal network, no spatial scan). This is pure photographic
 * and typographic storytelling: one real photo per stage crossfades into
 * the next with a slow Ken Burns drift while a huge word tracks the
 * student's arc from curiosity to a finished build. A continuous hero
 * extension, not a bolted-on section — it inherits the hero's near-black
 * background and picks up right where the hero's own word-cycle left off.
 */
export function JourneyReel() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progressScaleX = p;

  // Which stage's robot is currently on screen — tracked as real React
  // state (not a motion value) since it drives which COMPONENT renders,
  // not just a style. This is also what keeps the corner from ever reading
  // as empty during a photo crossfade: the robot doesn't fade with the
  // photo, it just hands off to the next character.
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    setActiveIndex(Math.min(STAGES.length - 1, Math.floor(v * STAGES.length)));
  });

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-[#050914] py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s) => (
            <div key={s.word} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={s.image} alt={s.word} fill sizes="25vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-4 left-4 text-2xl font-bold text-white">{s.word}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-[#050914]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {STAGES.map((stage, i) => (
          <ReelStage key={stage.word} stage={stage} index={i} total={STAGES.length} progress={p} />
        ))}

        {/* a faint circuit-trace layer over the photography — the one
            consistent "robotics lab" texture this scene carries throughout,
            regardless of which stage/photo is currently showing */}
        <CircuitOverlay color="#ffffff" nodeColor="#3fe3f5" opacity={0.1} className="mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-[#050914]/40" />

        {/* HUD-style scan brackets — a small, restrained "this is a
            technical system" cue in the corners, not a full frame */}
        <div className="pointer-events-none absolute inset-6 sm:inset-10">
          {(["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"] as const).map((pos) => (
            <div key={pos} className={`absolute h-6 w-6 border-cyan/50 ${pos}`} />
          ))}
        </div>

        {/* a persistent robot companion — a different character per stage,
            performing its own small action, always present (including
            during the photo crossfade gap, which otherwise reads as an
            empty moment) rather than fading in/out with the photography */}
        <div className="pointer-events-none absolute bottom-24 right-6 h-24 w-24 sm:bottom-28 sm:right-10 sm:h-32 sm:w-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)]"
            >
              {(() => {
                const Bot = STAGES[activeIndex].Bot;
                return <Bot />;
              })()}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-white/40">
                {STAGES[activeIndex].botLabel}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex h-full flex-col items-center justify-end pb-20 sm:pb-24">
          <div className="pointer-events-none h-px w-40 max-w-[70vw] overflow-hidden bg-white/15">
            <motion.div className="h-full bg-white" style={{ scaleX: progressScaleX, transformOrigin: "left" }} />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">The Student Arc</p>
        </div>
      </div>
    </section>
  );
}

function ReelStage({
  stage,
  index,
  total,
  progress,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const width = end - start;
  // Every breakpoint below is a fixed FRACTION of this stage's own window
  // (never a fixed absolute delta like "start + 0.06") — with more stages
  // than the original 4 this was authored for, a fixed delta can exceed
  // the (now-narrower) window and make a later breakpoint land before an
  // earlier one, which throws "Offsets must be monotonically
  // non-decreasing". Fractions keep every breakpoint ordered regardless of
  // how many stages exist.
  const opacity = useTransform(progress, [start, start + width * 0.2, end - width * 0.2, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1, 1.12]);
  const wordY = useTransform(progress, [start, start + width * 0.28, end - width * 0.28, end], [40, 0, 0, -40]);
  const wordOpacity = useTransform(progress, [start, start + width * 0.28, end - width * 0.28, end], [0, 1, 1, 0]);
  const captionOpacity = useTransform(
    progress,
    [start + width * 0.35, start + width * 0.5, start + width * 0.75, start + width * 0.9],
    [0, 1, 1, 0]
  );

  return (
    <>
      <motion.div className="absolute inset-0" style={{ opacity }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src={stage.image} alt={stage.word} fill priority={index === 0} sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center px-6 text-center"
        style={{ opacity: wordOpacity, y: wordY }}
      >
        <span
          className="font-display text-7xl font-bold uppercase tracking-tight text-white sm:text-8xl lg:text-9xl"
          style={{ textShadow: `0 0 60px ${stage.accent}55` }}
        >
          {stage.word}
        </span>
        <motion.p className="mt-4 max-w-sm text-base text-white/75 sm:text-lg" style={{ opacity: captionOpacity }}>
          {stage.caption}
        </motion.p>
      </motion.div>
    </>
  );
}
