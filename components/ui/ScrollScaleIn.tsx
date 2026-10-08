"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Scales/fades an element in as it scrolls up through a window in the lower
 * half of the viewport — tied continuously to scroll position via
 * `useScroll`, not a single whileInView trigger like the site's `Reveal`.
 * Generalized from Statistics' original ring treatment so any page can give
 * one flagship visual a real "grows into place as you scroll" transform
 * instead of the same fade every section already uses.
 */
export function ScrollScaleIn({
  children,
  className,
  from = 0.72,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.45"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
