"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedRobot } from "./AnimatedRobot";

/**
 * Wraps AnimatedRobot with a subtle cursor-tracking "look" — the eyes and
 * head tilt a few degrees/pixels toward the mouse position within this
 * component's own bounding box. Clamped to a small range so it reads as
 * personality, not a puppet.
 *
 * Skipped entirely on touch devices (no meaningful cursor) and under
 * `prefers-reduced-motion` (this is exactly the kind of motion that
 * preference asks sites to avoid) — the robot just falls back to its
 * normal centered idle animation in both cases.
 */
export function HeroRobot({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarsePointer) return;

    let frame = 0;
    function handleMove(e: MouseEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const nx = clamp((e.clientX - cx) / (window.innerWidth / 2), -1, 1);
        const ny = clamp((e.clientY - cy) / (window.innerHeight / 2), -1, 1);
        setLook({ x: nx * 4, y: ny * 3 });
      });
    }
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <AnimatedRobot lookX={look.x} lookY={look.y} />
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
