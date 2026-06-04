"use client";

import { useLeadModal } from "@/contexts/LeadModalContext";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils/cn";
import { contactQuick } from "@/lib/data/contact";
import s from "./contact.module.css";

export default function QuickSupport() {
  const { open } = useLeadModal();
  const Q = contactQuick;

  return (
    <Section id="quick" className={s["co-section"]}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <span className="u-eyebrow">
            <span className="bar" />
            {Q.eyebrow}
          </span>
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
              <button
                onClick={() =>
                  open({
                    source: "contact-quick-support",
                    program: item.program,
                    ctaType: item.ctaType,
                  })
                }
                className="lnk"
                style={{ color: item.c }}
              >
                {item.lnk} <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
