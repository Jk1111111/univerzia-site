"use client";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const ROWS = [
  { tag: "SENSING", icon: "radio-tower", color: "#f5a524", text: "Wiring individual sensors, reading raw values, working with simple thresholds." },
  { tag: "TRANSMIT", icon: "cloud-sun", color: "#17c3d6", text: "Sending live data from a physical device to a cloud dashboard." },
  { tag: "VISUALIZE", icon: "bar-chart-3", color: "#3457ff", text: "Reading and interpreting real data trends, not just single numbers." },
  { tag: "AUTOMATE", icon: "zap", color: "#1fb178", text: "Programming a conditional response — if soil moisture is low, turn on the pump." },
  { tag: "DEPLOY", icon: "package-check", color: "#8b5cf6", text: "A connected-device capstone addressing a real school or community need." },
] as const;

/**
 * The learning journey framed as a live monitoring dashboard, not a
 * terminal (AI's aesthetic) or a connected icon path (Robotics'). Each row
 * "comes online" in sequence, matching how a real IoT dashboard would fill
 * in as devices connect.
 */
export function DashboardLearningFeed() {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
      <div className="flex items-center justify-between border-b border-line bg-[#0a1330] px-5 py-3.5">
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/70">
          <Icon name="radio-tower" className="size-3.5 text-cyan" />
          Live Classroom Dashboard
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-teal-300" style={{ color: "#5eead4" }}>
          <span className="size-1.5 animate-pulse-soft rounded-full bg-current" />
          Online
        </span>
      </div>
      <div className="divide-y divide-line">
        {ROWS.map((row, i) => (
          <Reveal key={row.tag} delay={i * 0.1} direction="up">
            <div className="flex items-center gap-4 px-5 py-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `${row.color}18`, color: row.color }}>
                <Icon name={row.icon} className="size-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: row.color }}>
                  {row.tag}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink/80">{row.text}</p>
              </div>
              <span className="ml-auto size-2 shrink-0 animate-pulse-soft rounded-full" style={{ background: row.color, animationDelay: `${i * 0.2}s` }} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
