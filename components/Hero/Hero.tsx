import { Container } from "@/components/ui/Container";
import { HeroCopy } from "./HeroCopy";
import { HeroSceneStage } from "./HeroSceneStage";

/**
 * The approved static workbench composition, now staged with scroll-tied
 * depth and mouse parallax (see HeroSceneStage) rather than a scripted
 * animated sequence. A scroll-driven camera/rover "boot sequence" was tried
 * here previously and explicitly rejected — do not resurrect that concept
 * (RoboticsWorkbenchSequence.tsx / ScrollStory.tsx, both unused) as the
 * homepage hero animation.
 *
 * Deliberately does NOT reuse the shared AnimatedRobot mascot (already the
 * footer/WhoWeAre/FinalCTA character) as a hero companion — that's exactly
 * the "same robot everywhere" repetition the brand is trying to get away
 * from. Instead the workbench scene itself now carries its own, unique
 * continuous motion (idle arm sway, a scanning sensor mast, a holographic
 * readout, a blinking cursor — see RoboticsWorkbenchScene) so the hero reads
 * as alive from first paint without leaning on the mascot.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050914] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-15" />
      <div className="pointer-events-none absolute -left-32 top-1/3 size-[26rem] rounded-full bg-electric/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-[22rem] rounded-full bg-violet/15 blur-[120px]" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-8">
          <HeroCopy />
          <div className="relative mx-auto w-full max-w-2xl">
            <HeroSceneStage className="h-auto w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
