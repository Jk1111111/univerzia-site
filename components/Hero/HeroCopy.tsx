"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { hero } from "@/data/hero";
import { media } from "@/data/media";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CyclingWord } from "./CyclingWord";

export const programStrip = [
  { label: "STEM Lab", image: media.scienceLab[2], alt: "Indian students in a STEM lab session" },
  { label: "Robotics", image: media.kidsCoding[0], alt: "Indian students building a robotics project" },
  { label: "AI & Coding", image: media.kidsCoding[1], alt: "Indian student working on a coding exercise" },
  { label: "IoT Lab", image: media.scienceLab[3], alt: "Indian students studying a connected-device project" },
  { label: "AR / VR", image: media.teacherTraining[1], alt: "Indian students in school uniforms in a classroom" },
];

/**
 * A staged entrance for the hero copy: each block settles into place one
 * after another on mount (via `staggerChildren` — this is `initial`/
 * `animate`, not the site's usual scroll-triggered `Reveal`, since the hero
 * is already on screen at load with nothing to scroll into view). This is
 * the piece the homepage was missing: reference sites like Studio Loop don't
 * animate their hero on scroll or hover, their composition visibly settles
 * into place the moment the page loads. The avatar strip gets its own
 * nested stagger so those circles pop in one at a time, the same beat their
 * own hero's keychain cluster uses.
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const avatarItem: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
};

export function HeroCopy() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.span
        variants={item}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan backdrop-blur"
      >
        <Icon name="sparkles" className="size-3.5" />
        {hero.eyebrow}
      </motion.span>

      <motion.h1 variants={item} className="mt-8 font-display leading-[0.98] text-white">
        <span className="block text-2xl font-medium text-white/55 sm:text-3xl">Where classrooms</span>
        <span className="text-gradient -mt-1 block text-7xl font-bold uppercase tracking-tight sm:text-8xl lg:text-[6.5rem]">
          <CyclingWord words={hero.words} />
        </span>
        <span className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="inline-block -rotate-2 font-serif text-3xl italic text-cyan sm:text-4xl">the future,</span>
          <span className="text-2xl font-medium text-white/55 sm:text-3xl">one robot at a time.</span>
        </span>
      </motion.h1>

      <motion.p variants={item} className="mt-8 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
        {hero.subheadline}
      </motion.p>

      <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
        <Button href={hero.primaryCta.href} size="lg" variant="light">
          {hero.primaryCta.label}
        </Button>
        <Button href={hero.secondaryCta.href} variant="ghost" size="lg" showIcon={false} className="text-white hover:text-cyan">
          {hero.secondaryCta.label}
        </Button>
      </motion.div>

      <motion.div variants={item} className="mt-9 flex flex-wrap gap-x-6 gap-y-4">
        {programStrip.map((prog) => (
          <motion.div key={prog.label} variants={avatarItem} className="flex flex-col items-center gap-2">
            <div className="relative size-14 overflow-hidden rounded-full border-2 border-white/20 sm:size-16">
              <Image src={prog.image} alt={prog.alt} fill sizes="64px" className="object-cover" />
            </div>
            <span className="text-[11px] font-medium text-white/50">{prog.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
