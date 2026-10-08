"use client";

import { studentExperience } from "@/data/studentExperience";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { EduImage } from "@/components/ui/EduImage";
import { clsx } from "clsx";

const chipIcons: Record<string, string> = {
  Coding: "code-2",
  Robotics: "bot",
  Electronics: "cpu",
  "AI Projects": "scan-eye",
  "Team Builds": "users",
  Competitions: "trophy",
};

const tileAccent: Record<string, string> = {
  electric: "from-electric to-electric-2",
  violet: "from-violet to-electric",
  orange: "from-orange to-amber",
  green: "from-green to-cyan",
};

export function StudentExperience() {
  return (
    <section id="programs" className="overflow-hidden bg-paper py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-ink">
              {studentExperience.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">
              {studentExperience.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {studentExperience.paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              {studentExperience.activities.map((activity) => (
                <span
                  key={activity}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink shadow-soft"
                >
                  <Icon name={chipIcons[activity] ?? "sparkles"} className="size-4 text-violet-ink" />
                  {activity}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9">
              <Button href="#showcase" variant="secondary" size="lg">
                See What Students Build
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto grid aspect-[4/5] w-full max-w-md grid-cols-2 grid-rows-2 gap-3">
            {studentExperience.moments.map((m) => (
              <div
                key={m.label}
                className={clsx(
                  "group relative overflow-hidden rounded-3xl shadow-soft",
                  m.span === "lg" && "col-span-2 row-span-1"
                )}
              >
                <EduImage
                  src={m.image}
                  alt={m.label}
                  className="absolute inset-0 h-full w-full"
                  fallback={
                    <div className={clsx("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110", tileAccent[m.accent])}>
                      <div className="absolute inset-0 bg-dot-grid opacity-25" />
                    </div>
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                <span className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur">
                  <Icon name={m.icon} className="size-4.5" />
                </span>
                <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">{m.label}</span>
              </div>
            ))}

            <span className="absolute -bottom-5 -left-5 z-10 flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 text-xs font-semibold text-ink shadow-lift">
              <Icon name="trophy" className="size-4 text-amber-ink" />
              12 Active Builds Today
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
