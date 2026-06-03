"use client";

import { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/data/homepage";
import { Section } from "@/components/ui";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <Section id="testimonials" className="py-24 max-[860px]:py-16" style={{ background: "#fff" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* Heading */}
        <div className="max-w-[720px] mx-auto mb-14 text-center u-reveal">
          <span className="ds-eyebrow inline-flex items-center gap-2 mb-4">
            <span
              className="w-[22px] h-[2px] rounded-sm inline-block"
              style={{ background: "var(--brand-purple)" }}
            />
            Student Stories
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
            Real learners. Real outcomes.
          </h2>
        </div>

        {/* Card */}
        <div className="max-w-[820px] mx-auto u-reveal">
          <div
            className="rounded-[28px] p-10 max-[560px]:p-7 text-center transition-all duration-300"
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <i key={s} className="fa-solid fa-star text-[15px]" style={{ color: "#F59E0B" }} />
              ))}
            </div>

            {/* Quote */}
            <p
              className="text-[18px] max-[560px]:text-[16px] leading-[1.7] mx-auto max-w-[640px] mb-8"
              style={{ color: "var(--fg-2)" }}
            >
              &ldquo;
              <span
                style={{
                  borderBottom: "2px solid var(--brand-primary)",
                  paddingBottom: "1px",
                }}
              >
                {t.q.split(" ").slice(0, 6).join(" ")}
              </span>
              {" "}
              {t.q.split(" ").slice(6).join(" ")}
              &rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              {t.img ? (
                <Image
                  src={t.img}
                  alt={t.n}
                  width={48}
                  height={48}
                  className="rounded-full object-cover flex-shrink-0"
                  style={{ width: 48, height: 48 }}
                />
              ) : (
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[15px] font-bold flex-shrink-0"
                  style={{ background: "var(--grad-brand)" }}
                >
                  {t.n.charAt(0)}
                </span>
              )}
              <div className="text-left">
                <div className="text-[15px] font-bold" style={{ color: "var(--fg-1)" }}>
                  {t.n}
                </div>
                <div className="text-[13px]" style={{ color: "var(--fg-4)" }}>
                  {t.r}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-7">
            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center
                         cursor-pointer transition-all duration-150 hover:-translate-x-[2px]"
              style={{ border: "1.5px solid var(--line)", color: "var(--fg-3)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-primary)";
                e.currentTarget.style.color = "var(--brand-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.color = "var(--fg-3)";
              }}
            >
              <i className="fa-solid fa-chevron-left text-[12px]" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-[8px]">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="rounded-full cursor-pointer transition-all duration-300"
                  style={{
                    width: i === idx ? 24 : 8,
                    height: 8,
                    background: i === idx ? "var(--brand-primary)" : "var(--gray-300)",
                    border: "none",
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center
                         cursor-pointer transition-all duration-150 hover:translate-x-[2px]"
              style={{ border: "1.5px solid var(--line)", color: "var(--fg-3)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-primary)";
                e.currentTarget.style.color = "var(--brand-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.color = "var(--fg-3)";
              }}
            >
              <i className="fa-solid fa-chevron-right text-[12px]" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
