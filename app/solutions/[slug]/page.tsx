import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { solutionsDetail, getSolutionBySlug } from "@/data/solutionsDetail";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScenePanel } from "@/components/illustrations/ScenePanel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FAQ } from "@/components/FAQ/FAQ";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StemRoboticsPage } from "@/components/SolutionPages/StemRoboticsPage";
import { AiCodingPage } from "@/components/SolutionPages/AiCodingPage";
import { IotPage } from "@/components/SolutionPages/IotPage";
import { ArVrPage } from "@/components/SolutionPages/ArVrPage";
import { PhotoStoryPanel } from "@/components/SolutionPages/PhotoStoryPanel";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";
import { clsx } from "clsx";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ScrollScaleIn } from "@/components/ui/ScrollScaleIn";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

// The three slugs still on this generic template (innovation-labs,
// teacher-training, stem-curriculum) had zero photography — each gets one
// real classroom photo tied to what that solution actually looks like day
// to day, not a shared stock image.
const GENERIC_PHOTO: Record<string, { image: string; badge: string; title: string; labels: string[] }> = {
  "innovation-labs": {
    image: media.scienceLab[3],
    badge: "Maker Lab",
    title: "Student-Led, Not Worksheet-Led",
    labels: ["Prototype Build", "Peer Mentoring", "Design Iteration"],
  },
  "teacher-training": {
    image: media.teacherTraining[0],
    badge: "Live Cohort",
    title: "Teachers Practicing, Not Just Watching",
    labels: ["Hands-On Coaching", "Classroom Rehearsal", "Ongoing Mentorship"],
  },
  "stem-curriculum": {
    image: media.scienceLab[2],
    badge: "In Session",
    title: "Mapped to the Timetable, Not Bolted On",
    labels: ["Lesson Sequencing", "Skill Checkpoints", "Assessment Rubrics"],
  },
};

const accentMap = {
  electric: { bg: "bg-electric/10", text: "text-electric", css: "#3457ff", css2: "#6a8bff" },
  cyan: { bg: "bg-cyan/10", text: "text-cyan-ink", css: "#17c3d6", css2: "#0e7490" },
  violet: { bg: "bg-violet/10", text: "text-violet-ink", css: "#8b5cf6", css2: "#6d28d9" },
  green: { bg: "bg-green/10", text: "text-green-ink", css: "#1fb178", css2: "#15803d" },
  amber: { bg: "bg-amber/10", text: "text-amber-ink", css: "#f5a524", css2: "#b45309" },
  orange: { bg: "bg-orange/10", text: "text-orange-ink", css: "#ff7a45", css2: "#c2410c" },
};

