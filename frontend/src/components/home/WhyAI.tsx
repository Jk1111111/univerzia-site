import { whyAI } from "@/lib/data/homepage";
import { Section } from "@/components/ui";

export default function WhyAI() {
  return (
    <Section className="py-16 max-[860px]:py-12" style={{ background: "var(--app-bg)" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        <div
          className="relative rounded-[28px] overflow-hidden u-reveal"
          style={{ background: "var(--ink)", padding: "56px" }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(50% 60% at 90% 10%, rgba(124,58,237,0.40), transparent 70%)" }}
          />

          {/* Heading */}
          <div className="relative z-[2] mb-10 max-w-[620px]">
            <span
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] uppercase mb-[10px]"
              style={{ color: "#c084fc" }}
            >
              <span className="w-[22px] h-[2px] rounded-sm inline-block" style={{ background: "#c084fc" }} />
              Why AI matters today
            </span>
            <h2
              className="text-white"
              style={{
                fontSize: "clamp(26px,3.6vw,38px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: "10px 0 0",
              }}
            >
              The AI revolution is reshaping every job. The question is whether you&apos;ll lead it.
            </h2>
          </div>

          {/* Stats grid */}
          <div className="relative z-[2] grid grid-cols-2 lg:grid-cols-4 gap-5">
            {whyAI.map((s) => (
              <div key={s.v}>
                <div
                  className="text-[46px] font-extrabold leading-none tabular-nums"
                  style={{
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(120deg,#fdba74,#fb923c)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.v}
                </div>
                <div className="text-[14px] mt-[10px] leading-[1.5]" style={{ color: "rgba(255,255,255,0.70)" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
