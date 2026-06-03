"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./services.module.css";
import type { ServiceFaqItem } from "@/lib/data/services";

export default function ServiceFaq({ items }: { items: ServiceFaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={cn(styles["svc-faq"], "u-reveal")}>
      {items.map((f, i) => (
        <div
          key={f.q}
          className={cn(styles["svc-faq-item"], open === i && styles["open"])}
        >
          <button
            type="button"
            className={styles["svc-faq-q"]}
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span className="ic">
              <i className="fa-solid fa-chevron-down" />
            </span>
            <span className="txt">{f.q}</span>
          </button>
          <div className={styles["svc-faq-a"]}>
            {f.a.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
