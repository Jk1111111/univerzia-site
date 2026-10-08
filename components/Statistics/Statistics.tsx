import { primaryStatistic, supportingStatistics } from "@/data/statistics";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { CircuitOverlay } from "@/components/ui/CircuitOverlay";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ScrollScaleIn } from "@/components/ui/ScrollScaleIn";

export function Statistics() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <CircuitOverlay color="#6a8bff" nodeColor="#ffc93c" opacity={0.15} />
      <StemAmbient dark />

      <Container className="relative">
        <SectionHeading
          eyebrow="Our Impact So Far"
          title="Numbers That Reflect Real Classrooms"
          tone="light"
          align="center"
        />

        <div className="mt-16 flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-center lg:gap-4">
          <ScrollScaleIn className="relative order-2 flex shrink-0 flex-col items-center justify-center lg:order-1">
            <div className="absolute inset-0 -z-10 rounded-full bg-electric/20 blur-3xl" />
            <div className="flex size-56 flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur sm:size-64">
              <p className="font-display text-5xl font-bold text-white sm:text-6xl">
                <Counter value={primaryStatistic.value} suffix={primaryStatistic.suffix} />
              </p>
              <p className="mt-2 max-w-[10rem] text-center text-xs font-medium uppercase tracking-wider text-white/60">
                {primaryStatistic.label}
              </p>
            </div>
          </ScrollScaleIn>

          <RevealGroup className="order-1 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:order-2 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
            {supportingStatistics.map((stat) => (
              <RevealItem key={stat.label} className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-white/50 sm:text-sm">
                  {stat.label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <p className="mt-14 text-center text-xs text-white/30">
          Placeholder figures for illustration purposes — updated with verified data at launch.
        </p>
      </Container>
    </section>
  );
}
