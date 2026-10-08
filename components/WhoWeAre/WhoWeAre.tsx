import { whoWeAre } from "@/data/whoWeAre";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { AnimatedRobot } from "@/components/ui/AnimatedRobot";
import { Icon } from "@/components/ui/Icon";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function WhoWeAre() {
  const [primaryMetric] = whoWeAre.credibilityMetrics;
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <StemAmbient />
      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="right">
          <div className="relative">
            {/* soft color glow behind the frame — the single biggest lever for
                lifting a plain photo off a flat white section */}
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-electric/20 via-violet/15 to-cyan/20 opacity-70 blur-2xl" />
            <ParallaxImage
              src={media.scienceLab[0]}
              alt="A teacher and student working together on a hands-on science experiment"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="aspect-[4/3.2] rounded-[2rem] shadow-lift"
            />

            {/* floating credibility chip, same pattern as the hero's floating
                info cards, so the photo feels alive rather than a static crop */}
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
                <Icon name="trending-up" className="size-4.5" />
              </span>
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-wide text-muted">{primaryMetric.label}</span>
                <span className="block text-sm font-bold text-ink">{primaryMetric.value}</span>
              </span>
            </div>

            {/* the recurring robot character, peeking in from the corner */}
            <div className="absolute -right-5 -top-5 hidden h-16 w-20 sm:block">
              <AnimatedRobot />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-electric">
              {whoWeAre.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              {whoWeAre.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              {whoWeAre.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <blockquote className="mt-6 rounded-2xl border-l-4 border-electric bg-paper-2 py-4 pl-5 pr-4 text-sm font-medium italic text-ink">
              &ldquo;{whoWeAre.mission}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
