import { HeroExploration } from "@/components/design/HeroExploration";
import { TalentImage } from "@/components/profile/TalentImage";
import { Grain } from "@/components/visual/Grain";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// V2 — Cinema Vignette.
// Full-bleed hero, but pushed hard into film territory: heavy radial vignette
// brings the corners to near-black, leaving the photo lit only in the center
// quarter. Grain doubled (~5%) over the photo so it reads as projected film,
// not a stock headshot. Name + tagline center-bottom in Fraunces, framed by
// the dark. Less typographic invention, more lighting.

export default function DesignV2() {
  const t = ASHISH;
  return (
    <HeroExploration>
      {/* Photo */}
      <div className="absolute inset-0">
        <TalentImage
          photo={t.hero}
          talentSlug={t.slug}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%]"
        />
      </div>

      {/* Heavy vignette — pushes corners to near-black */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at center 38%, transparent 0%, rgba(14, 14, 12, 0.35) 45%, rgba(14, 14, 12, 0.95) 85%)",
        }}
      />

      {/* Heavier grain for the film feel */}
      <div className="opacity-[0.05] [&_div]:!opacity-100">
        <Grain tone="dark" />
      </div>

      {/* Wordmark top */}
      <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-baseline gap-2">
        <span className="font-display text-base font-semibold tracking-tight text-text-primary">
          Slate.
        </span>
        <span className="inline-block h-1 w-1 rounded-full bg-gold" />
      </div>

      {/* Name + tagline overlay, centered bottom-third */}
      <div className="absolute inset-x-0 bottom-12 z-20 flex flex-col items-center gap-4 px-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/90">
          Now Showing
        </span>
        <h1
          className="font-display text-text-primary"
          style={{
            fontWeight: 700,
            fontSize: "clamp(3rem, 12vw, 5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
          }}
        >
          Ashish Rawat
        </h1>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
          {t.city} · Plays {t.plays.min}-{t.plays.max} · {t.height.display}
        </p>
        <p className="mt-2 max-w-[26ch] text-balance text-sm leading-relaxed text-text-secondary">
          {t.tagline}
        </p>
      </div>
    </HeroExploration>
  );
}
