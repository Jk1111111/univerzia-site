import { hero } from "@/lib/data/homepage";
import { Button } from "@/components/ui";

export default function Hero() {
  return (
    <header
      className="relative overflow-hidden text-white"
      style={{ background: "var(--grad-hero)", padding: "90px 0 120px" }}
    >
      {/* Glow overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(40% 50% at 15% 20%, rgba(124,58,237,0.45), transparent 70%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(40% 45% at 85% 80%, rgba(249,115,22,0.28), transparent 70%)" }}
      />

      {/* Grid */}
      <div
        className="relative z-[2] max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px] grid items-center gap-14
                   grid-cols-[1.05fr_0.95fr] max-[860px]:grid-cols-1"
      >
        {/* ── Left ── */}
        <div>
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 text-[12.5px] font-semibold px-[14px] py-[7px] rounded-full mb-6"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.20)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full flex-shrink-0"
              style={{
                background: "var(--success)",
                animation: "uPulse 2s infinite",
              }}
            />
            AI-Native Learning Ecosystem · 2026
          </div>

          {/* H1 */}
          <h1
            className="text-white mb-[22px]"
            style={{
              fontSize: "clamp(38px, 5.2vw, 60px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Learn AI. Build real projects.{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #c084fc, #a78bfa, #fdba74)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Future-proof your career.
            </span>
          </h1>

          {/* Lead */}
          <p
            className="mb-6 max-w-[540px]"
            style={{ fontSize: 19, lineHeight: 1.6, color: "rgba(255,255,255,0.78)" }}
          >
            Practical, project-based AI education with industry mentors. Go from
            your first prompt to a portfolio that lands opportunities.
          </p>

          {/* Value checks */}
          <div className="flex flex-wrap gap-x-5 gap-y-2.5 mb-8">
            {hero.values.map((v) => (
              <span
                key={v}
                className="flex items-center gap-2 text-[14.5px] font-medium"
                style={{ color: "rgba(255,255,255,0.90)" }}
              >
                <i
                  className="fa-solid fa-circle-check text-[13px]"
                  style={{ color: "var(--brand-primary-light)" }}
                />
                {v}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-[14px]">
            <Button variant="primary" size="lg">
              Start Learning <i className="fa-solid fa-arrow-right" />
            </Button>
            <Button variant="ghost-dark" size="lg">
              Explore AI Workshops
            </Button>
            <Button
              variant="ghost-dark"
              size="lg"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.28)" }}
            >
              Book Free Career Consultation
            </Button>
          </div>

          {/* Trust row */}
          <div
            className="flex items-center gap-[14px] mt-[38px] text-[13px]"
            style={{ color: "rgba(255,255,255,0.60)" }}
          >
            <div className="flex">
              {[
                { init: "AS", grad: "linear-gradient(135deg,#f97316,#fb923c)", ml: "" },
                { init: "PN", grad: "linear-gradient(135deg,#7C3AED,#a78bfa)", ml: "-ml-2" },
                { init: "RV", grad: "linear-gradient(135deg,#06b6d4,#22d3ee)", ml: "-ml-2" },
                { init: "+",  grad: "linear-gradient(135deg,#10b981,#34d399)", ml: "-ml-2" },
              ].map(({ init, grad, ml }) => (
                <span
                  key={init}
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 ${ml}`}
                  style={{ background: grad, border: "2px solid #1a1340" }}
                >
                  {init}
                </span>
              ))}
            </div>
            <span>Trusted by 500+ learners · 96% success rate</span>
          </div>
        </div>

        {/* ── Right: Glass dashboard card ── */}
        <div
          className="rounded-[24px] p-[22px] max-[860px]:max-w-[460px]"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 30px 70px -20px rgba(0,0,0,0.6)",
          }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between mb-[18px]">
            <span
              className="flex items-center gap-2 text-[13px] font-semibold"
              style={{ color: "rgba(255,255,255,0.90)" }}
            >
              <span
                className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center text-[13px] text-white"
                style={{ background: "var(--grad-brand)" }}
              >
                <i className="fa-solid fa-graduation-cap" />
              </span>
              Your AI journey
            </span>
            <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.55)" }}>
              This week
            </span>
          </div>

          {/* Stats 2-col grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {hero.stats.map((s) => (
              <div
                key={s.l}
                className="rounded-[14px] p-[14px]"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div
                  className="text-[26px] font-extrabold leading-none text-white tabular-nums"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {s.v}
                </div>
                <div className="text-[11.5px] mt-[5px]" style={{ color: "rgba(255,255,255,0.60)" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          {[
            { icon: "fa-wand-magic-sparkles", iconColor: "#c084fc", label: "Prompt Engineering", pct: 72 },
            { icon: "fa-brands fa-python",    iconColor: "#fdba74", label: "Python with AI",      pct: 35 },
          ].map(({ icon, iconColor, label, pct }) => (
            <div
              key={label}
              className="rounded-[14px] px-4 py-[14px] mb-3 last:mb-0"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div className="flex items-center justify-between text-[12.5px] mb-[9px]">
                <span className="flex items-center gap-2 font-medium text-white">
                  <i className={`${icon} text-[13px]`} style={{ color: iconColor }} />
                  {label}
                </span>
                <span className="font-bold" style={{ color: "var(--brand-primary-light)" }}>
                  {pct}%
                </span>
              </div>
              <div className="h-[7px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: "var(--grad-orange)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
