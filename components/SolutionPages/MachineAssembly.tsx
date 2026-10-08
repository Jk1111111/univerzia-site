"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { media } from "@/data/media";

/**
 * The homepage's "capabilities" story replaced with a full-viewport pinned
 * scroll sequence: a rover is built piece by piece as the visitor scrolls —
 * wheels roll into place, the chassis drops in, the battery and controller
 * slide in from either side, the sensor mast telescopes up, the arm swings
 * into position, then the whole machine powers on and a real photo of
 * students at a workbench slides in as proof this isn't a diagram, it's what
 * actually gets built. Every transform below is `useTransform` of one
 * `scrollYProgress`, so stopping mid-scroll freezes the assembly exactly
 * where it is and scrolling back up reverses it — nothing runs on a timer.
 *
 * This deliberately does NOT reuse the earlier "curved connecting line"
 * motif (rejected for being repeated everywhere) — the visual language here
 * is entirely mechanical assembly, unique to this page's subject.
 */
export function MachineAssembly() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const p = raw;

  // ---- Stage 1: wheels + chassis land (0 – 0.3) ----
  const wheelLY = useTransform(p, [0, 0.16], [140, 0]);
  const wheelLOpacity = useTransform(p, [0, 0.12], [0, 1]);
  const wheelRY = useTransform(p, [0.02, 0.18], [140, 0]);
  const wheelROpacity = useTransform(p, [0.02, 0.14], [0, 1]);
  const chassisY = useTransform(p, [0.1, 0.28], [-90, 0]);
  const chassisOpacity = useTransform(p, [0.1, 0.24], [0, 1]);

  // ---- Stage 2: battery + controller slide in from sides (0.25 – 0.48) ----
  const batteryX = useTransform(p, [0.25, 0.42], [-120, 0]);
  const batteryOpacity = useTransform(p, [0.25, 0.38], [0, 1]);
  const controllerX = useTransform(p, [0.3, 0.47], [120, 0]);
  const controllerOpacity = useTransform(p, [0.3, 0.43], [0, 1]);
  const ledOpacity = useTransform(p, [0.44, 0.5], [0, 1]);

  // ---- Stage 3: sensor mast telescopes up, arm swings in (0.46 – 0.72) ----
  const mastScaleY = useTransform(p, [0.46, 0.64], [0, 1]);
  const mastOpacity = useTransform(p, [0.46, 0.56], [0, 1]);
  const armRotate = useTransform(p, [0.55, 0.72], [70, -18]);
  const armOpacity = useTransform(p, [0.55, 0.62], [0, 1]);

  // ---- Stage 4: power-on + real photo proof (0.72 – 1) ----
  const glowT = useTransform(p, [0.72, 0.86], [0, 1]);
  const glowRadius = useTransform(glowT, [0, 1], [0, 26]);
  const glowFilter = useMotionTemplate`drop-shadow(0 0 ${glowRadius}px rgba(63,227,245,${glowT}))`;
  const labelOpacity = useTransform(p, [0.8, 0.9], [0, 1]);
  const photoX = useTransform(p, [0.82, 1], [140, 0]);
  const photoOpacity = useTransform(p, [0.82, 0.94], [0, 1]);
  const progressScaleX = p;

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-[#050914] py-24 text-center sm:py-28">
        <p className="mx-auto max-w-md text-white/60">
          A rover built from a chassis, battery, controller, sensor mast and arm — the same parts students wire and
          program themselves.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-[#050914]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(52,87,255,0.14),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />

        <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan backdrop-blur">
            Scroll to Build
          </span>

          <svg viewBox="0 0 500 300" className="h-auto w-full max-w-2xl overflow-visible">
            <defs>
              <linearGradient id="ma-metal" x1="0.1" y1="0" x2="0.9" y2="1">
                <stop offset="0%" stopColor="#eef2f9" />
                <stop offset="45%" stopColor="#a7b0c8" />
                <stop offset="100%" stopColor="#5b6480" />
              </linearGradient>
              <radialGradient id="ma-sensor" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#eafcff" />
                <stop offset="60%" stopColor="#3fe3f5" />
                <stop offset="100%" stopColor="#0e7490" />
              </radialGradient>
            </defs>

            <ellipse cx="250" cy="234" rx="140" ry="10" fill="#000" opacity="0.35" />

            {/* wheels */}
            <motion.g style={{ y: wheelLY, opacity: wheelLOpacity }}>
              <circle cx="160" cy="220" r="24" fill="#141a2e" stroke="#2c396b" strokeWidth="2" />
              <circle cx="160" cy="220" r="11" fill="url(#ma-metal)" />
            </motion.g>
            <motion.g style={{ y: wheelRY, opacity: wheelROpacity }}>
              <circle cx="340" cy="220" r="24" fill="#141a2e" stroke="#2c396b" strokeWidth="2" />
              <circle cx="340" cy="220" r="11" fill="url(#ma-metal)" />
            </motion.g>

            {/* chassis */}
            <motion.g style={{ y: chassisY, opacity: chassisOpacity }}>
              <rect x="150" y="190" width="200" height="38" rx="8" fill="url(#ma-metal)" stroke="#3a415a" strokeWidth="1.5" />
              <line x1="150" y1="194" x2="350" y2="194" stroke="#eef2f9" strokeWidth="1" opacity="0.5" />
            </motion.g>

            {/* battery — slides from left */}
            <motion.g style={{ x: batteryX, opacity: batteryOpacity }}>
              <rect x="164" y="168" width="46" height="22" rx="3" fill="#232d52" stroke="#3a4573" />
              <line x1="178" y1="170" x2="178" y2="188" stroke="#3a4573" strokeWidth="1.2" />
              <line x1="192" y1="170" x2="192" y2="188" stroke="#3a4573" strokeWidth="1.2" />
            </motion.g>

            {/* controller — slides from right, with power-on LEDs */}
            <motion.g style={{ x: controllerX, opacity: controllerOpacity }}>
              <rect x="286" y="166" width="60" height="24" rx="3" fill="#0f1830" stroke="#2c396b" strokeWidth="1" />
              <line x1="294" y1="176" x2="318" y2="176" stroke="#3fe3f5" strokeWidth="1" opacity="0.7" />
              <line x1="294" y1="182" x2="310" y2="182" stroke="#8b7bf5" strokeWidth="1" opacity="0.6" />
              <motion.circle cx="336" cy="174" r="2.4" fill="#3fe3f5" style={{ opacity: ledOpacity, filter: glowFilter }} />
              <motion.circle cx="336" cy="182" r="2.4" fill="#ffc93c" style={{ opacity: ledOpacity }} />
            </motion.g>

            {/* sensor mast — telescopes upward */}
            <motion.g style={{ scaleY: mastScaleY, opacity: mastOpacity, transformOrigin: "170px 190px" }}>
              <rect x="167" y="120" width="6" height="70" fill="#3a415a" />
              <rect x="146" y="104" width="46" height="20" rx="7" fill="url(#ma-metal)" stroke="#3a415a" strokeWidth="1" />
              <motion.circle cx="160" cy="114" r="6.5" fill="url(#ma-sensor)" style={{ filter: glowFilter }} />
              <motion.circle cx="179" cy="114" r="6.5" fill="url(#ma-sensor)" style={{ filter: glowFilter }} />
            </motion.g>

            {/* arm — swings into reaching position */}
            <motion.g style={{ opacity: armOpacity }}>
              <circle cx="352" cy="186" r="9" fill="url(#ma-metal)" stroke="#2c3348" strokeWidth="1" />
              <motion.g style={{ rotate: armRotate, transformOrigin: "352px 186px" }}>
                <rect x="347" y="146" width="10" height="42" rx="4" fill="url(#ma-metal)" stroke="#2c3348" strokeWidth="1" />
                <circle cx="352" cy="146" r="6" fill="#3a415a" />
              </motion.g>
            </motion.g>

            {/* power-on core glow at the chest of the chassis */}
            <motion.circle cx="250" cy="209" r="7" fill="url(#ma-sensor)" style={{ opacity: glowT, filter: glowFilter }} />

            {/* technical callout, same pattern as PhotoStoryPanel's labels */}
            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="179" y1="114" x2="140" y2="90" stroke="#3fe3f5" strokeWidth="0.8" opacity="0.6" />
              <circle cx="140" cy="90" r="2" fill="#3fe3f5" />
              <text x="146" y="93" fontSize="10" fill="#eafcff" fontFamily="monospace">
                ULTRASONIC SENSOR
              </text>
            </motion.g>
          </svg>

          {/* real photography proof, sliding in as the machine powers on */}
          <motion.div
            className="pointer-events-none absolute bottom-10 right-6 h-28 w-40 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lift sm:h-36 sm:w-52"
            style={{ x: photoX, opacity: photoOpacity }}
          >
            <Image src={media.kidsCoding[0]} alt="Students building a robotics project" fill sizes="200px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-wide text-white">
              Built By Students
            </span>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-40 max-w-[70vw] overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-electric via-cyan to-violet"
            style={{ scaleX: progressScaleX, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
