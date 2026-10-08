"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { media } from "@/data/media";

/**
 * AR/VR's equivalent of the other three solution pages' pinned sequences:
 * a real photo gets scanned, then visibly separates into depth layers (the
 * spatial idea AR/VR is actually about), a wireframe object materializes in
 * front of it, then a second real photo proves a student actually did this.
 * Same one-`scrollYProgress`-drives-everything technique, this page's own
 * visual subject: depth and scanning, not mechanics, data or signals.
 */
export function SpatialScan() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const photoOpacity = useTransform(p, [0, 0.08], [0, 1]);
  const scanY = useTransform(p, [0.06, 0.32], ["0%", "100%"]);
  const scanOpacity = useTransform(p, [0.06, 0.1, 0.28, 0.32], [0, 1, 1, 0]);

  const layerBackY = useTransform(p, [0.3, 0.5], [0, -18]);
  const layerBackScale = useTransform(p, [0.3, 0.5], [1, 0.92]);
  const layerMidY = useTransform(p, [0.32, 0.52], [0, 10]);
  const layerFrontY = useTransform(p, [0.34, 0.54], [0, 34]);
  const layerFrontScale = useTransform(p, [0.34, 0.54], [1, 1.06]);
  const layersLabelOpacity = useTransform(p, [0.42, 0.52], [0, 1]);

  const wireOpacity = useTransform(p, [0.56, 0.68], [0, 1]);
  const wireRotate = useTransform(p, [0.56, 1], [0, 220]);
  const wireScale = useTransform(p, [0.56, 0.68], [0.5, 1]);

  const proofOpacity = useTransform(p, [0.82, 0.92], [0, 1]);
  const proofScale = useTransform(p, [0.82, 1], [0.92, 1]);
  const progressScaleX = p;

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden bg-[#0c0a1f] py-24 text-center sm:py-28">
        <p className="mx-auto max-w-md text-white/60">
          A real object is scanned, separated into depth layers and rebuilt as an explorable 3D model — the same
          process running behind every AR/VR session.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-[#0c0a1f]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(217,70,239,0.14),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />

        <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_1fr]">
          <div className="relative mx-auto aspect-[4/3.2] w-full max-w-lg" style={{ perspective: 900 }}>
            <span className="absolute -top-10 left-0 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-fuchsia-300 backdrop-blur">
              Scroll to Explore
            </span>

            {/* base photo, scanned then separated into three depth layers */}
            <motion.div style={{ opacity: photoOpacity, y: layerBackY, scale: layerBackScale }} className="absolute inset-0 overflow-hidden rounded-[2rem] border-2 border-white/10 shadow-lift">
              <Image src={media.scienceLab[1]} alt="Students in an immersive AR/VR learning session" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
              <motion.div className="absolute inset-x-0 h-16 bg-gradient-to-b from-fuchsia-400/0 via-fuchsia-300/50 to-fuchsia-400/0" style={{ top: scanY, opacity: scanOpacity }} />
            </motion.div>

            <motion.div style={{ y: layerMidY, opacity: layersLabelOpacity }} className="absolute inset-4 rounded-[1.6rem] border border-white/20 bg-white/5 backdrop-blur-sm" />

            <motion.div style={{ y: layerFrontY, scale: layerFrontScale, opacity: layersLabelOpacity }} className="absolute inset-x-8 bottom-6 rounded-2xl border border-fuchsia-300/40 bg-[#0c0a1f]/80 p-3 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-wide text-fuchsia-300">Depth Layers Separated</p>
              <p className="mt-0.5 text-[11px] text-white/60">Foreground · Midground · Background</p>
            </motion.div>

            {/* wireframe 3D object materializing in front of everything */}
            <motion.div
              className="pointer-events-none absolute -right-6 -top-6 flex size-24 items-center justify-center rounded-full border-2 border-fuchsia-300 sm:size-32"
              style={{ opacity: wireOpacity, rotate: wireRotate, scale: wireScale }}
            >
              <div className="absolute inset-3 rounded-full border border-dashed border-fuchsia-300/60" />
              <div className="absolute inset-7 rounded-full border border-dashed border-fuchsia-300/40" />
            </motion.div>
          </div>

          {/* real photo proof: a student actually doing this */}
          <motion.div style={{ opacity: proofOpacity, scale: proofScale }} className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] border-2 border-white/10 shadow-lift">
            <Image src={media.teacherTraining[1]} alt="A student exploring a 3D model during an AR/VR session" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
              Explored In 3D
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-40 max-w-[70vw] overflow-hidden bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-violet-400" style={{ scaleX: progressScaleX, transformOrigin: "left" }} />
        </div>
      </div>
    </section>
  );
}
