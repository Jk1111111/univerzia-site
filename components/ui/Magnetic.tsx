"use client";

import { type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Shared magnetic-pull behavior: the element's transform eases toward the
 * cursor while the pointer is inside its bounds, and springs back to rest on
 * leave. Returns plain props (`style` + handlers) rather than a component so
 * it can be spread directly onto whatever element actually needs the pull —
 * Button.tsx applies it straight to the rendered <Link>/<button> instead of
 * introducing a wrapping <div> that would fight utility classes like `w-full`.
 *
 * No-ops (transform stays at rest) under `prefers-reduced-motion` and on
 * coarse/touch pointers, where "magnetic" hover has no meaning.
 */
export function useMagnetic(strength = 0.35) {
  const reduceMotion = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}

/** Block-level magnetic wrapper for elements other than Button (badges, icons, small CTAs). */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const magnetic = useMagnetic(strength);
  return (
    <motion.div className={className} {...magnetic}>
      {children}
    </motion.div>
  );
}
