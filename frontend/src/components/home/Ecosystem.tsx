"use client";

import { ecosystem } from "@/lib/data/homepage";
import { Section } from "@/components/ui";

export default function Ecosystem() {
  return (
    <Section className="py-24 max-[860px]:py-16" style={{ background: "var(--app-bg)" }}>
      <style>{`
        @media (max-width: 860px) { .eco-arrow { transform: rotate(90deg); } }
      `}</style>

      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-14 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "var(--brand-purple)" }} />
            What is Univerzia AI
          </span>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
          >
            One connected ecosystem, from first prompt to first offer
          </h2>
          <p className="text-[18px] leading-[1.65]" style={{ color: "var(--fg-4)" }}>
            Every stage flows into the next — learning compounds into skills, skills into real
            projects, projects into a career.
          </p>
        </div>

        {/* Flow */}
        <div className="flex flex-wrap justify-center items-stretch u-reveal">
          {ecosystem.map((node, i) => (
            <div key={node.t} className="flex items-center">
              {/* Node */}
              <div
                className="flex-1 min-w-[150px] bg-white rounded-[16px] p-[22px_18px] text-center
                           transition-all duration-[250ms] cursor-default
                           hover:-translate-y-1 hover:shadow-lg"
                style={{
                  border: "1px solid var(--line)",
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--brand-purple-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              >
                <div
                  className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mx-auto mb-[14px] text-[21px]"
                  style={{ background: node.bg, color: node.c }}
                >
                  <i className={`fa-solid ${node.ic}`} />
                </div>
                <div className="text-[14.5px] font-semibold" style={{ color: "var(--fg-1)" }}>{node.t}</div>
                <div className="text-[12px] mt-[5px] leading-[1.5]" style={{ color: "var(--fg-4)" }}>{node.d}</div>
              </div>

              {/* Arrow connector */}
              {i < ecosystem.length - 1 && (
                <div className="eco-arrow flex items-center px-1.5 text-[18px]" style={{ color: "var(--gray-300)" }}>
                  <i className="fa-solid fa-arrow-right-long" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
