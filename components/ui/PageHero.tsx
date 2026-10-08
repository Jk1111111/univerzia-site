import { type ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Button } from "./Button";
import { EduImage } from "./EduImage";
import { GradientLastWord } from "./SectionHeading";
import { PageHeroBot } from "./PageHeroBot";
import { StemAmbient } from "./StemAmbient";
import { clsx } from "clsx";

export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imageFallback,
  primaryCta,
  secondaryCta,
  tone = "light",
}: {
  breadcrumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageFallback?: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={clsx(
        "relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40",
        dark ? "bg-navy" : "bg-paper"
      )}
    >
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 bg-grid",
          dark ? "opacity-[0.06]" : "opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
        )}
      />
      <StemAmbient dark={dark} showLine={false} />
      <PageHeroBot />
      <Container
        className={clsx(
          "relative",
          image && "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
        )}
      >
        <div>
          <Reveal>
            <Breadcrumbs items={breadcrumbs} />
          </Reveal>
          {eyebrow && (
            <Reveal delay={0.04}>
              <span
                className={clsx(
                  "mt-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider",
                  dark ? "border-white/15 bg-white/5 text-cyan" : "border-line bg-white text-electric"
                )}
              >
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h1
              className={clsx(
                "mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl",
                dark ? "text-white" : "text-ink"
              )}
            >
              <GradientLastWord text={title} warm={dark} />
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.14}>
              <p
                className={clsx(
                  "mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
                  dark ? "text-white/65" : "text-muted"
                )}
              >
                {description}
              </p>
            </Reveal>
          )}
          {(primaryCta || secondaryCta) && (
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {primaryCta && (
                  <Button href={primaryCta.href} size="lg" variant={dark ? "light" : "primary"}>
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    href={secondaryCta.href}
                    size="lg"
                    variant={dark ? "ghost" : "secondary"}
                    showIcon={false}
                    className={dark ? "text-white hover:text-cyan" : undefined}
                  >
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {image !== undefined && (
          <Reveal direction="left" delay={0.1}>
            <div className="relative aspect-[4/3.2] w-full overflow-hidden rounded-[2rem] shadow-lift">
              <EduImage
                src={image}
                alt={imageAlt ?? title}
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="h-full w-full"
                fallback={imageFallback ?? <div className="h-full w-full bg-paper-2" />}
              />
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
