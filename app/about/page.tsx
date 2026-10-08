import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/data/about";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Statistics } from "@/components/Statistics/Statistics";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollScaleIn } from "@/components/ui/ScrollScaleIn";
import { StoryScroll } from "@/components/About/StoryScroll";
import { BuilderBot } from "@/components/ui/robots/BuilderBot";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Univerzia STEM Labs partners with schools to build complete STEM, Robotics and AI learning ecosystems — our story, mission and educational philosophy.",
};

const philosophyIcons = ["hammer", "puzzle", "users"];
const philosophyColors = ["#3457ff", "#7c3aed", "#0e93a8"];
const valueIcons = ["sparkles", "users", "trending-up", "life-buoy"];
const valueColors = ["#3457ff", "#7c3aed", "#16966b", "#e08e0b"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        eyebrow={about.eyebrow}
        title={about.heroTitle}
        description={about.heroDescription}
        image={media.scienceLab[1]}
        imageAlt="A teacher and students working together on a hands-on classroom experiment"
      />

      <section className="relative overflow-hidden bg-paper py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #3457ff 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
        <Container className="relative">
          <SectionHeading eyebrow={about.story.heading} title="From a Frustration to a Full-Time Partnership" />
          <div className="mt-12">
            <StoryScroll paragraphs={about.story.paragraphs} />
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-20 sm:py-24">
        <Container>
        <ScrollScaleIn className="grid gap-8 sm:grid-cols-2" from={0.85}>
          <Reveal className="rounded-3xl p-8 text-white shadow-soft" style={{ background: "#3457ff" }}>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white">
              <Icon name="rocket" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">Our Mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{about.mission}</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl p-8 text-white shadow-soft" style={{ background: "#7c3aed" }}>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white">
              <Icon name="lightbulb" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">Our Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{about.vision}</p>
          </Reveal>
        </ScrollScaleIn>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "linear-gradient(135deg, #eef0ff 0%, #ffffff 45%, #eafcfb 100%)" }}
      >
        <StemAmbient />
        <Container className="relative">
          <SectionHeading eyebrow="Educational Philosophy" title={about.philosophy.heading} align="center" />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {about.philosophy.points.map((point, i) => {
              const color = philosophyColors[i % philosophyColors.length];
              return (
                <RevealItem
                  key={point.title}
                  className="group relative overflow-hidden rounded-3xl p-7 text-center text-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                  style={{ background: color }}
                >
                  <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-6xl font-bold text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white">
                    <Icon name={philosophyIcons[i]} className="size-6" />
                  </span>
                  <h3 className="relative mt-4 text-lg font-semibold text-white">{point.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/85">{point.description}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
        <StemAmbient dark />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why Univerzia" title="What Makes Our Approach Different" tone="light" />
            <ul className="mt-8 space-y-4">
              {about.whyUniverzia.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <ParallaxImage
              src={media.teacherTraining[0]}
              alt="A teacher leading a workshop session"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="aspect-[4/3.2] rounded-[2rem] shadow-lift"
            />
            <div className="pointer-events-none absolute -bottom-8 -left-8 hidden h-28 w-28 drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)] sm:block">
              <BuilderBot />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Core Values" title="The Principles Behind Every Program" align="center" />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.coreValues.map((v, i) => {
              const color = valueColors[i % valueColors.length];
              return (
                <RevealItem key={v.title} className="rounded-3xl p-6 text-white shadow-soft" style={{ background: color }}>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/20 text-white">
                    <Icon name={valueIcons[i]} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{v.description}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #eef1ff 100%)" }}
      >
        <Container className="relative">
          <SectionHeading eyebrow="Leadership" title="The Team Behind Univerzia" align="center" />
          <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {about.leadership.map((person) => (
              <RevealItem key={person.name} className="text-center">
                <div className="relative mx-auto size-28 overflow-hidden rounded-full shadow-soft">
                  <Image
                    src={media.headshots[person.headshotIndex]}
                    alt={person.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{person.name}</h3>
                <p className="text-xs text-muted">{person.role}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-10 text-center text-xs text-muted">
            Leadership profiles are illustrative placeholders for this demo build.
          </p>
        </Container>
      </section>

      <Statistics />
      <FinalCTA />
    </>
  );
}
