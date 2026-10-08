import type { Metadata } from "next";
import { faqs, faqCategories } from "@/data/faqs";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/components/FAQ/FAQ";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions school decision-makers ask about Univerzia STEM Labs programs, implementation and support.",
};

const categoryAccent = ["text-electric", "text-violet-ink", "text-cyan-ink", "text-green-ink", "text-orange-ink", "text-amber-ink"];
const categoryBg = ["bg-electric/10", "bg-violet/10", "bg-cyan/10", "bg-green/10", "bg-orange/10", "bg-amber/10"];
const categoryIcons = ["sparkles", "graduation-cap", "wrench", "package-check", "bar-chart-3", "life-buoy"];

function slugify(category: string) {
  return `faq-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function FaqPage() {
  return (
    <>
      <section
        className="relative overflow-hidden py-20 pt-32 sm:py-24 sm:pt-40"
        style={{ background: "linear-gradient(135deg, #eafcfb 0%, #fbfbfe 45%, #f3f0ff 100%)" }}
      >
        <StemAmbient />
        <Container className="relative max-w-3xl">
          <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
            <div>
              <Reveal>
                <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "FAQ" }]} />
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
                  Frequently Asked Questions
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="hidden sm:block">
              <ParallaxImage
                src={media.teacherTraining[2]}
                alt="A teacher answering a question during a school consultation"
                sizes="180px"
                className="aspect-square w-40 rounded-[1.5rem] shadow-lift"
              />
            </Reveal>
          </div>

          {/* quick-jump nav — the accordion below can get long across many
              categories, this keeps every section one click away */}
          <div className="mt-10 flex flex-wrap gap-2">
            {faqCategories.map((category, i) => (
              <a
                key={category}
                href={`#${slugify(category)}`}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-transform hover:-translate-y-0.5 ${categoryBg[i % categoryBg.length]} ${categoryAccent[i % categoryAccent.length]}`}
              >
                {category}
              </a>
            ))}
          </div>

          <div className="mt-10 space-y-12">
            {faqCategories.map((category, i) => (
              <div key={category} id={slugify(category)} className="scroll-mt-28">
                <div className="flex items-center gap-2.5">
                  <span className={`flex size-8 items-center justify-center rounded-lg ${categoryBg[i % categoryBg.length]} ${categoryAccent[i % categoryAccent.length]}`}>
                    <Icon name={categoryIcons[i % categoryIcons.length]} className="size-4" />
                  </span>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">{category}</h2>
                </div>
                <div className="mt-4">
                  <FAQ items={faqs.filter((f) => f.category === category)} sectionId={slugify(category)} bare />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
