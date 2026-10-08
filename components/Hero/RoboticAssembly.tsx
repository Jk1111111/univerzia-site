"use client";

import { useId, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

/**
 * One physical process, tied directly to scroll position: an industrial
 * arm picks a component off its tray, swings it across, and seats it into
 * a socket that then powers on. Every joint (base swing, shoulder, elbow,
 * wrist, gripper) is its own nested `motion.g` driven by the same scroll
 * progress, so stopping mid-scroll freezes the arm mid-motion and scrolling
 * back reverses it — nothing here runs on a timer or loops on its own.
 *
 * The component being moved is drawn three times at the same three fixed
 * positions (tray / socket) plus once *nested inside the gripper* — only
 * one is ever visible at a time (crossfaded exactly at the grab/release
 * moments). That's what lets a plain CSS-transform chain carry an object
 * through a multi-joint arm without any inverse-kinematics math: the
 * gripper's own transform chain already places anything nested inside it
 * correctly at every scroll position.
 */
export function RoboticAssembly() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const { scrollYProgress: raw } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const p = useSpring(raw, { stiffness: 110, damping: 24, mass: 0.5 });

  // ---- power ----
  const powerGlow = useTransform(p, [0, 0.08, 0.18], [0.08, 0.08, 1]);

  // ---- the four joints in the kinematic chain, each a hold-move-hold-move-hold schedule ----
  // Pickup/place angles are forward-kinematics-solved (not hand-guessed) so the
  // gripper tip actually lands on the tray and socket graphics below, approaching
  // each from straight above — see /solve-arm.mjs for how these were derived.
  const baseRotate = useTransform(p, [0, 0.08, 0.36, 0.5, 0.7, 0.76, 0.92, 1], [0, 0, -41, -41, 73, 73, 0, 0]);
  const shoulderRotate = useTransform(p, [0, 0.08, 0.36, 0.5, 0.7, 0.76, 0.92, 1], [-4, -4, -1, -1, -1, -1, -4, -4]);
  const elbowRotate = useTransform(p, [0, 0.08, 0.36, 0.5, 0.7, 0.76, 0.92, 1], [6, 6, -80, -80, 4, 4, 6, 6]);
  const wristRotate = useTransform(p, [0, 0.08, 0.36, 0.5, 0.7, 0.76, 0.92, 1], [0, 0, -58, -58, 103, 103, 0, 0]);

  // ---- gripper: 0 = open, 1 = closed around the component ----
  const gripperClose = useTransform(p, [0, 0.3, 0.4, 0.46, 0.7, 0.76, 0.82, 1], [0, 0, 0, 1, 1, 1, 0, 0]);
  const leftFinger = useTransform(gripperClose, [0, 1], [-22, 0]);
  const rightFinger = useTransform(gripperClose, [0, 1], [22, 0]);

  // ---- the component: three fixed-position instances, crossfaded ----
  const onTrayOpacity = useTransform(p, [0, 0.4, 0.46], [1, 1, 0]);
  const carriedOpacity = useTransform(p, [0.4, 0.46, 0.74, 0.8], [0, 1, 1, 0]);
  const inSocketOpacity = useTransform(p, [0.74, 0.8], [0, 1]);
  const socketGlow = useTransform(p, [0.78, 0.92], [0.12, 1]);
  const socketRingOpacity = useTransform(socketGlow, [0.12, 1], [0, 0.55]);

  // ---- camera: a slight, constant depth drift through the whole sequence ----
  const camRotateY = useTransform(p, [0, 1], [6, -6]);
  const camScale = useTransform(p, [0, 0.5, 1], [0.96, 1, 0.97]);

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-navy py-24 text-center sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan">
          Inside the Lab
        </span>
        <h2 className="mx-auto mt-6 max-w-xl font-display text-3xl font-bold text-white sm:text-4xl">
          A Robotic Arm, Doing Real Work
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          Every kit our students build performs an assembly like this one — pick, place, power on.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[280vh] bg-navy">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="pointer-events-none pt-14 text-center sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan">
            Inside the Lab
          </span>
        </div>

        <div className="relative flex flex-1 items-center justify-center" style={{ perspective: 1300 }}>
          {/* atmosphere */}
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-15" />
          <div className="pointer-events-none absolute -left-32 top-1/3 size-[26rem] rounded-full bg-electric/15 blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 bottom-0 size-[24rem] rounded-full bg-violet/15 blur-[120px]" />

          <motion.div style={{ rotateY: camRotateY, scale: camScale }} className="relative w-full max-w-3xl px-6">
            <svg viewBox="0 0 480 300" className="h-auto w-full overflow-visible">
              <defs>
                <linearGradient id={`${uid}-metal`} x1="0.1" y1="0" x2="0.9" y2="1">
                  <stop offset="0%" stopColor="#eef2f9" />
                  <stop offset="45%" stopColor="#a7b0c8" />
                  <stop offset="100%" stopColor="#5b6480" />
                </linearGradient>
                <linearGradient id={`${uid}-chip`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8fe9f5" />
                  <stop offset="100%" stopColor="#3457ff" />
                </linearGradient>
              </defs>

              {/* platform */}
              <rect x="30" y="248" width="420" height="14" rx="6" fill="#1a2340" />
              <rect x="30" y="248" width="420" height="3" rx="1.5" fill="#2c396b" />

              {/* power/status strip along the base, brightens on power-up */}
              <motion.rect x="200" y="246" width="40" height="3" rx="1.5" fill="#3fe3f5" style={{ opacity: powerGlow }} />

              {/* ---- pickup tray (left) ---- */}
              <rect x="76" y="230" width="46" height="18" rx="3" fill="#232d52" stroke="#3a4573" />
              <motion.g style={{ opacity: onTrayOpacity }}>
                <rect x="87" y="212" width="24" height="20" rx="3" fill={`url(#${uid}-chip)`} stroke="#0b1220" strokeWidth="1.2" />
                <line x1="91" y1="218" x2="107" y2="218" stroke="#0b1220" strokeWidth="1" opacity="0.5" />
                <line x1="91" y1="224" x2="107" y2="224" stroke="#0b1220" strokeWidth="1" opacity="0.5" />
              </motion.g>

              {/* ---- target socket (right) ---- */}
              <rect x="356" y="222" width="48" height="26" rx="4" fill="#1c2748" stroke="#3a4573" />
              <rect x="365" y="230" width="30" height="12" rx="2" fill="#0a1330" />
              <motion.circle cx="380" cy="236" r="3.4" fill="#3fe3f5" style={{ opacity: socketGlow }} />
              <motion.circle
                cx="380"
                cy="236"
                r="9"
                fill="none"
                stroke="#3fe3f5"
                strokeWidth="1"
                style={{ opacity: socketRingOpacity }}
              />
              <motion.g style={{ opacity: inSocketOpacity }}>
                <rect x="368" y="226" width="24" height="20" rx="3" fill={`url(#${uid}-chip)`} stroke="#0b1220" strokeWidth="1.2" />
                <line x1="372" y1="232" x2="388" y2="232" stroke="#0b1220" strokeWidth="1" opacity="0.5" />
                <line x1="372" y1="238" x2="388" y2="238" stroke="#0b1220" strokeWidth="1" opacity="0.5" />
              </motion.g>

              {/* ---- the arm: base -> shoulder -> elbow -> wrist -> gripper, each its own nested joint ---- */}
              <circle cx="220" cy="252" r="16" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
              <motion.circle cx="220" cy="252" r="5" fill="#3fe3f5" style={{ opacity: powerGlow }} />

              <motion.g style={{ rotate: baseRotate, transformOrigin: "220px 252px" }}>
                <rect x="213" y="188" width="14" height="66" rx="6" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
                <circle cx="220" cy="190" r="9" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />

                <motion.g style={{ rotate: shoulderRotate, transformOrigin: "220px 190px" }}>
                  <rect x="213" y="132" width="14" height="60" rx="6" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
                  <circle cx="220" cy="134" r="8" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />

                  <motion.g style={{ rotate: elbowRotate, transformOrigin: "220px 134px" }}>
                    <rect x="214" y="82" width="12" height="54" rx="5" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
                    <circle cx="220" cy="84" r="7" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />

                    <motion.g style={{ rotate: wristRotate, transformOrigin: "220px 84px" }}>
                      <rect x="215" y="60" width="10" height="26" rx="4" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />

                      {/* gripper fingers */}
                      <motion.g style={{ rotate: leftFinger, transformOrigin: "220px 60px" }}>
                        <rect x="206" y="44" width="6" height="18" rx="2" fill="#3a415a" />
                      </motion.g>
                      <motion.g style={{ rotate: rightFinger, transformOrigin: "220px 60px" }}>
                        <rect x="228" y="44" width="6" height="18" rx="2" fill="#3a415a" />
                      </motion.g>

                      {/* the carried component — nested inside the gripper's own transform chain */}
                      <motion.g style={{ opacity: carriedOpacity }}>
                        <rect x="208" y="42" width="24" height="20" rx="3" fill={`url(#${uid}-chip)`} stroke="#0b1220" strokeWidth="1.2" />
                        <line x1="212" y1="48" x2="228" y2="48" stroke="#0b1220" strokeWidth="1" opacity="0.5" />
                        <line x1="212" y1="54" x2="228" y2="54" stroke="#0b1220" strokeWidth="1" opacity="0.5" />
                      </motion.g>
                    </motion.g>
                  </motion.g>
                </motion.g>
              </motion.g>
            </svg>
          </motion.div>
        </div>

        <div className="pointer-events-none pb-10 text-center sm:pb-12">
          <div className="mx-auto h-1 w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full bg-gradient-to-r from-electric via-cyan to-violet" style={{ scaleX: p, transformOrigin: "left" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
