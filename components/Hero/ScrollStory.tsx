"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

const NODE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const HUD_LABELS = ["SYS.PWR // CHARGING", "SYS.SCAN // ACTIVE", "SYS.NET // LINKING"];

/**
 * The homepage's opening world: one continuous robotics-lab environment
 * (tilted floor grid, a diagnostic platform, HUD frame, circuit traces) that
 * the scroll moves a "camera" through — not five interchangeable slides.
 * Three beats, each a physical continuation of the last:
 *
 *   POWER      — the platform and the robot's own vents/chest/antenna light
 *                up from dark, one part at a time.
 *   CALIBRATE  — a scan beam sweeps the robot; its head tracks the sweep.
 *   INTELLIGENCE — the scan resolves into a node network grown from the
 *                robot's own chest core, wired back down into the platform;
 *                the robot's arm rises to gesture into it.
 *
 * The robot is built here (not the shared mascot) specifically so its head,
 * arm, chest and vents can each take their own scroll-driven MotionValue —
 * a single rigid asset can't do that. Every visible change is a
 * `useTransform` of one `scrollYProgress` (synced to the real, Lenis-driven
 * scroll position), so stopping mid-scroll freezes the whole scene exactly
 * where it is, and scrolling up reverses it — nothing here runs on a timer.
 */
