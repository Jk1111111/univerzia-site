import { whyChoose } from "@/lib/data/homepage";
import { Section, IconChip } from "@/components/ui";

export default function WhyChoose() {
  return (
    <Section id="why" className="py-24 max-[860px]:py-16" style={{ background: "#fff" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-14 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "var(--brand-purple)" }} />
            Why Students Choose Univerzia
          </span>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
          >
            Not another video library — a career engine
          </h2>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px] u-reveal">
          {whyChoose.map((f) => (
            <div key={f.t} className="flex items-start gap-4">
              <IconChip icon={f.ic} color={f.c} bg={f.bg} size="lg" className="flex-shrink-0" />
              <div>
                <h4 className="text-[16px] font-semibold mb-[5px]" style={{ color: "var(--fg-1)" }}>
                  {f.t}
                </h4>
                <p className="text-[13.5px] leading-[1.55]" style={{ color: "var(--fg-4)" }}>
                  {f.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
