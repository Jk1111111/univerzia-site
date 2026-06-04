"use client";

import { useLeadModal } from "@/contexts/LeadModalContext";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  source: string;
  program?: string;
  ctaType: string;
  children: React.ReactNode;
}

/**
 * Drop-in replacement for `<a href="#anchor">` CTAs in server components.
 * Opens the global lead-capture modal with pre-filled params.
 */
export default function LeadCTAButton({
  className,
  style,
  source,
  program,
  ctaType,
  children,
}: Props) {
  const { open } = useLeadModal();
  return (
    <button
      className={className}
      style={style}
      onClick={() => open({ source, program, ctaType })}
    >
      {children}
    </button>
  );
}
