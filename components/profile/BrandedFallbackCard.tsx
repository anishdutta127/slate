import { cn } from "@/lib/cn";

interface BrandedFallbackCardProps {
  brand: string;
  medium: string;
  year: number;
  index: number; // used to rotate the gradient corner so cards don't all look identical
  className?: string;
}

// Used for credits we can't pull a real thumbnail from (Instagram / Facebook
// reels). Looks intentional, sits next to YouTube thumbnails without feeling
// like a placeholder. The gradient corner rotates by index so a 6-card grid
// reads as one composition rather than 6 identical boxes.
//
// Anatomy:
//   deep charcoal base
//   muted gold radial gradient from one corner
//   subtle vignette
//   brand name centered in Fraunces 700
//   medium · year mono uppercase below
//   small gold "0X" pill top-left

const CORNERS = [
  { x: "0%", y: "0%" }, // top-left
  { x: "100%", y: "0%" }, // top-right
  { x: "100%", y: "100%" }, // bottom-right
  { x: "0%", y: "100%" }, // bottom-left
] as const;

export function BrandedFallbackCard({
  brand,
  medium,
  year,
  index,
  className,
}: BrandedFallbackCardProps) {
  const corner = CORNERS[index % CORNERS.length]!;
  const cardNumber = (index + 1).toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-bg",
        className,
      )}
      style={{
        backgroundImage: [
          // gradient from chosen corner
          `radial-gradient(circle at ${corner.x} ${corner.y}, rgba(201, 162, 75, 0.32) 0%, rgba(201, 162, 75, 0) 55%)`,
          // gentle vignette on the opposite corner for depth
          `radial-gradient(circle at ${100 - parseFloat(corner.x)}% ${100 - parseFloat(corner.y)}%, rgba(0, 0, 0, 0.45) 0%, transparent 70%)`,
        ].join(", "),
      }}
    >
      {/* Card number pill, top-left */}
      <span
        aria-hidden="true"
        className="chip-text absolute left-4 top-4 rounded-full border border-gold/40 px-2 py-0.5 text-gold"
      >
        {cardNumber}
      </span>

      {/* Brand + media line */}
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span
          className="display-s font-display text-text-primary"
          style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1', fontWeight: 700 }}
        >
          {brand}
        </span>
        <span className="chip-text text-text-secondary">
          {medium} · {year}
        </span>
      </div>
    </div>
  );
}