export function ScrollStory() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const p = useSpring(raw, { stiffness: 120, damping: 26, mass: 0.4 });

  // ---- mouse parallax for the HUD/foreground layer (screen-space, subtle) ----
  // Real MotionValues updated imperatively via .set() — not React state — so
  // every mousemove does NOT trigger a component re-render; useTransform
  // derivations below subscribe to these directly.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, mouseX, mouseY]);

  // ---- camera: the whole scene tilts/pushes as if moving through depth ----
  const camRotateX = useTransform(p, [0, 1], [14, 4]);
  const camRotateY = useTransform(p, [0, 0.5, 1], [-4, 0, 4]);
  const camScale = useTransform(p, [0, 0.35, 0.7, 1], [0.92, 1.04, 1, 0.94]);
  const camZ = useTransform(p, [0, 1], [-60, 40]);

  // ---- Beat 1: POWER (0 – 0.34) ----
  const platformGlow = useTransform(p, [0, 0.14], [0.15, 1]);
  const chestPower = useTransform(p, [0.02, 0.2], [0, 1]);
  const ventOpen = useTransform(p, [0.05, 0.22], [0.15, 1]);
  const antennaPower = useTransform(p, [0.1, 0.26], [0, 1]);
  const armRest = useTransform(p, [0, 0.34], [4, -6]);

  // ---- Beat 2: CALIBRATE (0.3 – 0.66) ----
  const scanY = useTransform(p, [0.3, 0.62], ["-30%", "230%"]);
  const scanOpacity = useTransform(p, [0.3, 0.36, 0.58, 0.64], [0, 1, 1, 0]);
  const headTurn = useTransform(p, [0.3, 0.44, 0.58], [-10, 12, -4]);
  const eyeGlow = useTransform(p, [0.3, 0.4], [0.6, 1]);

  // ---- Beat 3: INTELLIGENCE (0.6 – 1) ----
  const ringRadius = useTransform(p, [0.6, 0.86], [10, 128]);
  const ringOpacity = useTransform(p, [0.58, 0.66, 0.94, 1], [0, 0.9, 0.9, 0.5]);
  const nodeOpacity = useTransform(p, [0.68, 0.78], [0, 1]);
  const wireOpacity = useTransform(p, [0.72, 0.84], [0, 0.7]);
  const armRaise = useTransform(p, [0.62, 0.86], [-6, -52]);
  const chestPeak = useTransform(p, [0.7, 0.9], [1, 1.6]);

  const chestGlowRadius = useTransform(chestPeak, [1, 1.6], [10, 30]);
  const chestFilter = useMotionTemplate`drop-shadow(0 0 ${chestGlowRadius}px rgba(63,227,245,${chestPower}))`;
  const chestCoreOpacity = useTransform(chestPower, [0, 1], [0.3, 1]);
  const platformGlowRadius = useTransform(platformGlow, [0, 1], [4, 50]);
  const platformShadow = useMotionTemplate`0 0 ${platformGlowRadius}px rgba(63,227,245,${platformGlow})`;

  // ---- HUD readout: three short technical labels, tight non-overlapping handoff ----
  const hud0 = useTransform(p, [0, 0.04, 0.28, 0.32], [0, 1, 1, 0]);
  const hud1 = useTransform(p, [0.32, 0.36, 0.6, 0.64], [0, 1, 1, 0]);
  const hud2 = useTransform(p, [0.64, 0.68, 1], [0, 1, 1]);
  const hudOpacities = [hud0, hud1, hud2];

  const progressScaleX = p;

  const parallaxFgX = useTransform(mouseX, (v) => v * -18);
  const parallaxFgY = useTransform(mouseY, (v) => v * -12);
  const parallaxBgX = useTransform(mouseX, (v) => v * 8);

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-[#050914] py-24 text-center sm:py-28">
        <div className="mx-auto mb-8 h-40 w-40 rounded-full bg-gradient-to-br from-electric/30 to-violet/30" />
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Power. Calibrate. Connect.</h2>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          Every Univerzia classroom takes the same path — a machine powers up, learns, and connects to something bigger.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-[#050914]">
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ perspective: 1400 }}>
        {/* ================= background: void + vignette ================= */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(52,87,255,0.16),transparent_60%)]" />

        {/* ================= the "camera": everything in the scene tilts/pushes together ================= */}
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            rotateX: camRotateX,
            rotateY: camRotateY,
            scale: camScale,
            z: camZ,
          }}
        >
          {/* ---- floor: a receding tilted grid, permanently part of the set ---- */}
          <div
            className="absolute inset-x-[-20%] bottom-0 h-[75%]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(63,227,245,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(63,227,245,0.16) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "linear-gradient(to top, black 20%, transparent 85%)",
              WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 85%)",
              transform: "rotateX(62deg)",
              transformOrigin: "bottom",
            }}
          />

          {/* ---- ambient circuit traces running into the platform (always alive, not scroll-tied) ---- */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 78 C 20 74, 30 70, 44 62" stroke="#3fe3f5" strokeWidth="0.15" opacity="0.35" fill="none" />
            <path d="M 100 82 C 80 76, 66 70, 54 62" stroke="#8b7bf5" strokeWidth="0.15" opacity="0.35" fill="none" />
            <circle r="0.5" fill="#eafcff" className="pf-travel" style={{ offsetPath: 'path("M 0 78 C 20 74, 30 70, 44 62")' }} />
            <circle r="0.5" fill="#eafcff" className="pf-travel" style={{ offsetPath: 'path("M 100 82 C 80 76, 66 70, 54 62")', animationDelay: "1.7s" }} />
          </svg>

          {/* ---- diagnostic platform the robot stands on ---- */}
          <motion.div
            className="absolute left-1/2 top-[64%] h-10 w-64 -translate-x-1/2 rounded-[50%] border border-cyan/60"
            style={{ opacity: platformGlow, boxShadow: platformShadow }}
          />
          <motion.div
            className="absolute left-1/2 top-[64%] h-2 w-64 -translate-x-1/2 rounded-full bg-cyan"
            style={{ opacity: platformGlow }}
          />

          {/* ---- the robot: an independently-jointed part-by-part machine ---- */}
          <motion.svg
            viewBox="0 0 200 260"
            className="absolute left-1/2 top-1/2 h-[52vh] max-h-[440px] -translate-x-1/2 -translate-y-[62%]"
            style={{ x: parallaxFgX }}
          >
            <defs>
              <linearGradient id="ss-metal" x1="0.15" y1="0" x2="0.85" y2="1">
                <stop offset="0%" stopColor="#eef2f9" />
                <stop offset="45%" stopColor="#a7b0c8" />
                <stop offset="100%" stopColor="#5b6480" />
              </linearGradient>
              <radialGradient id="ss-core" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#eafcff" />
                <stop offset="50%" stopColor="#3fe3f5" />
                <stop offset="100%" stopColor="#6a5cf0" />
              </radialGradient>
            </defs>

            {/* legs / base, fixed to the platform */}
            <rect x="76" y="200" width="20" height="40" rx="6" fill="url(#ss-metal)" />
            <rect x="104" y="200" width="20" height="40" rx="6" fill="url(#ss-metal)" />
            <rect x="66" y="236" width="68" height="10" rx="4" fill="#3a415a" />

            {/* torso with chest core */}
            <rect x="62" y="120" width="76" height="86" rx="16" fill="url(#ss-metal)" stroke="#3a415a" strokeWidth="1" />
            {/* vents — scale open on the POWER beat */}
            <motion.g style={{ scaleY: ventOpen, transformOrigin: "70px 140px" }}>
              <rect x="68" y="132" width="4" height="16" rx="1.5" fill="#0b1220" />
              <rect x="75" y="132" width="4" height="16" rx="1.5" fill="#0b1220" />
            </motion.g>
            <motion.g style={{ scaleY: ventOpen, transformOrigin: "130px 140px" }}>
              <rect x="121" y="132" width="4" height="16" rx="1.5" fill="#0b1220" />
              <rect x="128" y="132" width="4" height="16" rx="1.5" fill="#0b1220" />
            </motion.g>
            <motion.circle cx="100" cy="168" r="22" fill="#0a1330" style={{ opacity: chestCoreOpacity }} />
            <motion.circle
              cx="100"
              cy="168"
              r="17"
              fill="url(#ss-core)"
              style={{ opacity: chestPower, scale: chestPeak, filter: chestFilter, transformOrigin: "100px 168px" }}
            />

            {/* shoulder + arm — raises to gesture into the network in Beat 3 */}
            <circle cx="60" cy="132" r="11" fill="url(#ss-metal)" />
            <motion.g style={{ rotate: armRaise, transformOrigin: "60px 132px" }}>
              <rect x="52" y="132" width="14" height="58" rx="6" fill="url(#ss-metal)" />
              <circle cx="59" cy="188" r="8" fill="#3a415a" />
              <motion.g style={{ rotate: armRest, transformOrigin: "59px 188px" }}>
                <rect x="53" y="188" width="12" height="34" rx="5" fill="url(#ss-metal)" />
                <circle cx="59" cy="222" r="7" fill="#3457ff" />
              </motion.g>
            </motion.g>
            <circle cx="140" cy="132" r="11" fill="url(#ss-metal)" />
            <rect x="134" y="132" width="14" height="50" rx="6" fill="url(#ss-metal)" />

            {/* neck + head — turns during the CALIBRATE scan */}
            <rect x="90" y="104" width="20" height="18" fill="#3a415a" />
            <motion.g style={{ rotate: headTurn, transformOrigin: "100px 90px" }}>
              <path d="M66 60 L134 60 L146 74 L146 106 L134 120 L66 120 L54 106 L54 74 Z" fill="url(#ss-metal)" stroke="#3a415a" strokeWidth="1" />
              <rect x="72" y="80" width="56" height="18" rx="4" fill="#0a1330" />
              <motion.circle cx="86" cy="89" r="5" fill="#3fe3f5" style={{ opacity: eyeGlow }} />
              <motion.circle cx="114" cy="89" r="5" fill="#8b7bf5" style={{ opacity: eyeGlow }} />
              <line x1="100" y1="60" x2="100" y2="42" stroke="#8892ab" strokeWidth="3" strokeLinecap="round" />
              <motion.circle cx="100" cy="38" r="6" fill="#ffc93c" style={{ opacity: antennaPower }} />
            </motion.g>
          </motion.svg>

          {/* ---- scan beam sweeping across the robot ---- */}
          <motion.div
            className="absolute left-1/2 h-40 w-[36rem] -translate-x-1/2"
            style={{
              top: scanY,
              opacity: scanOpacity,
              background: "linear-gradient(rgba(63,227,245,0), rgba(63,227,245,0.55), rgba(63,227,245,0))",
              mixBlendMode: "screen",
            }}
          />

          {/* ---- ring → node network, wired down into the platform ---- */}
          <svg viewBox="-150 -150 300 300" className="absolute left-1/2 top-[38%] h-[46vh] max-h-[420px] w-[46vh] max-w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-visible">
            <motion.circle cx="0" cy="0" r={ringRadius} fill="none" stroke="#3fe3f5" strokeWidth="1" opacity={ringOpacity} />
            {NODE_ANGLES.map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <motion.line x1="0" y1="0" x2={ringRadius} y2="0" stroke="#8b7bf5" strokeWidth="1" opacity={nodeOpacity} />
                <motion.circle cx={ringRadius} cy="0" r="3.5" fill="#3fe3f5" opacity={nodeOpacity} />
              </g>
            ))}
            <motion.path d="M -70 130 L -20 60 M 70 130 L 20 60" stroke="#3fe3f5" strokeWidth="1" opacity={wireOpacity} />
          </svg>

          {/* ---- background parallax drift (slower than mouse-fg layer) ---- */}
          <motion.div className="pointer-events-none absolute inset-0" style={{ x: parallaxBgX }}>
            <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-violet/10 blur-[100px]" />
            <div className="absolute right-[8%] top-[30%] h-72 w-72 rounded-full bg-electric/10 blur-[100px]" />
          </motion.div>
        </motion.div>

        {/* ================= HUD overlay: screen-locked, not part of the 3D camera ================= */}
        <div className="pointer-events-none absolute inset-6 sm:inset-10">
          {(["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"] as const).map((pos) => (
            <div key={pos} className={`absolute h-8 w-8 border-cyan/40 ${pos}`} />
          ))}
          <motion.div className="absolute left-0 top-0 font-mono text-[11px] tracking-wider text-cyan/80" style={{ y: parallaxFgY }}>
            {HUD_LABELS.map((label, i) => (
              <motion.span key={label} style={{ opacity: hudOpacities[i], position: i === 0 ? "static" : "absolute", left: 0, top: 0 }}>
                {label}
              </motion.span>
            ))}
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-40 overflow-hidden bg-white/10">
            <motion.div className="h-full bg-gradient-to-r from-electric via-cyan to-violet" style={{ scaleX: progressScaleX, transformOrigin: "left" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
