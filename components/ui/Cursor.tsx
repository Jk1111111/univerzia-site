"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const COARSE_QUERY = "(pointer: coarse)";

function subscribeCoarsePointer(callback: () => void) {
  const mql = window.matchMedia(COARSE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getCoarsePointerSnapshot() {
  return window.matchMedia(COARSE_QUERY).matches;
}

function getCoarsePointerServerSnapshot() {
  return false;
}

/** Mirrors usePrefersReducedMotion's useSyncExternalStore pattern so pointer
 * capability is read as a synced external value rather than pushed into
 * state from inside an effect (avoids a cascading-render lint violation and
 * a hydration-mismatch window). */
function useCoarsePointer() {
  return useSyncExternalStore(subscribeCoarsePointer, getCoarsePointerSnapshot, getCoarsePointerServerSnapshot);
}

type CursorMode = "default" | "hover" | "view" | "drag" | "text" | "hidden";

const MODE_LABEL: Partial<Record<CursorMode, string>> = {
  view: "View",
  drag: "Drag",
};

function resolveMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "default";
  if (target.closest("input, textarea, select, [contenteditable='true']")) return "text";
  const cursorEl = target.closest("[data-cursor]");
  if (cursorEl) {
    const v = cursorEl.getAttribute("data-cursor");
    if (v === "view" || v === "drag" || v === "hidden") return v;
  }
  if (target.closest("a, button, [role='button'], summary, label")) return "hover";
  return "default";
}

/**
 * Site-wide custom cursor: a tight dot plus a laggier ring, both blended via
 * `mix-blend-mode: exclusion` so a single fixed color reads correctly against
 * every section on the site (light or dark) without per-section theming.
 * Widens into a labeled pill over anything tagged `data-cursor="view"` (real
 * photography) or `"drag"` (horizontal-scroll strips), and gets entirely out
 * of the way — restoring the native caret — over text inputs.
 *
 * Mounted once in the root layout. Renders nothing (and never touches the
 * native cursor) on coarse/touch pointers or under `prefers-reduced-motion`:
 * cursor-follow is exactly the kind of motion those contexts should not get,
 * and a hidden native cursor with no replacement would strand those users.
 */
export function Cursor() {
  const reduceMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const enabled = !reduceMotion && !coarsePointer;
  const [mode, setMode] = useState<CursorMode>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.2 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-on");
    return () => document.documentElement.classList.remove("custom-cursor-on");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      cancelAnimationFrame(frame);
      const target = e.target;
      frame = requestAnimationFrame(() => setMode(resolveMode(target)));
    }
    function handleLeaveWindow() {
      x.set(-100);
      y.set(-100);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeaveWindow);
      cancelAnimationFrame(frame);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const label = MODE_LABEL[mode];
  const isHover = mode === "hover";
  const isLabelMode = mode === "view" || mode === "drag";
  const isHidden = mode === "text" || mode === "hidden";

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full bg-white mix-blend-exclusion"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 7,
          height: 7,
          opacity: isHidden || isLabelMode || isHover ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full border border-white bg-white/5 mix-blend-exclusion"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isLabelMode ? 76 : isHover ? 52 : 26,
          height: isLabelMode ? 76 : isHover ? 52 : 26,
          opacity: isHidden ? 0 : 1,
          transition:
            "width 0.28s cubic-bezier(0.22,1,0.36,1), height 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease",
        }}
      >
        {label && (
          <span className="select-none text-[10px] font-semibold uppercase tracking-wide text-white">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
