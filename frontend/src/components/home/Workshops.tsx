"use client";

import { workshops } from "@/lib/data/homepage";
import { Section, IconChip, Button } from "@/components/ui";

export default function Workshops() {
  return (
    <Section id="workshops" className="py-24 max-[860px]:py-16" style={{ background: "var(--app-bg)" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-14 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "var(--brand-purple)" }} />
            AI Workshop Highlight
          </span>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
          >
            Short, practical workshops with immediate career payoff
          </h2>
          <p className="text-[18px] leading-[1.65]" style={{ color: "var(--fg-4)" }}>
            Use AI tools and prompt engineering to save massive time, boost productivity, and stay
            relevant in the AI-driven job market.
          </p>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 min-[561px]:grid-cols-2 min-[1025px]:grid-cols-4 gap-[22px] u-reveal">
          {workshops.map((w) => (
            <div
              key={w.t}
              className="flex items-center gap-3 px-[18px] py-4 bg-white rounded-[14px] cursor-pointer
                         transition-all duration-200 hover:shadow-md hover:translate-x-1"
              style={{ border: "1px solid var(--line)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--brand-purple-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            >
              <IconChip icon={w.brand ? `fa-brands ${w.ic.replace("fa-brands ", "")}` : w.ic} color={w.c} bg={w.bg} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-[14.5px] font-semibold truncate" style={{ color: "var(--fg-1)" }}>{w.t}</div>
                <div className="text-[12px] mt-0.5" style={{ color: "var(--fg-4)" }}>{w.d}</div>
              </div>
              <i className="fa-solid fa-chevron-right text-[12px] flex-shrink-0" style={{ color: "var(--gray-300)" }} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 u-reveal">
          <Button variant="brand" size="lg">
            Explore all AI Workshops <i className="fa-solid fa-arrow-right" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
