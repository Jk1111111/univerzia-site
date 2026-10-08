"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * A real photo that drifts vertically as it crosses the viewport — tied
 * continuously to scroll progress via `useScroll`, not a one-time
 * whileInView fade. Generalized from WhoWeAre's original photo treatment so
 * every page can give its photography the same "not a static rectangle"
 * quality instead of each page reinventing it. Scaled up slightly so the
 * extra travel never reveals an edge outside the frame.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  range = 26,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y, scale: 1.16 }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
