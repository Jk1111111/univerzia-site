import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { media } from "@/data/media";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { EduImage } from "@/components/ui/EduImage";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Resources",
  description: "Blog articles, case studies, events, FAQs and downloadable guides from Univerzia STEM Labs.",
};

const hubItems = [
  { title: "Blog", href: "/resources/blog", icon: "book-open", accent: "electric", description: "Ideas from the classroom and the lab." },
  { title: "Case Studies", href: "/resources/case-studies", icon: "bar-chart-3", accent: "violet", description: "Illustrative outcomes from partner schools." },
  { title: "Events", href: "/resources/events", icon: "presentation", accent: "orange", description: "Workshops, competitions and demo days." },
  { title: "FAQ", href: "/resources/faq", icon: "search", accent: "green", description: "Answers for school decision-makers." },
  { title: "Downloads", href: "/resources/downloads", icon: "package-check", accent: "cyan", description: "Brochures and curriculum guides." },
] as const;

const accentClass = {
  electric: "#3457ff",
  violet: "#7c3aed",
  orange: "#ef6a37",
  green: "#16966b",
  cyan: "#0e93a8",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
        eyebrow="Resource Hub"
        title="Everything to Help You Evaluate and Champion a STEM Program."
        description="Articles, case studies, events and downloadable guides — built for the people who need to make the case internally."
        image={media.teacherTraining[1]}
        imageAlt="A presenter leading a workshop session"
      />

      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "linear-gradient(135deg, #eef1ff 0%, #ffffff 45%, #eafcfb 100%)" }}
      >
        <StemAmbient />
        <Container className="relative">
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hubItems.map((item, i) => {
              const color = accentClass[item.accent];
              const featured = i === 0;
              return (
                <RevealItem key={item.href} className={clsx(featured && "sm:col-span-2")}>
                  <Link
                    href={item.href}
                    data-cursor="view"
                    className={clsx(
                      "group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 text-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift",
                      featured && "min-h-[16rem] justify-end"
                    )}
                    style={featured ? undefined : { background: color }}
                  >
                    {featured && (
                      <>
                        <EduImage
                          src={media.kidsCoding[3]}
                          alt=""
                          sizes="(min-width: 1024px) 60vw, 90vw"
                          className="absolute inset-0"
                          fallback={<div className="absolute inset-0" style={{ background: color }} />}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </>
                    )}
                    <span className="relative flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white">
                      <Icon name={item.icon} className="size-6" />
                    </span>
                    <h3 className={clsx("relative mt-5 font-semibold text-white", featured ? "text-2xl" : "text-lg")}>{item.title}</h3>
                    <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-white/85">{item.description}</p>
                    <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      Explore
                      <Icon name="arrow-right" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
