"use client";

import { journey } from "@/lib/data/homepage";
import { Section } from "@/components/ui";

export default function Journey() {
  return (
    <Section id="journey" className="py-24 max-[860px]:py-16" style={{ background: "var(--app-bg)" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-14 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "var(--brand-purple)" }} />
            Student Success Journey
          </span>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
          >
            Seven steps from learning to landing the role
          </h2>
          <p className="text-[18px] leading-[1.65]" style={{ color: "var(--fg-4)" }}>
            A guided path — you&apos;re never left to figure it out alone.
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-wrap max-[860px]:flex-col max-[860px]:gap-[18px] u-reveal">
          {journey.map((step, i) => (
            <div
              key={step.t}
              className="flex-1 min-w-[130px] text-center relative px-2 max-[860px]:flex max-[860px]:items-start max-[860px]:text-left max-[860px]:gap-4 max-[860px]:px-0"
            >
              {/* Connecting line — hidden on last + mobile */}
              {i < journey.length - 1 && (
                <div
                  className="absolute top-[27px] left-1/2 w-full h-[2px] z-[1] max-[860px]:hidden"
                  style={{ background: "var(--line)" }}
                />
              )}

              {/* Dot */}
              <div
                className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center
                           mx-auto mb-[14px] relative z-[2] text-[20px]
                           transition-all duration-[250ms] cursor-default
                           hover:scale-[1.08]
                           max-[860px]:mx-0 max-[860px]:flex-shrink-0 max-[860px]:mb-0"
                style={{
                  border: "2px solid var(--line)",
                  boxShadow: "var(--shadow-sm)",
                  color: "var(--brand-purple)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--brand-purple)";
                  e.currentTarget.style.background = "var(--brand-purple-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <i className={`fa-solid ${step.ic}`} />
              </div>

              <div className="max-[860px]:pt-1">
                <div className="text-[14px] font-semibold" style={{ color: "var(--fg-1)" }}>{step.t}</div>
                <div className="text-[12px] mt-1 leading-[1.45]" style={{ color: "var(--fg-4)" }}>{step.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
