"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { BuilderBot } from "@/components/ui/robots/BuilderBot";
import { media } from "@/data/media";

const STAGES = [
  { label: "Student", detail: "Walks in with a question, not a syllabus.", image: media.scienceLab[2], color: "#3457ff" },
  { label: "Learning", detail: "A concept introduced through a real problem to solve.", image: media.teacherTraining[0], color: "#17c3d6" },
  { label: "Building", detail: "Hands on the parts, not just the theory.", image: media.kidsCoding[0], color: "#8b5cf6" },
  { label: "Experimenting", detail: "Testing, breaking, and figuring out why.", image: media.scienceLab[3], color: "#f5a524" },
  { label: "Project", detail: "A working build with their name on it.", image: media.kidsCoding[1], color: "#1fb178" },
  { label: "Outcome", detail: "A skill that carries into the next grade, and beyond.", image: media.teacherTraining[1], color: "#ff7a45" },
] as const;

/**
 * Programs' own scroll story: a real photo revealed in place via a
 * left-to-right wipe (clip-path) as each stage becomes active, paired with
 * a scroll-spy stepper down the side — deliberately a masked-reveal
 * mechanism, not the crossfade the homepage's JourneyReel uses and not any
 * of the four solution pages' devices. student → learning → building →
 * experimenting → project → outcome, told through six real photographs.
 */
export function StudentProgressionReel() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-navy py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-5 px-6 sm:grid-cols-3">
          {STAGES.map((s) => (
            <div key={s.label} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={s.image} alt={s.label} fill sizes="30vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-sm font-bold text-white">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[360vh] bg-navy">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-15" />
        <div className="relative mx-auto flex h-full max-w-6xl items-center gap-10 px-6">
          {/* scroll-spy stepper */}
          <div className="hidden shrink-0 flex-col gap-5 lg:flex">
            {STAGES.map((s, i) => (
              <StepLabel key={s.label} stage={s} index={i} total={STAGES.length} progress={p} />
            ))}
          </div>

          {/* the masked photo stack */}
          <div className="relative w-full max-w-xl">
            <div className="relative aspect-[4/3.6] overflow-hidden rounded-[2rem] border-2 border-white/10 shadow-lift lg:aspect-[16/11]">
              {STAGES.map((s, i) => (
                <RevealLayer key={s.label} stage={s} index={i} total={STAGES.length} progress={p} />
              ))}
            </div>
            <div className="pointer-events-none absolute -bottom-8 -right-6 z-20 hidden h-24 w-24 drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)] sm:block">
              <BuilderBot />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-40 max-w-[70vw] overflow-hidden bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-electric via-cyan to-orange" style={{ scaleX: p, transformOrigin: "left" }} />
        </div>
      </div>
    </section>
  );
}

function RevealLayer({
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
  // Offsets scaled to a fraction of this stage's own scroll window rather
  // than fixed absolute deltas — with a fixed delta (e.g. "start + 0.1"),
  // more than ~6 stages makes each window narrower than the combined
  // deltas, so a later breakpoint ends up BEFORE an earlier one and
  // useTransform throws "Offsets must be monotonically non-decreasing".
  // Scaling by `width` keeps every breakpoint correctly ordered no matter
  // how many stages there are.
  const wipeEnd = end - width * 0.18;
  const clipPercent = useTransform(progress, [start, wipeEnd], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 ${clipPercent}% 0 0)`;
  const captionOpacity = useTransform(
    progress,
    [start + width * 0.18, start + width * 0.32, end - width * 0.32, end - width * 0.18],
    [0, 1, 1, 0]
  );

  return (
    <div className="absolute inset-0" style={{ zIndex: index }}>
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <Image src={stage.image} alt={stage.label} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
      </motion.div>
      <motion.div className="absolute inset-x-0 bottom-0 p-6 sm:p-8" style={{ opacity: captionOpacity }}>
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
          style={{ background: stage.color }}
        >
          {stage.label}
        </span>
        <p className="mt-3 max-w-xs text-lg font-medium leading-snug text-white">{stage.detail}</p>
      </motion.div>
    </div>
  );
}

function StepLabel({
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
  const fadeStart = Math.max(start - 0.02, 0);
  const opacity = useTransform(progress, [fadeStart, start + 0.04], [0.35, 1]);
  const x = useTransform(progress, [fadeStart, start + 0.04], [-8, 0]);
  const barScale = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div style={{ opacity, x }} className="flex items-center gap-3">
      <div className="h-8 w-1 overflow-hidden rounded-full bg-white/15">
        <motion.div className="h-full w-full origin-top rounded-full" style={{ scaleY: barScale, background: stage.color }} />
      </div>
      <span className="text-sm font-semibold uppercase tracking-wide text-white">{stage.label}</span>
    </motion.div>
  );
}
