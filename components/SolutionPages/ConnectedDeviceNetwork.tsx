"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";

const DEVICES = [
  { label: "Temperature", icon: "cloud-sun", color: "#f5a524", angle: -90, detail: "Reads ambient temperature every few seconds and reports it the moment it crosses a threshold." },
  { label: "Soil Moisture", icon: "sprout", color: "#1fb178", angle: -30, detail: "The sensor behind the Smart Agriculture project — triggers irrigation automatically when soil runs dry." },
  { label: "Motion", icon: "scan-eye", color: "#8b5cf6", angle: 30, detail: "Detects movement for the School Safety System project, without ever storing an image." },
  { label: "Smart Valve", icon: "settings", color: "#17c3d6", angle: 90, detail: "An actuator, not a sensor — it's the device that actually DOES something when data says to." },
  { label: "Smart Light", icon: "lightbulb", color: "#3457ff", angle: 150, detail: "Changes state automatically based on a rule a student wrote, not a manual switch." },
  { label: "Noise Level", icon: "ear", color: "#ff7a45", detail: "Feeds the campus dashboard project, tracking classroom or corridor noise over the school day.", angleOverride: 210 },
] as const;

/**
 * IoT's "capability visualization" — a live network of devices talking to
 * one shared gateway, not a hub-and-spoke you inspect one spoke at a time
 * (Robotics) and not a layered network you trace a path through (AI). Every
 * connection carries a constantly-traveling data packet — the point here is
 * that these devices are ALWAYS communicating, not just when clicked.
 */
export function ConnectedDeviceNetwork() {
  const [active, setActive] = useState(0);
  const device = DEVICES[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      <div className="relative mx-auto aspect-square w-full max-w-md select-none">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {DEVICES.map((d, i) => {
            const angle = "angleOverride" in d ? d.angleOverride : d.angle;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 36 * Math.cos(rad);
            const y = 50 + 36 * Math.sin(rad);
            const pathId = `iot-path-${i}`;
            return (
              <g key={d.label}>
                <path id={pathId} d={`M 50 50 L ${x} ${y}`} fill="none" stroke={i === active ? d.color : "#dde3f0"} strokeWidth={i === active ? 1.2 : 0.8} />
                {/* a data packet always in motion — the "always communicating" cue */}
                <circle r="1.6" fill={d.color} opacity={i === active ? 1 : 0.55}>
                  <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={`M 50 50 L ${x} ${y}`} keyPoints="0;1;0" keyTimes="0;0.5;1" />
                </circle>
              </g>
            );
          })}

          <circle cx="50" cy="50" r="10" fill="#0a1330" stroke="#134e4a" strokeWidth="1" />
          <text x="50" y="52.5" textAnchor="middle" fontFamily="monospace" fontSize="4.2" fill="#5eead4">
            HUB
          </text>

          {DEVICES.map((d, i) => {
            const angle = "angleOverride" in d ? d.angleOverride : d.angle;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 36 * Math.cos(rad);
            const y = 50 + 36 * Math.sin(rad);
            return (
              <foreignObject key={d.label} x={x - 8} y={y - 8} width="16" height="16" style={{ overflow: "visible" }}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className="flex size-full items-center justify-center rounded-full border-2 bg-white shadow-soft transition-transform duration-300"
                  style={{ borderColor: i === active ? d.color : "transparent", color: d.color, transform: i === active ? "scale(1.18)" : "scale(1)" }}
                >
                  <Icon name={d.icon} className="size-[55%]" />
                </button>
              </foreignObject>
            );
          })}
        </svg>
      </div>

      <div>
        <span
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider"
          style={{ background: `${device.color}18`, color: device.color }}
        >
          <Icon name={device.icon} className="size-3.5" />
          {device.label}
        </span>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink">{device.detail}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {DEVICES.map((d, i) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setActive(i)}
              className={clsx(
                "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                i === active ? "border-transparent text-white" : "border-line text-muted hover:border-ink/30"
              )}
              style={i === active ? { background: d.color } : undefined}
            >
              <Icon name={d.icon} className="size-3.5" />
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
