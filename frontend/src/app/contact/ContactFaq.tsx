"use client";

import { useState } from "react";
import { contactFaq } from "@/lib/data/contact";
import { Section } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import s from "./contact.module.css";

export default function ContactFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? -1 : i));

  return (
    <Section className={s["co-section"]}>
      <div className="u-wrap">
        <div className={cn(s["co-head"], "u-reveal")}>
          <span className="u-eyebrow">
            <span className="bar" />
            {contactFaq.eyebrow}
          </span>
          <h2 className={s["co-title"]}>{contactFaq.title}</h2>
        </div>

        <div className={cn(s["co-faq"], "u-reveal")}>
          {contactFaq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={cn(s["co-faq-item"], isOpen && s["co-faq-item--open"])}
              >
                <button
                  className={s["co-faq-q"]}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="ic">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                  <span className="txt">{item.q}</span>
                </button>
                <div className={s["co-faq-a"]}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
