"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { Lightbox } from "@/components/ui/Lightbox";
import { photoJourney, type PhotoJourneyItem } from "@/data/photoJourney";

/**
 * The homepage's real-photography set piece — a horizontal gallery, NOT a
 * scroll-jacked pinned section. An earlier version hijacked the page's
 * vertical scroll to drive horizontal motion (a tall pinned track the
 * visitor had to scroll all the way through); that read as a forced,
 * "compulsory" slider rather than something the visitor is in control of, so
 * it's gone. This version never touches page scroll at all: on desktop the
 * track drifts sideways on its own, endlessly (the photo set is duplicated
 * back-to-back and the scroll position quietly wraps once a full set has
 * passed, so it never visibly "restarts"), and simply pauses under the
 * pointer so a visitor can read a caption or click through to the enlarged
 * photo — no prev/next buttons to operate. It's still a real scrollable
 * element underneath, so trackpad/wheel input keeps working too.
 */
export function PhotoJourney() {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <PhotoJourneyStatic />;
  }

  return (
    <>
      <PhotoJourneyDesktop />
      <PhotoJourneyMobile />
    </>
  );
}

function JourneyHeading() {
  return (
    <div className="max-w-md">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan backdrop-blur">
        Inside the Classroom
      </span>
      <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
        Not a Prototype. <span className="text-gradient">A Daily Reality.</span>
      </h2>
    </div>
  );
}

function PhotoJourneyDesktop() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const oneSetWidthRef = useRef(0);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Endless auto-drift: the track below renders the photo set twice back to
  // back. Each frame nudges scrollLeft forward a hair; once it has drifted
  // past exactly one full set's width, it's silently rewound by that same
  // width — since the second copy is pixel-identical to the first, the jump
  // is invisible and the belt reads as looping forever.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      oneSetWidthRef.current = track!.scrollWidth / 2;
    }
    measure();
    window.addEventListener("resize", measure);

    let frame = 0;
    function loop() {
      const el = trackRef.current;
      if (el && !pausedRef.current) {
        el.scrollLeft += 0.6;
        const setWidth = oneSetWidthRef.current;
        if (setWidth > 0 && el.scrollLeft >= setWidth) {
          el.scrollLeft -= setWidth;
        }
      }
      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  function pause() {
    pausedRef.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  }

  function resume() {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, 200);
  }

  return (
    <section className="relative hidden overflow-hidden bg-navy py-24 lg:block">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />
      <Container className="relative">
        <JourneyHeading />
      </Container>

      {/* no prev/next controls — the reel moves on its own and only pauses
          under the pointer, so a visitor can read a caption or click through
          without fighting the motion */}
      <div className="relative mt-10">
        <div
          ref={trackRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onPointerDown={pause}
          onPointerUp={resume}
          onWheel={() => {
            pause();
            resume();
          }}
          data-cursor="drag"
          className="scrollbar-none flex gap-6 overflow-x-auto px-[6vw] pb-4"
        >
          {[...photoJourney, ...photoJourney].map((item, i) => (
            <GalleryPanel key={`${item.id}-${i}`} item={item} index={i % photoJourney.length} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy to-transparent sm:w-28" />
      </div>
    </section>
  );
}

function GalleryPanel({ item, index }: { item: PhotoJourneyItem; index: number }) {
  return (
    <Lightbox
      src={item.image}
      alt={item.title}
      label={item.title}
      className="group relative block h-[62vh] w-[52vw] max-w-[600px] shrink-0 overflow-hidden rounded-[2rem] text-left shadow-2xl"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="55vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span className="absolute right-6 top-6 font-display text-6xl font-bold text-white/10">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-8">
        <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan backdrop-blur">
          {item.tag}
        </span>
        <h3 className="mt-4 max-w-sm text-2xl font-bold leading-tight text-white">{item.title}</h3>
      </div>
    </Lightbox>
  );
}

function PhotoJourneyMobile() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:hidden">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />
      <Container className="relative">
        <JourneyHeading />
      </Container>
      <div
        data-cursor="drag"
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4"
      >
        {photoJourney.map((item, i) => (
          <div
            key={item.id}
            className="relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.5rem] shadow-lift"
          >
            <Image src={item.image} alt={item.title} fill sizes="80vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <span className="absolute right-5 top-5 font-display text-4xl font-bold text-white/10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan backdrop-blur">
                {item.tag}
              </span>
              <h3 className="mt-3 text-lg font-bold leading-tight text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PhotoJourneyStatic() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <Container className="relative">
        <JourneyHeading />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photoJourney.map((item, i) => (
            <div key={item.id} className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
              <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute right-5 top-5 font-display text-4xl font-bold text-white/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan backdrop-blur">
                  {item.tag}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-tight text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
