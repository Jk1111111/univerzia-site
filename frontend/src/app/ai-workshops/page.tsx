import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import LeadCTAButton from "@/components/ui/LeadCTAButton";
import { cn } from "@/lib/utils/cn";
import { aiWorkshops as D } from "@/lib/data/aiWorkshops";
import Faq from "./Faq";
import styles from "./aiworkshops.module.css";

export const metadata: Metadata = {
  title: "AI Tools & ChatGPT Workshop — Univerzia AI",
  description:
    "A 3+ hour hands-on live workshop covering 50+ AI tools and ChatGPT hacks. Build presentations in seconds, finish a day's work in minutes, and save 2 hours every day. Certificate included.",
};

/* ── Shared section heading helpers (server) ─────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className={styles["aiw-eyebrow"]}>
      <span className="bar" /> {children}
    </span>
  );
}

interface HeadBlock {
  eyebrow: string;
  title: string;
  sub?: string;
}
function Head({ block }: { block: HeadBlock }) {
  return (
    <div className="u-head u-reveal">
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h2 className="u-title">{block.title}</h2>
      {block.sub ? <p className="u-sub">{block.sub}</p> : null}
    </div>
  );
}

const initials = (n: string) =>
  n
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("");

/* ── 1 · Hero ─────────────────────────────────────────────── */
function Hero() {
  const H = D.hero;
  const C = D.cta;
  return (
    <header className={styles["aiw-hero"]}>
      <div className={cn("u-wrap", styles["aiw-hero-grid"])}>
        <div>
          <span className={styles["aiw-hero-pill"]}>
            <span className="dot" /> {H.pill}
          </span>
          <h1>
            {H.title[0]}
            <span className="g">{H.title[1]}</span>
            {H.title[2]}
          </h1>
          <p className={styles["aiw-hero-lead"]}>{H.sub}</p>
          <div className={styles["aiw-hero-check"]}>
            {H.checklist.map((c) => (
              <span key={c}>
                <i className="fa-solid fa-check" /> {c}
              </span>
            ))}
          </div>
          <div className={styles["aiw-hero-cta"]}>
            <LeadCTAButton className="u-btn u-btn--primary u-btn--lg" source="ai-workshops-hero" program="AI Tools & Prompt Engineering Workshop" ctaType="reserve-seat">
              Reserve My Seat <i className="fa-solid fa-arrow-right" />
            </LeadCTAButton>
            <a className="u-btn u-btn--ghost-dark u-btn--lg" href="#curriculum">
              View Curriculum
            </a>
          </div>
          <div className={styles["aiw-hero-stats"]}>
            {H.stats.map((s) => (
              <div key={s.l} className={styles["aiw-hstat"]}>
                <div className="v">
                  <span className="accent">{s.v}</span>
                  {s.suffix}
                </div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles["aiw-hero-card"]}>
          <div className={styles["aiw-card-head"]}>
            <span className="t">
              <i
                className="fa-solid fa-bolt"
                style={{ color: "var(--brand-primary-light)" }}
              />{" "}
              Next Live Workshop
            </span>
            <span className="live">
              <span className="d" /> Live
            </span>
          </div>
          <div className={styles["aiw-session"]}>
            {H.session.map((s) => (
              <div key={s.t} className={styles["aiw-session-item"]}>
                <i className={"fa-solid " + s.ic} />
                <span>{s.t}</span>
              </div>
            ))}
          </div>
          <div className={styles["aiw-card-tools"]}>
            <span className="lbl">Tools you&apos;ll use</span>
            <span className="chips">
              {D.tools.items.slice(0, 5).map((t) => (
                <span key={t.n} style={{ background: t.c }}>
                  {t.mono ? t.mono : <i className={"fa-solid " + t.ic} />}
                </span>
              ))}
            </span>
          </div>
          <div className={styles["aiw-card-price"]}>
            <span className="now">{C.priceNow}</span>
            <span className="was">{C.priceWas}</span>
            <span className="off">{C.off}</span>
          </div>
          <LeadCTAButton className="u-btn u-btn--primary" source="ai-workshops-card" program="AI Tools & Prompt Engineering Workshop" ctaType="reserve-seat">
            Reserve My Seat <i className="fa-solid fa-arrow-right" />
          </LeadCTAButton>
          <div className={styles["aiw-card-note"]}>
            <i className="fa-solid fa-lock" style={{ fontSize: 10 }} /> Limited seats ·
            Certificate included · Lifetime access
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── 2 · As featured in ───────────────────────────────────── */
function Media() {
  const M = D.media;
  return (
    <Section
      className="u-section--tight"
      style={{ background: "#fff", borderBottom: "1px solid var(--line)" }}
    >
      <div className="u-wrap">
        <div className={cn(styles["aiw-media-label"], "u-reveal")}>{M.label}</div>
        <div className={cn(styles["aiw-media"], "u-reveal")}>
          {M.items.map((m) => (
            <div key={m.src} className={styles["aiw-media-card"]}>
              <span className="src">{m.src}</span>
              <p>&ldquo;{m.t}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 3 · Market reality / why now ─────────────────────────── */
function Reality() {
  const R = D.reality;
  return (
    <Section className="u-section" id="why-now">
      <div className="u-wrap">
        <Head block={R} />
        <div className={cn(styles["aiw-reality"], "u-reveal")}>
          {R.stats.map((s) => (
            <div key={s.t} className={cn(styles["aiw-rcard"], styles[s.type])}>
              <div
                className={styles["aiw-rcard-ic"]}
                style={{ background: s.bg, color: s.c }}
              >
                <i className={"fa-solid " + s.ic} />
              </div>
              <div className="v" style={{ color: s.c }}>
                {s.v}
              </div>
              <div className="t">{s.t}</div>
              <p>{s.d}</p>
              <div className="src">
                <i className="fa-solid fa-circle-info" /> {s.src}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 4 · Curriculum — what you'll master ──────────────────── */
function Curriculum() {
  const C = D.curriculum;
  return (
    <Section className="u-section" id="curriculum" style={{ background: "#fff" }}>
      <div className="u-wrap">
        <Head block={C} />
        <div className={cn(styles["aiw-curric"], "u-reveal")}>
          {C.modules.map((m, i) => (
            <article
              key={m.t}
              className={styles["aiw-cc"]}
              style={{ ["--c"]: m.c } as React.CSSProperties}
            >
              <div className={styles["aiw-cc-top"]}>
                <div
                  className={styles["aiw-cc-ic"]}
                  style={{
                    background: `color-mix(in srgb, ${m.c} 12%, #fff)`,
                    color: m.c,
                  }}
                >
                  <i className={(m.brand ? "fa-brands " : "fa-solid ") + m.ic} />
                </div>
                <span className={styles["aiw-cc-num"]}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{m.t}</h3>
              <div className={styles["aiw-cc-sub"]}>{m.d}</div>
              <ul>
                {m.points.map((p) => (
                  <li key={p}>
                    <i className="fa-solid fa-check" /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 5 · Why join — benefit grid ──────────────────────────── */
function WhyJoin() {
  const W = D.whyJoin;
  return (
    <Section className="u-section" id="why">
      <div className="u-wrap">
        <Head block={W} />
        <div className={cn(styles["aiw-why10"], "u-reveal")}>
          {W.items.map((f) => (
            <div key={f.t} className={styles["aiw-w10"]}>
              <div
                className={styles["aiw-w10-ic"]}
                style={{ background: f.bg, color: f.c }}
              >
                <i className={(f.brand ? "fa-brands " : "fa-solid ") + f.ic} />
              </div>
              <h4>{f.t}</h4>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 6 · AI tools covered ─────────────────────────────────── */
function Tools() {
  const T = D.tools;
  return (
    <Section className="u-section" id="tools" style={{ background: "#fff" }}>
      <div className="u-wrap">
        <Head block={T} />
        <div className={cn(styles["aiw-tools"], "u-reveal")}>
          {T.items.map((t) => (
            <div key={t.n} className={styles["aiw-tool"]}>
              <div className={styles["aiw-tool-ic"]} style={{ background: t.c }}>
                {t.mono ? t.mono : <i className={"fa-solid " + t.ic} />}
              </div>
              <div>
                <div className="n">{t.n}</div>
                <div className="c">{t.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 7 · Free bonuses ─────────────────────────────────────── */
function Bonuses() {
  const B = D.bonuses;
  return (
    <Section className="u-section" id="bonuses">
      <div className="u-wrap">
        <Head block={B} />
        <div className={cn(styles["aiw-bonus"], "u-reveal")}>
          {B.items.map((b) => (
            <div key={b.t} className={styles["aiw-bonus-card"]}>
              <div className={styles["aiw-bonus-top"]}>
                <span className="badge">{b.badge}</span>
                <span className="worth">Worth {b.worth}</span>
              </div>
              <div className={styles["aiw-bonus-ic"]}>
                <i className={"fa-solid " + b.ic} />
              </div>
              <h4>{b.t}</h4>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
        <div className={cn(styles["aiw-bonus-total"], "u-reveal")}>
          <div>
            <span className="lbl">Total bonus value</span>
            <span className="amt">{B.total}</span>
          </div>
          <span className="free">Yours FREE today</span>
        </div>
      </div>
    </Section>
  );
}

/* ── 8 · Learning journey ─────────────────────────────────── */
function Journey() {
  const J = D.journey;
  return (
    <Section className="u-section" id="journey" style={{ background: "#fff" }}>
      <div className="u-wrap">
        <Head block={J} />
        <div className="u-journey u-reveal">
          {J.steps.map((s) => (
            <div key={s.t} className="u-jstep">
              <div className="u-jstep-dot">
                <i className={"fa-solid " + s.ic} />
              </div>
              <div className="t">{s.t}</div>
              <div className="d">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 9 · Outcomes ─────────────────────────────────────────── */
function Outcomes() {
  const O = D.outcomes;
  return (
    <Section className="u-section" id="outcomes">
      <div className="u-wrap">
        <Head block={O} />
        <div className={cn(styles["aiw-outcomes"], "u-reveal")}>
          {O.items.map((o) => (
            <div key={o.l} className="u-outcome">
              <div
                className="u-outcome-ic"
                style={{ background: o.bg, color: o.c }}
              >
                <i className={"fa-solid " + o.ic} />
              </div>
              <div className="v">
                <span className="accent">{o.v}</span>
              </div>
              <div className="l">{o.l}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 10 · Certificate ─────────────────────────────────────── */
function Certificate() {
  const C = D.certificate;
  return (
    <Section className="u-section" id="certificate" style={{ background: "#fff" }}>
      <div className="u-wrap">
        <div className={cn(styles["aiw-cert"], "u-reveal")}>
          <div className={styles["aiw-cert-media"]}>
            <Image
              src={C.img}
              alt="Univerzia AI workshop certificate"
              width={1024}
              height={1024}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <Eyebrow>{C.eyebrow}</Eyebrow>
            <h2 className="u-title" style={{ textAlign: "left" }}>
              {C.title}
            </h2>
            <p className="u-sub" style={{ marginBottom: 24 }}>
              {C.sub}
            </p>
            <ul className={styles["aiw-cert-points"]}>
              {C.points.map((p) => (
                <li key={p}>
                  <i className="fa-solid fa-circle-check" /> {p}
                </li>
              ))}
            </ul>
            <LeadCTAButton
              className="u-btn u-btn--brand u-btn--lg"
              source="ai-workshops-certificate"
              program="AI Tools & Prompt Engineering Workshop"
              ctaType="get-certified"
              style={{ marginTop: 28 }}
            >
              Get Certified <i className="fa-solid fa-arrow-right" />
            </LeadCTAButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── 11 · Trainers ────────────────────────────────────────── */
function Trainers() {
  const T = D.trainers;
  return (
    <Section className="u-section" id="trainers">
      <div className="u-wrap">
        <Head block={T} />
        <div className={cn(styles["aiw-trainers"], "u-reveal")}>
          {T.items.map((m) => (
            <div key={m.n} className={styles["aiw-trainer"]}>
              <div className={styles["aiw-trainer-av"]} style={{ background: m.grad }}>
                {m.initials}
              </div>
              <div className="n">{m.n}</div>
              <div className="role">{m.role}</div>
              <div className="meta">
                <span>
                  <i className="fa-solid fa-briefcase" /> {m.exp}
                </span>
                <span className="dot">·</span>
                <span>{m.ex}</span>
              </div>
              <div className={styles["aiw-trainer-soc"]}>
                <a title="LinkedIn">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
                <a title="X">
                  <i className="fa-brands fa-x-twitter" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 12 · Reviews ─────────────────────────────────────────── */
function Reviews() {
  const R = D.reviews;
  return (
    <Section className="u-section" id="reviews" style={{ background: "#fff" }}>
      <div className="u-wrap">
        <Head block={R} />
        <div className={cn(styles["aiw-reviews"], "u-reveal")}>
          {R.items.map((r) => (
            <div key={r.n} className={styles["aiw-review"]}>
              <div className={styles["aiw-stars"]}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star" />
                ))}
              </div>
              <p className="q">&ldquo;{r.q}&rdquo;</p>
              <div className={styles["aiw-review-person"]}>
                <span
                  className={styles["aiw-review-av"]}
                  style={
                    r.img
                      ? { backgroundImage: `url(${r.img})` }
                      : { background: "var(--grad-brand)" }
                  }
                >
                  {r.img ? "" : initials(r.n)}
                </span>
                <div>
                  <div className="n">{r.n}</div>
                  <div className="r">{r.r}</div>
                </div>
                <span className={styles["aiw-review-quote"]}>&rdquo;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 13 · FAQ ─────────────────────────────────────────────── */
function FaqSection() {
  const F = D.faq;
  return (
    <Section className="u-section" id="faq">
      <div className="u-wrap">
        <Head block={F} />
        <Faq items={F.items} />
      </div>
    </Section>
  );
}

/* ── 14 · Final CTA ───────────────────────────────────────── */
function FinalCTA() {
  const C = D.cta;
  return (
    <Section className="u-section" id="join">
      <div className="u-wrap">
        <div className="u-finalcta u-reveal">
          <div className="u-finalcta-inner">
            <div className={styles["aiw-cta-price"]}>
              <span className="now">{C.priceNow}</span>
              <span className="was">{C.priceWas}</span>
              <span className="off">{C.off}</span>
            </div>
            <h2>{C.title}</h2>
            <p>{C.sub}</p>
            <div className={styles["aiw-cta-row"]}>
              <LeadCTAButton className="u-btn u-btn--primary u-btn--lg" source="ai-workshops-cta" program="AI Tools & Prompt Engineering Workshop" ctaType="reserve-seat">
                Reserve My Seat <i className="fa-solid fa-arrow-right" />
              </LeadCTAButton>
              <Link className="u-btn u-btn--ghost-dark u-btn--lg" href="/programs">
                Explore Full Programs
              </Link>
            </div>
            <div className={styles["aiw-cta-assure"]}>
              <span>
                <i className="fa-solid fa-certificate" /> Certificate included
              </span>
              <span>
                <i className="fa-solid fa-infinity" /> Lifetime access
              </span>
              <span>
                <i className="fa-solid fa-gift" /> ₹10,500 in bonuses
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function AiWorkshopsPage() {
  return (
    <main>
      <Hero />
      <Media />
      <Reality />
      <Curriculum />
      <WhyJoin />
      <Tools />
      <Bonuses />
      <Journey />
      <Outcomes />
      <Certificate />
      <Trainers />
      <Reviews />
      <FaqSection />
      <FinalCTA />
    </main>
  );
}
