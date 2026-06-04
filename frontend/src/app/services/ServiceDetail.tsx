import Section from "@/components/ui/Section";
import LeadCTAButton from "@/components/ui/LeadCTAButton";
import { cn } from "@/lib/utils/cn";
import ServiceFaq from "./ServiceFaq";
import styles from "./services.module.css";
import type {
  ServiceDetail as ServiceDetailData,
  ServiceExtra,
  IconCard,
  ServiceOverview,
  SectionBlock,
} from "@/lib/data/services";

/* ── Small helpers ────────────────────────────────────────── */
function Eyebrow({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span className={cn(styles["svc-eyebrow"], light && styles["light"])}>
      <span className="bar" /> {children}
    </span>
  );
}

interface HeadBlock {
  eyebrow: string;
  title: string;
  sub?: string;
}
function Head({ block, light }: { block: HeadBlock; light?: boolean }) {
  return (
    <div className={cn(styles["svc-head"], "u-reveal")}>
      <Eyebrow light={light}>{block.eyebrow}</Eyebrow>
      <h2 className={styles["svc-title"]} style={light ? { color: "#fff" } : undefined}>
        {block.title}
      </h2>
      {block.sub ? (
        <p
          className={styles["svc-sub"]}
          style={light ? { color: "rgba(255,255,255,0.72)" } : undefined}
        >
          {block.sub}
        </p>
      ) : null}
    </div>
  );
}

function Stars({ n }: { n?: number }) {
  return (
    <div className="stars">
      {Array.from({ length: n || 5 }).map((_, i) => (
        <i key={i} className="fa-solid fa-star" />
      ))}
    </div>
  );
}

const initials = (n: string) =>
  n
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("");

