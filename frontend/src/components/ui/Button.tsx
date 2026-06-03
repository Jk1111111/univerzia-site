import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "brand" | "ghost-dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center gap-[9px] font-sans font-semibold border-none rounded-[10px] cursor-pointer no-underline whitespace-nowrap transition-all duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-white [box-shadow:var(--shadow-orange)] hover:bg-brand-primary-600 hover:-translate-y-0.5 hover:[box-shadow:0_16px_34px_-8px_rgba(249,115,22,0.55)]",
  brand:
    "[background:var(--grad-brand)] text-white [box-shadow:var(--shadow-purple)] hover:-translate-y-0.5 hover:[box-shadow:0_16px_36px_-8px_rgba(124,58,237,0.6)]",
  "ghost-dark":
    "bg-white/[0.08] text-white border border-white/[0.18] backdrop-blur-[8px] hover:bg-white/[0.16] hover:-translate-y-0.5",
  outline:
    "bg-white text-fg-2 border-[1.5px] border-[var(--gray-300)] hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-50",
  ghost:
    "bg-transparent text-fg-2 hover:bg-[var(--gray-100)] hover:text-fg-1",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[15px] px-6 py-[13px]",
  lg: "text-base px-[30px] py-4",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
