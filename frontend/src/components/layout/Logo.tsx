import Image from "next/image";

interface LogoProps {
  /** Use the white-wordmark variant for dark backgrounds (e.g. footer). */
  onDark?: boolean;
  /** Preload the logo (use in the header). */
  priority?: boolean;
  /** Rendered height in px (default 40). Width scales to keep aspect ratio. */
  height?: number;
}

/**
 * Brand logo lockup — official vector SVG (icon + "Univerzia" wordmark + "AI" badge).
 * Vector source is resolution-independent: crisp at any size, zoom, or DPI.
 * Source viewBox is 552×120 (≈4.6:1). next/image serves `.svg` unoptimized automatically.
 */
export default function Logo({ onDark = false, priority = false, height = 40 }: LogoProps) {
  const src = onDark
    ? "/brand/univerziaai-logo-dark.svg"
    : "/brand/univerziaai-logo.svg";
  return (
    <Image
      src={src}
      alt="Univerzia AI"
      width={184}
      height={40}
      priority={priority}
      style={{ height, width: "auto" }}
    />
  );
}
