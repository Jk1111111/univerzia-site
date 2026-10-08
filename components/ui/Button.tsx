"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Icon } from "./Icon";
import { useMagnetic } from "./Magnetic";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-electric shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] hover:shadow-lg hover:-translate-y-0.5",
  secondary:
    "bg-white text-ink border border-line hover:border-electric hover:text-electric hover:-translate-y-0.5",
  ghost: "text-ink hover:text-electric",
  light:
    "bg-white text-navy hover:bg-white/90 hover:-translate-y-0.5 shadow-lift",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  icon = "arrow-right",
  showIcon = true,
  onClick,
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: string;
  showIcon?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = clsx(base, variants[variant], sizes[size], "group", className);
  const magnetic = useMagnetic(0.35);

  const content = (
    <>
      <span>{children}</span>
      {showIcon && (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <MotionLink href={href} className={classes} onClick={onClick} {...magnetic}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type ?? "button"}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...magnetic}
    >
      {content}
    </motion.button>
  );
}
