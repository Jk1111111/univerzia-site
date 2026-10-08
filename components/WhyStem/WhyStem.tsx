import { whyStem } from "@/data/whyStem";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { CircuitOverlay } from "@/components/ui/CircuitOverlay";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { clsx } from "clsx";

const accents = [
  "from-electric/10 to-electric/0 text-electric",
  "from-cyan/10 to-cyan/0 text-cyan-ink",
  "from-violet/10 to-violet/0 text-violet-ink",
  "from-orange/10 to-orange/0 text-orange-ink",
  "from-green/10 to-green/0 text-green-ink",
];

export function WhyStem() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper py-24 sm:py-28">
      <CircuitOverlay color="#0a1330" nodeColor="#3457ff" opacity={0.05} />
      <Container className="relative">
        <SectionHeading
          eyebrow="Why STEM, Why Now"
          title={whyStem.headline}
          description={whyStem.intro}
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-flow:dense]">
          {whyStem.topics.map((topic, i) => {
            const isHero = i === 0;
            const accent = accents[i % accents.length];
            return (
              <RevealItem
                key={topic.tag}
                className={clsx(
                  "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift",
                  isHero && "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:p-8"
                )}
              >
                <div
                  className={clsx(
                    "absolute inset-0 -z-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    accent
                  )}
                />
                <span
                  className={clsx(
                    "absolute select-none font-display font-bold text-ink/[0.04]",
                    isHero ? "-right-2 -top-6 text-[9rem]" : "-right-1 -top-3 text-6xl"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <span
                    className={clsx(
                      "flex items-center justify-center rounded-2xl bg-paper-2",
                      isHero ? "size-16" : "size-12",
                      accent.split(" ").pop()
                    )}
                  >
                    <Icon name={topic.icon} className={isHero ? "size-8" : "size-6"} />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">
                    {topic.tag}
                  </p>
                  <h3 className={clsx("mt-1.5 font-semibold text-ink", isHero ? "text-2xl" : "text-lg")}>
                    {topic.title}
                  </h3>
                  <p className={clsx("mt-2 leading-relaxed text-muted", isHero ? "max-w-sm text-base" : "text-sm")}>
                    {topic.description}
                  </p>
                </div>

                {isHero && (
                  <div className="relative mt-8 flex items-center gap-3 border-t border-line pt-6">
                    <div className="flex -space-x-2">
                      {["electric", "cyan", "orange", "violet"].map((c) => (
                        <span
                          key={c}
                          className="size-8 rounded-full border-2 border-white"
                          style={{ background: `var(--color-${c})` }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium leading-snug text-muted">
                      8 core skill areas woven into every Univerzia project
                    </p>
                  </div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
