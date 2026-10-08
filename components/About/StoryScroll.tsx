"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { media } from "@/data/media";

const PHOTOS = [media.scienceLab[1], media.teacherTraining[2], media.kidsCoding[4]];

/**
 * About's own mechanism: a sticky photo that stays in view while the
 * story's paragraphs scroll past it at normal reading pace — not another
 * scroll-jacked pinned sequence. Each paragraph fires `onViewportEnter`
 * when it crosses the vertical center band of the screen, swapping which
 * real photo sits in the sticky frame. Distinct from every full-viewport
 * `h-[Nvh]` piece elsewhere on the site: the visitor scrolls at their own
 * speed, the image just keeps pace with them.
 */
export function StoryScroll({ paragraphs }: { paragraphs: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-[4/3.6] overflow-hidden rounded-[2rem] shadow-lift">
          <AnimatePresence mode="sync">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={PHOTOS[active % PHOTOS.length]} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 flex gap-1.5">
            {paragraphs.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-24 py-4 sm:space-y-32">
        {paragraphs.map((p, i) => (
          <motion.p
            key={p}
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-xl leading-relaxed text-ink sm:text-2xl"
          >
            {p}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
