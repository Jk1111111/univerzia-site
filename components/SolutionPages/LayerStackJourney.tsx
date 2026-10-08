"use client";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const LAYERS = [
  { tag: "EXPLORE", icon: "glasses", color: "#d946ef", text: "3D spatial reasoning — building a sense of scale a flat diagram can't teach." },
  { tag: "NAVIGATE", icon: "scan-eye", color: "#8b5cf6", text: "Basic AR content interaction: walking around, into and through a simulation." },
  { tag: "ANNOTATE", icon: "pencil-ruler", color: "#6366f1", text: "Independent exploration — students navigate and label a simulation themselves." },
  { tag: "CREATE", icon: "puzzle", color: "#f5a524", text: "For senior students: placing and annotating their own simple AR scenes." },
] as const;

/**
 * The learning journey as physical depth — each stage a layer peeling
 * slightly further back, matching the hero's own "digital layers" idea —
 * instead of a terminal (AI), a live dashboard (IoT) or a connected path
 * (Robotics).
 */
export function LayerStackJourney() {
  return (
    <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
      {LAYERS.map((layer, i) => (
        <Reveal key={layer.tag} delay={i * 0.12} direction="up">
          <div
            className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
            style={{ borderColor: `${layer.color}30` }}
          >
            <span className="absolute right-4 top-4 font-mono text-2xl font-bold opacity-10" style={{ color: layer.color }}>
              0{i + 1}
            </span>
            <span className="flex size-11 items-center justify-center rounded-xl" style={{ background: `${layer.color}18`, color: layer.color }}>
              <Icon name={layer.icon} className="size-5" />
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider" style={{ color: layer.color }}>
              {layer.tag}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{layer.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
