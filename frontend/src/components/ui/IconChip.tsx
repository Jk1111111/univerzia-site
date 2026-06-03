import { cn } from "@/lib/utils/cn";

type ChipSize = "xs" | "sm" | "md" | "lg" | "xl";

interface IconChipProps {
  /** Font Awesome icon class(es), e.g. "fa-brain" or "fa-brands fa-linkedin-in" */
  icon: string;
  color: string;
  bg: string;
  size?: ChipSize;
  radius?: string;
  className?: string;
}

const sizes: Record<ChipSize, { box: string; icon: string; radius: string }> = {
  xs: { box: "w-8 h-8",   icon: "text-sm",    radius: "rounded-[8px]"  },
  sm: { box: "w-11 h-11", icon: "text-[18px]", radius: "rounded-[11px]" },
  md: { box: "w-[50px] h-[50px]", icon: "text-[21px]", radius: "rounded-[13px]" },
  lg: { box: "w-[52px] h-[52px]", icon: "text-[22px]", radius: "rounded-[14px]" },
  xl: { box: "w-[56px] h-[56px]", icon: "text-[23px]", radius: "rounded-[16px]" },
};

export default function IconChip({
  icon,
  color,
  bg,
  size = "md",
  radius,
  className,
}: IconChipProps) {
  const { box, icon: iconSize, radius: defaultRadius } = sizes[size];
  const isBrand = icon.startsWith("fa-brands ");
  const iconClass = isBrand ? icon : `fa-solid ${icon}`;

  return (
    <div
      className={cn(
        "flex items-center justify-center flex-shrink-0",
        box,
        radius ?? defaultRadius,
        className
      )}
      style={{ background: bg, color }}
    >
      <i className={cn(iconClass, iconSize)} />
    </div>
  );
}
