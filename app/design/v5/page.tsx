import { HeroExploration } from "@/components/design/HeroExploration";
import { TalentImage } from "@/components/profile/TalentImage";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// V5 — Programme Cover.
// Film-festival magazine cover aesthetic. The photo is INTENTIONALLY small
// (postage stamp top-left, ~35% width) so the page reads as editorial print,
// not profile. Big typographic moves dominate: a mast-head "VOL. 01" rail
// at top, then a section title in Fraunces, then a pull quote from the
// tagline as the lead, mono stats footer. The hero shifts identity from
// "this is a photo of a person" to "this is a magazine spread ABOUT a
// person". The subject is the subject of the cover, not the cover itself.

export default function DesignV5() {
  const t = ASHISH;
  return (
    <HeroExploration>
      <div className="flex h-full flex-col px-5 py-6">
        {/* Mast head — top thin gold rail */}
        <div className="flex items-baseline justify-between border-b border-gold/30 pb-2">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-display text-sm font-semibold tracking-tight text-text-primary"
              style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
            >
              Slate.
            </span>
            <span className="inline-block h-1 w-1 rounded-full bg-gold" />
            <span className="ml-2 devanagari text-text-tertiary">स्लेट</span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80">
            Vol. 01 · No. 1
          </span>
        </div>

        {/* Photo postage-stamp top-left + opposite typographic block */}
        <div className="mt-6 flex gap-4">
          <div className="relative aspect-[3/4] w-[35%] shrink-0 overflow-hidden">
            <TalentImage
              photo={t.hero}
              talentSlug={t.slug}
              fill
              priority
              sizes="35vw"
              className="object-cover object-[center_15%]"
            />
          </div>
          <div className="flex flex-1 flex-col justify-end pb-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold">
              Now Showing
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
              {t.city} · 2026
            </span>
          </div>
        </div>

        {/* Headline — name dominates */}
        <div className="mt-8">
          <h1
            className="font-display text-text-primary"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
              fontWeight: 700,
              fontSize: "clamp(3rem, 13vw, 5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
            }}
          >
            Ashish Rawat
          </h1>
        </div>

        {/* Pull quote — the tagline as lead paragraph */}
        <div className="mt-6 flex gap-3">
          <span className="font-display text-5xl leading-none text-gold/70" aria-hidden="true">
            "
          </span>
          <p className="font-display italic text-text-secondary" style={{ fontSize: "1.05rem", lineHeight: 1.5 }}>
            {t.tagline}
          </p>
        </div>

        {/* Spacer pushes the stat footer down */}
        <div className="flex-1" />

        {/* Stats footer — mono, three columns */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border-dark pt-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Plays</p>
            <p className="mt-1 font-mono text-sm text-text-primary">
              {t.plays.min}-{t.plays.max}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Ht</p>
            <p className="mt-1 font-mono text-sm text-text-primary">{t.height.display}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Languages</p>
            <p className="mt-1 font-mono text-sm leading-tight text-text-primary">
              {t.languages.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </HeroExploration>
  );
}
