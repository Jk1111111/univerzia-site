import { outcomes } from "@/lib/data/homepage";
import { Section, IconChip } from "@/components/ui";

export default function Outcomes() {
  return (
    <Section id="outcomes" className="py-24 max-[860px]:py-16" style={{ background: "var(--app-bg)" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-14 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "var(--brand-purple)" }} />
            Real Career Outcomes
          </span>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
          >
            Measurable results, not just a certificate
          </h2>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 min-[561px]:grid-cols-2 min-[1025px]:grid-cols-4 gap-[22px] u-reveal">
          {outcomes.map((o) => (
            <div
              key={o.l}
              className="bg-white rounded-[16px] p-6 text-center transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-md"
              style={{ border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
            >
              <IconChip icon={o.ic} color={o.c} bg={o.bg} size="sm" className="mx-auto mb-[14px]" />
              <div
                className="text-[38px] font-extrabold leading-none tabular-nums"
                style={{ letterSpacing: "-0.02em", color: "var(--brand-primary)" }}
              >
                {o.v}
              </div>
              <div className="text-[13px] mt-2 leading-[1.4]" style={{ color: "var(--fg-4)" }}>
                {o.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
