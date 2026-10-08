"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { media } from "@/data/media";

const INPUT_Y = [70, 130, 190, 250];
const HIDDEN_Y = [50, 110, 170, 230, 290];
const OUTPUT_Y = [90, 150, 210, 270];

/**
 * AI & Coding's equivalent of the Robotics page's machine-assembly
 * sequence: a full-viewport pinned scroll story where raw data visibly
 * flows through a network and resolves into a real recognition result on a
 * real photo — not a small clickable diagram sitting in a card. Same
 * `useScroll`/`useTransform`-of-one-progress-value technique, entirely
 * different visual subject (data, not mechanics).
 *
 * Each layer node is its own tiny component (HiddenNode/OutputNode) purely
 * so `useTransform` can be called once per instance rather than inside a
 * `.map()` in this component's own body — calling a hook from inside an
 * array-map callback is a rules-of-hooks violation even when the array
 * length never changes.
 */
export function DataPipeline() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const inputOpacity = useTransform(p, [0, 0.08], [0, 1]);
  const winnerScale = useTransform(p, [0.72, 0.82], [1, 1.5]);
  const winnerGlow = useTransform(p, [0.72, 0.82], [0, 1]);
  const recognizedOpacity = useTransform(p, [0.62, 0.72], [0, 1]);
  const photoOpacity = useTransform(p, [0.78, 0.88], [0, 1]);
  const photoScale = useTransform(p, [0.78, 1], [0.92, 1]);
  const boxOpacity = useTransform(p, [0.88, 0.95], [0, 1]);
  const boxScale = useTransform(p, [0.88, 0.95], [1.3, 1]);
  const labelOpacity = useTransform(p, [0.93, 1], [0, 1]);
  const progressScaleX = p;

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-[#050914] py-24 text-center sm:py-28">
        <p className="mx-auto max-w-md text-white/60">
          Data flows through a trained network and resolves into a real result — the same pipeline students build
          and label themselves.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-[#050914]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(139,92,246,0.16),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />

        <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur">
              Scroll to Train
            </span>

            <svg viewBox="0 0 380 320" className="h-auto w-full max-w-xl overflow-visible">
              {INPUT_Y.flatMap((iy) =>
                HIDDEN_Y.map((hy, hi) => (
                  <line key={`ih-${iy}-${hi}`} x1="40" y1={iy} x2="190" y2={hy} stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
                ))
              )}
              {HIDDEN_Y.flatMap((hy, hi) =>
                OUTPUT_Y.map((oy, oi) => (
                  <line key={`ho-${hi}-${oi}`} x1="190" y1={hy} x2="340" y2={oy} stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
                ))
              )}

              {/* traveling data pulses along the input connections */}
              {INPUT_Y.map((iy, i) => (
                <motion.circle key={iy} r="2.2" fill="#3fe3f5" style={{ opacity: inputOpacity }}>
                  <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${i * 0.15}s`} path={`M 40 ${iy} L 190 ${HIDDEN_Y[i % HIDDEN_Y.length]}`} />
                </motion.circle>
              ))}

              {INPUT_Y.map((y) => (
                <motion.circle key={y} cx="40" cy={y} r="6" fill="#3fe3f5" style={{ opacity: inputOpacity }} />
              ))}

              {HIDDEN_Y.map((y, i) => (
                <HiddenNode key={y} y={y} index={i} progress={p} />
              ))}

              {OUTPUT_Y.map((y, i) => (
                <OutputNode key={y} y={y} index={i} isWinner={i === 1} progress={p} winnerScale={winnerScale} />
              ))}
              <motion.circle cx="340" cy={OUTPUT_Y[1]} r="16" fill="none" stroke="#ff7a45" strokeWidth="1.5" style={{ opacity: winnerGlow, scale: winnerScale }} />
            </svg>

            <motion.p style={{ opacity: recognizedOpacity }} className="mt-2 text-sm font-semibold uppercase tracking-wide text-orange-300">
              Recognized: Robotics Build
            </motion.p>
          </div>

          {/* real photo, resolved into a recognition result — not decoration */}
          <motion.div style={{ opacity: photoOpacity, scale: photoScale }} className="relative aspect-[4/3.2] overflow-hidden rounded-[2rem] border-2 border-white/10 shadow-lift">
            <Image src={media.kidsCoding[2]} alt="A student's robotics build being recognized by a trained model" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <motion.div
              className="absolute left-[18%] top-[22%] h-[46%] w-[52%] rounded-lg border-2"
              style={{ opacity: boxOpacity, scale: boxScale, borderColor: "#ff7a45" }}
            />
            <motion.div
              className="absolute left-[18%] top-[16%] rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ opacity: labelOpacity, background: "#ff7a45" }}
            >
              Object: 94% confidence
            </motion.div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-40 max-w-[70vw] overflow-hidden bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-cyan via-violet to-orange" style={{ scaleX: progressScaleX, transformOrigin: "left" }} />
        </div>
      </div>
    </section>
  );
}

function HiddenNode({ y, index, progress }: { y: number; index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.3 + index * 0.04, 0.38 + index * 0.04], [0.15, 1]);
  return <motion.circle cx="190" cy={y} r="6.5" fill="#8b5cf6" style={{ opacity }} />;
}

function OutputNode({
  y,
  index,
  isWinner,
  progress,
  winnerScale,
}: {
  y: number;
  index: number;
  isWinner: boolean;
  progress: MotionValue<number>;
  winnerScale: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0.55 + index * 0.03, 0.62 + index * 0.03], [0.15, 1]);
  return (
    <motion.circle
      cx="340"
      cy={y}
      r="8"
      fill={isWinner ? "#ff7a45" : "#f3f4fb"}
      style={{ opacity, scale: isWinner ? winnerScale : 1 }}
    />
  );
}
