/** Recurring decorative motif: dashed circuit traces + pulsing nodes, used across sections to tie Univerzia's visual identity together. */
export function CircuitOverlay({
  color = "#6a8bff",
  nodeColor = "#17c3d6",
  opacity = 0.12,
  className = "",
}: {
  color?: string;
  nodeColor?: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
      viewBox="0 0 800 400"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1">
        <path d="M0 60 H220 L260 100 H500 L540 60 H800" strokeDasharray="6 10" className="animate-drift" />
        <path d="M0 200 H150 L190 160 H420 L460 200 H800" strokeDasharray="6 10" className="animate-drift" />
        <path d="M0 320 H260 L300 280 H600 L640 320 H800" strokeDasharray="6 10" className="animate-drift" />
      </g>
      {[
        [220, 60],
        [500, 60],
        [150, 200],
        [460, 200],
        [260, 320],
        [640, 320],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill={nodeColor}
          className="animate-pulse-soft"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  );
}
