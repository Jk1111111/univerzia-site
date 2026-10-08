import type { Metadata } from "next";
import { caseStudies } from "@/data/caseStudies";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { SectionWave } from "@/components/ui/SectionWave";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { CaseStudyReel } from "@/components/CaseStudies/CaseStudyReel";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Illustrative examples of how a Univerzia STEM Labs partnership could play out for different types of schools.",
};

const cardAccent = ["text-electric", "text-violet-ink", "text-green-ink", "text-orange-ink", "text-cyan-ink", "text-amber-ink"];

export default function CaseStudiesPage() {
  const [featured, ...rest] = caseStudies;

  return (
    <>
      <section
        className="relative overflow-hidden py-20 pt-32 sm:py-24 sm:pt-40"
        style={{ background: "linear-gradient(135deg, #fff2e6 0%, #fbfbfe 45%, #f3f0ff 100%)" }}
      >
        <StemAmbient />
        <Container className="relative">
          <Reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Case Studies" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              What a Univerzia Partnership Can Look Like
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              These are illustrative scenarios built to demonstrate program structure — not verified results from named schools.
            </p>
          </Reveal>
        </Container>
      </section>

      <SectionWave from="paper" to="ink" />

      {/* ============ FEATURED STORY — a full-viewport pinned scroll
          sequence: problem -> environment -> build -> result, told through
          real photography with the case study's own metrics counting up at
          the end. See CaseStudyReel.tsx. ============ */}
      {featured && <CaseStudyReel study={featured} />}

      <SectionWave from="ink" to="white" />

      {/* remaining case studies — large alternating photo/text blocks with
          scroll parallax, not a row of small thumbnail cards */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="space-y-16">
          {rest.map((study, i) => {
            const accent = cardAccent[(i + 1) % cardAccent.length];
            const flip = i % 2 === 1;
            return (
              <div key={study.slug} className={clsx("grid items-center gap-10 lg:grid-cols-2 lg:gap-14", flip && "lg:[&>*:first-child]:order-2")}>
                <ParallaxImage
                  src={(media[study.image] as string[])[0]}
                  alt={study.headline}
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="aspect-[16/11] rounded-[2rem] shadow-lift"
                />
                <div>
                  <span className={clsx("text-xs font-semibold uppercase tracking-wide", accent)}>{study.schoolType}</span>
                  <h2 className="mt-2 text-2xl font-bold leading-snug text-ink sm:text-3xl">{study.headline}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">{study.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-6 border-t border-line pt-5">
                    {study.metrics.map((m) => (
                      <div key={m.label}>
                        <p className={clsx("font-display text-xl font-bold", accent)}>{m.value}</p>
                        <p className="text-[11px] leading-tight text-muted">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {study.solutionTags.map((tag) => (
                      <span key={tag} className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-medium text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
