"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide buttery inertia scrolling (the same technique — the Lenis
 * library — behind the smooth, weighted scroll feel on reference sites like
 * studioloop.com.br). Mounted once in the root layout; renders nothing of
 * its own, it just drives the existing page's native scroll with easing.
 *
 * Skipped entirely under `prefers-reduced-motion` — inertia/momentum scroll
 * is exactly the kind of motion that preference asks sites to avoid, and
 * native instant scrolling is the correct fallback here (not a frozen
 * animation frame, unlike the CSS-keyframe components elsewhere on this
 * site).
 *
 * ROOT CAUSE OF THE "scroll stops working after navigating, needs a
 * reload" bug: Lenis caches the page's scrollable height itself (via its
 * own resize observer) rather than re-measuring on every frame. Next.js's
 * App Router does client-side navigation — the DOM content is swapped in
 * place, the URL changes, but nothing forces Lenis to re-measure. If the
 * new page is a different height than the one Lenis last measured, its
 * internal scroll bounds stay stale: it can end up thinking the page is
 * already fully scrolled (or far shorter than it is), silently clamping
 * every subsequent wheel/touch delta to zero movement. A full reload
 * "fixes" it only because it re-initializes Lenis from scratch against the
 * freshly-loaded page. The real fix is to explicitly tell the SAME Lenis
 * instance to re-measure and resync its position on every route change —
 * that's what the `pathname`-keyed effect below does.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // General safety net beyond route changes: late-loading images, web
    // fonts swapping in, an accordion expanding — anything that changes
    // document height should trigger a re-measure, not just navigation.
    let resizeFrame: number;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => lenis.resize());
    });
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Re-measure and snap to the top of the new page on every route change —
  // see the root-cause note above. `resize()` re-reads the new page's actual
  // scroll height; `scrollTo(0, { immediate: true })` re-syncs Lenis's
  // internal position with the top-of-page position Next.js's own router
  // already jumped the real `window.scrollY` to (that native jump happens
  // outside Lenis's control, which is exactly what causes the desync).
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.resize();
    lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
