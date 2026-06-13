import { CardBoard } from "@/components/design/CardBoard";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// CARD V5 — Minimalist Black + Accent Line.
// Pure deep-black card. One thin gold rule. Brand wordmark + meta sit on
// the rule. Restraint is the design move. Closest to a Swiss / Helvetica
// poster — relies entirely on negative space and typographic confidence.
// The most reproducible across actors regardless of brand visual identity.

export default function CardV5() {
  return (
    <CardBoard
      credits={ASHISH.credits}
      title="V5 · Restraint"
      renderCard={(credit, i) => {
        const num = (i + 1).toString().padStart(2, "0");
        return (
          <div
            key={credit.id}
            className="relative flex aspect-[4/5] w-full flex-col justify-between rounded-sm bg-[#0a0a09] p-6"
          >
            {/* Card number top */}
            <span className="chip-text text-gold">{num}</span>

            {/* Center stack: brand + thin rule + meta */}
            <div className="flex flex-col gap-3">
              <span
                className="font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                  fontWeight: 600,
                  fontSize: "clamp(1.5rem, 7vw, 2.25rem)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.05,
                }}
              >
                {credit.brand}
              </span>
              <div className="h-px w-12 bg-gold" />
              <span className="chip-text text-text-secondary">
                {credit.medium} · {credit.year}
              </span>
            </div>

            {/* Bottom-right corner arrow tells the user this is a tap target */}
            <span aria-hidden="true" className="self-end font-mono text-base text-gold/60">
              ↗
            </span>
          </div>
        );
      }}
    />
  );
}
