"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { ParallaxField, ParallaxItem } from "@/components/ui/ParallaxField";
import { RoboticsWorkbenchScene } from "./RoboticsWorkbenchScene";

/**
 * Wraps the approved static workbench illustration with two independent,
 * additive layers of motion rather than replacing it with a new scripted
 * sequence:
 *
 *  - a scroll-tied recede (translateY/scale/opacity via `useScroll`, on this
 *    wrapper) so the bench feels like a physical object the page moves past
 *    as the visitor scrolls into the rest of the homepage — not a slideshow
 *    cut, a continuous depth change;
 *  - a mouse-tied parallax tilt (via the existing `ParallaxField` primitive,
 *    on a separate nested element) so the bench answers cursor position at
 *    rest, before any scrolling happens.
 *
 * The two never fight: they're `transform`s on two different elements, the
 * same split this codebase already uses everywhere else idle-animation and
 * pointer-parallax need to coexist (see ParallaxField's own doc comment).
 */
export function HeroSceneStage({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        <RoboticsWorkbenchScene className="h-auto w-full" />
      </div>
    );
  }

  return (
    // Two nested motion elements on purpose: the outer one plays a one-time
    // mount entrance (settles in alongside HeroCopy's own staggered reveal,
    // instead of appearing instantly), the inner one is continuously driven
    // by scroll. Different elements so neither fights the other's transform.
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div ref={ref} style={{ y, scale, opacity }}>
        <ParallaxField className="h-full w-full">
          <ParallaxItem depth={9}>
            <RoboticsWorkbenchScene className="h-auto w-full" />
          </ParallaxItem>
        </ParallaxField>
      </motion.div>
    </motion.div>
  );
}
