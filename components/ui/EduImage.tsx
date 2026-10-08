"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { clsx } from "clsx";

/**
 * Renders a real photo when one exists at `src`; falls back to a custom
 * illustration when the file is missing (e.g. before real campus photography
 * is dropped into /public/images). Drop a JPG at the given path — or swap the
 * URL in data/media.ts — and this component switches to it automatically.
 *
 * The probe runs as a plain client-side `Image()` load inside an effect
 * rather than an <img onError>, so the very first paint (server-rendered
 * HTML included) never emits a real <img src> that could 404 before React
 * hydrates and attaches a handler — that race would otherwise flash the
 * browser's native broken-image icon for every placeholder path.
 */
export function EduImage({
  src,
  alt,
  fallback,
  className,
  sizes = "100vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setResolved(true);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!src || !resolved) {
    return (
      <div className={clsx("relative overflow-hidden", className)} role="img" aria-label={alt}>
        {fallback}
      </div>
    );
  }

  // Deliberately NOT `data-cursor="view"` — this component is used in dozens
  // of non-clickable contexts (hero avatars, testimonial headshots, page
  // hero images), and the custom cursor's "View" label with no click behind
  // it read as broken, not subtle. Contexts where enlarging the photo
  // actually makes sense (WorkbenchScatter, PhotoJourney) use the
  // `Lightbox` component instead, which pairs that same cursor cue with a
  // real click-to-enlarge action.
  return (
    <div className={clsx("group/photo relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover/photo:scale-[1.06]"
      />
    </div>
  );
}
