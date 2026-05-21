import { cn } from "@/lib/cn";
import type { TalentCredit } from "@/types/talent";
import { getEmbedInfo, type EmbedKind } from "@/lib/embed";
import { BrandedFallbackCard } from "./BrandedFallbackCard";

interface CreditCardProps {
  credit: TalentCredit;
  index: number;
  className?: string;
}

const PLATFORM_NAME: Record<EmbedKind, string> = {
  youtube: "YouTube",
  instagram_reel: "Instagram",
  instagram_post: "Instagram",
  facebook_video: "Facebook",
  facebook_reel: "Facebook",
  unknown: "the original page",
};

// Per the A2 pick: every credit card in the grid uses the Cover Story
// treatment from BrandedFallbackCard. We dropped the YouTube-thumbnail
// branch on purpose — having one card be a real screenshot while the
// others are designed broke cohesion. The thumbnail only matters at the
// destination (when the user taps through), and the tap-target carries
// the user there. The grid stays a clean magazine series.
//
// The "OPEN ↗" overlay on hover/focus still signals that the card is
// clickable, mirroring the bottom-right arrow on the cards themselves.

export function CreditCard({ credit, index, className }: CreditCardProps) {
  const primaryUrl = credit.urls[0]!;
  const info = getEmbedInfo(primaryUrl);
  const platform = PLATFORM_NAME[info.kind];
  const aria = `Open ${credit.brand} ${credit.medium} ${credit.year} on ${platform} (opens in new tab)`;

  return (
    <a
      href={primaryUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={cn(
        "group relative block overflow-hidden rounded-sm transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg",
        "hover:-translate-y-1 hover:ring-1 hover:ring-gold/50",
        className,
      )}
    >
      <BrandedFallbackCard
        brand={credit.brand}
        medium={credit.medium}
        year={credit.year}
        index={index}
      />

      {/* Hover/focus indicator — small "OPEN ↗" pill top-right. Always present
          in the DOM for keyboard users; only visible on hover/focus so the
          card stays clean at rest. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="chip-text rounded-full border border-slate-cream/30 bg-slate-bg/70 px-2 py-0.5 text-text-primary backdrop-blur-sm">
          OPEN ↗
        </span>
      </div>
    </a>
  );
}
