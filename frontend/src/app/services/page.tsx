import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";
import LeadCTAButton from "@/components/ui/LeadCTAButton";
import { cn } from "@/lib/utils/cn";
import { hub } from "@/lib/data/services";
import type { CtaAction } from "@/lib/data/services";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Technology Services — Univerzia AI",
  description:
    "Enterprise software & digital products that move institutions forward. Flagship ERP and LMS platforms, plus high-converting websites and online stores — one partner to design, build, and scale.",
};

/* Hub accent palette set on the page wrapper (purple/indigo). */
const hubAccent = {
  ["--svc"]: "#7C3AED",
  ["--svc-2"]: "#6366F1",
  ["--svc-dark"]: "#6D28D9",
} as React.CSSProperties;

const sizeClass: Record<string, string> = { feat: "feat", third: "third", half: "half" };

function ctaButtonClass(style: CtaAction["style"]): string {
  if (style === "primary") return "u-btn u-btn--primary u-btn--lg";
  if (style === "soft") return "u-btn u-btn--svc-soft u-btn--lg";
  return "u-btn u-btn--ghost-dark u-btn--lg";
}

/* ── Hero ─────────────────────────────────────────────────── */
function HubHero() {
  const H = hub.hero;
  return (
    <header className={styles["svc-hub-hero"]}>
      <div className="u-wrap">
        <div className={styles["svc-hub-hero-inner"]}>
          <span
            className={styles["svc-hero-pill"]}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              marginBottom: 22,
            }}
          >
            <i className="fa-solid fa-layer-group" /> {H.pill}
          </span>
          <h1>
            {H.title[0]}
            <span className="g">{H.title[1]}</span>
          </h1>
          <p>{H.sub}</p>
          <div className={styles["svc-hub-hero-cta"]}>
            <LeadCTAButton className="u-btn u-btn--primary u-btn--lg" source="services-hero" ctaType="book-demo">
              {H.primary.label} <i className="fa-solid fa-arrow-right" />
            </LeadCTAButton>
            <LeadCTAButton className="u-btn u-btn--ghost-dark u-btn--lg" source="services-hero" ctaType="talk-to-sales">
              {H.secondary.label}
            </LeadCTAButton>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Stat bar ─────────────────────────────────────────────── */
function HubStats() {
  return (
    <Section className={cn(styles["svc-section"], styles["svc-section--tight"])}>
      <div className="u-wrap">
        <div className={cn(styles["svc-statbar"], "u-reveal")}>
          {hub.stats.map((st) => (
            <div key={st.l} className={styles["svc-stat"]}>
              <div className="v">
                <span className="accent">{st.v}</span>
                {st.suffix}
              </div>
              <div className="l">{st.l}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Bento grid of services ───────────────────────────────── */
function HubGrid() {
  return (
    <Section
      className={cn(styles["svc-section"], styles["svc-section--white"])}
      id="services"
    >
      <div className="u-wrap">
        <div className={cn(styles["svc-head"], "u-reveal")}>
          <span className={styles["svc-eyebrow"]}>
            <span className="bar" /> What we build
          </span>
          <h2 className={styles["svc-title"]}>
            Five ways we power your organization
          </h2>
          <p className={styles["svc-sub"]}>
            Two flagship platforms and a full-service digital studio — explore each
            below.
          </p>
        </div>
        <div className={cn(styles["svc-hub-grid"], "u-reveal")}>
          {hub.services.map((sv) => (
            <Link
              key={sv.key}
              href={`/services/${sv.slug}`}
              className={cn(styles["svc-card"], styles[sizeClass[sv.size]])}
              style={{ ["--c"]: sv.c } as React.CSSProperties}
            >
              <div className={styles["svc-card-top"]}>
                <div className={styles["svc-card-ic"]} style={{ background: sv.c }}>
                  <i className={"fa-solid " + sv.icon} />
                </div>
                {sv.badge ? (
                  <span className={styles["svc-card-badge"]}>{sv.badge}</span>
                ) : null}
              </div>
              <h3>{sv.title}</h3>
              <p>{sv.desc}</p>
              <div className={styles["svc-card-tags"]}>
                {sv.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <span className={styles["svc-card-link"]}>
                Explore {sv.title} <i className="fa-solid fa-arrow-right" />
              </span>
            </Link>
          ))}
        </div>
        <div
          className="u-reveal"
          style={{
            marginTop: 32,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--fg-4)" }}>
            Also offered:
          </span>
          {hub.more.map((m) => (
            <span
              key={m}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--fg-2)",
                background: "#fff",
                border: "1px solid var(--line)",
                padding: "7px 14px",
                borderRadius: 999,
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Why Univerzia ────────────────────────────────────────── */
function HubWhy() {
  const W = hub.why;
  return (
    <Section className={cn(styles["svc-section"], styles["svc-section--white"])}>
      <div className="u-wrap">
        <div className={cn(styles["svc-head"], "u-reveal")}>
          <span className={styles["svc-eyebrow"]}>
            <span className="bar" /> {W.eyebrow}
          </span>
          <h2 className={styles["svc-title"]}>{W.title}</h2>
          {W.sub ? <p className={styles["svc-sub"]}>{W.sub}</p> : null}
        </div>
        <div className={cn(styles["svc-why"], "u-reveal")}>
          {W.items.map((w) => (
            <div key={w.t} className={styles["svc-why-card"]}>
              <div className={styles["svc-why-ic"]}>
                <i className={"fa-solid " + w.ic} />
              </div>
              <h4>{w.t}</h4>
              <p>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Final CTA ────────────────────────────────────────────── */
function HubCTA() {
  const C = hub.cta;
  return (
    <Section className={styles["svc-section"]} id="contact">
      <div className="u-wrap">
        <div className={cn(styles["svc-cta"], "u-reveal")}>
          <div className={styles["svc-cta-inner"]}>
            <h2>{C.title}</h2>
            <p>{C.sub}</p>
            <div className={styles["svc-cta-actions"]}>
              {C.actions.map((a) => (
                <LeadCTAButton key={a.label} className={ctaButtonClass(a.style)} source="services-cta" ctaType={a.label.toLowerCase().replace(/\s+/g, "-")}>
                  {a.label}
                  {a.style === "primary" ? (
                    <i className="fa-solid fa-arrow-right" />
                  ) : null}
                </LeadCTAButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function ServicesHubPage() {
  return (
    <main style={hubAccent}>
      <HubHero />
      <HubStats />
      <HubGrid />
      <HubWhy />
      <HubCTA />
    </main>
  );
}
