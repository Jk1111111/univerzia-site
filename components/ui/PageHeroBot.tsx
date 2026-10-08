import { AnimatedRobot } from "./AnimatedRobot";

/**
 * A small recurring animated robot mascot for every inner page's PageHero —
 * the same hand-drawn character used in the homepage hero, so it recurs
 * site-wide. Pure CSS idle motion (no client JS), so it renders for free on
 * the server and freezes cleanly under the site-wide `prefers-reduced-motion`
 * rule in globals.css.
 */
export function PageHeroBot() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-20 hidden h-16 w-20 sm:block sm:right-8 sm:top-24 lg:h-20 lg:w-24"
    >
      <AnimatedRobot />
    </div>
  );
}
