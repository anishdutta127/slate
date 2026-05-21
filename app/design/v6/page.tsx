import { HeroExploration } from "@/components/design/HeroExploration";
import { TalentImage } from "@/components/profile/TalentImage";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// V6 — Negative Space.
// Saul-Bass-style film poster. Photo lives on the right portion only,
// composited against a half-bleed dark column on the left where the name
// breathes. The empty charcoal half IS the design — it's not a leftover,
// it's the canvas the typography sits on. Photo is pulled to the right
// edge with object-position so Ashish's face sits in the right third,
// leaving compositional balance with the left typography.

export default function DesignV6() {
  const t = ASHISH;
  return (
    <HeroExploration>
      {/* Photo: right 65% of viewport */}
      <div className="absolute inset-y-0 right-0 w-[65%]">
        <TalentImage
          photo={t.hero}
          talentSlug={t.slug}
          fill
          priority
          sizes="65vw"
          className="object-cover object-[20%_15%]"
        />
        {/* Left-edge fade INTO the dark column — soft boundary */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-bg via-slate-bg/70 to-transparent"
        />
      </div>

      {/* Top wordmark, on the dark column */}
      <div className="absolute left-6 top-6 z-20 flex items-baseline gap-1.5">
        <span
          className="font-display text-sm font-semibold tracking-tight text-text-primary opacity-80"
          style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
        >
          Slate.
        </span>
        <span className="inline-block h-1 w-1 rounded-full bg-gold" />
      </div>

      {/* Name in the negative space — left, vertically centered */}
      <div className="absolute inset-y-0 left-0 z-20 flex w-[42%] flex-col justify-center px-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
          Now
          <br />
          Showing
        </span>
        <h1
          className="mt-5 font-display text-text-primary"
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 14vw, 4.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.88,
          }}
        >
          Ashish
          <br />
          Rawat
        </h1>
        <div className="mt-5 h-px w-10 bg-gold" />
        <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-text-secondary">
          {t.city}
          <br />
          Plays {t.plays.min}-{t.plays.max}
          <br />
          {t.height.display}
        </p>
      </div>

      {/* Bottom corner tagline, mono, sits over the photo's bottom-left edge */}
      <div className="absolute bottom-6 left-6 z-20 max-w-[60%]">
        <p className="text-xs leading-relaxed text-text-tertiary">{t.tagline}</p>
      </div>
    </HeroExploration>
  );
}
