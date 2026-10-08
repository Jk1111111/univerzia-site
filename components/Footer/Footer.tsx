import Link from "next/link";
import Image from "next/image";
import { footerData } from "@/data/footer";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { StemAdventure } from "@/components/ui/StemAdventure";
import { FooterHeadline } from "./FooterHeadline";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Container className="relative pb-2 pt-20 sm:pt-24">
        <FooterHeadline tagline={footerData.tagline} ctaLabel="Book a School Demo" ctaHref="/contact" />
      </Container>

      <StemAdventure />

      <Container className="relative py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex rounded-xl bg-white px-3 py-2">
              <Image src={site.logo} alt="Univerzia AI" width={184} height={40} className="h-10 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {footerData.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {footerData.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-cyan hover:text-cyan"
                >
                  <Icon name={s.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {footerData.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${footerData.contact.email}`} className="flex items-start gap-2.5 text-sm text-white/55 transition-colors hover:text-cyan">
                  <Icon name="mail" className="mt-0.5 size-4 shrink-0" />
                  {footerData.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footerData.contact.phone.replace(/\s+/g, "")}`} className="flex items-start gap-2.5 text-sm text-white/55 transition-colors hover:text-cyan">
                  <Icon name="phone" className="mt-0.5 size-4 shrink-0" />
                  {footerData.contact.phone}
                </a>
              </li>
            </ul>
            <Link
              href={footerData.contact.enquiryHref}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-electric"
            >
              School Enquiry
              <Icon name="arrow-right" className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Our Offices</h3>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {footerData.contact.offices.map((office) => (
              <div key={office.name} className="flex items-start gap-3 text-sm text-white/60">
                <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-cyan" />
                <div>
                  <p className="font-semibold text-white">{office.name}</p>
                  <address className="mt-1 not-italic leading-relaxed">
                    {office.line1}, {office.city}, {office.state} {office.postalCode}
                  </address>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <MarqueeStrip />

      <Container className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Univerzia STEM Labs. All rights reserved.</p>
        <p>Designed for schools building what comes next.</p>
      </Container>
    </footer>
  );
}

function MarqueeStrip() {
  const words = [...footerData.marquee, ...footerData.marquee];
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-10">
            {words.map((word, i) => (
              <span key={`${dup}-${word}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-2xl font-bold tracking-tight text-white/15 sm:text-3xl">
                  {word}
                </span>
                <Icon name={i % 2 === 0 ? "bot" : "sparkles"} className="size-4 text-white/15" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
