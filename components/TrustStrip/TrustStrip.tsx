import { badges } from "@/data/badges";
import { Icon } from "@/components/ui/Icon";

export function TrustStrip() {
  const loop = [...badges, ...badges];

  return (
    <section className="relative overflow-hidden border-y border-line bg-white py-6" aria-label="Program highlights">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

      <div className="flex w-max animate-marquee gap-10">
        {loop.map((badge, i) => (
          <div
            key={`${badge.label}-${i}`}
            aria-hidden={i >= badges.length}
            className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-ink/70"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-electric/10 text-electric">
              <Icon name={badge.icon} className="size-4" />
            </span>
            {badge.label}
          </div>
        ))}
      </div>
    </section>
  );
}
