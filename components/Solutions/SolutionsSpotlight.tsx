"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { solutions } from "@/data/solutions";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { GradientLastWord } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { AnimatedRobot } from "@/components/ui/AnimatedRobot";

/**
 * A scroll-driven "spotlight" list — the row nearest the vertical center of
 * the viewport lights up (full opacity, larger, accent-colored) while the
 * rest dim, the same idea behind the numbered service list on
 * studioloop.com.br. Built with a narrow `useInView` margin (a thin band
 * around viewport-center) rather than continuous scroll interpolation, so
 * it's cheap and reads as a clean on/off spotlight rather than a jittery
 * parallax effect.
 */
function SpotlightRow({ index, solution }: { index: number; solution: (typeof solutions)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-46% 0px -46% 0px" });
  // Reduced motion means relying on scroll-linked inView would leave most
  // rows permanently dim, so force them all "active" instead. Read via
  // useSyncExternalStore (see the hook) so the server/first-client-render
  // value is always a deterministic `false` — no hydration mismatch.
  const reduceMotion = usePrefersReducedMotion();
  const active = reduceMotion || inView;

  return (
    <Link
      ref={ref}
      href={solution.href}
      className="group relative flex flex-col gap-2 border-b border-white/10 py-7 sm:flex-row sm:items-center sm:gap-8 sm:py-9"
    >
      <span
        className="font-display text-sm font-semibold tabular-nums transition-colors duration-300"
        style={{ color: active ? "#17c3d6" : "rgba(255,255,255,0.3)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.h3
        animate={{ opacity: active ? 1 : 0.32, scale: active ? 1 : 0.97 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {solution.title}
      </motion.h3>

      <motion.span
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : -8 }}
        transition={{ duration: 0.35 }}
        className="hidden items-center gap-2 text-sm font-medium text-cyan sm:ml-auto sm:flex"
      >
        {solution.tagline}
        <Icon name="arrow-up-right" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.span>
    </Link>
  );
}

export function SolutionsSpotlight() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" />
      <StemAmbient dark />
      <div className="pointer-events-none absolute right-[8%] top-10 hidden h-20 w-24 lg:block">
        <AnimatedRobot />
      </div>
      <Container className="relative">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan">
            Our Solutions
          </span>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl">
            <GradientLastWord text="Every Program, One Partner" />
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-white/10">
          {solutions.map((solution, i) => (
            <SpotlightRow key={solution.title} index={i} solution={solution} />
          ))}
        </div>
      </Container>
    </section>
  );
}
