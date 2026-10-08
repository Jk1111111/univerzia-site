import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { programsDetail, getProgramBySlug } from "@/data/programsDetail";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PhotoStoryPanel } from "@/components/SolutionPages/PhotoStoryPanel";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { ScrollScaleIn } from "@/components/ui/ScrollScaleIn";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function generateStaticParams() {
  return programsDetail.map((p) => ({ slug: p.slug }));
}

// Real photo + accent per program — this page had no photography at all
// before; each grade band gets its own image and color rather than one
// generic hero repeated across the three stages.
const PROGRAM_VISUALS: Record<string, { image: string; secondaryImage: string; accent: string; labels: string[] }> = {
  primary: { image: media.kidsCoding[4], secondaryImage: media.teacherTraining[0], accent: "#1fb178", labels: ["Hands-On Play", "Guided Building", "Team Challenges"] },
  "middle-school": { image: media.scienceLab[0], secondaryImage: media.kidsCoding[3], accent: "#3457ff", labels: ["Sensor Wiring", "Block Coding", "Team Builds"] },
  "high-school": { image: media.kidsCoding[2], secondaryImage: media.teacherTraining[3], accent: "#8b5cf6", labels: ["Independent Design", "Real Code", "Capstone Build"] },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};
  return { title: program.title, description: program.heroDescription };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();
  const visual = PROGRAM_VISUALS[program.slug] ?? PROGRAM_VISUALS.primary;

  return (
    <>
      <section className="relative overflow-hidden bg-paper pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: program.title }]} />
            </Reveal>
            <Reveal delay={0.05}>
              <span
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ color: visual.accent }}
              >
                {program.gradeRange} — {program.tagline}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">{program.title}</h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{program.heroDescription}</p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={0.1} className="relative">
            <div
              className="absolute -inset-8 -z-10 rounded-[3rem] opacity-30 blur-3xl"
              style={{ background: `radial-gradient(circle, ${visual.accent} 0%, transparent 70%)` }}
            />
            <ParallaxImage
              src={visual.image}
              alt={`Students in the ${program.title}`}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="aspect-[4/3.4] rounded-[2rem] shadow-lift"
            />
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: `${visual.accent}0d` }}>
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${visual.accent} 0%, transparent 70%)` }}
        />
        <Container className="relative">
          <SectionHeading eyebrow="Focus Areas" title="What This Program Emphasizes" />
          <ScrollScaleIn className="mt-8 flex flex-wrap gap-3" from={0.92}>
            {program.focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border bg-white px-4 py-2 text-sm font-medium text-ink"
                style={{ borderColor: `${visual.accent}30` }}
              >
                {area}
              </span>
            ))}
          </ScrollScaleIn>
        </Container>
      </section>

      <section className="bg-paper-2 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Learning Journey" title="How Students Progress Through This Stage" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {program.learningJourney.map((stage, i) => (
              <div key={stage.stage} className="relative rounded-3xl border border-line bg-white p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-electric/10 text-sm font-bold text-electric">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{stage.stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" />
        <Container className="relative grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-white">Activities</h3>
            <ul className="mt-4 space-y-3">
              {program.activities.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                  <span className="mt-0.5 shrink-0" style={{ color: visual.accent }}>
                    <Icon name="hammer" className="size-4" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Skills Developed</h3>
            <ul className="mt-4 space-y-3">
              {program.skills.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                  <span className="mt-0.5 shrink-0" style={{ color: visual.accent }}>
                    <Icon name="trending-up" className="size-4" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="In The Classroom" title="What This Stage Actually Looks Like" align="center" />
          <div className="mt-12">
            <Reveal>
              <PhotoStoryPanel
                src={visual.secondaryImage}
                alt={`Students in a ${program.title} session`}
                badge={program.gradeRange}
                title={program.projects[0]}
                description={program.heroDescription}
                accent={visual.accent}
                labels={[
                  { x: 8, y: 14, text: visual.labels[0] },
                  { x: 55, y: 30, text: visual.labels[1] },
                  { x: 12, y: 46, text: visual.labels[2] },
                ]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Example Projects" title="What Students Build at This Stage" tone="light" />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {program.projects.map((p) => (
              <RevealItem key={p} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                {p}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-paper-2 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Outcomes" title="What Students Walk Away With" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {program.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed text-muted">
                <Icon name="check" className="mt-0.5 size-4 shrink-0 text-electric" />
                {o}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: `linear-gradient(180deg, #ffffff 0%, ${visual.accent}12 100%)` }}
      >
        <Container className="relative">
          <SectionHeading eyebrow="Other Programs" title="Explore the Full Progression" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {programsDetail
              .filter((p) => p.slug !== program.slug)
              .map((p) => (
                <Link key={p.slug} href={`/programs/${p.slug}`} className="group rounded-3xl border border-line bg-paper-2 p-6 transition-colors hover:border-electric">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{p.gradeRange}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink group-hover:text-electric">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
                </Link>
              ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
