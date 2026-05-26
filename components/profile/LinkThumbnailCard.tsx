import Image from "next/image";
import { cn } from "@/lib/cn";
import type { TalentCredit } from "@/types/talent";
import type { EmbedKind } from "@/lib/embed";

interface LinkThumbnailCardProps {
  credit: TalentCredit;
  index: number;
  thumbnailUrl: string;
  platform: string;
  kind: EmbedKind;
  className?: string;
}

// Cinematic thumbnail treatment for work links. YouTube can generate this
// automatically. Instagram/Facebook/Drive should use a manually uploaded poster
// later via credit.thumbnailUrl, because scraping their thumbnails is brittle.
export function LinkThumbnailCard({
  credit,
  index,
  thumbnailUrl,
  platform,
  kind,
  className,
}: LinkThumbnailCardProps) {
  const issue = (index + 1).toString().padStart(2, "0");
  const label = kind === "youtube" ? "Watch" : "Open";

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#161613]",
        className,
      )}
    >
      <Image
        src={thumbnailUrl}
        alt={credit.thumbnailAlt ?? `${credit.brand} ${credit.medium} thumbnail`}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,12,0.18) 0%, rgba(14,14,12,0.62) 58%, rgba(14,14,12,0.95) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{ boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.25)" }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
        <div className="flex items-center justify-between border-b border-gold/30 pb-2">
          <span className="chip-text text-slate-cream/80">Slate Work</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/90">
            Iss. {issue}
          </span>
        </div>

        <div>
          <p className="chip-text text-gold">
            {label} on {platform}
          </p>
          <p
            className="mt-3 font-display text-text-primary"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
              fontWeight: 700,
              fontSize: "clamp(2rem, 8vw, 3.25rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
            }}
          >
            {credit.brand}
          </p>
          <p className="chip-text mt-3 text-text-secondary">
            {credit.medium} · {credit.year}
          </p>
        </div>
      </div>
    </div>
  );
}
