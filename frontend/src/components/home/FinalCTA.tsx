import { Section, Button } from "@/components/ui";

export default function FinalCTA() {
  return (
    <Section id="cta" className="py-24 max-[860px]:py-16" style={{ background: "var(--app-bg)" }}>
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        <div
          className="relative rounded-[32px] text-center text-white overflow-hidden u-reveal"
          style={{ background: "var(--grad-hero)", padding: "72px 56px" }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(50% 80% at 50% 0%, rgba(249,115,22,0.30), transparent 70%)" }}
          />

          <div className="relative z-[2]">
            {/* Pill */}
            <div
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold px-[14px] py-[7px] rounded-full mb-5"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.20)",
                backdropFilter: "blur(8px)",
              }}
            >
              <i className="fa-solid fa-bolt" style={{ color: "var(--brand-primary-light)" }} />
              Limited cohort seats
            </div>

            <h2
              className="text-white mb-[18px]"
              style={{
                fontSize: "clamp(30px,4.5vw,48px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Become AI-ready<br />before everyone else
            </h2>

            <p
              className="mx-auto mb-8 max-w-[560px] text-[18px] leading-[1.6]"
              style={{ color: "rgba(255,255,255,0.80)" }}
            >
              Join 500+ learners building real AI skills, real projects, and real careers. Your first
              prompt is the first step.
            </p>

            <div className="flex flex-wrap gap-[14px] justify-center">
              <Button variant="primary" size="lg">
                Start Learning Free <i className="fa-solid fa-arrow-right" />
              </Button>
              <Button variant="ghost-dark" size="lg">
                Book Free Career Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
