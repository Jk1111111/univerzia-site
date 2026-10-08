import type { Metadata } from "next";
import { media } from "@/data/media";
import { solutionsDetail } from "@/data/solutionsDetail";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Solutions } from "@/components/Solutions/Solutions";
import { TechGateway } from "@/components/Solutions/TechGateway";
import { ExplorerBot } from "@/components/ui/robots/ExplorerBot";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ScrollScaleIn } from "@/components/ui/ScrollScaleIn";
import { SectionWave } from "@/components/ui/SectionWave";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "STEM & Robotics, AI & Coding, IoT, AR/VR, Innovation Labs, Teacher Training and STEM Curriculum — explore Univerzia STEM Labs' complete range of school solutions.",
};

const whySolutions = [
  { title: "One coherent system, not scattered tools", description: "Every solution is designed to plug into the others — robotics feeds coding, coding feeds IoT, all mapped to one curriculum.", icon: "puzzle", accent: "#3457ff", tint: "bg-electric/10" },
  { title: "Built for real timetables", description: "Each track fits inside standard class periods and existing subject slots, not a separate bolt-on schedule.", icon: "calendar-check", accent: "#8b5cf6", tint: "bg-violet/10" },
  { title: "Teacher-first delivery", description: "No solution ships without a matching teacher-training pathway — technology alone doesn't teach itself.", icon: "graduation-cap", accent: "#17c3d6", tint: "bg-cyan/10" },
];

const connectAccent: Record<string, { text: string; border: string; bg: string }> = {
  electric: { text: "text-electric", border: "border-electric/25", bg: "bg-electric/5" },
  cyan: { text: "text-cyan-ink", border: "border-cyan/25", bg: "bg-cyan/5" },
  violet: { text: "text-violet-ink", border: "border-violet/25", bg: "bg-violet/5" },
  green: { text: "text-green-ink", border: "border-green/25", bg: "bg-green/5" },
  amber: { text: "text-amber-ink", border: "border-amber/25", bg: "bg-amber/5" },
  orange: { text: "text-orange-ink", border: "border-orange/25", bg: "bg-orange/5" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        eyebrow="Our Solutions"
        title="Every Piece of a Modern STEM Program, Under One Partnership."
        description="Seven connected solutions — from first robotics build to full AI curriculum — designed to work independently or as one complete school-wide program."
        primaryCta={{ label: "Book a Demo", href: "/contact" }}
        image={media.kidsCoding[3]}
        imageAlt="A student's hands using colorful coding blocks and robotics cubes"
      />

      <section className="relative overflow-hidden bg-[#050914] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />
        <div className="pointer-events-none absolute right-8 top-6 hidden h-24 w-24 drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)] sm:block">
          <ExplorerBot />
        </div>
        <Container className="relative">
          <SectionHeading
            eyebrow="Four Technology Areas"
            title="Hover to Explore What Each One Actually Is"
            tone="light"
            align="center"
          />
          <div className="mt-12">
            <TechGateway />
          </div>
        </Container>
      </section>

      <SectionWave from="navy" to="paper" />

      <section className="relative overflow-hidden bg-paper py-20 sm:py-24">
        <StemAmbient />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #3457ff 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #17c3d6 0%, transparent 70%)" }} />
        <Container className="relative">
          <SectionHeading
            eyebrow="Why Schools Need a System, Not a Kit"
            title="Modern STEM Education Is a System Problem"
            description="A robotics kit alone doesn't create a STEM program — curriculum, training and continuity do. Here's how our solutions are designed to work together."
          />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {whySolutions.map((item) => (
              <RevealItem key={item.title} className={clsx("rounded-3xl border border-line p-7", item.tint)}>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-white shadow-soft" style={{ color: item.accent }}>
                  <Icon name={item.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <Solutions />

      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "linear-gradient(135deg, #eaf7ff 0%, #ffffff 50%, #f3f0ff 100%)" }}
      >
        <Container className="relative">
          <SectionHeading
            eyebrow="How They Connect"
            title="Each Solution Builds on the Last"
            align="center"
            description="Students don't experience these as separate classes — they experience one continuous skill progression."
          />
          <ScrollScaleIn className="mt-14 flex flex-wrap items-center justify-center gap-3" from={0.88}>
            {solutionsDetail.slice(0, 5).map((s, i) => {
              const c = connectAccent[s.accent];
              return (
                <div key={s.slug} className="flex items-center gap-3">
                  <span className={clsx("rounded-full border px-4 py-2 text-sm font-semibold", c.border, c.bg, c.text)}>
                    {s.navLabel}
                  </span>
                  {i < 4 && <Icon name="arrow-right" className="size-4 text-muted" />}
                </div>
              );
            })}
          </ScrollScaleIn>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" />
        <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #3457ff 0%, transparent 70%)" }} />
        <Container className="relative grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-violet/20" style={{ color: "#c4b5fd" }}>
              <Icon name="rocket" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">Student Outcomes</h3>
            <ul className="mt-4 space-y-3">
              {[
                "A working project portfolio by the end of each academic year",
                "Comfort moving between mechanical, electrical and software thinking",
                "Experience presenting and defending technical work",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
                  <span className="mt-0.5 shrink-0" style={{ color: "#c4b5fd" }}>
                    <Icon name="check" className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-cyan/20" style={{ color: "#67e8f9" }}>
              <Icon name="building-2" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">School Benefits</h3>
            <ul className="mt-4 space-y-3">
              {[
                "A differentiated, future-ready positioning for admissions",
                "A gradeable, board-aligned addition to the academic calendar",
                "One partner managing curriculum, training and equipment together",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
                  <span className="mt-0.5 shrink-0" style={{ color: "#67e8f9" }}>
                    <Icon name="check" className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