export function generateStaticParams() {
  return solutionsDetail.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.heroDescription,
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  // The STEM & Robotics page is the new benchmark visual identity — a fully
  // bespoke composition, not the generic template below. Every other slug
  // keeps rendering that template unchanged until it gets the same pass.
  if (solution.slug === "stem-robotics") {
    return <StemRoboticsPage solution={solution} />;
  }
  if (solution.slug === "ai-coding") {
    return <AiCodingPage solution={solution} />;
  }
  if (solution.slug === "iot") {
    return <IotPage solution={solution} />;
  }
  if (solution.slug === "ar-vr") {
    return <ArVrPage solution={solution} />;
  }

  const accent = accentMap[solution.accent];
  const photo = GENERIC_PHOTO[solution.slug];
  const exampleProjects = projects
    .filter((p) => p.categories.some((c) => solution.exampleProjectCategories.includes(c)))
    .slice(0, 3);
  const related = solutionsDetail.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-paper pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <PageHeroText solution={solution} />
          </div>
          <div className="relative">
            <div
              className="absolute -inset-8 -z-10 rounded-[3rem] opacity-40 blur-3xl"
              style={{ background: `radial-gradient(circle, ${accent.css} 0%, transparent 70%)` }}
            />
            {photo ? (
              <ParallaxImage
                src={photo.image}
                alt={`Students during a ${solution.navLabel} session`}
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="aspect-[4/3.4] rounded-[2rem] shadow-lift"
              />
            ) : (
              <div className={clsx("relative aspect-[4/3.4] overflow-hidden rounded-[2rem] shadow-lift", accent.bg)}>
                <ScenePanel variant={solution.variant} accent={accent.css} accent2={accent.css2} className="absolute inset-0 h-full w-full scale-125" />
              </div>
            )}
          </div>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: `linear-gradient(135deg, ${accent.css}26 0%, ${accent.css2}12 55%, #ffffff 100%)` }}
      >
        <StemAmbient />
        <Container className="relative max-w-3xl">
          <SectionHeading eyebrow="What Is It?" title={`Understanding ${solution.title}`} />
          <p className="mt-6 text-base leading-relaxed text-muted">{solution.whatIsIt}</p>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: `${accent.css}0d` }}>
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${accent.css} 0%, transparent 70%)` }}
        />
        <Container className="relative">
          <SectionHeading eyebrow="Why Schools Need It" title="The Case for This Solution" />
          <ScrollScaleIn className="mt-8 grid gap-4 sm:grid-cols-2" from={0.92}>
            {solution.whySchoolsNeedIt.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed text-muted">
                <Icon name="check" className={clsx("mt-0.5 size-4 shrink-0", accent.text)} />
                {item}
              </div>
            ))}
          </ScrollScaleIn>
        </Container>
      </section>

      {(solution.whatStudentsLearn.length > 0 || solution.whatStudentsBuild.length > 0) && (
        <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" />
          <Container className="relative grid gap-10 sm:grid-cols-2">
            {solution.whatStudentsLearn.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white">What Students Learn</h3>
                <ul className="mt-4 space-y-3">
                  {solution.whatStudentsLearn.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                      <span className="mt-0.5 shrink-0" style={{ color: accent.css }}>
                        <Icon name="book-open" className="size-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {solution.whatStudentsBuild.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white">What Students Build</h3>
                <ul className="mt-4 space-y-3">
                  {solution.whatStudentsBuild.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                      <span className="mt-0.5 shrink-0" style={{ color: accent.css }}>
                        <Icon name="hammer" className="size-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </section>
      )}

      <section className="bg-paper-2 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What The School Receives" title="Everything Included in This Solution" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {solution.whatSchoolReceives.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed text-muted">
                <Icon name="package-check" className={clsx("mt-0.5 size-4 shrink-0", accent.text)} />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: `linear-gradient(135deg, #ffffff 0%, ${accent.css2}10 45%, ${accent.css}20 100%)` }}
      >
        <StemAmbient />
        <Container className="relative">
          <SectionHeading eyebrow="Program Structure" title="How the Curriculum Progresses" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {solution.curriculumStructure.map((stage, i) => (
              <div key={stage.stage} className="relative rounded-3xl border border-line bg-paper-2 p-6">
                <span className={clsx("flex size-9 items-center justify-center rounded-full text-sm font-bold text-white", accent.bg, accent.text)}>
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{stage.stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {photo && (
        <section className="bg-paper-2 py-16 sm:py-20">
          <Container>
            <SectionHeading eyebrow="In The Classroom" title="What This Actually Looks Like" align="center" />
            <div className="mt-12">
              <Reveal>
                <PhotoStoryPanel
                  src={photo.image}
                  alt={`Students during a ${solution.navLabel} session`}
                  badge={photo.badge}
                  title={photo.title}
                  description={solution.heroDescription}
                  accent={accent.css}
                  labels={[
                    { x: 8, y: 14, text: photo.labels[0] },
                    { x: 55, y: 30, text: photo.labels[1] },
                    { x: 12, y: 46, text: photo.labels[2] },
                  ]}
                />
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Benefits" title="Why It Works" tone="light" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {solution.benefits.map((b) => (
              <div key={b.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-base font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{b.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Implementation" title="How This Gets Rolled Out" />
          <p className="mt-6 text-base leading-relaxed text-muted">{solution.implementation}</p>
        </Container>
      </section>

      {exampleProjects.length > 0 && (
        <section className="bg-paper-2 py-16 sm:py-20">
          <Container>
            <SectionHeading eyebrow="Example Projects" title="What This Looks Like in Practice" />
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
              {exampleProjects.map((p) => (
                <RevealItem key={p.slug} className="rounded-3xl border border-line bg-white p-6">
                  <span className={clsx("flex size-10 items-center justify-center rounded-xl", accent.bg, accent.text)}>
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                  <Link href="/#showcase" className={clsx("mt-4 inline-flex items-center gap-1 text-sm font-semibold", accent.text)}>
                    View in Showcase
                    <Icon name="arrow-right" className="size-3.5" />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}

      <FAQ items={solution.faqs} eyebrow="Common Questions" title={`FAQs About ${solution.title}`} sectionId="solution-faq" />

      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: `linear-gradient(180deg, #ffffff 0%, ${accent.css}14 100%)` }}
      >
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

      <FinalCTA />
    </>
  );
}

function PageHeroText({ solution }: { solution: (typeof solutionsDetail)[number] }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted">
        <Link href="/" className="hover:text-electric">Home</Link>
        {" / "}
        <Link href="/solutions" className="hover:text-electric">Solutions</Link>
        {" / "}
        <span className="text-ink">{solution.navLabel}</span>
      </p>
      <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-electric">
        {solution.tagline}
      </span>
      <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">{solution.title}</h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{solution.heroDescription}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-electric hover:-translate-y-0.5"
        >
          Book a Demo
          <Icon name="arrow-right" className="size-4" />
        </Link>
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-base font-semibold text-ink transition-all hover:border-electric hover:text-electric hover:-translate-y-0.5"
        >
          All Solutions
        </Link>
      </div>
    </div>
  );
}
