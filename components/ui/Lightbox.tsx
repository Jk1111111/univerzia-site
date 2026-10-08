"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";

/**
 * Wraps a thumbnail with real click-to-enlarge behavior — the custom
 * cursor's "View" label was appearing on photos across the site with no
 * action behind the click, which is a broken affordance, not a subtle one.
 * This is the fix for the contexts where enlarging a photo genuinely makes
 * sense (a gallery/scatter of real photography); everywhere else the
 * misleading "View" cursor cue has been removed instead of leaving a click
 * that does nothing.
 */
export function Lightbox({
  src,
  alt,
  label,
  children,
  className,
  style,
}: {
  src: string;
  alt: string;
  label?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="view"
        aria-label={`View larger image: ${alt}`}
        className={className}
        style={style}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <Icon name="x" className="size-5" />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full max-h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={src} alt={alt} fill sizes="90vw" className="object-contain" />
              {label && (
                <p className="absolute -bottom-9 left-0 text-sm font-medium text-white/70">{label}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
