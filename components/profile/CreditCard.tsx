import { cn } from "@/lib/cn";
import type { TalentCredit } from "@/types/talent";
import { getEmbedInfo, type EmbedKind } from "@/lib/embed";
import { BrandedFallbackCard } from "./BrandedFallbackCard";
import { LinkThumbnailCard } from "./LinkThumbnailCard";

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

// Thumbnail logic:
// 1. Use a manual credit.thumbnailUrl when provided. This is the correct MVP
//    path for Instagram, Facebook, and Drive links.
// 2. Use automatic YouTube thumbnails when the primary URL is YouTube.
// 3. Fall back to the editorial Slate cover card so the grid never breaks.

export function CreditCard({ credit, index, className }: CreditCardProps) {
  const primaryUrl = credit.urls[0]!;
  const info = getEmbedInfo(primaryUrl);
  const platform = PLATFORM_NAME[info.kind];
  const thumbnailUrl = credit.thumbnailUrl ?? info.thumbnailUrl;
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
      {thumbnailUrl ? (
        <LinkThumbnailCard
          credit={credit}
          index={index}
          thumbnailUrl={thumbnailUrl}
          platform={platform}
          kind={info.kind}
        />
      ) : (
        <BrandedFallbackCard
          brand={credit.brand}
          medium={credit.medium}
          year={credit.year}
          index={index}
        />
      )}

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
