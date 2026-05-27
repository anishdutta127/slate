import { TalentImage } from "@/components/profile/TalentImage";
import { cn } from "@/lib/cn";
import type { Talent, TalentPhoto } from "@/types/talent";

interface FramedPortraitProps {
  talent: Talent;
  photo: TalentPhoto;
  /** Tailwind object-position class for the photo crop inside the frame.
   *  Defaults to "object-[center_18%]". Override per-photo for best composition. */
  objectClass?: string;
  /** Plate label, defaults to "Plate I". Useful for D1 to caption the variant. */
  plate?: string;
}

// Extracted V3 layout so the D1 photo exploration can reuse it cleanly.
// Same composition: thin gold-bordered frame on a charcoal stage with
// generous matting, museum-plate caption below.
export function FramedPortrait({
  talent: t,
  photo,
  objectClass = "object-[center_18%]",
  plate = "Plate I",
}: FramedPortraitProps) {
  return (
    <main className="relative h-svh min-h-[600px] w-full overflow-hidden bg-slate-bg">
      {/* Wordmark top-left */}
      <div className="absolute left-6 top-6 z-20 flex items-baseline gap-1.5">
        <span className="font-display text-sm font-semibold tracking-tight text-text-primary opacity-70">
          Slate.
        </span>
        <span className="inline-block h-1 w-1 rounded-full bg-gold" />
      </div>

      <div className="flex h-full flex-col items-center justify-center px-8 py-12">
        {/* Gold-bordered frame, generous matting */}
        <div
          className="relative aspect-[3/4] w-full max-w-[280px] p-2"
          style={{
            border: "1px solid rgba(201, 162, 75, 0.6)",
            boxShadow: "0 30px 60px -25px rgba(0,0,0,0.7), 0 0 0 1px rgba(201, 162, 75, 0.15)",
          }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <TalentImage
              photo={photo}
              talentSlug={t.slug}
              fill
              priority
              sizes="280px"
              className={cn("object-cover", objectClass)}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(14,14,12,0.4) 100%)",
              }}
            />
          </div>
        </div>

        {/* Museum-plate caption */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            {plate}
          </span>
          <h1
            className="font-display text-text-primary"
            style={{
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
            }}
          >
            {t.name}
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary">
            {t.city} · Plays {t.plays.min}-{t.plays.max} · {t.height.display}
          </p>
          {t.tagline ? (
            <p className="mt-2 max-w-[24ch] text-balance text-xs italic leading-relaxed text-text-tertiary">
              {t.tagline}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
