"use client";

import { stack, trusted } from "@/lib/data/homepage";
import { Section } from "@/components/ui";

export default function TechStack() {
  return (
    <Section id="stack" className="py-16 max-[860px]:py-12" style={{ background: "#fff" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-12 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "var(--brand-purple)" }} />
            Trusted Technology Stack
          </span>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
          >
            The tools you&apos;ll actually use at work
          </h2>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-[14px] justify-center u-reveal">
          {stack.map((s) => (
            <div
              key={s.n}
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-[14px]
                         transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md"
              style={{
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--brand-primary-200)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            >
              <i className={`fa-solid ${s.ic} text-[20px]`} style={{ color: s.color }} />
              <div>
                <div className="text-[14px] font-semibold" style={{ color: "var(--fg-1)" }}>{s.n}</div>
                <div className="text-[11.5px]" style={{ color: "var(--fg-4)" }}>{s.c}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted companies */}
        <div className="mt-12 text-center u-reveal">
          <div
            className="text-[12.5px] font-semibold tracking-[0.06em] uppercase mb-[18px]"
            style={{ color: "var(--fg-3)" }}
          >
            Learners now work &amp; upskill at
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">
            {trusted.map((company) => (
              <span
                key={company}
                className="text-[19px] font-extrabold tracking-[0.02em]"
                style={{ color: "var(--gray-300)" }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
