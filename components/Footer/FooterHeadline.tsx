"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/**
 * A staged, cascading reveal for the footer's opening line — the leading
 * words fade in first, then the final word gets its own beat (gradient
 * fill + a hand-drawn underline that draws itself in), then the CTA button
 * settles in last. Each stage a little later than the one before, rather
 * than everything appearing at once — the same "builds up in beats" scroll
 * reveal Studio Loop uses for its own closing line, done with our own
 * tagline and brand gradient/underline instead of copying their assets.
 */
export function FooterHeadline({ tagline, ctaLabel, ctaHref }: { tagline: string; ctaLabel: string; ctaHref: string }) {
  const words = tagline.trim().split(" ");
  const lastWord = words.pop() ?? "";
  const lead = words.join(" ");

  return (
    <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {lead}{" "}
        </motion.span>
        <span className="relative inline-block">
          <motion.span
            className="text-gradient"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {lastWord}
          </motion.span>
          <motion.svg
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.55 }}
          >
            <motion.path
              d="M2 8 C 30 2, 70 2, 98 8"
              stroke="#17c3d6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.55, ease: "easeInOut" }}
            />
          </motion.svg>
        </span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button href={ctaHref} variant="light" size="lg" className="shrink-0">
          {ctaLabel}
        </Button>
      </motion.div>
    </div>
  );
}
