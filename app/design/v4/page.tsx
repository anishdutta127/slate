import { HeroExploration } from "@/components/design/HeroExploration";
import { TalentImage } from "@/components/profile/TalentImage";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// V4 — Color-Graded Crop.
// Photo cropped aggressively tight on the face (forehead-to-collarbone) so
// the headshot stops reading as "a photo of a man" and starts reading as
// "a film still". Color grade via overlay layers: a warm amber tint on the
// highlights, a cooler teal in the shadows. Single hero word — "ASHISH" —
// dominant bottom-left in oversized Fraunces; "RAWAT" smaller above. The
// crop and the grade do all the lifting; typography stays minimal.

export default function DesignV4() {
  const t = ASHISH;
  return (
    <HeroExploration>
      {/* Photo — extreme crop, scaled up so we lose the brown backdrop and
          land mostly on the face. object-position pushed to top so we keep
          forehead and crop out shoulders. */}
      <div className="absolute inset-0 scale-[1.6] origin-top">
        <TalentImage
          photo={t.hero}
          talentSlug={t.slug}
          fill
          priority
          sizes="200vw"
          className="object-cover object-[center_8%]"
        />
      </div>

      {/* Warm amber tint over highlights (screen blend) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 35%, rgba(201, 162, 75, 0.18) 0%, transparent 70%)",
        }}
      />
      {/* Cool teal in shadows (multiply blend) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(135deg, rgba(20, 30, 40, 0.4) 0%, transparent 50%, rgba(60, 30, 10, 0.3) 100%)",
        }}
      />

      {/* Bottom darken for type legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to top, rgba(14, 14, 12, 0.95) 0%, rgba(14, 14, 12, 0.4) 60%, transparent 100%)",
        }}
      />

      {/* Wordmark + city·year top-right */}
      <div className="absolute right-6 top-6 z-20 flex flex-col items-end gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-sm font-semibold tracking-tight text-text-primary opacity-70">
            Slate.
          </span>
          <span className="inline-block h-1 w-1 rounded-full bg-gold" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary">
          {t.city} · 2026
        </span>
      </div>

      {/* Hero word bottom-left, single name dominant */}
      <div className="absolute inset-x-6 bottom-8 z-20 flex flex-col items-start">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Rawat</span>
        <h1
          className="-mt-1 font-display text-text-primary"
          style={{
            fontWeight: 700,
            fontSize: "clamp(4rem, 22vw, 8rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
          }}
        >
          ASHISH
        </h1>
        <p className="mt-4 max-w-[24ch] font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
          Plays {t.plays.min}-{t.plays.max} · {t.height.display} · {t.languages.join(" · ")}
        </p>
      </div>
    </HeroExploration>
  );
}
