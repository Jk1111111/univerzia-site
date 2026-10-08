"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

/**
 * Real photography treated as a technology demo, not a card thumbnail: a
 * large image with a subtle scroll parallax, plus technical callouts that
 * point at what's actually happening in the frame — the "photography +
 * animation together" pattern, built once here so later pages (IoT, AR/VR)
 * can reuse it with their own labels instead of a fresh one-off each time.
 */
export function PhotoStoryPanel({
  src,
  alt,
  badge,
  title,
  description,
  labels,
  accent = "#8b5cf6",
}: {
  src: string;
  alt: string;
  badge: string;
  title: string;
  description: string;
  labels: { x: number; y: number; text: string }[];
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift lg:aspect-auto lg:h-full lg:min-h-[420px]">
      <motion.div className="absolute inset-x-0 -top-[6%] h-[112%]" style={{ y: imageY }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 55vw, 90vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent" />

      {/* technical callouts — pins pointing at what's actually happening in the photo */}
      {labels.map((l, i) => (
        <motion.div
          key={l.text}
          className="absolute hidden items-center gap-2 sm:flex"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
        >
          <span className="size-2 shrink-0 animate-pulse-soft rounded-full" style={{ background: accent }} />
          <span className="rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
            {l.text}
          </span>
        </motion.div>
      ))}

      <div className="absolute inset-x-0 bottom-0 p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
          <Icon name="scan-eye" className="size-3.5" />
          {badge}
        </span>
        <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">{description}</p>
      </div>
    </div>
  );
}
