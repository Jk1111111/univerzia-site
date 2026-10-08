"use client";

import { useId, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { HeroCopy } from "./HeroCopy";
import { RoboticsWorkbenchScene } from "./RoboticsWorkbenchScene";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

const HERO_INTRO_SEEN_KEY = "novastem-hero-intro-seen-v2";
function getHeroIntroSeenSnapshot() {
  try {
    return sessionStorage.getItem(HERO_INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}
function getHeroIntroSeenServerSnapshot() {
  return false;
}
function subscribeToNothing() {
  return () => {};
}

/**
 * The approved workbench composition, now animated as ONE causal chain, not
 * a set of independent effects:
 *
 *   CODE runs on the laptop → sends data to the rover → the rover's
 *   electronics power up in sequence → its sensor scans and finds the
 *   spare part on the tray → the laptop shows a decision → the arm
 *   (base→shoulder→elbow→wrist→gripper, forward-kinematics-solved so the
 *   gripper actually lands on the part) picks it up → carries and seats it
 *   into a mount on the rover → the rover drives off under its own power.
 *
 * Every joint/LED/opacity value below is a `useTransform` of one scroll
 * progress value, so stopping mid-scroll freezes the exact causal step and
 * scrolling back reverses it. See /solve-arm2.mjs for the arm's GRIP/DELIVER
 * angles — the geometry is real, not eyeballed: the gripper's reach and the
 * mount point were chosen to be within the arm's actual 122-unit reach.
 */
export function RoboticsWorkbenchSequence() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const uid = useId();

  const skipIntro = useSyncExternalStore(subscribeToNothing, getHeroIntroSeenSnapshot, getHeroIntroSeenServerSnapshot);

  const { scrollYProgress: raw } = useScroll({
    target: reduceMotion || skipIntro ? undefined : sectionRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(raw, { stiffness: 95, damping: 22, mass: 0.55 });

  useMotionValueEvent(p, "change", (v) => {
    if (v < 0.95) return;
    try {
      sessionStorage.setItem(HERO_INTRO_SEEN_KEY, "1");
    } catch {
      // ignore
    }
  });

  // ================= camera: one continuous move through the workbench =================
  // Percent-of-own-width translateX (not fixed px — a fixed-px version broke
  // on mobile last time this scene had a camera, see Hero.tsx git history).
  // A keyframe at 0.34 zooms tight on the sensor for the scan itself; by 0.38
  // the camera has pulled back to a medium shot spanning sensor-to-tray
  // (vx≈456) so the detection reticle at 0.36–0.48 is actually visible in
  // frame together with the sensor — the first version zoomed so tight on
  // the sensor alone that the "found it" moment happened off-screen.
  const camScale = useTransform(
    p,
    [0, 0.06, 0.2, 0.24, 0.34, 0.38, 0.44, 0.48, 0.52, 0.58, 0.66, 0.74, 0.82, 0.9, 1],
    [0.95, 0.95, 1.45, 1.55, 2.3, 1.3, 1.3, 1.5, 1.5, 1.45, 1.45, 1.35, 1.35, 1.0, 0.95]
  );
  const camX = useTransform(
    p,
    [0, 0.06, 0.2, 0.24, 0.34, 0.38, 0.44, 0.48, 0.52, 0.58, 0.66, 0.74, 0.82, 0.9, 1],
    ["0%", "0%", "-4.1%", "14.4%", "22%", "-19.7%", "-19.7%", "52.5%", "52.5%", "-52.8%", "-52.8%", "-37.6%", "-28.5%", "-7.1%", "0%"]
  );
  const camRotateY = useTransform(p, [0, 0.24, 0.52, 0.82, 1], [3, 1, -1, 1, 0]);
  const camRotateX = useTransform(p, [0, 1], [4, 3]);

  // ================= POWER-UP (0.06–0.24): code runs, power flows laptop → rover =================
  const codeLine1 = useTransform(p, [0.06, 0.09, 0.11], [0.5, 1, 0.5]);
  const codeLine2 = useTransform(p, [0.08, 0.11, 0.13], [0.5, 1, 0.5]);
  const codeLine3 = useTransform(p, [0.1, 0.13, 0.15], [0.5, 1, 0.5]);
  const codeLine4 = useTransform(p, [0.12, 0.15, 0.17], [0.5, 1, 0.5]);
  const codeLine5 = useTransform(p, [0.14, 0.17, 0.19], [0.5, 1, 0.5]);

  const packet1T = useTransform(p, [0.1, 0.16], [0, 1]);
  const packet1X = useTransform(packet1T, (t) => 148 + (355 - 148) * t);
  const packet1Y = useTransform(packet1T, (t) => 245 + (240 - 245) * t - 22 * 4 * t * (1 - t));
  const packet1Opacity = useTransform(p, [0.1, 0.115, 0.145, 0.16], [0, 1, 1, 0]);

  const packet2T = useTransform(p, [0.15, 0.21], [0, 1]);
  const packet2X = useTransform(packet2T, (t) => 148 + (355 - 148) * t);
  const packet2Y = useTransform(packet2T, (t) => 245 + (240 - 245) * t - 22 * 4 * t * (1 - t));
  const packet2Opacity = useTransform(p, [0.15, 0.165, 0.195, 0.21], [0, 1, 1, 0]);

  const batteryPower = useTransform(p, [0.06, 0.1], [0.12, 1]);
  const controllerPower = useTransform(p, [0.09, 0.13], [0.12, 1]);
  const sensorPower = useTransform(p, [0.12, 0.18], [0.1, 1]);

  const wheelWiggleAndRoll = useTransform(
    p,
    [0, 0.14, 0.17, 0.2, 0.22, 0.86, 1],
    [0, 0, -10, 10, 0, 0, -560]
  );
  const antennaCalibrate = useTransform(p, [0.16, 0.19, 0.22, 0.24], [0, -8, 8, 0]);

  // ================= SENSOR / AI (0.24–0.44): scan sweep + detection =================
  // One combined rotation for the whole timeline (sweep here, a "glance" again
  // during BUILD at 0.66–0.82) — two separate transforms fighting over the
  // same rotate would just clobber each other.
  const sensorRotate = useTransform(
    p,
    [0, 0.24, 0.32, 0.4, 0.44, 0.66, 0.74, 0.82, 0.94, 0.98, 1],
    [0, 0, -20, 35, 35, 0, 20, 0, 0, 15, 0]
  );
  const scanConeOpacity = useTransform(p, [0.24, 0.28, 0.4, 0.44], [0, 0.4, 0.4, 0]);
  const detectReticleOpacity = useTransform(p, [0.36, 0.4, 0.44, 0.48], [0, 1, 1, 0]);
  const trayGlowOpacity = useTransform(p, [0.36, 0.4, 0.44, 0.48], [0, 0.8, 0.8, 0]);

  // ================= DECISION (0.44–0.52): the laptop shows the outcome =================
  const decisionLineOpacity = useTransform(p, [0.44, 0.48], [0, 1]);
  const controllerDecisionBlink = useTransform(p, [0.44, 0.46, 0.48, 0.5], [1, 0.3, 1, 1]);

  // ================= ARM: REST → GRIP (0.52–0.66) → DELIVER (0.66–0.82) → REST (0.82–0.9) =================
  const armT = [0, 0.52, 0.62, 0.66, 0.78, 0.82, 0.9, 1];
  const baseRotate = useTransform(p, armT, [-18, -18, -30, -30, -72, -72, -18, -18]);
  const shoulderRotate = useTransform(p, armT, [58, 58, 95, 95, 9, 9, 58, 58]);
  const elbowRotate = useTransform(p, armT, [-38, -38, 59, 59, 7, 7, -38, -38]);
  const wristRotate = useTransform(p, armT, [0, 0, 62, 62, -124, -124, 0, 0]);

  const gripperClose = useTransform(p, [0, 0.6, 0.64, 0.76, 0.8, 1], [0, 0, 1, 1, 0, 0]);
  const leftFinger = useTransform(gripperClose, [0, 1], [-24, 0]);
  const rightFinger = useTransform(gripperClose, [0, 1], [24, 0]);

  const onTrayOpacity = useTransform(p, [0, 0.6, 0.64], [1, 1, 0]);
  const carriedOpacity = useTransform(p, [0.6, 0.64, 0.76, 0.8], [0, 1, 1, 0]);
  const installedOpacity = useTransform(p, [0.76, 0.8], [0, 1]);
  const connectFlash = useTransform(p, [0.78, 0.8, 0.86], [0.2, 1, 0.6]);

  // ================= SUCCESS (0.86–1): the rover drives off under its own power =================
  const roverMoveX = useTransform(p, [0.86, 1], [0, 40]);

  if (reduceMotion || skipIntro) {
    return (
      <section className="relative overflow-hidden bg-[#050914] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-15" />
        <div className="pointer-events-none absolute -left-32 top-1/3 size-[26rem] rounded-full bg-electric/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[22rem] rounded-full bg-violet/15 blur-[120px]" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-8">
            <HeroCopy />
            <div className="relative mx-auto w-full max-w-2xl">
              <RoboticsWorkbenchScene className="h-auto w-full" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[420vh] bg-[#050914]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-15" />
        <div className="pointer-events-none absolute -left-32 top-1/3 size-[26rem] rounded-full bg-electric/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[22rem] rounded-full bg-violet/15 blur-[120px]" />

        <Container className="relative flex h-full items-center">
          <div className="grid w-full gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-8">
            <HeroCopy />

            {/* fixed-aspect, clipped "viewport" onto the scene — without this, the
                camera's zoom (a CSS transform, which never affects layout size)
                visually spills out of this column and paints over the text next
                to it at higher zoom levels */}
            <div
              className="relative mx-auto aspect-[5/3] w-full max-w-2xl overflow-hidden rounded-[1.75rem]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ x: camX, scale: camScale, rotateY: camRotateY, rotateX: camRotateX, transformStyle: "preserve-3d" }}
              >
                <svg viewBox="0 0 700 420" className="h-full w-full overflow-visible" aria-hidden="true">
                  <defs>
                    <linearGradient id={`${uid}-metal`} x1="0.1" y1="0" x2="0.9" y2="1">
                      <stop offset="0%" stopColor="#eef2f9" />
                      <stop offset="45%" stopColor="#a7b0c8" />
                      <stop offset="100%" stopColor="#5b6480" />
                    </linearGradient>
                    <linearGradient id={`${uid}-metal-dim`} x1="0.1" y1="0" x2="0.9" y2="1">
                      <stop offset="0%" stopColor="#8891a8" />
                      <stop offset="45%" stopColor="#5f6a86" />
                      <stop offset="100%" stopColor="#3d465f" />
                    </linearGradient>
                    <radialGradient id={`${uid}-sensor`} cx="35%" cy="30%" r="75%">
                      <stop offset="0%" stopColor="#eafcff" />
                      <stop offset="60%" stopColor="#3fe3f5" />
                      <stop offset="100%" stopColor="#0e7490" />
                    </radialGradient>
                    <radialGradient id={`${uid}-screen`} cx="30%" cy="20%" r="80%">
                      <stop offset="0%" stopColor="#1b2a5c" />
                      <stop offset="100%" stopColor="#0a1330" />
                    </radialGradient>
                    <radialGradient id={`${uid}-pool`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8fe9f5" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#8fe9f5" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* ---- workbench ---- */}
                  <rect x="20" y="300" width="660" height="14" rx="4" fill="#1a2340" />
                  <rect x="20" y="296" width="660" height="4" fill="#2c396b" />
                  <ellipse cx="110" cy="300" rx="55" ry="7" fill="#000" opacity="0.35" />
                  <ellipse cx="600" cy="302" rx="30" ry="6" fill="#000" opacity="0.3" />

                  {/* ---- laptop: where the story starts ---- */}
                  <g>
                    <rect x="60" y="288" width="100" height="9" rx="2" fill={`url(#${uid}-metal)`} />
                    <rect x="70" y="222" width="80" height="58" rx="4" fill="#0a1330" stroke="#2c396b" strokeWidth="1.5" />
                    <rect x="76" y="228" width="68" height="46" rx="2" fill={`url(#${uid}-screen)`} />
                    <motion.rect x="82" y="234" width="24" height="3" rx="1.5" fill="#8b7bf5" style={{ opacity: codeLine1 }} />
                    <motion.rect x="82" y="240" width="40" height="3" rx="1.5" fill="#5b6480" style={{ opacity: codeLine2 }} />
                    <motion.rect x="88" y="246" width="30" height="3" rx="1.5" fill="#3fe3f5" style={{ opacity: codeLine3 }} />
                    <motion.rect x="88" y="252" width="20" height="3" rx="1.5" fill="#3fe3f5" style={{ opacity: codeLine4 }} />
                    <motion.rect x="82" y="258" width="46" height="3" rx="1.5" fill="#5b6480" style={{ opacity: codeLine5 }} />
                    <rect x="88" y="264" width="16" height="3" rx="1.5" fill="#ffc93c" className="animate-pulse-soft" opacity="0.85" />
                    {/* decision output line — appears once the rover reports back */}
                    <motion.rect x="88" y="270" width="34" height="3" rx="1.5" fill="#1fb178" style={{ opacity: decisionLineOpacity }} />
                  </g>

                  {/* data flowing from the laptop to the rover's controller — the cause, made visible */}
                  <motion.circle r="2.6" fill="#8fe9f5" style={{ cx: packet1X, cy: packet1Y, opacity: packet1Opacity }} />
                  <motion.circle r="2.6" fill="#8fe9f5" style={{ cx: packet2X, cy: packet2Y, opacity: packet2Opacity }} />

                  {/* ---- parts tray + spare component ---- */}
                  <g>
                    <rect x="606" y="272" width="46" height="18" rx="3" fill="#232d52" stroke="#3a4573" />
                    <motion.circle cx="629" cy="272" r="13" fill="none" stroke="#3fe3f5" strokeWidth="1.4" style={{ opacity: trayGlowOpacity }} />
                    <motion.g style={{ opacity: onTrayOpacity }}>
                      <circle cx="629" cy="272" r="10" fill="#232033" stroke="#3a415a" strokeWidth="1.5" />
                      <circle cx="629" cy="272" r="4" fill={`url(#${uid}-metal)`} />
                    </motion.g>
                    {/* detection reticle */}
                    <motion.g style={{ opacity: detectReticleOpacity }}>
                      <path d="M 611 258 L 611 254 L 615 254" stroke="#3fe3f5" strokeWidth="1.5" fill="none" />
                      <path d="M 647 258 L 647 254 L 643 254" stroke="#3fe3f5" strokeWidth="1.5" fill="none" />
                      <path d="M 611 286 L 611 290 L 615 290" stroke="#3fe3f5" strokeWidth="1.5" fill="none" />
                      <path d="M 647 286 L 647 290 L 643 290" stroke="#3fe3f5" strokeWidth="1.5" fill="none" />
                    </motion.g>
                  </g>

                  {/* ---- robotic arm: base → shoulder → elbow → wrist → gripper ---- */}
                  <g opacity="0.88">
                    <circle cx="600" cy="300" r="13" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
                    <circle cx="600" cy="300" r="4" fill="#3fe3f5" className="animate-pulse-soft" />
                    <motion.g style={{ rotate: baseRotate, transformOrigin: "600px 300px" }}>
                      <rect x="594" y="250" width="12" height="52" rx="5" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
                      <circle cx="600" cy="252" r="8" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
                      <motion.g style={{ rotate: shoulderRotate, transformOrigin: "600px 252px" }}>
                        <rect x="595" y="212" width="10" height="42" rx="4" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
                        <circle cx="600" cy="214" r="6" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
                        <motion.g style={{ rotate: elbowRotate, transformOrigin: "600px 214px" }}>
                          <rect x="596" y="188" width="8" height="28" rx="3" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
                          <motion.g style={{ rotate: wristRotate, transformOrigin: "600px 188px" }}>
                            <motion.g style={{ rotate: leftFinger, transformOrigin: "600px 188px" }}>
                              <rect x="590" y="176" width="5" height="14" rx="2" fill="#2c3348" />
                            </motion.g>
                            <motion.g style={{ rotate: rightFinger, transformOrigin: "600px 188px" }}>
                              <rect x="605" y="176" width="5" height="14" rx="2" fill="#2c3348" />
                            </motion.g>
                            {/* carried component — nested in the gripper, so it inherits the whole joint chain */}
                            <motion.g style={{ opacity: carriedOpacity }}>
                              <circle cx="600" cy="180" r="9" fill="#232033" stroke="#2c3348" strokeWidth="1.3" />
                              <circle cx="600" cy="180" r="3.6" fill={`url(#${uid}-metal)`} />
                            </motion.g>
                          </motion.g>
                        </motion.g>
                      </motion.g>
                    </motion.g>
                  </g>

                  {/* ---- the rover: hero object, moves as one group in the SUCCESS beat ---- */}
                  <motion.g style={{ x: roverMoveX }}>
                    {/* light pool + ground shadow travel with the rover, not left behind */}
                    <ellipse cx="370" cy="296" rx="150" ry="46" fill={`url(#${uid}-pool)`} />
                    <ellipse cx="370" cy="304" rx="110" ry="9" fill="#000" opacity="0.4" />

                    {/* wheels */}
                    <g>
                      <circle cx="310" cy="300" r="27" fill="#141a2e" stroke="#2c396b" strokeWidth="2" />
                      <motion.g style={{ rotate: wheelWiggleAndRoll, transformOrigin: "310px 300px" }}>
                        <circle cx="310" cy="300" r="12" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                          <line
                            key={deg}
                            x1="310"
                            y1="300"
                            x2={310 + 24 * Math.cos((deg * Math.PI) / 180)}
                            y2={300 + 24 * Math.sin((deg * Math.PI) / 180)}
                            stroke="#2c396b"
                            strokeWidth="2"
                          />
                        ))}
                      </motion.g>
                    </g>
                    <g>
                      <circle cx="430" cy="300" r="27" fill="#141a2e" stroke="#2c396b" strokeWidth="2" />
                      <motion.g style={{ rotate: wheelWiggleAndRoll, transformOrigin: "430px 300px" }}>
                        <circle cx="430" cy="300" r="12" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                          <line
                            key={deg}
                            x1="430"
                            y1="300"
                            x2={430 + 24 * Math.cos((deg * Math.PI) / 180)}
                            y2={300 + 24 * Math.sin((deg * Math.PI) / 180)}
                            stroke="#2c396b"
                            strokeWidth="2"
                          />
                        ))}
                      </motion.g>
                    </g>

                    <rect x="300" y="288" width="140" height="10" rx="3" fill="#1c2748" />
                    <rect x="298" y="280" width="18" height="14" rx="3" fill="#3a415a" />
                    <rect x="424" y="280" width="18" height="14" rx="3" fill="#3a415a" />

                    <rect x="295" y="248" width="150" height="42" rx="9" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1.5" />
                    <line x1="295" y1="252" x2="445" y2="252" stroke="#eef2f9" strokeWidth="1" opacity="0.5" />

                    {/* battery, powers on first */}
                    <rect x="306" y="232" width="38" height="18" rx="3" fill="#232d52" stroke="#3a4573" />
                    <line x1="318" y1="234" x2="318" y2="248" stroke="#3a4573" strokeWidth="1.2" />
                    <line x1="330" y1="234" x2="330" y2="248" stroke="#3a4573" strokeWidth="1.2" />
                    <motion.g style={{ opacity: batteryPower }}>
                      <circle cx="337" cy="241" r="2" fill="#1fb178" className="animate-pulse-soft" />
                    </motion.g>

                    {/* controller PCB, powers on second (after battery) */}
                    <rect x="352" y="230" width="62" height="20" rx="2" fill="#0f1830" stroke="#2c396b" strokeWidth="1" />
                    <line x1="360" y1="238" x2="380" y2="238" stroke="#3fe3f5" strokeWidth="1" opacity="0.7" />
                    <line x1="360" y1="243" x2="372" y2="243" stroke="#8b7bf5" strokeWidth="1" opacity="0.6" />
                    <rect x="386" y="235" width="10" height="10" rx="1.5" fill="#232d52" />
                    <circle cx="404" cy="236" r="2" fill="#ff7a45" />
                    <motion.g style={{ opacity: controllerPower }}>
                      <motion.circle cx="404" cy="243" r="2" fill="#3fe3f5" style={{ opacity: controllerDecisionBlink }} />
                    </motion.g>

                    <path d="M 344 240 Q 348 246 352 240" stroke="#e5484d" strokeWidth="1.5" fill="none" />
                    <path d="M 316 250 Q 310 268 300 282" stroke="#232033" strokeWidth="1.5" fill="none" />
                    <path d="M 424 250 Q 432 268 440 282" stroke="#232033" strokeWidth="1.5" fill="none" />

                    {/* front sensor mast — rotates to scan, powers on third */}
                    <rect x="281" y="204" width="7" height="46" fill="#3a415a" />
                    <motion.g style={{ rotate: sensorRotate, transformOrigin: "285px 249px" }}>
                      <rect x="260" y="188" width="50" height="22" rx="7" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
                      <motion.g style={{ opacity: sensorPower }}>
                        <circle cx="275" cy="199" r="7.5" fill={`url(#${uid}-sensor)`} className="animate-pulse-soft" />
                        <circle cx="296" cy="199" r="7.5" fill={`url(#${uid}-sensor)`} className="animate-pulse-soft" style={{ animationDelay: "0.4s" }} />
                      </motion.g>
                      {/* scan field, sweeps together with the sensor */}
                      <motion.path d="M 285 199 L 420 150 L 420 250 Z" fill="#8fe9f5" style={{ opacity: scanConeOpacity }} />
                    </motion.g>

                    {/* antenna beacon, small calibration wiggle on power-up */}
                    <motion.g style={{ rotate: antennaCalibrate, transformOrigin: "438px 250px" }}>
                      <line x1="438" y1="250" x2="448" y2="214" stroke="#8892ab" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="448" cy="210" r="4.5" fill="#ffc93c" className="animate-pulse-soft" style={{ animationDelay: "0.8s" }} />
                    </motion.g>

                    {/* expansion mount — starts empty, receives the delivered component */}
                    <line x1="445" y1="258" x2="498" y2="264" stroke="#3a4573" strokeWidth="2" />
                    <rect x="490" y="256" width="16" height="16" rx="3" fill="none" stroke="#3a4573" strokeWidth="1.5" strokeDasharray="3 2" />
                    <motion.g style={{ opacity: installedOpacity }}>
                      <motion.circle cx="498" cy="264" r="8" fill="#232033" stroke="#3fe3f5" strokeWidth="1.4" style={{ filter: "none", opacity: connectFlash }} />
                      <circle cx="498" cy="264" r="3.4" fill={`url(#${uid}-metal)`} />
                    </motion.g>
                  </motion.g>
                </svg>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
