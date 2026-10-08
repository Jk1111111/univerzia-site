"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { media } from "@/data/media";
import { clsx } from "clsx";

const AREAS = [
  {
    key: "robotics",
    label: "Robotics",
    icon: "bot",
    href: "/solutions/stem-robotics",
    color: "#3457ff",
    image: media.kidsCoding[0],
    detail: "Physical machines students wire, assemble and debug — the mechanical entry point into engineering.",
  },
  {
    key: "ai",
    label: "AI & Coding",
    icon: "brain",
    href: "/solutions/ai-coding",
    color: "#8b5cf6",
    image: media.kidsCoding[1],
    detail: "From block logic to real code, training models that recognize what they see.",
  },
  {
    key: "iot",
    label: "IoT",
    icon: "radio-tower",
    href: "/solutions/iot",
    color: "#17c3d6",
    image: media.scienceLab[3],
    detail: "Sensors talking to a gateway, a live dashboard, devices that respond automatically.",
  },
  {
    key: "arvr",
    label: "AR / VR",
    icon: "glasses",
    href: "/solutions/ar-vr",
    color: "#d946ef",
    image: media.scienceLab[1],
    detail: "Scanning real objects into explorable 3D space — depth and scale you can walk through.",
  },
] as const;

/**
 * The gateway into the four technology areas — an expanding-panel selector
 * driven by hover/focus (mouse interaction, not scroll), so a visitor can
 * feel the difference between Robotics/AI/IoT/AR-VR by exploring rather
 * than reading four identical cards. Deliberately the one piece on this
 * page that's interaction-first rather than scroll-driven, for variety
 * against the rest of the site's pinned sequences.
 */
export function TechGateway() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* mobile: a simple stacked list, tap to go straight to the page —
          the hover-expand interaction below has no equivalent on touch */}
      <div className="grid gap-4 sm:hidden">
        {AREAS.map((area) => (
          <Link
            key={area.key}
            href={area.href}
            className="group relative flex h-40 items-end overflow-hidden rounded-2xl p-5"
          >
            <Image src={area.image} alt={area.label} fill sizes="90vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl text-white" style={{ background: area.color }}>
                <Icon name={area.icon} className="size-4.5" />
              </span>
              <span className="text-lg font-bold text-white">{area.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden h-[26rem] w-full gap-3 sm:flex sm:h-[30rem]">
      {AREAS.map((area, i) => {
        const isActive = i === active;
        return (
          <Link
            key={area.key}
            href={area.href}
            data-cursor="view"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={clsx(
              "group relative flex overflow-hidden rounded-[1.75rem] border border-white/10 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isActive ? "grow-[6]" : "grow"
            )}
            style={{ flexBasis: 0 }}
          >
            <Image src={area.image} alt={area.label} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(0deg, ${area.color}dd 0%, ${area.color}55 40%, rgba(5,9,20,0.55) 100%)`,
                opacity: isActive ? 0.9 : 0.75,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

            {/* collapsed label — vertical text down the strip */}
            <div
              className={clsx(
                "absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-300",
                isActive ? "opacity-0" : "opacity-100"
              )}
            >
              <span className="rotate-180 text-sm font-bold uppercase tracking-[0.3em] text-white [writing-mode:vertical-rl]">
                {area.label}
              </span>
            </div>

            {/* expanded content */}
            <motion.div
              className="relative z-10 flex flex-1 flex-col justify-end p-6 sm:p-8"
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <Icon name={area.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{area.label}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">{area.detail}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                Explore
                <Icon name="arrow-right" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </motion.div>
          </Link>
        );
      })}
      </div>
    </>
  );
}
