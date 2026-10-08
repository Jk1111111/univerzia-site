import { finalCta } from "@/data/finalCta";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CircuitOverlay } from "@/components/ui/CircuitOverlay";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { AnimatedRobot } from "@/components/ui/AnimatedRobot";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-electric/30 via-orange/15 to-transparent blur-3xl" />
      <CircuitOverlay color="#6a8bff" nodeColor="#ffc93c" opacity={0.12} />
      <StemAmbient dark />

      <div className="pointer-events-none absolute bottom-0 right-[6%] hidden h-28 w-32 sm:block lg:h-36 lg:w-40">
        <AnimatedRobot />
      </div>

      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan">
            <Icon name="rocket" className="size-3.5" />
            {finalCta.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {finalCta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            {finalCta.supporting}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={finalCta.primaryCta.href} variant="light" size="lg">
              {finalCta.primaryCta.label}
            </Button>
            <Button href={finalCta.secondaryCta.href} variant="ghost" size="lg" showIcon={false} className="text-white hover:text-cyan">
              {finalCta.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
