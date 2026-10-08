import { clsx } from "clsx";
import { Reveal } from "./Reveal";

// Colors the final word of a heading with the site's signature gradient —
// the same "highlight the last word" treatment used across the reference
// designs (e.g. "Let's Build What's Next." with "Next." picked out).
export function GradientLastWord({ text, warm = false }: { text: string; warm?: boolean }) {
  const lastSpace = text.lastIndexOf(" ");
  if (lastSpace === -1) {
    return <span className={warm ? "text-gradient-warm" : "text-gradient"}>{text}</span>;
  }
  return (
    <>
      {text.slice(0, lastSpace + 1)}
      <span className={warm ? "text-gradient-warm" : "text-gradient"}>{text.slice(lastSpace + 1)}</span>
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={clsx(
              "mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider",
              tone === "dark"
                ? "border-line bg-white text-electric"
                : "border-white/15 bg-white/5 text-cyan"
            )}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={clsx(
            "text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]",
            tone === "dark" ? "text-ink" : "text-white"
          )}
        >
          <GradientLastWord text={title} />
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={clsx(
              "mt-4 text-base leading-relaxed sm:text-lg",
              tone === "dark" ? "text-muted" : "text-white/70"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
