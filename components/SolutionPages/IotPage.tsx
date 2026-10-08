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
import { IotSmartHero } from "./IotSmartHero";
import { DashboardLearningFeed } from "./DashboardLearningFeed";
import { SignalNetwork } from "./SignalNetwork";
import { PhotoStoryPanel } from "./PhotoStoryPanel";
import { FAQ } from "@/components/FAQ/FAQ";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";

/**
 * The IoT bespoke page — its own visual world: a connected smart
 * environment (sensor → gateway → dashboard → device), teal/cyan/amber,
 * deliberately not a robot and not a neural network.
 */
export function IotPage({ solution }: { solution: SolutionDetail }) {
  const iotProjects = projects.filter((p) => p.categories.includes("IoT"));
  const featured = iotProjects.find((p) => p.slug === "smart-agriculture") ?? iotProjects[0];
  const others = iotProjects.filter((p) => p.slug !== featured?.slug).slice(0, 2);
  const related = solutionsDetail.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      {/* ============ 1. HERO — the connected environment itself ============ */}
      <section className="relative overflow-hidden bg-[#04120f] pb-16 pt-32 sm:pb-20 sm:pt-40">
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

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.85fr_1.3fr] lg:gap-6">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur"
                style={{ color: "#5eead4" }}
              >
                <Icon name="radio-tower" className="size-3.5" />
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

            <div className="mx-auto w-full max-w-2xl">
              <IotSmartHero className="h-auto w-full" />
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="navy" to="white" />

      {/* ============ 2. LEARNING JOURNEY — a live dashboard, not a card row ============ */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="How It Works" title="How Students Learn Connected Systems" align="center" description={solution.whatIsIt} />
          <div className="mt-14">
            <DashboardLearningFeed />
          </div>
        </Container>
      </section>

      <SectionWave from="white" to="navy" />

      {/* ============ 3. SIGNAL NETWORK — a full-viewport pinned scroll
          sequence: sensors signal a gateway, a live dashboard reacts, and a
          real photo shows the automated response. See SignalNetwork.tsx. ============ */}
      <SignalNetwork />

      <SectionWave from="navy" to="white" />

      {/* ============ 4. STUDENT PROJECTS — large real imagery ============ */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="From This Program" title="What Students Actually Build" align="center" />
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {featured && (
              <Reveal>
                <PhotoStoryPanel
                  src={media.scienceLab[3]}
                  alt="Students working on a connected sensor project"
                  badge={featured.gradeLevel}
                  title={featured.title}
                  description={featured.description}
                  accent="#17c3d6"
                  labels={[
                    { x: 8, y: 14, text: "Sensor Wiring" },
                    { x: 55, y: 30, text: "Live Dashboard" },
                    { x: 12, y: 46, text: "Automated Response" },
                  ]}
                />
              </Reveal>
            )}

            <div className="grid gap-6">
              {others.map((p) => (
                <Reveal key={p.slug} direction="up" className="relative overflow-hidden rounded-[2rem] border border-line bg-paper-2 p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan-ink">
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

      {/* ============ 5. OUTCOMES — real numbers ============ */}
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
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/50">Core Systems Skills</p>
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

      {/* ============ 6. CTA ============ */}
      <FinalCTA />
    </>
  );
}
