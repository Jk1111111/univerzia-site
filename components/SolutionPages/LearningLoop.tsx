"use client";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "clsx";

const STAGES = [
  { label: "Discover", icon: "search", color: "#17c3d6", detail: "Mechanical assembly, gears, motors and how a physical structure holds together." },
  { label: "Build", icon: "hammer", color: "#3457ff", detail: "Assemble the kit into a working chassis — the first physical checkpoint." },
  { label: "Code", icon: "code-2", color: "#8b5cf6", detail: "Block and text-based programming to give the machine real behavior." },
  { label: "Test", icon: "scan-eye", color: "#f5a524", detail: "Systematic debugging — isolating a failure as mechanical, electrical or logical." },
  { label: "Solve", icon: "trophy", color: "#1fb178", detail: "An open-ended build solving a problem the student chose themselves." },
] as const;

/**
 * The real curriculum progression (Foundation → Application → Independent
 * Design, from data/solutionsDetail) re-told as a 5-step loop matching the
 * finer-grained skills already listed under whatStudentsLearn/whatStudentsBuild
 * — not an invented taxonomy. A connected path, not five identical cards:
 * each stage reveals in sequence as it scrolls into view, and a small pulse
 * travels the connecting line to suggest one continuous progression.
 */
export function LearningLoop() {
  const pathD = "M 40 40 L 760 40";

  return (
    <div className="relative">
      {/* mobile: vertical connector */}
      <div className="absolute bottom-8 left-6 top-8 w-px bg-line lg:hidden" />

      {/* desktop: horizontal connector with a traveling pulse */}
      <svg viewBox="0 0 800 80" className="absolute inset-x-0 top-10 hidden w-full lg:block" preserveAspectRatio="none" aria-hidden="true">
        <path d={pathD} stroke="#e6e8f2" strokeWidth="2" fill="none" />
        <circle r="5" fill="#3457ff" style={{ offsetPath: `path('${pathD}')` }} className="pf-travel" />
      </svg>

      <div className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
        {STAGES.map((stage, i) => (
          <Reveal key={stage.label} delay={i * 0.1} direction="up" className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
            <span
              className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-lift lg:size-16"
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
            <div className={clsx("lg:mt-2")}>
              <h3 className="text-base font-bold text-ink">{stage.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted lg:mt-2">{stage.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
