"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";

const SUBJECTS = [
  { label: "Biology", icon: "brain", color: "#d946ef", x: 30, y: 28, size: 46, detail: "Walk through a human circulatory system at a scale no diagram can show." },
  { label: "Astronomy", icon: "cloud-sun", color: "#6366f1", x: 72, y: 22, size: 38, detail: "Explore planetary orbits and true relative scale, from orbit to surface." },
  { label: "Chemistry", icon: "atom", color: "#8b5cf6", x: 78, y: 68, size: 34, detail: "Manipulate a 3D molecule by hand instead of reading its structure off a page." },
  { label: "Physics", icon: "zap", color: "#f5a524", x: 24, y: 72, size: 30, detail: "See forces, fields and motion as spatial, moving things — not static arrows." },
] as const;

/**
 * The AR/VR "capability visualization" — hotspots scattered around a
 * central 3D object at different depths (size/opacity stand in for near vs
 * far), not a hub-and-spoke and not a network. Selecting one brings it
 * forward, the way focusing on an object in a real spatial scene would.
 */
export function SpatialObjectMap() {
  const [active, setActive] = useState(0);
  const subject = SUBJECTS[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      <div className="relative mx-auto aspect-square w-full max-w-md select-none">
        {/* central wireframe object — the "model" everything orbits */}
        <motion.div
          key={subject.label}
          className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2"
          style={{ borderColor: subject.color }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-2 rounded-full border border-dashed" style={{ borderColor: `${subject.color}80` }} />
          <div className="absolute inset-5 rounded-full border border-dashed" style={{ borderColor: `${subject.color}50` }} />
        </motion.div>
        <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full" style={{ color: subject.color }}>
          <Icon name={subject.icon} className="size-7" />
        </div>

        {SUBJECTS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white shadow-soft transition-all duration-500"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: i === active ? s.size * 1.25 : s.size,
              height: i === active ? s.size * 1.25 : s.size,
              borderColor: i === active ? s.color : "transparent",
              opacity: i === active ? 1 : 0.55,
              color: s.color,
            }}
          >
            <Icon name={s.icon} className="size-1/2" />
          </button>
        ))}
      </div>

      <div>
        <motion.div key={subject.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider"
            style={{ background: `${subject.color}18`, color: subject.color }}
          >
            <Icon name={subject.icon} className="size-3.5" />
            {subject.label}
          </span>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink">{subject.detail}</p>
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-2">
          {SUBJECTS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              className={clsx(
                "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                i === active ? "border-transparent text-white" : "border-line text-muted hover:border-ink/30"
              )}
              style={i === active ? { background: s.color } : undefined}
            >
              <Icon name={s.icon} className="size-3.5" />
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
