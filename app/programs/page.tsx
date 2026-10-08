import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { media } from "@/data/media";
import { programsDetail } from "@/data/programsDetail";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ScenePanel, type SceneVariant } from "@/components/illustrations/ScenePanel";
import { StudentProgressionReel } from "@/components/Programs/StudentProgressionReel";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { SectionWave } from "@/components/ui/SectionWave";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ScrollScaleIn } from "@/components/ui/ScrollScaleIn";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Programs",
  description: "Univerzia STEM Labs programs for Primary, Middle and High School — a structured progression from curiosity to independent innovation.",
};

// Each stage gets its own machine (not the same illustration recolored) and
// its own color wash, so the three programs visually mature as the grade
// band increases — simple connected sensors, to a physical robotic build,
// to an abstract neural network.
const stageMeta: { variant: SceneVariant; accent: string; accent2: string; tint: string; word: string; photo: string }[] = [
  { variant: "iot", accent: "#1fb178", accent2: "#22d3ee", tint: "bg-green/10", word: "Explore", photo: media.kidsCoding[4] },
  { variant: "robotics", accent: "#3457ff", accent2: "#6a8bff", tint: "bg-electric/10", word: "Build", photo: media.scienceLab[0] },
  { variant: "ai-coding", accent: "#8b5cf6", accent2: "#6d28d9", tint: "bg-violet/10", word: "Engineer", photo: media.kidsCoding[2] },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
        eyebrow="Our Programs"
        title="One Progression, From First Curiosity to Independent Innovation."
        description="Programs are grouped by grade band, each building directly on the skills developed in the one before it — so nothing is relearned from scratch."
        image={media.scienceLab[2]}
        imageAlt="A student engaged in a hands-on classroom activity"
      />

      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: "linear-gradient(135deg, #eef7f2 0%, #ffffff 45%, #eef0ff 100%)" }}
      >
        <StemAmbient />
        <Container className="relative max-w-3xl text-center">
          <SectionHeading
            eyebrow="How Grade Bands Work"
            title="Age-Appropriate, Not Age-Limited"
            align="center"
            description="Each program is calibrated to what a grade band can handle in complexity and attention span — but the underlying skill progression (build, debug, iterate) stays consistent from Grade 3 through Grade 12."
          />
        </Container>
      </section>

      {/* The student journey: three large, alternating stage compositions —
          each with its own machine, color and grade-appropriate framing —
          instead of three identical icon+heading+paragraph cards. */}
      {programsDetail.map((program, i) => {
        const stage = stageMeta[i % stageMeta.length];
        const flip = i % 2 === 1;
        return (
          <section key={program.slug} className={clsx("relative overflow-hidden py-16 sm:py-20", stage.tint)}>
            <Container className={clsx("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", flip && "lg:[&>*:first-child]:order-2")}>
              <ScrollScaleIn className="relative aspect-[4/3] overflow-hidden rounded-[2rem]" from={0.82}>
                <div className="absolute -inset-8 -z-10 rounded-[3rem] opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${stage.accent} 0%, transparent 70%)` }} />
                <ScenePanel variant={stage.variant} accent={stage.accent} accent2={stage.accent2} className="h-full w-full" />
                <div className="absolute -bottom-5 -right-5 size-24 overflow-hidden rounded-2xl border-4 border-white shadow-lift sm:size-28">
                  <Image src={stage.photo} alt={`Students in the ${program.title}`} fill sizes="112px" className="object-cover" />
                </div>
              </ScrollScaleIn>

              <Reveal direction={flip ? "right" : "left"}>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ borderColor: `${stage.accent}40`, color: stage.accent }}
                >
                  Stage {String(i + 1).padStart(2, "0")} · {stage.word}
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">{program.gradeRange}</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{program.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{program.heroDescription}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {program.focusAreas.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="rounded-full border px-3.5 py-1.5 text-xs font-medium"
                      style={{ borderColor: `${stage.accent}30`, color: stage.accent, background: `${stage.accent}0d` }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/programs/${program.slug}`}
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: stage.accent }}
                >
                  Explore Program
                  <Icon name="arrow-right" className="size-3.5" />
                </Link>
              </Reveal>
            </Container>
          </section>
        );
      })}

      <SectionWave from="white" to="navy" />

      {/* ============ THE STUDENT ARC — a full-viewport pinned scroll
          sequence: student -> learning -> building -> experimenting ->
          project -> outcome, told through six real photographs revealed via
          a wipe mask, with a scroll-spy stepper. See StudentProgressionReel.tsx. ============ */}
      <StudentProgressionReel />

      <SectionWave from="navy" to="white" />

      <FinalCTA />
    </>
  );
}
