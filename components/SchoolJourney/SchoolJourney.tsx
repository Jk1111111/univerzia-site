import { schoolJourney } from "@/data/schoolJourney";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { CircuitOverlay } from "@/components/ui/CircuitOverlay";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { StemAmbient } from "@/components/ui/StemAmbient";

const stepColors = ["#3457ff", "#17c3d6", "#8b5cf6", "#ff7a45", "#1fb178", "#f5a524", "#6a8bff", "#22d3ee"];

export function SchoolJourney() {
  return (
    <section id="school-journey" className="relative overflow-hidden bg-navy py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-4xl -translate-x-1/2 bg-electric/10 blur-[120px]" />
      <CircuitOverlay color="#ffffff" nodeColor="#17c3d6" opacity={0.08} />
      <StemAmbient dark />

      <Container className="relative">
        <SectionHeading
          eyebrow={schoolJourney.eyebrow}
          title={schoolJourney.headline}
          description={schoolJourney.intro}
          tone="light"
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {schoolJourney.steps.map((step, i) => {
            const color = stepColors[i % stepColors.length];
            const isRowEnd = i % 4 === 3;
            return (
              <RevealItem key={step.title} className="relative flex flex-col items-center text-center">
                {!isRowEnd && (
                  <span className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] overflow-hidden bg-gradient-to-r from-white/25 to-white/5 sm:block">
                    <span
                      className="sj-travel absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-transparent via-white to-transparent"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  </span>
                )}
                <span className="pointer-events-none absolute inset-x-0 -top-6 select-none text-center font-display text-5xl font-bold text-white/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  <span
                    className="sj-glow absolute inset-0 -z-10 rounded-2xl blur-md"
                    style={{ background: color, animationDelay: `${i * 0.3}s` }}
                  />
                  <span
                    className="relative z-10 flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur transition-transform duration-300 hover:scale-110"
                    style={{ color }}
                  >
                    <Icon name={step.icon} className="size-7" />
                    <span
                      className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-navy"
                      style={{ background: color }}
                    >
                      {i + 1}
                    </span>
                  </span>
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 max-w-[10rem] text-xs leading-relaxed text-white/60">
                  {step.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
      <style>{`
        @keyframes sj-glow { 0%,100% { opacity: 0.25; } 50% { opacity: 0.55; } }
        .sj-glow { animation: sj-glow 3.5s ease-in-out infinite; }
        @keyframes sj-travel { 0% { transform: translateX(-100%); opacity: 0; } 15% { opacity: 0.8; } 85% { opacity: 0.8; } 100% { transform: translateX(600%); opacity: 0; } }
        .sj-travel { animation: sj-travel 3.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
