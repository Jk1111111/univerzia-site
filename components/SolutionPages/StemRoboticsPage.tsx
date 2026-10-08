import Link from "next/link";
import type { SolutionDetail } from "@/data/solutionsDetail";
import { solutionsDetail } from "@/data/solutionsDetail";
import { projects } from "@/data/projects";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWave } from "@/components/ui/SectionWave";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { RoboticArmHero } from "./RoboticArmHero";
import { LearningLoop } from "./LearningLoop";
import { MachineAssembly } from "./MachineAssembly";
import { PhotoStoryPanel } from "./PhotoStoryPanel";
import { FAQ } from "@/components/FAQ/FAQ";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";

/**
 * The bespoke STEM & Robotics page — the benchmark for what an inner-page
 * visual identity should look like on this site. Every other solution slug
 * still renders the generic template in app/solutions/[slug]/page.tsx;
 * this component is wired in only for slug === "stem-robotics".
 */
export function StemRoboticsPage({ solution }: { solution: SolutionDetail }) {
  const robotics = projects.filter((p) => p.categories.includes("Robotics"));
  const featured = robotics[0];
  const others = robotics.slice(1, 3);
  const related = solutionsDetail.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      {/* ============ 1. HERO — the lab itself ============ */}
      <section className="relative overflow-hidden bg-[#050914] pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-15" />
        <StemAmbient dark showLine={false} />
        <Container className="relative">
          <p className="text-xs font-medium text-white/40">
            <Link href="/" className="hover:text-cyan">Home</Link>
            {" / "}
            <Link href="/solutions" className="hover:text-cyan">Solutions</Link>
            {" / "}
            <span className="text-white/70">{solution.navLabel}</span>
          </p>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan backdrop-blur">
                <Icon name="hand-metal" className="size-3.5" />
                {solution.tagline}
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
                {solution.title}
              </h1>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/65">{solution.heroDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" size="lg" variant="light">Book a Demo</Button>
                <Button href="/solutions" variant="ghost" size="lg" showIcon={false} className="text-white hover:text-cyan">
                  All Solutions
                </Button>
              </div>
            </div>

            {/* sized by HEIGHT, not width — the arm's viewBox is nearly square
                and tall, so letting a wide grid column drive its width (the
                first attempt) made it render taller than the section itself
                and get clipped by the section's own overflow-hidden */}
            <div className="flex justify-center lg:justify-end">
              <RoboticArmHero className="h-[26rem] w-auto sm:h-[30rem] lg:h-[36rem]" />
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="navy" to="white" />

      {/* ============ 2. HOW STUDENTS LEARN — the loop, not a paragraph ============ */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="How It Works" title="How Students Learn Robotics" align="center" description={solution.whatIsIt} />
          <div className="mt-16">
            <LearningLoop />
          </div>
        </Container>
      </section>

      <SectionWave from="white" to="navy" />

      {/* ============ 3. MACHINE ASSEMBLY — a full-viewport pinned scroll
          sequence: the rover is built piece by piece as the visitor scrolls,
          not a small diagram in a card. See MachineAssembly.tsx. ============ */}
      <MachineAssembly />

      <SectionWave from="navy" to="white" />

      {/* ============ 4. STUDENT PROJECTS — large real imagery, not thumbnails ============ */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="From This Program" title="What Students Actually Build" align="center" />
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {featured && (
              <Reveal>
                <PhotoStoryPanel
                  src={media.kidsCoding[0]}
                  alt="Students building a robotics project"
                  badge={featured.gradeLevel}
                  title={featured.title}
                  description={featured.description}
                  accent="#3457ff"
                  labels={[
                    { x: 8, y: 14, text: "Sensor Calibration" },
                    { x: 55, y: 30, text: "Data Logging" },
                    { x: 12, y: 46, text: "Field Testing" },
                  ]}
                />
              </Reveal>
            )}

            <div className="grid gap-6">
              {others.map((p) => (
                <Reveal key={p.slug} direction="up" className="relative overflow-hidden rounded-[2rem] border border-line bg-paper-2 p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-electric/10 text-electric">
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                  <span className="mt-3 inline-block text-xs font-medium uppercase tracking-wide text-muted/70">{p.gradeLevel}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="white" to="ink" />

      {/* ============ 5. OUTCOMES — typography + real numbers, not cards ============ */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
        <StemAmbient dark showLine={false} />
        <Container className="relative">
          <SectionHeading eyebrow="Program At A Glance" title="What This Actually Delivers" tone="light" align="center" />
          <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-3">
            <RevealItem className="text-center">
              <p className="font-display text-6xl font-bold text-white">
                <Counter value={solution.curriculumStructure.length} />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/50">Progressive Skill Stages</p>
            </RevealItem>
            <RevealItem className="text-center">
              <p className="font-display text-6xl font-bold text-white">
                <Counter value={solution.whatStudentsBuild.length} />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/50">Hands-On Build Tracks</p>
            </RevealItem>
            <RevealItem className="text-center">
              <p className="font-display text-6xl font-bold text-white">
                <Counter value={solution.whatStudentsLearn.length} />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/50">Core Engineering Skills</p>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      <SectionWave from="ink" to="white" />

      <FAQ items={solution.faqs} eyebrow="Common Questions" title={`FAQs About ${solution.title}`} sectionId="solution-faq" />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Related Solutions" title="Explore More of the Ecosystem" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/solutions/${r.slug}`}
                className="group rounded-3xl border border-line bg-paper-2 p-6 transition-colors hover:border-electric"
              >
                <h3 className="text-base font-semibold text-ink group-hover:text-electric">{r.navLabel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ 6. CTA — back into the lab ============ */}
      <FinalCTA />
    </>
  );
}
