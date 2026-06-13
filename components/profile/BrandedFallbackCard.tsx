import { cn } from "@/lib/cn";

interface BrandedFallbackCardProps {
  brand: string;
  medium: string;
  year: number;
  index: number;
  className?: string;
  /** Optional caption line override; defaults to a medium-aware editorial blurb. */
  coverLine?: string;
}

// Cover Story treatment (V4 from the A2 exploration).
// Each credit card reads as a magazine cover. Mast head at top with the
// Slate wordmark and issue/year. "Cover Story" chip + big brand wordmark
// in Fraunces dominate the center. A short italic cover line at the bottom
// gives it the feature-essay flavor.
//
// Works at both 4:5 (grid cards) and 16:9 (showreel hero card) — the layout
// is flex-column with a flexing middle, so it adapts gracefully.

function defaultCoverLine(medium: string): string {
  switch (medium.toUpperCase()) {
    case "TVC":
      return "The TVC that put a face to the brand.";
    case "DIGITAL":
      return "The digital spot the algorithm couldn't skip.";
    case "PRINT":
      return "The frame that made it onto the bus stops.";
    case "THEATRE":
      return "The role that filled the room every night.";
    case "FILM":
      return "The film that earned the close-up.";
    case "SERIES":
      return "The episode you remember the morning after.";
    default:
      return "Work that hit.";
  }
}

export function BrandedFallbackCard({
  brand,
  medium,
  year,
  index,
  className,
  coverLine,
}: BrandedFallbackCardProps) {
  const issue = (index + 1).toString().padStart(2, "0");
  const line = coverLine ?? defaultCoverLine(medium);

  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-sm bg-[#161613] p-5 md:p-6",
        className,
      )}
      style={{ boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)" }}
    >
      {/* Mast head */}
      <div className="flex items-baseline justify-between border-b border-gold/30 pb-2">
        <div className="flex items-baseline gap-1">
          <span
            className="font-display text-xs font-semibold tracking-tight text-text-primary"
            style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
          >
            Slate.
          </span>
          <span className="inline-block h-1 w-1 rounded-full bg-gold" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80">
          Iss. {issue} · {year}
        </span>
      </div>

      {/* Cover headline — brand dominates the middle */}
      <div className="flex flex-1 flex-col justify-center py-5">
        <p className="chip-text mb-3 text-gold">Cover Story</p>
        <p
          className="font-display text-text-primary"
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
            fontWeight: 700,
            fontSize: "clamp(2rem, 9vw, 3.25rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.92,
          }}
        >
          {brand}
        </p>
        <p className="chip-text mt-3 text-text-secondary">
          {medium} · {year}
        </p>
      </div>

      {/* Cover line — feature-style italic */}
      <p className="text-balance text-xs italic leading-relaxed text-text-secondary">{line}</p>
    </div>
  );
}
