"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

interface NavLink {
  label: string;
  href: string;
  /** route links highlight when the pathname matches; section links never highlight */
  route?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home",           href: "/",              route: true },
  { label: "Programs",       href: "/programs",      route: true },
  { label: "AI Workshops",   href: "/ai-workshops",  route: true },
  { label: "Services",       href: "/services",      route: true },
  { label: "About",          href: "/about",          route: true },
  { label: "Contact",        href: "/contact",        route: true },
];

function isActive(pathname: string, link: NavLink): boolean {
  if (!link.route) return false;
  if (link.href === "/") return pathname === "/";
  return pathname === link.href || pathname.startsWith(link.href + "/");
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 860) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close drawer whenever the route changes
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 70,
          background: scrolled
            ? "rgba(255,255,255,0.82)"
            : "rgba(255,255,255,0.60)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid rgba(255,255,255,0.30)",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div className="max-w-[1240px] mx-auto px-8 max-[860px]:px-[22px] h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 min-w-[120px]">
            <Logo priority />
          </Link>

          {/* Desktop links */}
          <ul className="hidden min-[860px]:flex items-center gap-[6px]">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all duration-150 hover:bg-black/[0.05]"
                    style={{ color: active ? "var(--brand-primary)" : "var(--fg-1)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden min-[860px]:flex items-center gap-[10px]">
            <Link
              href="/#cta"
              className="text-[13.5px] font-semibold px-4 py-[9px] rounded-[10px] transition-all duration-150 hover:bg-black/[0.05]"
              style={{ color: "var(--fg-1)" }}
            >
              Log In
            </Link>
            <Link
              href="/#cta"
              className="text-[13.5px] font-semibold px-5 py-[9px] rounded-[10px] text-white transition-all duration-200 hover:-translate-y-[1px]"
              style={{
                background: "var(--grad-brand)",
                boxShadow: "var(--shadow-purple)",
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="min-[860px]:hidden flex flex-col justify-center items-center w-[40px] h-[40px] rounded-[10px] cursor-pointer transition-colors duration-150 hover:bg-black/[0.06]"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className="block w-[20px] h-[2px] rounded-full transition-all duration-300"
              style={{
                background: "var(--fg-1)",
                transform: open ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-[20px] h-[2px] rounded-full mt-[4px] transition-all duration-300"
              style={{
                background: "var(--fg-1)",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-[20px] h-[2px] rounded-full mt-[4px] transition-all duration-300"
              style={{
                background: "var(--fg-1)",
                transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                marginTop: open ? 0 : undefined,
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className="fixed inset-0 z-40 min-[860px]:hidden transition-all duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
      </div>

      {/* Mobile drawer panel */}
      <div
        className="fixed top-[70px] left-0 right-0 z-40 min-[860px]:hidden transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          transform: open ? "translateY(0)" : "translateY(-8px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          padding: "16px 22px 24px",
        }}
      >
        <ul className="flex flex-col gap-1 mb-5">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-[11px] rounded-[10px] text-[15px] font-medium transition-colors duration-150 hover:bg-black/[0.04]"
                  style={{ color: active ? "var(--brand-primary)" : "var(--fg-1)" }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col gap-[10px] pt-4" style={{ borderTop: "1px solid var(--line)" }}>
          <Link
            href="/#cta"
            onClick={() => setOpen(false)}
            className="text-center text-[14px] font-semibold py-3 rounded-[10px] transition-colors duration-150 hover:bg-black/[0.04]"
            style={{ color: "var(--fg-1)", border: "1px solid var(--line)" }}
          >
            Log In
          </Link>
          <Link
            href="/#cta"
            onClick={() => setOpen(false)}
            className="text-center text-[14px] font-semibold py-3 rounded-[10px] text-white"
            style={{ background: "var(--grad-brand)" }}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Spacer so content is not hidden behind fixed nav */}
      <div style={{ height: 70 }} aria-hidden="true" />
    </>
  );
}
