"use client";

import { Reveal } from "@/components/ui/Reveal";

const LINES = [
  { tag: "LOGIC", color: "#1fb178", text: "Sequencing, loops, conditionals and variables — through visual blocks first." },
  { tag: "SYNTAX", color: "#3457ff", text: "The transition to real Python: functions, data structures, no throwaway teaching language." },
  { tag: "TRAIN", color: "#8b5cf6", text: "Feed a model labeled data, test it, and see exactly where and why it fails." },
  { tag: "ETHICS", color: "#f5a524", text: "Bias, data quality and limitations — a required discussion, not an afterthought." },
  { tag: "CAPSTONE", color: "#17c3d6", text: "A real-world AI project applied to a problem the student chose themselves." },
] as const;

/**
 * The learning journey as a terminal log, not icon badges on a line — a
 * code-and-data aesthetic that belongs to THIS page, distinct from the
 * Robotics page's mechanical connected path. Each line "executes" in
 * sequence as it scrolls into view.
 */
export function TerminalLearningPath() {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-line bg-[#0a1330] shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-white/40">student@novastem — ai-coding-track</span>
      </div>
      <div className="space-y-3.5 p-6 font-mono text-sm">
        {LINES.map((line, i) => (
          <Reveal key={line.tag} delay={i * 0.12} direction="up">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-white/25">{`>`}</span>
              <span className="font-bold" style={{ color: line.color }}>
                [{line.tag}]
              </span>
              <span className="text-white/70">{line.text}</span>
            </div>
          </Reveal>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-white/25">{`>`}</span>
          <span className="h-4 w-2 animate-pulse-soft bg-cyan" />
        </div>
      </div>
    </div>
  );
}
