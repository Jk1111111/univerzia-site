import type { Metadata } from "next";
import { forSchools } from "@/data/forSchools";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoStoryPanel } from "@/components/SolutionPages/PhotoStoryPanel";
import { EcosystemBlueprint } from "@/components/ForSchools/EcosystemBlueprint";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { SectionWave } from "@/components/ui/SectionWave";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ScrollScaleIn } from "@/components/ui/ScrollScaleIn";

export const metadata: Metadata = {
  title: "For Schools",
  description:
    "How Univerzia STEM Labs builds a complete, future-ready STEM ecosystem for your school — from consultation and lab setup to teacher training and ongoing support.",
};

const audienceGroups = [
  { key: "management", title: "For Management", icon: "building-2", accent: "electric" as const, items: forSchools.benefits.management },
  { key: "teachers", title: "For Teachers", icon: "graduation-cap", accent: "violet" as const, items: forSchools.benefits.teachers },
  { key: "students", title: "For Students", icon: "rocket", accent: "green" as const, items: forSchools.benefits.students },
];

const accentClass = {
  electric: { bg: "bg-electric/10", text: "text-electric" },
  violet: { bg: "bg-violet/10", text: "text-violet-ink" },
  green: { bg: "bg-green/10", text: "text-green-ink" },
};

export default function ForSchoolsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "For Schools" }]}
        eyebrow={forSchools.eyebrow}
        title={forSchools.heroTitle}
        description={forSchools.heroDescription}
        primaryCta={{ label: "Book a School Demo", href: "/contact" }}
        secondaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        image={media.scienceLab[0]}
        imageAlt="Students and a teacher collaborating on a hands-on STEM project"
      />

      <SectionWave from="paper" to="navy" />

      {/* ============ ECOSYSTEM BLUEPRINT — a full-viewport pinned scroll
          sequence: a technical diagram draws itself over real school
          photography, tracing consultation -> lab setup -> teacher
          training -> classroom -> outcomes. See EcosystemBlueprint.tsx. ============ */}
      <EcosystemBlueprint />

      <SectionWave from="navy" to="white" />

      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "linear-gradient(135deg, #eaf7ff 0%, #ffffff 40%, #f2edff 100%)" }}
      >
        <StemAmbient />
        <Container className="relative">
          <SectionHeading eyebrow="Inside A Partner School" title="What This Actually Looks Like On The Ground" align="center" />
          <div className="mt-14">
            <Reveal>
              <PhotoStoryPanel
                src={media.scienceLab[1]}
                alt="A teacher leading a hands-on STEM lesson in a partner school"
                badge="Live Classroom"
                title="A Dedicated Lab, Not a One-Off Workshop"
                description="Every partner school gets a real, ongoing lab setup — sized to the space you have, run by teachers we've trained, not a visiting instructor."
                accent="#3457ff"
                labels={[
                  { x: 8, y: 14, text: "Dedicated Lab Setup" },
                  { x: 55, y: 30, text: "Certified Teacher" },
                  { x: 12, y: 46, text: "Live Student Projects" },
                ]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Benefits by Audience"
            title="One Program, Built for Everyone It Touches"
            align="center"
          />
          <ScrollScaleIn className="mt-14 grid gap-6 lg:grid-cols-3" from={0.9}>
            {audienceGroups.map((group) => (
              <div key={group.key} className="rounded-3xl border border-line bg-white p-7">
                <span className={`flex size-12 items-center justify-center rounded-2xl ${accentClass[group.accent].bg} ${accentClass[group.accent].text}`}>
                  <Icon name={group.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <Icon name="check" className={`mt-0.5 size-3.5 shrink-0 ${accentClass[group.accent].text}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ScrollScaleIn>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
