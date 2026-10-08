import Link from "next/link";
import { solutions } from "@/data/solutions";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { EduImage } from "@/components/ui/EduImage";
import { ScenePanel } from "@/components/illustrations/ScenePanel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { clsx } from "clsx";

const accentMap = {
  electric: { css: "#3457ff", css2: "#6a8bff", panelBg: "bg-gradient-to-br from-electric/15 to-electric/5" },
  cyan: { css: "#0e93a8", css2: "#0e7490", panelBg: "bg-gradient-to-br from-cyan/15 to-cyan/5" },
  violet: { css: "#7c3aed", css2: "#6d28d9", panelBg: "bg-gradient-to-br from-violet/15 to-violet/5" },
  green: { css: "#16966b", css2: "#15803d", panelBg: "bg-gradient-to-br from-green/15 to-green/5" },
  amber: { css: "#e08e0b", css2: "#b45309", panelBg: "bg-gradient-to-br from-amber/15 to-amber/5" },
  orange: { css: "#ef6a37", css2: "#c2410c", panelBg: "bg-gradient-to-br from-orange/15 to-orange/5" },
};

export function Solutions() {
  return (
    <section id="solutions" className="bg-paper-2 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Solutions"
          title="One Partner. Every Piece of Your Technology Program."
          description="From the first robotics kit to full AI curriculum delivery, each solution is designed to work on its own or as part of a complete school program."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => {
            const accent = accentMap[solution.accent];
            return (
              <RevealItem
                key={solution.title}
                className={clsx(
                  "group relative flex flex-col overflow-hidden rounded-3xl shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
                  solution.size === "lg" && "lg:col-span-2"
                )}
              >
                <div className={clsx("relative h-40 overflow-hidden", accent.panelBg)}>
                  <EduImage
                    src={solution.image}
                    alt={`${solution.title} program illustration`}
                    className="absolute inset-0 h-full w-full"
                    fallback={
                      <ScenePanel
                        variant={solution.variant}
                        accent={accent.css}
                        accent2={accent.css2}
                        className="absolute inset-0 h-full w-full scale-110 transition-transform duration-500 group-hover:scale-125"
                      />
                    }
                  />
                  <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-xl bg-white/90 shadow-soft backdrop-blur" style={{ color: accent.css }}>
                    <Icon name={solution.icon} className="size-5" />
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink/70 backdrop-blur">
                    {solution.tagline}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6" style={{ background: accent.css }}>
                  <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{solution.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {solution.features.slice(0, solution.size === "lg" ? 3 : 2).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/90">
                        <Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-white" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center gap-5 border-t border-white/20 pt-4">
                    <Link
                      href={solution.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5"
                      style={{ color: accent.css }}
                    >
                      Know More
                      <Icon name="arrow-up-right" className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <Link href="/#showcase" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white">
                      <Icon name="play" className="size-3.5" />
                      See in Action
                    </Link>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
