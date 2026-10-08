import { galleryItems } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { EduImage } from "@/components/ui/EduImage";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { clsx } from "clsx";

const accentMap = {
  electric: "from-electric to-electric-2",
  cyan: "from-cyan to-electric-2",
  violet: "from-violet to-electric",
  green: "from-green to-cyan",
  amber: "from-amber to-green",
  orange: "from-orange to-amber",
};

const spanMap = {
  wide: "sm:col-span-2 aspect-[16/10]",
  tall: "row-span-2 aspect-[3/4] sm:aspect-auto",
  normal: "aspect-square sm:aspect-[4/5]",
};

export function Gallery() {
  return (
    <section id="resources" className="bg-paper py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Inside Univerzia Classrooms"
          title="A Look Into Our Labs, Workshops and Competitions"
          description="Real classrooms, real builds. This gallery is placeholder-ready — drop in campus photography and each tile updates automatically."
        />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[180px]">
          {galleryItems.map((item) => (
            <RevealItem
              key={item.caption}
              className={clsx("group relative overflow-hidden rounded-2xl shadow-soft", spanMap[item.span])}
            >
              <EduImage
                src={item.image}
                alt={item.caption}
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
                fallback={
                  <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-90", accentMap[item.accent])}>
                    <div className="absolute inset-0 bg-dot-grid opacity-25" />
                  </div>
                }
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
                  <Icon name={item.icon} className="size-6" />
                </span>
              </div>

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/0 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs font-medium leading-snug text-white">{item.caption}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
