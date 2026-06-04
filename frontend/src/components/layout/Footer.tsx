"use client";

import Link from "next/link";
import Logo from "./Logo";
import { footerCols } from "@/lib/data/homepage";

/** Maps footer item labels to real routes. Items not listed render as plain text. */
const FOOTER_HREFS: Record<string, string> = {
  // Learn
  "AI Workshops": "/ai-workshops",
  "AI Mastery": "/programs",
  "Tech Programs": "/programs",
  "Data Programs": "/programs",
  "Learning Paths": "/#paths",
  // Company
  "About Univerzia": "/about",
  "Contact": "/contact",
  // Services
  "Website Design": "/services/website-design",
  "Web Development": "/services/website-development",
  "Univerzia LMS": "/services/lms",
  "Univerzia ERP": "/services/erp",
  "E-Commerce": "/services/e-commerce",
  "Digital Marketing": "/services",
};

const SOCIALS = [
  { icon: "fa-linkedin-in", title: "LinkedIn", href: "https://www.linkedin.com/company/univerziaai/?viewAsMember=true", brand: true },
  { icon: "fa-instagram",   title: "Instagram", href: "https://www.instagram.com/univerzia.ai/", brand: true },
  { icon: "fa-x-twitter",   title: "X", href: "https://x.com/UniverziaA86401", brand: true },
  { icon: "fa-envelope",    title: "Email", href: "mailto:gautam.shukla@univerziaai.in", brand: false },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)" }} className="pt-16 pb-8 text-white/70">
      <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px]">
        {/* 4-col grid */}
        <div
          className="grid gap-10 mb-12
                     grid-cols-1 sm:grid-cols-2
                     lg:grid-cols-[1.6fr_1fr_1fr_1fr]"
        >
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block" style={{ marginBottom: 18 }}>
              <Logo onDark height={36} />
            </Link>
            <p className="text-[13.5px] leading-[1.7] max-w-[300px]" style={{ color: "rgba(255,255,255,0.60)" }}>
              An AI-powered learning ecosystem and technology company. Learn AI, build real projects,
              and future-proof your career — from Varanasi to the world.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5 mt-5">
              {SOCIALS.map(({ icon, title, href, brand }) => (
                <a
                  key={title}
                  href={href}
                  title={title}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center
                             cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.80)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <i className={`${brand ? "fa-brands" : "fa-solid"} ${icon} text-[15px]`} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.h}>
              <h5 className="text-[13px] font-bold tracking-[0.06em] uppercase text-white mb-[18px]">
                {col.h}
              </h5>
              <ul className="space-y-[11px]">
                {col.items.map((item) => {
                  const href = FOOTER_HREFS[item];
                  return (
                    <li key={item}>
                      {href ? (
                        <Link
                          href={href}
                          className="text-[13.5px] cursor-pointer transition-colors duration-150 hover:text-white"
                          style={{ color: "rgba(255,255,255,0.62)" }}
                        >
                          {item}
                        </Link>
                      ) : (
                        <span
                          className="text-[13.5px] cursor-pointer transition-colors duration-150 hover:text-white"
                          style={{ color: "rgba(255,255,255,0.62)" }}
                        >
                          {item}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap justify-between items-center gap-3 pt-6 text-[12.5px]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.50)" }}
        >
          <span>© {new Date().getFullYear()} Univerzia AI Pvt Ltd · Varanasi, India</span>
          <span>Privacy Policy · Terms · gautam.shukla@univerziaai.in</span>
        </div>
      </div>
    </footer>
  );
}
