"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { navItems, primaryCta } from "@/data/navigation";
import { site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile menu / dropdowns on navigation. Adjusting state during render
  // (React's documented pattern for resetting state on prop change) rather than
  // in an effect, so it takes effect before paint with no extra render pass.
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpen(false);
    setOpenDropdown(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "bg-paper/95 shadow-soft backdrop-blur-md" : "bg-paper/70 backdrop-blur-sm"
      )}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between py-4" aria-label="Primary">
          <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
            <Image src={site.logo} alt="Univerzia AI" width={184} height={40} priority className="h-10 w-auto" />
          </Link>

          <ul className="hidden items-center lg:flex" onMouseLeave={scheduleClose}>
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="relative" onMouseEnter={() => item.dropdown && openMenu(item.label)}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active ? "text-electric" : "text-ink/80 hover:text-electric"
                    )}
                  >
                    {item.label}
                    {item.dropdown && (
                      <Icon
                        name="chevron-down"
                        className={clsx(
                          "size-3.5 transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.dropdown && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-10 w-[24rem] -translate-x-1/2 pt-3"
                      >
                        <div className="grid gap-1 rounded-2xl border border-line bg-white p-3 shadow-lift">
                          {item.dropdown.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              onClick={() => setOpenDropdown(null)}
                              className={clsx(
                                "flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-paper-2",
                                isActive(pathname, link.href) && "bg-electric/5"
                              )}
                            >
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                                <Icon name={link.icon ?? "sparkles"} className="size-4.5" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-ink">{link.label}</span>
                                {link.description && (
                                  <span className="mt-0.5 block text-xs leading-snug text-muted">
                                    {link.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          ))}
                          <Link
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border-t border-line py-2.5 text-sm font-semibold text-electric hover:bg-paper-2"
                          >
                            View All {item.label}
                            <Icon name="arrow-right" className="size-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Button href={primaryCta.href} size="md">
              {primaryCta.label}
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
          >
            <Icon name={open ? "x" : "menu"} className="size-5" />
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 h-[calc(100dvh-5rem)] overflow-y-auto bg-paper lg:hidden"
          >
            <div className="absolute inset-0 bg-grid opacity-40" />
            <Container className="relative flex flex-col gap-1 py-8">
              {navItems.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "block rounded-xl px-4 py-3 font-display text-2xl font-bold tracking-tight",
                        active ? "text-electric" : "text-ink hover:text-electric"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-1 mb-2 flex flex-wrap gap-x-4 gap-y-2 px-4">
                        {item.dropdown.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-xs font-medium text-muted hover:text-electric"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <Button href={primaryCta.href} className="mt-6 w-full" onClick={() => setOpen(false)}>
                {primaryCta.label}
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
