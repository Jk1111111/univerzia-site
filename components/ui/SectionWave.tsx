type WaveColor = "paper" | "paper-2" | "navy" | "white" | "ink";

const fillMap: Record<WaveColor, string> = {
  paper: "var(--color-paper)",
  "paper-2": "var(--color-paper-2)",
  navy: "var(--color-navy)",
  white: "#ffffff",
  ink: "var(--color-ink)",
};

/**
 * A full-width curved divider dropped between two sections so the page
 * reads as one continuous surface instead of stacked rectangular blocks.
 * `from` is the section above (used as this block's own background),
 * `to` is the section below (the color the curve dips down into).
 */
export function SectionWave({
  from,
  to,
  className = "",
}: {
  from: WaveColor;
  to: WaveColor;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-12 w-full overflow-hidden sm:h-20 ${className}`}
      style={{ background: fillMap[from] }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0,40 C220,90 420,0 720,30 C1020,60 1220,95 1440,40 L1440,100 L0,100 Z"
          fill={fillMap[to]}
        />
      </svg>
    </div>
  );
}
