"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { media } from "@/data/media";

const SENSORS = [
  { x: 12, y: 20, color: "#f5a524" },
  { x: 88, y: 15, color: "#1fb178" },
  { x: 8, y: 75, color: "#8b5cf6" },
  { x: 90, y: 70, color: "#17c3d6" },
  { x: 50, y: 8, color: "#3457ff" },
] as const;

const HUB = { x: 50, y: 45 };

/**
 * IoT's equivalent of the Robotics assembly / AI data pipeline sequences: a
 * full-viewport pinned scroll story where scattered sensors signal a
 * central gateway, which relays to a live dashboard, which triggers a real
 * automated response on a real photo — signal propagation and network
 * activity as the visual subject, not mechanics or a neural net.
 */
export function SignalNetwork() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const fieldOpacity = useTransform(p, [0, 0.1], [0, 1]);
  const hubPulse = useTransform(p, [0.35, 0.55], [0.3, 1]);
  const dashboardOpacity = useTransform(p, [0.55, 0.68], [0, 1]);
  const bar1 = useTransform(p, [0.6, 0.72], ["10%", "70%"]);
  const bar2 = useTransform(p, [0.64, 0.76], ["10%", "45%"]);
  const bar3 = useTransform(p, [0.68, 0.8], ["10%", "85%"]);
  const responseLabel = useTransform(p, [0.78, 0.86], [0, 1]);
  const photoOpacity = useTransform(p, [0.8, 0.9], [0, 1]);
  const photoScale = useTransform(p, [0.8, 1], [0.94, 1]);
  const stateSwitch = useTransform(p, [0.9, 1], [0, 1]);
  const offOpacity = useTransform(stateSwitch, [0, 1], [1, 0]);
  const progressScaleX = p;

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-[#04120f] py-24 text-center sm:py-28">
        <p className="mx-auto max-w-md text-white/60">
          Sensors report to a gateway, a live dashboard tracks every reading, and the system responds automatically
          — the same loop students wire and program themselves.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-[#04120f]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(23,195,214,0.16),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />

        <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_1fr]">
          <div className="relative aspect-square w-full max-w-lg">
            <span className="absolute -top-10 left-0 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 backdrop-blur">
              Scroll to Connect
            </span>

            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
              {SENSORS.map((s, i) => (
                <SignalLine key={i} sensor={s} progress={p} index={i} />
              ))}

              <motion.circle cx={HUB.x} cy={HUB.y} r="7" fill="#0a1330" stroke="#134e4a" strokeWidth="1" style={{ opacity: fieldOpacity }} />
              <motion.circle cx={HUB.x} cy={HUB.y} r="12" fill="none" stroke="#5eead4" strokeWidth="0.8" style={{ opacity: hubPulse }} />
              <motion.text x={HUB.x} y={HUB.y + 2} textAnchor="middle" fontFamily="monospace" fontSize="3.4" fill="#5eead4" style={{ opacity: fieldOpacity }}>
                GATEWAY
              </motion.text>

              {SENSORS.map((s, i) => (
                <motion.circle key={`node-${i}`} cx={s.x} cy={s.y} r="4" fill={s.color} style={{ opacity: fieldOpacity }} />
              ))}
            </svg>
          </div>

          <div>
            {/* live dashboard panel — bars rise as the gateway relays readings */}
            <motion.div style={{ opacity: dashboardOpacity }} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-300">Live Dashboard</p>
              <div className="mt-5 flex h-28 items-end gap-3">
                <div className="relative h-full w-8 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="absolute inset-x-0 bottom-0 rounded-full bg-amber-400" style={{ height: bar1 }} />
                </div>
                <div className="relative h-full w-8 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="absolute inset-x-0 bottom-0 rounded-full bg-emerald-400" style={{ height: bar2 }} />
                </div>
                <div className="relative h-full w-8 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="absolute inset-x-0 bottom-0 rounded-full bg-cyan-400" style={{ height: bar3 }} />
                </div>
              </div>
            </motion.div>

            <motion.p style={{ opacity: responseLabel }} className="mt-4 text-sm font-semibold uppercase tracking-wide text-cyan-300">
              Threshold crossed — triggering automated response
            </motion.p>

            {/* real photo, with a real state-change proof (valve/light off -> on) */}
            <motion.div style={{ opacity: photoOpacity, scale: photoScale }} className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[1.5rem] border-2 border-white/10 shadow-lift">
              <Image src={media.scienceLab[3]} alt="A student monitoring a connected sensor project" fill sizes="(min-width: 1024px) 32vw, 80vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <motion.div
                className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur"
                style={{ opacity: photoOpacity }}
              >
                <span className="relative flex size-2.5">
                  <motion.span className="absolute inline-flex size-full rounded-full bg-[#5b6480]" style={{ opacity: offOpacity }} />
                  <motion.span className="absolute inline-flex size-full rounded-full bg-emerald-400" style={{ opacity: stateSwitch }} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wide text-white">Smart Valve — Auto Response</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-40 max-w-[70vw] overflow-hidden bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400" style={{ scaleX: progressScaleX, transformOrigin: "left" }} />
        </div>
      </div>
    </section>
  );
}

function SignalLine({
  sensor,
  progress,
  index,
}: {
  sensor: { x: number; y: number; color: string };
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.1 + index * 0.04;
  const end = 0.32 + index * 0.04;
  const lineOpacity = useTransform(progress, [start, start + 0.05], [0, 0.6]);
  const pathD = `M ${sensor.x} ${sensor.y} L ${HUB.x} ${HUB.y}`;
  return (
    <>
      <motion.line x1={sensor.x} y1={sensor.y} x2={HUB.x} y2={HUB.y} stroke={sensor.color} strokeWidth="0.6" style={{ opacity: lineOpacity }} />
      <motion.circle r="1.4" fill={sensor.color} style={{ opacity: useTransform(progress, [start, start + 0.03, end, end + 0.05], [0, 1, 1, 0]) }}>
        <animateMotion dur="1.4s" repeatCount="indefinite" path={pathD} />
      </motion.circle>
    </>
  );
}
