import { paths } from "@/lib/data/homepage";
import { Section } from "@/components/ui";

export default function LearningPaths() {
  return (
    <Section id="paths" className="py-24 max-[860px]:py-16" style={{ background: "var(--app-bg)" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-14 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "var(--brand-purple)" }} />
            Learning Paths
          </span>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
          >
            A clear journey, whatever your starting point
          </h2>
          <p className="text-[18px] leading-[1.65]" style={{ color: "var(--fg-4)" }}>
            Four progressive tracks take you from AI-curious beginner to job-ready professional.
          </p>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 min-[561px]:grid-cols-2 min-[1025px]:grid-cols-4 gap-[22px] u-reveal">
          {paths.map((p) => (
            <div
              key={p.t}
              className="relative bg-white rounded-[18px] px-6 py-[26px] overflow-hidden
                         transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lg"
              style={{ border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
            >
              {/* Colored top bar */}
              <div className="absolute top-0 left-0 right-0 h-[5px]" style={{ background: p.c }} />

              {/* Ghost number */}
              <span
                className="absolute top-[22px] right-6 font-extrabold leading-none select-none"
                style={{ fontSize: 40, color: "var(--gray-200)" }}
              >
                {p.num}
              </span>

              <div
                className="text-[11.5px] font-bold tracking-[0.08em] uppercase mt-1"
                style={{ color: p.c }}
              >
                {p.lvl}
              </div>

              <h3
                className="font-bold my-[10px]"
                style={{ fontSize: 19, lineHeight: 1.3, color: "var(--fg-1)" }}
              >
                {p.t}
              </h3>

              <p className="text-[13.5px] leading-[1.6] mb-4" style={{ color: "var(--fg-4)" }}>
                {p.d}
              </p>

              <div className="flex flex-wrap gap-[7px]">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11.5px] font-medium px-[10px] py-1 rounded-[8px]"
                    style={{ background: "var(--gray-100)", color: "var(--fg-2)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
