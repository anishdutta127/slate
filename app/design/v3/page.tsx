import { HeroExploration } from "@/components/design/HeroExploration";
import { TalentImage } from "@/components/profile/TalentImage";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// V3 — Framed Portrait.
// Photo lives inside a thin gold-bordered frame, set on a deep charcoal
// stage with generous matting on all sides. Below the frame, centered: name
// in Fraunces, gold gradient rule, mono stats. Reads like a Cahiers du
// Cinéma cover photo with the caption label below — or a museum portrait
// plate. Object: dignified, archival, intentional.

export default function DesignV3() {
  const t = ASHISH;
  return (
    <HeroExploration>
      {/* Wordmark top-left */}
      <div className="absolute left-6 top-6 z-20 flex items-baseline gap-1.5">
        <span
          className="font-display text-sm font-semibold tracking-tight text-text-primary opacity-70"
          style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
        >
          Slate.
        </span>
        <span className="inline-block h-1 w-1 rounded-full bg-gold" />
      </div>

      {/* Stage with framed portrait */}
      <div className="flex h-full flex-col items-center justify-center px-8 py-12">
        {/* The frame: thin gold border, inner padding so the photo sits inside matting */}
        <div
          className="relative aspect-[3/4] w-full max-w-[280px] p-2"
          style={{
            border: "1px solid rgba(201, 162, 75, 0.6)",
            boxShadow:
              "0 30px 60px -25px rgba(0,0,0,0.7), 0 0 0 1px rgba(201, 162, 75, 0.15)",
          }}
        >
          {/* Photo inside the frame */}
          <div className="relative h-full w-full overflow-hidden">
            <TalentImage
              photo={t.hero}
              talentSlug={t.slug}
              fill
              priority
              sizes="280px"
              className="object-cover object-[center_18%]"
            />
            {/* Subtle vignette inside the frame for depth */}
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

        {/* Caption block below — museum plate */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Plate I
          </span>
          <h1
            className="font-display text-text-primary"
            style={{
              fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
            }}
          >
            Ashish Rawat
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary">
            {t.city} · Plays {t.plays.min}-{t.plays.max} · {t.height.display}
          </p>
          <p className="mt-2 max-w-[24ch] text-balance text-xs italic leading-relaxed text-text-tertiary">
            {t.tagline}
          </p>
        </div>
      </div>
    </HeroExploration>
  );
}
