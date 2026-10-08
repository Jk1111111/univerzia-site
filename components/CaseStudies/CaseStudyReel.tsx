"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { CoderBot } from "@/components/ui/robots/CoderBot";
import { media } from "@/data/media";
import type { CaseStudy } from "@/data/caseStudies";

type Stage = { tag: string; heading: string; body: string; image: string };

function buildStages(study: CaseStudy): Stage[] {
  const photos = media[study.image] as string[];
  return [
    {
      tag: "The Problem",
      heading: `${study.schoolType}, no STEM infrastructure in place`,
      body: "The starting point every partnership begins from — a school ready to invest, with no lab, no trained staff and no curriculum yet.",
      image: photos[0],
    },
    {
      tag: "The Environment",
      heading: "A real space, mapped before anything is installed",
      body: "Consultation and planning against the actual space, timetable and grade bands the school already has — not a generic template.",
      image: photos[1 % photos.length],
    },
    {
      tag: "The Build",
      heading: study.headline,
      body: study.summary,
      image: photos[2 % photos.length],
    },
    {
      tag: "The Result",
      heading: "Measured, not assumed",
      body: "Outcomes tracked against the same metrics from day one, shared back with academic leadership each term.",
      image: photos[3 % photos.length],
    },
  ];
}

/**
 * Case Studies' own scroll story: problem -> environment -> build ->
 * result, told through the same photo category's real images stitched into
 * one pinned sequence, ending with the case study's own metrics counting up
 * live. A fourth distinct mechanism from the homepage/Programs/For Schools
 * pieces — large image crossfades gated to a fixed left-hand narrative
 * column, not a whole-screen photo, not a mask wipe, not a diagram.
 */
export function CaseStudyReel({ study }: { study: CaseStudy }) {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const stages = buildStages(study);
  const metricsOpacity = useTransform(p, [0.86, 0.96], [0, 1]);

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center text-white/70">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan">{study.schoolType}</p>
          <h2 className="mt-3 text-3xl font-bold text-white">{study.headline}</h2>
          <p className="mt-4">{study.summary}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[360vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            {stages.map((s, i) => (
              <TextStage key={s.tag} stage={s} index={i} total={stages.length} progress={p} />
            ))}

            <motion.div style={{ opacity: metricsOpacity }} className="mt-10 flex flex-wrap gap-8">
              {study.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-3xl font-bold text-white">{m.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/50">{m.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] border-2 border-white/10 shadow-lift">
              {stages.map((s, i) => (
                <ImageStage key={s.image + i} stage={s} index={i} total={stages.length} progress={p} />
              ))}
            </div>
            <div className="pointer-events-none absolute -bottom-8 -left-6 z-20 hidden h-24 w-24 drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)] sm:block">
              <CoderBot />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-40 max-w-[70vw] overflow-hidden bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-orange via-amber to-electric" style={{ scaleX: p, transformOrigin: "left" }} />
        </div>
      </div>
    </section>
  );
}

function TextStage({ stage, index, total, progress }: { stage: Stage; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, start + 0.06, end - 0.1, end - 0.04], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.06], [16, 0]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity, y }}>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-300 backdrop-blur">
        {stage.tag}
      </span>
      <h3 className="mt-5 max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl">{stage.heading}</h3>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-white/65">{stage.body}</p>
    </motion.div>
  );
}

function ImageStage({ stage, index, total, progress }: { stage: Stage; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, start + 0.06, end - 0.06, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1, 1.1]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image src={stage.image} alt={stage.heading} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </motion.div>
  );
}
