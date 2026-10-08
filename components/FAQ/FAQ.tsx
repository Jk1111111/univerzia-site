"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs as defaultFaqs, type Faq } from "@/data/faqs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";

export function FAQ({
  items = defaultFaqs,
  eyebrow = "Frequently Asked",
  title = "Questions Schools Ask Before Getting Started",
  sectionId = "faq",
  bare = false,
}: {
  items?: Pick<Faq, "question" | "answer">[];
  eyebrow?: string;
  title?: string;
  sectionId?: string;
  /** Render just the accordion, without the section wrapper/heading — for use inside another section. */
  bare?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const accordion = (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                id={`${sectionId}-trigger-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${sectionId}-panel-${i}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-ink sm:text-base">{faq.question}</span>
                <span
                  className={clsx(
                    "flex size-8 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink transition-colors duration-300",
                    isOpen && "bg-electric text-white"
                  )}
                >
                  <Icon
                    name="chevron-down"
                    className={clsx("size-4 transition-transform duration-300", isOpen && "rotate-180")}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${sectionId}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${sectionId}-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  if (bare) return accordion;

  return (
    <section id={sectionId} className="bg-paper-2 py-24 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
        <div className="mt-12">{accordion}</div>
      </Container>
    </section>
  );
}
