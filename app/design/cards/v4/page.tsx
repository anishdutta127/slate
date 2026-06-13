import { CardBoard } from "@/components/design/CardBoard";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// CARD V4 — Editorial Magazine Cover.
// Each card structured like a magazine cover: a "VOL/ISSUE" mast at top,
// big brand name in Fraunces dominating the center, and a single "cover
// line" below it that quotes the medium + year as if it were a feature
// tagline. Treats every brand as an issue of a publication called Slate.

export default function CardV4() {
  return (
    <CardBoard
      credits={ASHISH.credits}
      title="V4 · Cover Story"
      renderCard={(credit, i) => {
        const issue = (i + 1).toString().padStart(2, "0");
        return (
          <div
            key={credit.id}
            className="relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-sm bg-[#161613] p-5"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)",
            }}
          >
            {/* Mast head */}
            <div className="flex items-baseline justify-between border-b border-gold/30 pb-2">
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display text-xs font-semibold tracking-tight text-text-primary"
                  style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
                >
                  Slate.
                </span>
                <span className="inline-block h-1 w-1 rounded-full bg-gold" />
              </div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/80">
                Iss. {issue} · {credit.year}
              </span>
            </div>

            {/* Cover headline */}
            <div className="flex flex-1 flex-col justify-center py-4">
              <p className="chip-text mb-3 text-gold">Cover Story</p>
              <p
                className="font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  fontWeight: 700,
                  fontSize: "clamp(2.25rem, 11vw, 4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.88,
                }}
              >
                {credit.brand}
              </p>
            </div>

            {/* Cover line at the bottom — feature-style */}
            <p className="text-balance text-xs italic leading-relaxed text-text-secondary">
              The {credit.medium.toLowerCase()} that put a face to the brand.
            </p>
          </div>
        );
      }}
    />
  );
}
