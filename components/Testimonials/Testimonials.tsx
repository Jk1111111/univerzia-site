"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { EduImage } from "@/components/ui/EduImage";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "clsx";

const audienceAccent: Record<string, string> = {
  Principal: "from-electric to-electric-2",
  Teacher: "from-violet to-electric",
  Parent: "from-orange to-amber",
};

// A fixed tilt/lift per card position — a hand-of-cards fan (Studio Loop's
// overlapping-photo-deck trick) instead of a one-at-a-time slideshow. Every
// card is visible and readable at rest; hovering or focusing one straightens
// and lifts it above its neighbors.
const layout = [
  { rotate: -7, y: 10 },
  { rotate: 4, y: -14 },
  { rotate: -3, y: 6 },
  { rotate: 6, y: -10 },
  { rotate: -5, y: 12 },
  { rotate: 3, y: -6 },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <StemAmbient />
      <Container className="relative">
        <SectionHeading
          eyebrow="Voices From Our Schools"
          title="What Principals, Teachers and Parents Are Saying"
          align="center"
        />

        {/* mobile: a horizontal scroll-snap strip, flat and legible */}
        <div className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:hidden">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative w-72 shrink-0 snap-center rounded-2xl border border-line bg-paper-2 p-6 shadow-soft"
            >
              <TestimonialCardContent t={t} />
            </div>
          ))}
        </div>

        {/* desktop: the fanned deck — overlapping, tilted, one accent detail */}
        <Reveal className="mt-16 hidden lg:block">
          <div className="mx-auto flex max-w-6xl justify-center">
            {testimonials.map((t, i) => {
              const { rotate, y } = layout[i % layout.length];
              return (
                <motion.div
                  key={t.name}
                  tabIndex={0}
                  className={clsx(
                    "group relative w-64 shrink-0 rounded-2xl border border-line bg-white p-6 shadow-lift outline-none",
                    i > 0 && "-ml-14 xl:-ml-16"
                  )}
                  style={{ zIndex: i }}
                  initial={{ opacity: 0, y: y + 24, rotate }}
                  whileInView={{ opacity: 1, y, rotate }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -18, rotate: 0, scale: 1.06, zIndex: 20, transition: { duration: 0.25 } }}
                  whileFocus={{ y: -18, rotate: 0, scale: 1.06, zIndex: 20, transition: { duration: 0.25 } }}
                >
                  {i === 0 && (
                    <>
                      <span className="absolute -left-2 -top-2 size-2 rounded-full bg-cyan" />
                      <span className="absolute -top-3 left-6 size-1.5 rounded-full bg-violet" />
                      <span className="absolute -right-3 top-8 size-1.5 rounded-full bg-electric" />
                    </>
                  )}
                  <TestimonialCardContent t={t} />
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function TestimonialCardContent({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <>
      <Icon name="quote" className="pointer-events-none absolute -right-2 -top-2 size-14 text-ink/[0.05]" strokeWidth={1} />
      <div className="flex items-center gap-3">
        <div className={clsx("relative size-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br shadow-soft", audienceAccent[t.audience])}>
          <EduImage
            src={t.photo}
            alt={t.name}
            sizes="48px"
            className="h-full w-full"
            fallback={
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
            }
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{t.name}</p>
          <p className="text-xs text-muted">{t.role}</p>
        </div>
      </div>
      <p className="relative mt-4 line-clamp-5 text-sm leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</p>
      <span className="mt-4 inline-block rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
        {t.school}
      </span>
    </>
  );
}
