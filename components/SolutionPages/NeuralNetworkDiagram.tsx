"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { clsx } from "clsx";

const OUTPUTS = [
  { label: "Block Coding", icon: "puzzle", color: "#1fb178", detail: "Sequencing, loops, conditionals and events — the logic patterns every program is built from." },
  { label: "Python", icon: "code-2", color: "#3457ff", detail: "The same language used in industry — real syntax, functions and data structures." },
  { label: "Computer Vision", icon: "scan-eye", color: "#8b5cf6", detail: "Training a model to recognize and classify what it sees in an image, frame by frame." },
  { label: "Voice & NLP", icon: "ear", color: "#17c3d6", detail: "Models that work with speech and text instead of images — recognition, not just rules." },
  { label: "Model Training", icon: "brain", color: "#f5a524", detail: "Feeding labeled data through a network and watching accuracy improve — and fail — over epochs." },
  { label: "Responsible AI", icon: "shield-check", color: "#ff7a45", detail: "Bias, data quality and limitations — discussed in every module, not an afterthought." },
] as const;

const INPUT_Y = [80, 160, 240];
const HIDDEN_Y = [50, 115, 175, 240, 300];
const OUTPUT_Y = OUTPUTS.map((_, i) => 30 + i * 48);

/**
 * The AI capability map as an actual neural network — three layers, real
 * connections — instead of the Robotics page's hub-and-spoke. Selecting a
 * capability (an output node) lights up the specific path a signal would
 * take to reach it, the way a real network diagram reads.
 */
export function NeuralNetworkDiagram() {
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const node = OUTPUTS[active];

  // The network cycles through its own outputs on its own — a live
  // demonstration to watch, not an inert diagram waiting to be clicked.
  // Stops permanently the moment someone takes control themselves.
  useEffect(() => {
    if (reduceMotion || !autoPlay) return;
    const id = setInterval(() => setActive((a) => (a + 1) % OUTPUTS.length), 3200);
    return () => clearInterval(id);
  }, [reduceMotion, autoPlay]);

  function select(i: number) {
    setActive(i);
    setAutoPlay(false);
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
      <div className="relative mx-auto w-full max-w-2xl select-none overflow-x-auto">
        <svg viewBox="0 0 460 330" className="h-auto w-full min-w-[420px]">
          {/* connections: dim by default, active output's path lit */}
          {INPUT_Y.flatMap((iy) =>
            HIDDEN_Y.map((hy, hi) => (
              <line key={`ih-${iy}-${hi}`} x1="40" y1={iy} x2="230" y2={hy} stroke="#e6e8f2" strokeWidth="1" />
            ))
          )}
          {HIDDEN_Y.flatMap((hy, hi) =>
            OUTPUT_Y.map((oy, oi) => (
              <line
                key={`ho-${hi}-${oi}`}
                x1="230"
                y1={hy}
                x2="420"
                y2={oy}
                stroke={oi === active ? node.color : "#e6e8f2"}
                strokeWidth={oi === active ? 1.4 : 1}
                opacity={oi === active ? 0.8 : 1}
                className="transition-all duration-300"
              />
            ))
          )}

          {INPUT_Y.map((y, i) => (
            <circle key={y} cx="40" cy={y} r="7" fill="#3457ff" className="animate-pulse-soft" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
          {HIDDEN_Y.map((y, i) => (
            <circle key={y} cx="230" cy={y} r="6" fill="#8b5cf6" className="animate-pulse-soft" style={{ animationDelay: `${0.3 + i * 0.2}s` }} />
          ))}
          {OUTPUTS.map((o, i) => (
            <g key={o.label} className="cursor-pointer" onClick={() => select(i)}>
              <circle
                cx="420"
                cy={OUTPUT_Y[i]}
                r={i === active ? 11 : 8}
                fill={i === active ? o.color : "#f3f4fb"}
                stroke={o.color}
                strokeWidth={i === active ? 0 : 1.4}
                className="transition-all duration-300"
              />
            </g>
          ))}
        </svg>
      </div>

      <div>
        <motion.div key={node.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider"
            style={{ background: `${node.color}18`, color: node.color }}
          >
            <Icon name={node.icon} className="size-3.5" />
            {node.label}
          </span>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink">{node.detail}</p>
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-2">
          {OUTPUTS.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => select(i)}
              aria-pressed={i === active}
              className={clsx(
                "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                i === active ? "border-transparent text-white" : "border-line text-muted hover:border-ink/30"
              )}
              style={i === active ? { background: o.color } : undefined}
            >
              <Icon name={o.icon} className="size-3.5" />
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
