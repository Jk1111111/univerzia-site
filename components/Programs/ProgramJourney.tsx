"use client";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const STAGES = [
  { label: "Discover", icon: "search", color: "#17c3d6" },
  { label: "Build", icon: "hammer", color: "#3457ff" },
  { label: "Code", icon: "code-2", color: "#8b5cf6" },
  { label: "Test", icon: "scan-eye", color: "#f5a524" },
  { label: "Solve", icon: "puzzle", color: "#1fb178" },
  { label: "Innovate", icon: "rocket", color: "#ff7a45" },
] as const;

/**
 * The one loop every Univerzia program repeats at increasing depth — shown
 * as a real connected journey (six stages, each its own color and icon,
 * a pulse traveling the whole path) instead of a flat row of text pills.
 */
export function ProgramJourney() {
  const pathD = "M 30 40 L 770 40";

  return (
    <div className="relative">
      <div className="absolute bottom-8 left-6 top-8 w-px bg-line sm:hidden" />
      <svg viewBox="0 0 800 80" className="absolute inset-x-0 top-9 hidden w-full sm:block" preserveAspectRatio="none" aria-hidden="true">
        <path d={pathD} stroke="#e6e8f2" strokeWidth="2" fill="none" />
        <circle r="5" fill="#3457ff" style={{ offsetPath: `path('${pathD}')` }} className="pf-travel" />
      </svg>

      <div className="relative grid gap-8 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
        {STAGES.map((stage, i) => (
          <Reveal key={stage.label} delay={i * 0.08} direction="up" className="relative flex items-center gap-4 sm:flex-col sm:items-center sm:text-center">
            <span
              className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-lift"
              style={{ color: stage.color }}
            >
              <Icon name={stage.icon} className="size-6" />
              <span
                className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: stage.color }}
              >
                {i + 1}
              </span>
            </span>
            <h3 className="text-sm font-bold text-ink sm:mt-2">{stage.label}</h3>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
