"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { Lightbox } from "@/components/ui/Lightbox";
import { media } from "@/data/media";

/**
 * A scattered layout of real close-up robotics-part photography that reacts
 * to cursor proximity — each card slides and tilts away as the pointer nears
 * it, like nudging objects on a physical desk, then eases back to rest once
 * the pointer moves on. This is this site's own version of a "cursor
 * disturbs nearby objects" moment (the kind of interaction Studio Loop uses
 * with a row of books) — built around real robotics/electronics photography
 * instead, since that's what's actually true to this brand.
 *
 * Each card measures its own position live inside the mousemove handler
 * (`getBoundingClientRect` at move-time) rather than caching a position on
 * mount, so it stays correct regardless of scroll offset — no separate
 * scroll listener needed. Bails out entirely on coarse pointers and under
 * `prefers-reduced-motion`, leaving cards at their resting scatter position.
 */
const PARTS = [
  { image: media.circuitMacro[0], label: "Controller Board", top: "4%", left: "3%", rotate: -8, size: 164 },
  { image: media.circuitMacro[1], label: "Sensor Array", top: "0%", left: "25%", rotate: 6, size: 142 },
  { image: media.retroRobotToy, label: "Prototype Chassis", top: "8%", left: "46%", rotate: -5, size: 184 },
  { image: media.kidsCoding[0], label: "Motor Assembly", top: "2%", left: "70%", rotate: 7, size: 150 },
  { image: media.circuitMacro[2], label: "Power Module", top: "48%", left: "8%", rotate: 7, size: 156 },
  { image: media.kidsCoding[2], label: "Build Session", top: "44%", left: "30%", rotate: -6, size: 198 },
  { image: media.circuitMacro[3], label: "Wiring Harness", top: "52%", left: "54%", rotate: 5, size: 148 },
  { image: media.kidsCoding[4], label: "Team Build", top: "46%", left: "78%", rotate: -4, size: 168 },
];

export function WorkbenchScatter() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute -left-16 top-1/3 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #3457ff 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
      <Container className="relative">
        <div className="max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan backdrop-blur">
            The Workbench
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Every Build Starts With <span className="text-gradient">Real Parts.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Not simulations — controller boards, sensors, motors and wiring students actually hold,
            wire and debug. Move your cursor across the bench.
          </p>
        </div>

        <div className="relative mt-16 hidden h-[540px] md:block">
          {PARTS.map((part) => (
            <ReactiveCard key={part.label} part={part} />
          ))}
        </div>

        <div data-cursor="drag" className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
          {PARTS.map((part) => (
            <div
              key={part.label}
              className="relative aspect-[4/5] w-48 shrink-0 snap-center overflow-hidden rounded-2xl shadow-lift"
            >
              <Image src={part.image} alt={part.label} fill sizes="200px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-white">{part.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReactiveCard({ part }: { part: (typeof PARTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(part.rotate);
  const springX = useSpring(x, { stiffness: 160, damping: 14, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 160, damping: 14, mass: 0.6 });
  const springRotate = useSpring(rotate, { stiffness: 160, damping: 14, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    function handleMove(e: MouseEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        const radius = 190;
        if (dist < radius) {
          const force = 1 - dist / radius;
          x.set((dx / dist) * force * 46);
          y.set((dy / dist) * force * 46);
          rotate.set(part.rotate + (dx / dist) * force * 16);
        } else {
          x.set(0);
          y.set(0);
          rotate.set(part.rotate);
        }
      });
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion, x, y, rotate, part.rotate]);

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        rotate: springRotate,
        top: part.top,
        left: part.left,
        width: part.size,
        height: part.size * 1.1,
      }}
      className="absolute overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
    >
      {/* the "View" cursor cue now actually opens the photo larger, via
          Lightbox — it used to just be a hover label with no click behind
          it, which read as broken rather than subtle */}
      <Lightbox src={part.image} alt={part.label} label={part.label} className="relative block h-full w-full text-left">
        <Image src={part.image} alt={part.label} fill sizes="200px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-white">{part.label}</span>
      </Lightbox>
    </motion.div>
  );
}
