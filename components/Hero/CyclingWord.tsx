"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

/**
 * Cycles through `words` in place, each one clipping up from below and the
 * outgoing word clipping further up and out — a "flip panel" reveal built
 * from transform/opacity only (no `filter`/blur animation, which is more
 * prone to jank), so it stays GPU-cheap. An invisible copy of the longest
 * word is rendered in normal flow first purely to reserve box size, so nothing
 * else in the heading reflows as shorter/longer words rotate through.
 *
 * Freezes on the first word under `prefers-reduced-motion`.
 */
export function CyclingWord({
  words,
  className,
  interval = 2200,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || words.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduceMotion, words.length, interval]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <span className="invisible">{longest}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="absolute inset-0"
          initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduceMotion ? undefined : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
