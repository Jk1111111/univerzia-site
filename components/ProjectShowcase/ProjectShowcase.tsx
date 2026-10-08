"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { projects, projectFilters, type ProjectCategory } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { EduImage } from "@/components/ui/EduImage";
import { CircuitOverlay } from "@/components/ui/CircuitOverlay";
import { StemAmbient } from "@/components/ui/StemAmbient";

const accentMap = {
  electric: "from-electric to-electric-2",
  cyan: "from-cyan to-electric-2",
  violet: "from-violet to-electric",
  green: "from-green to-cyan",
  amber: "from-amber to-green",
  orange: "from-orange to-amber",
};

export function ProjectShowcase() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="showcase" className="relative overflow-hidden bg-paper-2 py-24 sm:py-28">
      <StemAmbient />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Student Showcase"
            title="A Portfolio Built By Students, Not Textbooks"
            description="Every project began as a classroom challenge. Here's a sample of what students design, wire and code once they're given the tools."
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                filter === f
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-muted hover:border-electric hover:text-electric"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={clsx(
                  "group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft",
                  i % 5 === 0 && "sm:col-span-2 sm:aspect-[16/10]"
                )}
              >
                <EduImage
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
                  fallback={
                    <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-95", accentMap[project.accent])}>
                      <div className="absolute inset-0 bg-dot-grid opacity-20" />
                      <CircuitOverlay color="#ffffff" nodeColor="#ffffff" opacity={0.3} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name={project.icon} className="size-28 animate-float-slow text-white/20" />
                      </div>
                    </div>
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur">
                  <Icon name={project.icon} className="size-5" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-white">{project.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/75 line-clamp-2 transition-all duration-300 group-hover:line-clamp-none">
                    {project.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-white/60">{project.gradeLevel}</span>
                    <span className="flex translate-y-2 items-center gap-1 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      View Project
                      <Icon name="arrow-right" className="size-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
