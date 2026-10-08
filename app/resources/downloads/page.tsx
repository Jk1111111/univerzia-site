import type { Metadata } from "next";
import { downloads } from "@/data/downloads";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Brochures and curriculum guides available for download from Univerzia STEM Labs.",
};

const categoryMeta: Record<string, { icon: string; bg: string; text: string }> = {
  Curriculum: { icon: "book-open", bg: "bg-electric/10", text: "text-electric" },
  Overview: { icon: "file-text", bg: "bg-cyan/10", text: "text-cyan-ink" },
  Planning: { icon: "calendar-check", bg: "bg-violet/10", text: "text-violet-ink" },
  Training: { icon: "graduation-cap", bg: "bg-green/10", text: "text-green-ink" },
};

const categoryOrder = ["Overview", "Curriculum", "Planning", "Training"];

export default function DownloadsPage() {
  return (
    <>
      <section
        className="relative overflow-hidden py-20 pt-32 sm:py-24 sm:pt-40"
        style={{ background: "linear-gradient(135deg, #eef1ff 0%, #fbfbfe 45%, #eafcfb 100%)" }}
      >
        <StemAmbient />
        <Container className="relative max-w-3xl">
          <Reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Downloads" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Brochures &amp; Curriculum Guides
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Demo placeholders — real PDFs can be added to this list without any code changes.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ParallaxImage
              src={media.scienceLab[3]}
              alt="A student reviewing a curriculum guide alongside a teacher"
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="mt-10 aspect-[21/9] rounded-[2rem] shadow-lift"
            />
          </Reveal>

          <div className="mt-10 space-y-10">
            {categoryOrder.map((category) => {
              const items = downloads.filter((d) => d.category === category);
              if (items.length === 0) return null;
              const meta = categoryMeta[category] ?? categoryMeta.Curriculum;
              return (
                <div key={category}>
                  <div className="flex items-center gap-2.5">
                    <span className={`flex size-7 items-center justify-center rounded-lg ${meta.bg} ${meta.text}`}>
                      <Icon name={meta.icon} className="size-3.5" />
                    </span>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">{category}</h2>
                  </div>
                  <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2">
                    {items.map((item) => (
                      <RevealItem
                        key={item.slug}
                        className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                      >
                        <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${meta.bg} ${meta.text}`}>
                          <Icon name="file-text" className="size-4.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                          <p className="mt-1 text-xs leading-relaxed text-muted">{item.description}</p>
                          <p className="mt-2 text-[11px] font-medium text-muted/70">{item.fileType} · {item.fileSize}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            Downloadable files aren&apos;t attached yet in this demo build — contact us for the current program brochure.
          </p>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