/* ── Product mockup ───────────────────────────────────────── */
function Mock({ type, accent }: { type: "browser" | "app"; accent: string }) {
  if (type === "browser") {
    return (
      <div className={styles["svc-mock"]}>
        <div className={styles["svc-mock-bar"]}>
          <div className="dots">
            <span style={{ background: "#FF5F57" }} />
            <span style={{ background: "#FEBC2E" }} />
            <span style={{ background: "#28C840" }} />
          </div>
          <div className="url">
            <i className="fa-solid fa-lock" style={{ fontSize: 9 }} /> univerziaai.in
          </div>
        </div>
        <div className={styles["svc-mock-body"]}>
          <div className={styles["svc-mock-chart"]} style={{ marginBottom: 12 }}>
            <div className="top">
              <span className="a" />
              <span className="b" />
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}
            >
              <div>
                <div
                  style={{
                    height: 16,
                    width: "70%",
                    borderRadius: 5,
                    background: "var(--gray-200)",
                    marginBottom: 9,
                  }}
                />
                <div
                  style={{
                    height: 9,
                    width: "95%",
                    borderRadius: 4,
                    background: "var(--gray-100)",
                    marginBottom: 6,
                  }}
                />
                <div
                  style={{
                    height: 9,
                    width: "82%",
                    borderRadius: 4,
                    background: "var(--gray-100)",
                    marginBottom: 14,
                  }}
                />
                <div
                  style={{ height: 30, width: 110, borderRadius: 8, background: accent }}
                />
              </div>
              <div
                style={{
                  borderRadius: 10,
                  background: `color-mix(in srgb, ${accent} 14%, #fff)`,
                  border: "1px solid var(--line)",
                }}
              />
            </div>
          </div>
          <div className={styles["svc-mock-kpis"]}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles["svc-mock-kpi"]}>
                <div
                  className="ic"
                  style={{
                    background: `color-mix(in srgb, ${accent} ${18 + i * 8}%, #fff)`,
                  }}
                />
                <div className="v" />
                <div className="l" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  // app dashboard
  return (
    <div className={styles["svc-mock"]}>
      <div className={styles["svc-mock-bar"]}>
        <div className="dots">
          <span style={{ background: "#FF5F57" }} />
          <span style={{ background: "#FEBC2E" }} />
          <span style={{ background: "#28C840" }} />
        </div>
        <div className="url">
          <i className="fa-solid fa-lock" style={{ fontSize: 9 }} /> app.univerziaai.in
        </div>
      </div>
      <div className={styles["svc-mock-body"]}>
        <div className={styles["svc-mock-app"]}>
          <div className={styles["svc-mock-side"]}>
            <div className="logo" style={{ background: accent }} />
            <div className="ni on" style={{ background: accent }} />
            <div className="ni" />
            <div className="ni" />
            <div className="ni" />
            <div className="ni" />
          </div>
          <div className={styles["svc-mock-main"]}>
            <div className={styles["svc-mock-kpis"]}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={styles["svc-mock-kpi"]}>
                  <div
                    className="ic"
                    style={{
                      background: `color-mix(in srgb, ${accent} ${20 + i * 10}%, #fff)`,
                    }}
                  />
                  <div className="v" />
                  <div className="l" />
                </div>
              ))}
            </div>
            <div className={styles["svc-mock-chart"]}>
              <div className="top">
                <span className="a" />
                <span className="b" />
              </div>
              <div className={styles["svc-mock-bars"]}>
                {[42, 64, 50, 82, 70, 95, 76].map((h, i) => (
                  <i key={i} style={{ height: h + "%" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function SvcHero({ s }: { s: ServiceDetailData }) {
  const h = s.hero;
  return (
    <header className={styles["svc-hero"]}>
      <div className={cn("u-wrap", styles["svc-hero-grid"])}>
        <div>
          <span className={styles["svc-hero-pill"]}>
            <i className={"fa-solid " + h.pill[0]} /> {h.pill[1]}
          </span>
          <h1>
            {h.title[0]}
            <span className="g">{h.title[1]}</span>
          </h1>
          <p className={styles["svc-hero-lead"]}>{h.lead}</p>
          <div className={styles["svc-hero-bullets"]}>
            {h.bullets.map((b) => (
              <span key={b}>
                <i className="fa-solid fa-circle-check" /> {b}
              </span>
            ))}
          </div>
          <div className={styles["svc-hero-cta"]}>
            <LeadCTAButton className="u-btn u-btn--svc u-btn--lg" source="service-hero" program={s.navLabel} ctaType={h.primary.label.toLowerCase().replace(/\s+/g, "-")}>
              {h.primary.label} <i className="fa-solid fa-arrow-right" />
            </LeadCTAButton>
            <a className="u-btn u-btn--svc-soft u-btn--lg" href="#features">
              {h.secondary.label}
            </a>
          </div>
          {h.trust && (
            <div className={styles["svc-hero-trust"]}>
              <span className="stars">★★★★★</span>
              <span>
                <b>{h.trust.rating}</b> {h.trust.text}
              </span>
            </div>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <Mock type={h.mock} accent={s.c} />
          <div className={cn(styles["svc-mock-float"], styles["tl"])}>
            <div className="ic" style={{ background: s.c }}>
              <i className="fa-solid fa-bolt" />
            </div>
            <div>
              <div className="t">Live &amp; secure</div>
              <div className="d">99.9% uptime</div>
            </div>
          </div>
          <div className={cn(styles["svc-mock-float"], styles["br"])}>
            <div className="ic" style={{ background: s.c2 || s.c }}>
              <i className="fa-solid fa-arrow-trend-up" />
            </div>
            <div>
              <div className="t">Growing fast</div>
              <div className="d">Built to scale</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Sticky sub-nav ───────────────────────────────────────── */
function SubNav({ s }: { s: ServiceDetailData }) {
  return (
    <div className={styles["svc-subnav"]}>
      <div className={styles["svc-subnav-inner"]}>
        <span className="brand">
          <span className="dot" /> {s.navLabel}
        </span>
        {s.subnav.map(([label, id]) => (
          <a key={id} href={"#" + id}>
            {label}
          </a>
        ))}
        <LeadCTAButton className="sub-cta" source="service-subnav" program={s.navLabel} ctaType={s.product ? "book-demo" : "get-started"}>
          {s.product ? "Book a Demo" : "Get Started"}
        </LeadCTAButton>
      </div>
    </div>
  );
}

/* ── Stat bar (+ optional logos) ──────────────────────────── */
function StatBar({ s }: { s: ServiceDetailData }) {
  return (
    <Section
      className={cn(
        styles["svc-section"],
        styles["svc-section--tight"],
        styles["svc-section--white"]
      )}
    >
      <div className="u-wrap">
        <div className={cn(styles["svc-statbar"], "u-reveal")}>
          {s.stats.map((st) => (
            <div key={st.l} className={styles["svc-stat"]}>
              <div className="v">
                <span className="accent">{st.v}</span>
                {st.suffix}
              </div>
              <div className="l">{st.l}</div>
            </div>
          ))}
        </div>
        {s.logos && (
          <div className={cn(styles["svc-logos"], "u-reveal")} style={{ marginTop: 48 }}>
            <span className="lbl">Built with a modern, proven stack</span>
            {s.logos.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

function sectionClass(white: boolean) {
  return cn(styles["svc-section"], white && styles["svc-section--white"]);
}

/* ── Feature grid ─────────────────────────────────────────── */
function Features({
  block,
  id,
  white,
}: {
  block: SectionBlock<IconCard>;
  id?: string;
  white: boolean;
}) {
  return (
    <Section id={id} className={sectionClass(white)}>
      <div className="u-wrap">
        <Head block={block} />
        <div className={cn(styles["svc-features"], "u-reveal")}>
          {block.items.map((f) => (
            <div
              key={f.t}
              className={styles["svc-feature"]}
              style={{ ["--c"]: f.c } as React.CSSProperties}
            >
              <div
                className={styles["svc-feature-ic"]}
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

/* ── Module grid ──────────────────────────────────────────── */
function Modules({
  block,
  id,
  white,
}: {
  block: SectionBlock<IconCard>;
  id?: string;
  white: boolean;
}) {
  return (
    <Section id={id} className={sectionClass(white)}>
      <div className="u-wrap">
        <Head block={block} />
        <div className={cn(styles["svc-modules"], "u-reveal")}>
          {block.items.map((m) => (
            <div
              key={m.t}
              className={styles["svc-module"]}
              style={{ ["--c"]: m.c } as React.CSSProperties}
            >
              <div
                className={styles["svc-module-ic"]}
                style={{ background: m.bg, color: m.c }}
              >
                <i className={"fa-solid " + m.ic} />
              </div>
              <h4>{m.t}</h4>
              <p>{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Overview (split) ─────────────────────────────────────── */
function Overview({
  block,
  s,
  white,
}: {
  block: ServiceOverview;
  s: ServiceDetailData;
  white: boolean;
}) {
  return (
    <Section id="overview" className={sectionClass(white)}>
      <div className="u-wrap">
        <div
          className={cn(
            styles["svc-split"],
            "u-reveal",
            block.side === "right" && styles["rev"]
          )}
        >
          <div className={styles["svc-split-body"]}>
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2>{block.title}</h2>
            {block.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul className={styles["svc-checklist"]}>
              {block.points.map((pt) => (
                <li key={pt.t}>
                  <i className="fa-solid fa-check" />
                  <span>
                    <b>{pt.t}</b> — {pt.d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles["svc-split-media"]} style={{ position: "relative" }}>
            <Mock type={block.mock} accent={s.c} />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Solutions / industries ───────────────────────────────── */
function Solutions({
  block,
  id,
  white,
}: {
  block: SectionBlock<IconCard>;
  id?: string;
  white: boolean;
}) {
  return (
    <Section id={id || "solutions"} className={sectionClass(white)}>
      <div className="u-wrap">
        <Head block={block} />
        <div className={cn(styles["svc-solutions"], "u-reveal")}>
          {block.items.map((it) => (
            <div key={it.t} className={styles["svc-solution"]}>
              <div className={styles["svc-solution-ic"]} style={{ background: it.c }}>
                <i className={(it.brand ? "fa-brands " : "fa-solid ") + it.ic} />
              </div>
              <h4>{it.t}</h4>
              <p>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Why choose ───────────────────────────────────────────── */
function Why({
  block,
  id,
  white,
}: {
  block: SectionBlock<{ ic: string; t: string; d: string }>;
  id?: string;
  white: boolean;
}) {
  return (
    <Section id={id} className={sectionClass(white)}>
      <div className="u-wrap">
        <Head block={block} />
        <div className={cn(styles["svc-why"], "u-reveal")}>
          {block.items.map((w) => (
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

/* ── Process ──────────────────────────────────────────────── */
function Process({
  block,
  white,
}: {
  block: SectionBlock<{ ic: string; t: string; d: string }>;
  white: boolean;
}) {
  return (
    <Section id="process" className={sectionClass(white)}>
      <div className="u-wrap">
        <Head block={block} />
        <div className={cn(styles["svc-process"], "u-reveal")}>
          {block.items.map((st, i) => (
            <div key={st.t} className={styles["svc-step"]}>
              <span className={styles["svc-step-num"]}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles["svc-step-ic"]}>
                <i className={"fa-solid " + st.ic} />
              </div>
              <h4>{st.t}</h4>
              <p>{st.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Benefits (dark panel) ────────────────────────────────── */
function Benefits({
  block,
}: {
  block: SectionBlock<{ v: string; l: string }>;
}) {
  return (
    <Section className={styles["svc-section"]}>
      <div className="u-wrap">
        <div className={cn(styles["svc-darkpanel"], "u-reveal")}>
          <div className={styles["svc-darkpanel-inner"]}>
            <div
              className={cn(styles["svc-head"], styles["left"])}
              style={{ maxWidth: 620, marginBottom: 44 }}
            >
              <Eyebrow light>{block.eyebrow}</Eyebrow>
              <h2 className={styles["svc-title"]} style={{ color: "#fff" }}>
                {block.title}
              </h2>
              {block.sub ? (
                <p
                  className={styles["svc-sub"]}
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {block.sub}
                </p>
              ) : null}
            </div>
            <div className={styles["svc-benefits"]}>
              {block.items.map((b) => (
                <div key={b.l} className={styles["svc-benefit"]}>
                  <div className="v">{b.v}</div>
                  <div className="l">{b.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Testimonials ─────────────────────────────────────────── */
function Testimonials({
  block,
  white,
}: {
  block: SectionBlock<{ q: string; n: string; r: string; rating: number }>;
  white: boolean;
}) {
  return (
    <Section className={sectionClass(white)}>
      <div className="u-wrap">
        <Head block={block} />
        <div className={cn(styles["svc-testis"], "u-reveal")}>
          {block.items.map((t) => (
            <div key={t.n} className={styles["svc-testi"]}>
              <Stars n={t.rating} />
              <p className="q">&ldquo;{t.q}&rdquo;</p>
              <div className={styles["svc-testi-person"]}>
                <span
                  className={styles["svc-testi-av"]}
                  style={{ background: "var(--grad-brand)" }}
                >
                  {initials(t.n)}
                </span>
                <div>
                  <div className="n">{t.n}</div>
                  <div className="r">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── FAQ (Head server + interactive client leaf) ──────────── */
function FaqSection({
  block,
  white,
}: {
  block: SectionBlock<import("@/lib/data/services").ServiceFaqItem>;
  white: boolean;
}) {
  return (
    <Section id="faq" className={sectionClass(white)}>
      <div className="u-wrap">
        <Head block={block} />
        <ServiceFaq items={block.items} />
      </div>
    </Section>
  );
}

/* ── Final CTA ────────────────────────────────────────────── */
function FinalCTA({ block, serviceName }: { block: ServiceDetailData["cta"]; serviceName: string }) {
  return (
    <Section id="cta" className={styles["svc-section"]}>
      <div className="u-wrap">
        <div className={cn(styles["svc-cta"], "u-reveal")}>
          <div className={styles["svc-cta-inner"]}>
            <h2>{block.title}</h2>
            <p>{block.sub}</p>
            <div className={styles["svc-cta-actions"]}>
              {block.actions.map((a) => (
                <LeadCTAButton
                  key={a.label}
                  className={
                    "u-btn u-btn--lg " +
                    (a.style === "primary"
                      ? "u-btn--primary"
                      : a.style === "soft"
                        ? "u-btn--brand"
                        : "u-btn--ghost-dark")
                  }
                  source="service-cta"
                  program={serviceName}
                  ctaType={a.label.toLowerCase().replace(/\s+/g, "-")}
                >
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

/* ── Extra (dispatch by layout) ───────────────────────────── */
function Extra({ block, white }: { block: ServiceExtra; white: boolean }) {
  if (block.layout === "why") {
    return <Why block={block} id={block.id} white={white} />;
  }
  return <Solutions block={block} id={block.id} white={white} />;
}

/* ═══════════════════════════════════════════════════════════
   Composer — replicates prototype ServicePage order + the
   alternating white/sunken background rhythm.
   ═══════════════════════════════════════════════════════════ */
export default function ServiceDetail({ s }: { s: ServiceDetailData }) {
  // Per-page accent — set on the wrapper, never on documentElement.
  const accent = {
    ["--svc"]: s.c,
    ["--svc-2"]: s.c2 || s.c,
    ["--svc-dark"]: s.cDark || s.c,
    ["--svc-light"]: s.cLight || s.c,
  } as React.CSSProperties;

  // White/sunken alternation: matches the prototype `i++ % 2 === 1`.
  let i = 0;
  const white = () => i++ % 2 === 1;

  const sections: React.ReactNode[] = [];
  sections.push(<Features key="features" block={s.features} id="features" white={white()} />);
  if (s.overview) {
    sections.push(<Overview key="overview" block={s.overview} s={s} white={white()} />);
  }
  if (s.modules) {
    sections.push(<Modules key="modules" block={s.modules} id="modules" white={white()} />);
  }
  if (s.solutions) {
    sections.push(<Solutions key="solutions" block={s.solutions} white={white()} />);
  }
  (s.extras || []).forEach((ex) => {
    sections.push(<Extra key={ex.id} block={ex} white={white()} />);
  });
  if (s.why) {
    sections.push(<Why key="why" block={s.why} white={white()} />);
  }
  if (s.process) {
    sections.push(<Process key="process" block={s.process} white={white()} />);
  }
  if (s.benefits) {
    sections.push(<Benefits key="benefits" block={s.benefits} />);
  }
  if (s.testimonials) {
    sections.push(<Testimonials key="testimonials" block={s.testimonials} white={white()} />);
  }
  sections.push(<FaqSection key="faq" block={s.faq} white={white()} />);

  return (
    <main style={accent}>
      <SvcHero s={s} />
      <SubNav s={s} />
      <StatBar s={s} />
      {sections}
      <FinalCTA block={s.cta} serviceName={s.navLabel} />
    </main>
  );
}
