import { HeroExploration } from "@/components/design/HeroExploration";
import { TalentImage } from "@/components/profile/TalentImage";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// V1 — Two-Column Editorial.
// 50/50 mobile split: photo cropped to portrait left, dark typography stage
// right. Name stacked huge in Fraunces (ASHISH / RAWAT broken to two lines
// so it dominates the right half). Hairline gold rule, mono stats below.
// Wordmark top corner. Like a film-festival programme inside spread.

export default function DesignV1() {
  const t = ASHISH;
  return (
    <HeroExploration>
      <div className="grid h-full grid-cols-[5fr_6fr]">
        {/* Photo column */}
        <div className="relative">
          <TalentImage
            photo={t.hero}
            talentSlug={t.slug}
            fill
            priority
            sizes="50vw"
            className="object-cover object-[center_18%]"
          />
          {/* Soft right-edge fade into the dark column so the seam isn't hard */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-slate-bg"
          />
        </div>

        {/* Typography column */}
        <div className="relative flex flex-col justify-between bg-slate-bg px-5 py-6">
          {/* Wordmark top-right */}
          <div className="flex items-baseline justify-end gap-1.5">
            <span
              className="font-display text-sm font-semibold tracking-tight text-text-primary"
              style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
            >
              Slate.
            </span>
            <span className="inline-block h-1 w-1 rounded-full bg-gold" />
          </div>

          {/* Big name, broken to two lines so each fills the column */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              Mumbai · Actor
            </span>
            <h1
              className="font-display text-text-primary"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 14vw, 4.5rem)",
                letterSpacing: "-0.025em",
                lineHeight: 0.88,
              }}
            >
              ASHISH
              <br />
              RAWAT
            </h1>
            <div className="mt-4 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
              Plays {t.plays.min}-{t.plays.max}
              <br />
              {t.height.display}
              <br />
              {t.languages.join(" · ")}
            </p>
          </div>

          {/* Tagline footer */}
          <p className="text-xs leading-relaxed text-text-tertiary">
            {t.tagline}
          </p>
        </div>
      </div>
    </HeroExploration>
  );
}
