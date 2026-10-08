"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";

// Ordered as the real signal actually flows through the machine — perceive,
// process, decide, act, then the whole loop closes — not alphabetically or
// arbitrarily. Motors (an output) come after Programming/AI (the decision),
// never right after Sensors.
const NODES = [
  { label: "Sensors", icon: "radio-tower", color: "#17c3d6", detail: "Ultrasonic, IR and light sensors let the machine perceive its surroundings before it acts." },
  { label: "Controllers", icon: "cpu", color: "#8b5cf6", detail: "A microcontroller board reads every sensor and drives every motor, in real time." },
  { label: "Programming", icon: "code-2", color: "#f5a524", detail: "Block-based logic for younger grades, real text-based code as students advance." },
  { label: "AI", icon: "brain", color: "#ff7a45", detail: "Simple trained models let a robot recognize objects instead of just reacting to thresholds." },
  { label: "Motors", icon: "settings", color: "#3457ff", detail: "DC and servo motors turn a program's decision into real, physical movement." },
  { label: "Automation", icon: "zap", color: "#1fb178", detail: "Sensors, code and motors combine into one closed loop that runs without a human step." },
] as const;

const ANGLES = [-90, -30, 30, 90, 150, 210];

/**
 * "Capabilities" as one technical system diagram — a hub with six real
 * subsystems wired to it — instead of six identical icon cards. Selecting a
 * node is the interaction: the diagram is the content, not decoration next
 * to it.
 */
export function CapabilitiesDiagram() {
  const [active, setActive] = useState(0);
  const node = NODES[active];

  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div className="relative mx-auto aspect-square w-full max-w-lg select-none">
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full opacity-70 blur-2xl transition-colors duration-300"
          style={{ background: `radial-gradient(circle, ${node.color}22 0%, transparent 70%)` }}
        />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {NODES.map((n, i) => {
            const rad = (ANGLES[i] * Math.PI) / 180;
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);
            return (
              <line
                key={n.label}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={i === active ? n.color : "#e6e8f2"}
                strokeWidth={i === active ? 1.4 : 1}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* hub */}
        <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-white text-center shadow-lift">
          <span style={{ color: node.color }}>
            <Icon name="bot" className="size-6" />
          </span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-wide text-ink">{node.label}</span>
        </div>

        {NODES.map((n, i) => {
          const rad = (ANGLES[i] * Math.PI) / 180;
          const x = 50 + 38 * Math.cos(rad);
          const y = 50 + 38 * Math.sin(rad);
          return (
            <button
              key={n.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className="absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-2 bg-white shadow-soft transition-all duration-300 hover:-translate-y-[calc(50%+2px)]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                borderColor: i === active ? n.color : "transparent",
                color: n.color,
                transform: `translate(-50%, -50%) scale(${i === active ? 1.12 : 1})`,
              }}
            >
              <Icon name={n.icon} className="size-5" />
            </button>
          );
        })}
      </div>

      <motion.div key={node.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <span
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider"
          style={{ background: `${node.color}18`, color: node.color }}
        >
          <Icon name={node.icon} className="size-3.5" />
          {node.label}
        </span>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink">{node.detail}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {NODES.map((n, i) => (
            <button
              key={n.label}
              type="button"
              onClick={() => setActive(i)}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                i === active ? "border-transparent text-white" : "border-line text-muted hover:border-ink/30"
              )}
              style={i === active ? { background: n.color } : undefined}
            >
              {n.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
