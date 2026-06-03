import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils/cn";
import {
  contactHero,
  contactInfo,
  contactDepartments,
  contactQuick,
  contactMap,
  contactCta,
} from "@/lib/data/contact";
import ContactForm from "./ContactForm";
import ContactFaq from "./ContactFaq";
import s from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — Univerzia AI",
  description:
    "Get in touch with the Univerzia AI team in Varanasi. Reach out about programs, project enquiries, partnerships, or support — we usually reply within a few hours.",
};

/* ── Eyebrow helper ──────────────────────────────────────────── */
function Eyebrow({ text }: { text: string }) {
  return (
    <span className="u-eyebrow">
      <span className="bar" />
      {text}
    </span>
  );
}

/* ── 1. Contact Hero ─────────────────────────────────────────── */
function ContactHeroSection() {
  const H = contactHero;
  return (
    <header className={s["co-chero"]}>
      <div className="u-wrap">
        <div className={s["co-chero-inner"]}>
          <div className={s["co-chero-pill"]}>
            <span className="dot" />
            {H.pill}
          </div>
          <h1>
            {H.title[0]}
            <span className="g">{H.title[1]}</span>
          </h1>
          <p>{H.lead}</p>
          <div className={s["co-chero-chips"]}>
            {H.chips.map((chip) => (
              <a key={chip.t} href={chip.href} className={s["co-chero-chip"]}>
                <i className={`fa-solid ${chip.ic}`} />
                {chip.t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── 2. Form + Info split ────────────────────────────────────── */
function FormAndInfo() {
  const info = contactInfo;
  return (
    <Section className={s["co-section"]} style={{ paddingTop: 80 }}>
      <div className="u-wrap">
        <div className={cn(s["co-contact"], "u-reveal")}>
          {/* Left — form (client component) */}
          <ContactForm />

          {/* Right — info card */}
          <div className={s["co-info-card"]}>
            <div className="inner">
              <h3>{info.title}</h3>
              <p className="lead">{info.lead}</p>

              {info.rows.map((row) => (
                <div key={row.k} className={s["co-info-row"]}>
                  <div className={s["co-info-ic"]}>
                    <i className={`fa-solid ${row.ic}`} />
                  </div>
                  <div>
                    <div className="k">{row.k}</div>
                    {row.href ? (
                      <a href={row.href} className="v">
                        {row.v}
                      </a>
                    ) : (
                      <div className="v">{row.v}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className={s["co-info-social"]}>
                {info.socials.map((soc) => (
                  <a key={soc.title} href={soc.href} title={soc.title}>
                    <i className={`fa-brands ${soc.ic}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── 3. Departments ──────────────────────────────────────────── */
function Departments() {
  const D = contactDepartments;
  return (
    <Section className={cn(s["co-section"], s["co-section--white"])}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text={D.eyebrow} />
          <h2 className={s["co-title"]}>{D.title}</h2>
          <p className={s["co-sub"]}>{D.sub}</p>
        </div>
        <div className={cn(s["co-depts"], "u-reveal")}>
          {D.items.map((dept) => (
            <div key={dept.h} className={s["co-dept"]}>
              <div
                className={s["co-dept-ic"]}
                style={{ background: dept.tint, color: dept.color }}
              >
                <i className={`fa-solid ${dept.ic}`} />
              </div>
              <h4>{dept.h}</h4>
              <p>{dept.p}</p>
              <a href={`mailto:${dept.email}`}>
                {dept.email} <i className="fa-solid fa-arrow-right" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 4. Quick Support ────────────────────────────────────────── */
function QuickSupport() {
  const Q = contactQuick;
  return (
    <Section id="quick" className={s["co-section"]}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text={Q.eyebrow} />
          <h2 className={s["co-title"]}>{Q.title}</h2>
          <p className={s["co-sub"]}>{Q.sub}</p>
        </div>
        <div className={cn(s["co-quick"], "u-reveal")}>
          {Q.items.map((item) => (
            <div
              key={item.h}
              className={s["co-quick-card"]}
              style={{ "--c": item.c } as React.CSSProperties}
            >
              <div
                className={s["co-quick-ic"]}
                style={{ background: item.grad }}
              >
                <i className={`fa-solid ${item.ic}`} />
              </div>
              <h4>{item.h}</h4>
              <p>{item.p}</p>
              <a href={item.href} className="lnk" style={{ color: item.c }}>
                {item.lnk} <i className="fa-solid fa-arrow-right" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 5. Office Map ───────────────────────────────────────────── */
function OfficeMap() {
  const M = contactMap;
  return (
    <Section id="map" className={cn(s["co-section"], s["co-section--white"])}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <Eyebrow text="Find Us" />
          <h2 className={s["co-title"]}>Visit our Varanasi office</h2>
        </div>
        <div className={cn(s["co-map-wrap"], "u-reveal")}>
          {/* CSS-only map */}
          <div className={s["co-map"]}>
            <div className="road r1" />
            <div className="road r2" />
            <div className="road r3" />
            <div className="blob b1" />
            <div className="blob b2" />
            <div className={s["co-pin"]}>
              <span className="badge">
                <i className="fa-solid fa-location-dot" />
                Univerzia AI
              </span>
              <span className="needle" />
              <span className="pulse" />
            </div>
          </div>

          {/* Address side */}
          <div className={s["co-map-side"]}>
            <h3>{M.place}</h3>
            <p className="addr">{M.address}</p>
            {M.details.map((d) => (
              <div key={d.k} className={s["co-map-detail"]}>
                <div className="ic">
                  <i className={`fa-solid ${d.ic}`} />
                </div>
                <div>
                  <div className="k">{d.k}</div>
                  <div className="v">{d.v}</div>
                </div>
              </div>
            ))}
            <a
              href={M.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn--outline"
              style={{ marginTop: 22 }}
            >
              <i className="fa-solid fa-map-location-dot" />
              {M.cta.label}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── 7. Final CTA ────────────────────────────────────────────── */
function ContactFinalCTA() {
  const C = contactCta;
  return (
    <Section className="py-24 max-[860px]:py-16" style={{ background: "#fff" }}>
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
              <i className="fa-solid fa-bolt" style={{ color: "var(--brand-primary-light)" }} />
              Start a conversation
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
export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <FormAndInfo />
      <Departments />
      <QuickSupport />
      <OfficeMap />
      <ContactFaq />
      <ContactFinalCTA />
    </>
  );
}
