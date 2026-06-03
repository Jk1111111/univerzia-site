import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils/cn";
import {
  aboutHero,
  trustedAt,
  aboutStory,
  aboutMV,
  aboutWhatWeDo,
  aboutWhy,
  aboutStats,
  aboutValues,
  aboutTeam,
  aboutCta,
} from "@/lib/data/about";
import AboutTestimonials from "./AboutTestimonials";
import s from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Univerzia AI",
  description:
    "Univerzia AI is an AI-powered learning ecosystem and technology studio from Varanasi — helping people become job-ready in AI and helping organisations build the software that moves them forward.",
};

/* ── Eyebrow helper ──────────────────────────────────────────── */
function Eyebrow({ text, light }: { text: string; light?: boolean }) {
  return (
    <span className={cn("u-eyebrow", light && "light")}>
      <span className="bar" />
      {text}
    </span>
  );
}

/* ── 1. Hero ─────────────────────────────────────────────────── */
function AboutHeroSection() {
  const H = aboutHero;
  return (
    <header className={s["co-hero"]}>
      <div className="u-wrap">
        <div className={s["co-hero-grid"]}>
          {/* Left */}
          <div>
            <div className={s["co-hero-pill"]}>
              <span className="dot" />
              {H.pill}
            </div>
            <h1>
              {H.title[0]}
              <span className="g">{H.title[1]}</span>
            </h1>
            <p className={s["co-hero-lead"]}>{H.lead}</p>
            <div className={s["co-hero-cta"]}>
              {H.cta.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className={`u-btn ${c.kind === "primary" ? "u-btn--primary" : "u-btn--ghost-dark"} u-btn--lg`}
                >
                  {c.label}
                  {c.kind === "primary" && <i className="fa-solid fa-arrow-right" />}
                </Link>
              ))}
            </div>
            <div className={s["co-hero-meta"]}>
              {H.meta.map((m) => (
                <div key={m.l}>
                  <div className="v">
                    {m.v.replace(/[^0-9]/g, "")}
                    <span className="accent">{m.v.replace(/[0-9]/g, "")}</span>
                  </div>
                  <div className="l">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — glassmorphic card */}
          <div className={s["co-hero-card"]}>
            {H.mv.map((card) => (
              <div key={card.lbl} className={s["co-hero-mv"]}>
                <div className="top">
                  <div className="ic" style={{ background: card.grad }}>
                    <i className={`fa-solid ${card.ic}`} />
                  </div>
                  <span className="lbl">{card.lbl}</span>
                </div>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── 2. Trusted Strip ────────────────────────────────────────── */
function TrustedStrip() {
  return (
    <Section className={cn(s["co-section"], s["co-section--tight"], s["co-section--white"])}>
      <div className="u-wrap">
        <div className={cn(s["co-logos"], "u-reveal")}>
          <span className="lbl">Our alumni build at</span>
          {trustedAt.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 3. Our Story ────────────────────────────────────────────── */
function OurStory() {
  const S = aboutStory;
  return (
    <Section className={s["co-section"]}>
      <div className="u-wrap">
        <div className={cn(s["co-split"], "u-reveal")}>
          {/* Left — narrative */}
          <div className={s["co-split-body"]}>
            <Eyebrow text={S.eyebrow} />
            <h2>{S.title}</h2>
            {S.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="sig">
              <div className="av">{S.sig.av}</div>
              <div>
                <div className="n">{S.sig.n}</div>
                <div className="r">{S.sig.r}</div>
              </div>
            </div>
          </div>
          {/* Right — timeline */}
          <div className={s["co-timeline"]}>
            {S.timeline.map((node, i) => (
              <div key={i} className={s["co-tl"]}>
                <div className="yr">{node.yr}</div>
                <h4>{node.h}</h4>
                <p>{node.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── 4. Mission & Vision ─────────────────────────────────────── */
function MissionVision() {
  const MV = aboutMV;
  return (
    <Section className={cn(s["co-section"], s["co-section--white"])}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text={MV.eyebrow} />
          <h2 className={s["co-title"]}>{MV.title}</h2>
        </div>
        <div className={cn(s["co-mv-grid"], "u-reveal")}>
          {MV.cards.map((card) => (
            <div
              key={card.variant}
              className={cn(s["co-mv-card"], s[`co-mv-card--${card.variant}`])}
            >
              <div className="inner">
                <div className="ic">
                  <i className={`fa-solid ${card.ic}`} />
                </div>
                <div className="lbl">{card.lbl}</div>
                <h3>{card.h}</h3>
                <p>{card.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 5. What We Do ───────────────────────────────────────────── */
function WhatWeDo() {
  const W = aboutWhatWeDo;
  return (
    <Section className={s["co-section"]}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text={W.eyebrow} />
          <h2 className={s["co-title"]}>{W.title}</h2>
          <p className={s["co-sub"]}>{W.sub}</p>
        </div>
        <div className={cn(s["co-card-grid"], "u-reveal")}>
          {W.items.map((item) => (
            <div key={item.h} className={s["co-card"]}>
              <div
                className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center text-[20px] mb-5"
                style={{ background: item.tint, color: item.color }}
              >
                <i className={`fa-solid ${item.ic}`} />
              </div>
              <h4>{item.h}</h4>
              <p>{item.p}</p>
              <Link href={item.href} className={s["co-do-link"]}>
                Learn more <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 6. Why Choose Us ────────────────────────────────────────── */
function WhyChoose() {
  const W = aboutWhy;
  return (
    <Section className={cn(s["co-section"], s["co-section--white"])}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text={W.eyebrow} />
          <h2 className={s["co-title"]}>{W.title}</h2>
          <p className={s["co-sub"]}>{W.sub}</p>
        </div>
        <div className={cn(s["co-why"], "u-reveal")}>
          {W.items.map((item) => (
            <div key={item.h} className={s["co-why-card"]}>
              <div
                className={s["co-why-ic"]}
                style={{ background: item.tint, color: item.color }}
              >
                <i className={`fa-solid ${item.ic}`} />
              </div>
              <h4>{item.h}</h4>
              <p>{item.p}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 7. Impact Stats ─────────────────────────────────────────── */
function ImpactStats() {
  const ST = aboutStats;
  return (
    <Section className={s["co-section"]}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text={ST.eyebrow} />
          <h2 className={s["co-title"]}>{ST.title}</h2>
          <p className={s["co-sub"]}>{ST.sub}</p>
        </div>
        <div className={cn(s["co-stats-panel"], "u-reveal")}>
          <div className="inner">
            <div className={s["co-stats-grid"]}>
              {ST.items.map((stat) => (
                <div key={stat.l} className={s["co-stat"]}>
                  <div className="v">{stat.v}</div>
                  <div className="l">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── 8. Company Values ───────────────────────────────────────── */
function CompanyValues() {
  const V = aboutValues;
  return (
    <Section className={cn(s["co-section"], s["co-section--white"])}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text={V.eyebrow} />
          <h2 className={s["co-title"]}>{V.title}</h2>
        </div>
        <div className={cn(s["co-values"], "u-reveal")}>
          {V.items.map((val) => (
            <div
              key={val.h}
              className={s["co-value"]}
              style={{ "--c": val.c } as React.CSSProperties}
            >
              <div className={s["co-value-ic"]} style={{ background: val.grad }}>
                <i className={`fa-solid ${val.ic}`} />
              </div>
              <h4>{val.h}</h4>
              <p>{val.p}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 9. Leadership & Team ────────────────────────────────────── */
function Leadership() {
  const T = aboutTeam;
  return (
    <Section className={s["co-section"]}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text={T.eyebrow} />
          <h2 className={s["co-title"]}>{T.title}</h2>
          <p className={s["co-sub"]}>{T.sub}</p>
        </div>
        <div className={cn(s["co-team"], "u-reveal")}>
          {T.members.map((m) => (
            <div key={m.initials} className={s["co-member"]}>
              <div className={s["co-member-av"]}>{m.initials}</div>
              <h4>{m.n}</h4>
              <div className="role">{m.role}</div>
              <p>{m.p}</p>
              <div className={s["co-member-social"]}>
                <a title="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
                <a title="X"><i className="fa-brands fa-x-twitter" /></a>
                <a title="Email"><i className="fa-solid fa-envelope" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 11. Final CTA ───────────────────────────────────────────── */
function AboutFinalCTA() {
  const C = aboutCta;
  return (
    <Section className="py-24 max-[860px]:py-16" style={{ background: "var(--app-bg)" }}>
      <div className="u-wrap">
        <div className="u-finalcta u-reveal">
          <div className="u-finalcta-inner">
            <div
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold px-[14px] py-[7px] rounded-full mb-5"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.20)",
                backdropFilter: "blur(8px)",
                color: "#fff",
              }}
            >
              <i className="fa-solid fa-handshake" style={{ color: "var(--brand-primary-light)" }} />
              Let&apos;s work together
            </div>
            <h2>{C.title}</h2>
            <p>{C.sub}</p>
            <div className="u-finalcta-cta">
              {C.actions.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className={`u-btn ${a.kind === "primary" ? "u-btn--primary" : "u-btn--ghost-dark"} u-btn--lg`}
                >
                  {a.label}
                  {a.kind === "primary" && <i className="fa-solid fa-arrow-right" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <TrustedStrip />
      <OurStory />
      <MissionVision />
      <WhatWeDo />
      <WhyChoose />
      <ImpactStats />
      <CompanyValues />
      <Leadership />
      <AboutTestimonials />
      <AboutFinalCTA />
    </>
  );
}
