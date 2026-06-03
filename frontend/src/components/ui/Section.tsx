"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Section({
  id,
  className,
  style,
  children,
  as: Tag = "section",
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    el.querySelectorAll<HTMLElement>(".u-reveal").forEach((n) => io.observe(n));

    return () => io.disconnect();
  }, []);

  return (
    // @ts-expect-error — polymorphic `as` prop, safe here
    <Tag id={id} ref={ref} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
