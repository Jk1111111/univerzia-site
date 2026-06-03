import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "indigo"
  | "orange"
  | "green"
  | "purple"
  | "gray"
  | "cyan"
  | "pink";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  indigo: "bg-brand-indigo-light text-brand-indigo",
  orange: "bg-brand-primary-50  text-brand-primary-600",
  green:  "bg-success-light     text-success",
  purple: "bg-brand-purple-light text-brand-purple",
  gray:   "bg-[var(--gray-100)] text-fg-2",
  cyan:   "bg-[#ECFEFF]         text-[var(--cyan)]",
  pink:   "bg-[#FDF4FF]         text-[var(--pink)]",
};

export default function Badge({
  variant = "indigo",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11.5px] font-bold px-[11px] py-1 rounded-full",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
