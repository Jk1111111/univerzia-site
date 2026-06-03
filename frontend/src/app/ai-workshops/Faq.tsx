"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./aiworkshops.module.css";
import type { FaqItem } from "@/lib/data/aiWorkshops";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={cn(styles["aiw-faq"], "u-reveal")}>
      {items.map((f, i) => (
        <div
          key={f.q}
          className={cn(styles["aiw-faq-item"], open === i && styles["open"])}
        >
          <button
            type="button"
            className={styles["aiw-faq-q"]}
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span className="ic">
              <i className="fa-solid fa-chevron-down" />
            </span>
            <span className="txt">{f.q}</span>
          </button>
          <div className={styles["aiw-faq-a"]}>
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
