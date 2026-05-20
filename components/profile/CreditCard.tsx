import Image from "next/image";
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

export function CreditCard({ credit, index, className }: CreditCardProps) {
  const primaryUrl = credit.urls[0]!;
  const info = getEmbedInfo(primaryUrl);
  const platform = PLATFORM_NAME[info.kind];
  const aria = `Open ${credit.brand} ${credit.medium} ${credit.year} on ${platform} (opens in new tab)`;
  const cardNumber = (index + 1).toString().padStart(2, "0");

  return (
    <a
      href={primaryUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={cn(
        "group relative block overflow-hidden rounded-md transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg",
        "hover:-translate-y-1 hover:ring-1 hover:ring-gold/50",
        className,
      )}
    >
      {info.kind === "youtube" && info.thumbnailUrl ? (
        // YouTube thumbnail — real image. AspectRatio matches 16:9 letterbox
        // displayed inside a 4:5 card by centering with bg.
        <div className="relative aspect-[4/5] w-full bg-slate-bg">
          <Image
            src={info.thumbnailUrl}
            alt={`${credit.brand} ${credit.medium} thumbnail`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            unoptimized // Google CDN is already optimized; skip Vercel's
          />
          {/* Top-to-bottom darkening at the bottom so labels read */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-bg/85 via-slate-bg/40 to-transparent"
          />
          {/* Card number, top-left */}
          <span
            aria-hidden="true"
            className="chip-text absolute left-4 top-4 rounded-full border border-gold/40 bg-slate-bg/60 px-2 py-0.5 text-gold backdrop-blur-sm"
          >
            {cardNumber}
          </span>
          {/* Brand line, bottom-left */}
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1">
            <span
              className="font-display text-2xl font-bold text-text-primary md:text-3xl"
              style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
            >
              {credit.brand}
            </span>
            <span className="chip-text text-text-secondary">
              {credit.medium} · {credit.year}
            </span>
          </div>
        </div>
      ) : (
        <BrandedFallbackCard
          brand={credit.brand}
          medium={credit.medium}
          year={credit.year}
          index={index}
        />
      )}

      {/* Hover overlay: small "Open" indicator top-right. Always present but
          only visible on hover/focus so the visual stays clean at rest. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="chip-text rounded-full border border-slate-cream/30 bg-slate-bg/70 px-2 py-0.5 text-text-primary backdrop-blur-sm">
          OPEN ↗
        </span>
      </div>
    </a>
  );
}
