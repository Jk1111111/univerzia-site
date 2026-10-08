"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets `--mx`/`--my` (each -1..1) as CSS custom properties on this wrapper,
 * tracking mouse position relative to its own bounds. Children read those
 * vars in a `translate(calc(var(--mx) * Npx), ...)` inline style to get a
 * cheap per-element parallax depth — no per-element listeners, one
 * requestAnimationFrame-throttled handler drives everything.
 *
 * Each parallax item should nest its OWN idle animation on an INNER element
 * rather than the one reading `--mx`/`--my`, since a CSS keyframe animating
 * `transform` would otherwise fully replace this JS-driven transform (they
 * both target the same property) — see ParallaxItem below, which does this
 * split automatically.
 *
 * Inert on touch devices and under `prefers-reduced-motion` (vars simply
 * stay at 0, so children render at their neutral resting position).
 */
export function ParallaxField({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarsePointer) return;

    let frame = 0;
    function handleMove(e: MouseEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const nx = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        const ny = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
        el.style.setProperty("--mx", nx.toFixed(3));
        el.style.setProperty("--my", ny.toFixed(3));
      });
    }
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--mx": 0, "--my": 0 } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function ParallaxItem({
  depth,
  className,
  style,
  children,
}: {
  depth: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        transform: `translate(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px))`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
