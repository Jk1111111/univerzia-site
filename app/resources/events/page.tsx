import type { Metadata } from "next";
import { events } from "@/data/events";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past Univerzia STEM Labs workshops, competitions and innovation days.",
};

const typeMeta: Record<string, { icon: string; bg: string; text: string; badge: string }> = {
  Workshop: { icon: "presentation", bg: "bg-electric/10", text: "text-electric", badge: "bg-electric/10 text-electric" },
  Competition: { icon: "trophy", bg: "bg-amber/10", text: "text-amber-ink", badge: "bg-amber/10 text-amber-ink" },
  Training: { icon: "graduation-cap", bg: "bg-violet/10", text: "text-violet-ink", badge: "bg-violet/10 text-violet-ink" },
  "Innovation Day": { icon: "lightbulb", bg: "bg-green/10", text: "text-green-ink", badge: "bg-green/10 text-green-ink" },
};

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");

  return (
    <>
      <section
        className="relative overflow-hidden py-20 pt-32 sm:py-24 sm:pt-40"
        style={{ background: "linear-gradient(135deg, #fff2e6 0%, #fbfbfe 45%, #eef1ff 100%)" }}
      >
        <StemAmbient />
        <Container className="relative">
          <Reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Events" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Workshops, Competitions and Innovation Days
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <ParallaxImage
              src={media.kidsCoding[5]}
              alt="Students presenting a project at an innovation day event"
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="mt-8 aspect-[21/9] rounded-[2rem] shadow-lift"
            />
          </Reveal>

          <div className="mt-14">
            <h2 className="text-lg font-semibold text-ink">Upcoming</h2>
            {/* the prominent moment — a horizontal scroll-snap strip of
                large cards, not a uniform grid tile among past events */}
            <div data-cursor="drag" className="mt-6 overflow-x-auto pb-4">
              <RevealGroup className="flex snap-x snap-mandatory gap-5">
                {upcoming.map((event) => (
                  <UpcomingCard key={event.slug} event={event} />
                ))}
              </RevealGroup>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-lg font-semibold text-ink">Past Events</h2>
            {/* deliberately a compact, muted list — not repeated cards */}
            <RevealGroup className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
              {past.map((event) => (
                <PastRow key={event.slug} event={event} />
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}

function UpcomingCard({ event }: { event: (typeof events)[number] }) {
  const meta = typeMeta[event.type] ?? typeMeta.Workshop;
  const d = new Date(event.date);
  return (
    <RevealItem
      style={{ scrollSnapAlign: "start" }}
      className="w-[19rem] shrink-0 overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={clsx("flex items-center justify-between p-5", meta.bg)}>
        <span className={clsx("flex size-11 items-center justify-center rounded-xl bg-white", meta.text)}>
          <Icon name={meta.icon} className="size-5" />
        </span>
        <div className="text-right">
          <p className="font-display text-2xl font-bold text-ink">{d.getDate()}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{d.toLocaleDateString("en-IN", { month: "short" })}</p>
        </div>
      </div>
      <div className="p-5">
        <span className={clsx("rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide", meta.badge)}>{event.type}</span>
        <h3 className="mt-3 text-base font-semibold text-ink">{event.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{event.description}</p>
        <p className="mt-4 flex items-center gap-1.5 border-t border-line pt-4 text-xs text-muted">
          <Icon name="map-pin" className="size-3.5" />
          {event.location}
        </p>
      </div>
    </RevealItem>
  );
}

function PastRow({ event }: { event: (typeof events)[number] }) {
  const meta = typeMeta[event.type] ?? typeMeta.Workshop;
  return (
    <RevealItem className="flex items-center gap-4 px-5 py-4 opacity-70 transition-opacity duration-300 hover:opacity-100">
      <span className={clsx("flex size-9 shrink-0 items-center justify-center rounded-xl", meta.bg, meta.text)}>
        <Icon name={meta.icon} className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-ink">{event.title}</h3>
        <p className="text-xs text-muted">{event.location}</p>
      </div>
      <span className="shrink-0 text-xs text-muted">{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
    </RevealItem>
  );
}
