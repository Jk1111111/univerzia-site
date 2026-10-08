"use client";

import { useId } from "react";
import Link from "next/link";
import { Icon } from "./Icon";

/**
 * A constantly-spinning circular text badge (repeated label around a ring,
 * a static icon pinned in the center) — the small signature UI detail that
 * makes a hero feel designed rather than templated. Spins on a CSS loop,
 * completely independent of scroll position.
 */
export function RotatingBadge({
  label,
  href,
  className,
  iconName = "arrow-up-right",
}: {
  label: string;
  href?: string;
  className?: string;
  iconName?: string;
}) {
  const id = useId();
  const pathId = `badge-ring-${id.replace(/[^a-zA-Z0-9]/g, "")}`;

  const content = (
    <span className="relative block h-full w-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow text-white">
        <defs>
          <path id={pathId} d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
        </defs>
        <text fill="currentColor" fontSize="7.6" letterSpacing="1.5" className="font-semibold uppercase">
          <textPath href={`#${pathId}`} startOffset="0%">
            {label} &nbsp;•&nbsp; {label} &nbsp;•&nbsp;
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-cyan text-navy shadow-lg">
          <Icon name={iconName} className="size-4" strokeWidth={2} />
        </span>
      </span>
    </span>
  );

  // `className` (passed by the call site) carries this badge's own
  // positioning within its parent (e.g. `absolute -bottom-7 -left-7
  // size-24`) — it must land on this outer element undiluted by any
  // position utility of ours, or the two `position` values collide.
  if (href) {
    return (
      <Link href={href} className={`group block ${className ?? ""}`} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      {content}
    </div>
  );
}
