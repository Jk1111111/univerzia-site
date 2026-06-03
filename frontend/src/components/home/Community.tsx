import { community } from "@/lib/data/homepage";
import { Section, IconChip } from "@/components/ui";

export default function Community() {
  return (
    <Section id="community" className="py-24 max-[860px]:py-16" style={{ background: "var(--app-bg)" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-14 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "var(--brand-purple)" }} />
            Community & Ecosystem
          </span>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
          >
            Students, mentors, projects, and businesses — connected
          </h2>
          <p className="text-[18px] leading-[1.65]" style={{ color: "var(--fg-4)" }}>
            Learning doesn&apos;t end at a certificate. You join a living ecosystem that keeps growing with you.
          </p>
        </div>

        {/* 5-col stat grid */}
        <div className="grid grid-cols-2 min-[561px]:grid-cols-3 min-[1025px]:grid-cols-5 gap-[18px] u-reveal">
          {community.map((c) => (
            <div
              key={c.l}
              className="text-center py-7 px-4 bg-white rounded-[16px] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-md"
              style={{ border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
            >
              <IconChip icon={c.ic} color={c.c} bg={c.bg} size="xl" className="mx-auto mb-[14px]" />
              <div className="text-[24px] font-extrabold tabular-nums" style={{ color: "var(--fg-1)" }}>
                {c.v}
              </div>
              <div className="text-[13px] mt-[3px]" style={{ color: "var(--fg-4)" }}>
                {c.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
