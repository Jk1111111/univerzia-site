import type { Metadata } from "next";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { PageHeroBot } from "@/components/ui/PageHeroBot";
import { GradientLastWord } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TiltPanel } from "@/components/Contact/TiltPanel";
import { SectionWave } from "@/components/ui/SectionWave";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Request a school demo or get in touch with the Univerzia STEM Labs team about STEM, Robotics and AI programs for your school.",
};

const contactPoints: { icon: string; label: string; value: string; href?: string; accent: string }[] = [
  { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}`, accent: "bg-electric/10 text-electric" },
  { icon: "phone", label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s+/g, "")}`, accent: "bg-cyan/10 text-cyan-ink" },
  ...site.offices.map((office) => ({
    icon: "map-pin",
    label: `${office.name} Office`,
    value: `${office.line1}, ${office.city}, ${office.state} ${office.postalCode}`,
    accent: "bg-violet/10 text-violet-ink",
  })),
];

export default function ContactPage() {
  return (
    <section
      className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40"
      style={{ background: "linear-gradient(135deg, #eef1ff 0%, #fbfbfe 45%, #eafcfb 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <StemAmbient />
      <PageHeroBot />
      <Container className="relative">
        <Reveal>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            <GradientLastWord text="Let's Talk About Your School's STEM Program." />
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Tell us a bit about your school and we&apos;ll set up a demo tailored to your grades, timetable and goals.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal delay={0.15}>
            <h2 className="text-lg font-semibold text-ink">Reach Us Directly</h2>
            <ul className="mt-5 space-y-4">
              {contactPoints.map((point) => (
                <li key={point.label}>
                  {point.href ? (
                    <a href={point.href} className="group flex items-start gap-3 text-sm text-muted transition-colors hover:text-electric">
                      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${point.accent}`}>
                        <Icon name={point.icon} className="size-4" />
                      </span>
                      <span className="pt-1.5">{point.value}</span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-3 text-sm text-muted">
                      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${point.accent}`}>
                        <Icon name={point.icon} className="size-4" />
                      </span>
                      <span className="pt-1.5"><strong className="block font-semibold text-ink">{point.label}</strong>{point.value}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-line bg-white p-6">
              <p className="text-sm font-semibold text-ink">Prefer email for a school enquiry?</p>
              <a href={`mailto:${site.schoolEnquiryEmail}`} className="mt-1 block text-sm text-electric hover:underline">
                {site.schoolEnquiryEmail}
              </a>
            </div>

            <ParallaxImage
              src={media.teacherTraining[1]}
              alt="A member of the Univerzia team speaking with a school group"
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="mt-6 aspect-[16/10] rounded-2xl shadow-soft"
            />
          </Reveal>

          <Reveal direction="left" delay={0.2}>
            <TiltPanel className="relative rounded-3xl bg-gradient-to-br from-electric/40 via-cyan/30 to-violet/40 p-[1.5px] shadow-lift">
              <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-10">
                <ContactForm />
              </div>
            </TiltPanel>
          </Reveal>
        </div>
      </Container>

      <div className="relative mt-20">
        <SectionWave from="white" to="ink" />
      </div>
    </section>
  );
}
