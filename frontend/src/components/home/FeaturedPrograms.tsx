"use client";

import { useState } from "react";
import { tabs, programs } from "@/lib/data/homepage";
import { Section, Button, IconChip } from "@/components/ui";

export default function FeaturedPrograms() {
  const [active, setActive] = useState(tabs[0].id);
  const cards = programs[active] ?? [];

  return (
    <Section id="programs" className="py-24 max-[860px]:py-16" style={{ background: "#fff" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-10 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span
              className="w-[22px] h-[2px] rounded-sm inline-block"
              style={{ background: "var(--brand-purple)" }}
            />
            Featured Programs
          </span>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(28px,4vw,42px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--fg-1)",
            }}
          >
            Courses built for the AI era
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-[10px] justify-center mb-10 u-reveal">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[12px] text-[13.5px] font-semibold
                           cursor-pointer transition-all duration-200 hover:-translate-y-[1px]"
                style={
                  isActive
                    ? {
                        background: "var(--grad-brand)",
                        color: "#fff",
                        boxShadow: "var(--shadow-purple)",
                      }
                    : {
                        background: "var(--app-bg)",
                        color: "var(--fg-3)",
                        border: "1px solid var(--line)",
                      }
                }
              >
                <i className={`fa-solid ${tab.ic} text-[13px]`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 min-[561px]:grid-cols-2 min-[1025px]:grid-cols-3 gap-[22px] u-reveal">
          {cards.map((prog) => (
            <div
              key={prog.t}
              className="bg-white rounded-[20px] p-6 flex flex-col
                         transition-all duration-[250ms] hover:-translate-y-[4px] hover:shadow-lg"
              style={{ border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
            >
              {/* Card top */}
              <div className="flex items-start justify-between mb-4">
                <IconChip icon={prog.ic} color={prog.c} bg={prog.bg} size="md" />
                <span
                  className="text-[12px] font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "var(--app-bg)",
                    color: "var(--fg-3)",
                    border: "1px solid var(--line)",
                  }}
                >
                  {prog.dur}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-[16px] font-bold mb-3 leading-[1.3]"
                style={{ color: "var(--fg-1)" }}
              >
                {prog.t}
              </h3>

              {/* Benefits */}
              <ul className="flex-1 space-y-[9px] mb-5">
                {prog.b.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-[13px]" style={{ color: "var(--fg-3)" }}>
                    <i
                      className="fa-solid fa-circle-check text-[12px] mt-[2px] flex-shrink-0"
                      style={{ color: prog.c }}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button variant="outline" size="sm" className="w-full justify-center">
                Learn More <i className="fa-solid fa-arrow-right text-[11px]" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 u-reveal">
          <Button variant="brand" size="lg">
            View All Programs <i className="fa-solid fa-arrow-right" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
