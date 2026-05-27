import { CardBoard } from "@/components/design/CardBoard";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// CARD V6 — Postage Stamp / Seal.
// Circular gold seal dominates each card, with the brand name typeset on
// it like a wax stamp. Around the seal: faint guilloche pattern (dotted
// rings) for postage-stamp authenticity. Reads as a collectible mark of
// authenticity — "this credit is verified, this work shipped."

export default function CardV6() {
  return (
    <CardBoard
      credits={ASHISH.credits}
      title="V6 · Seal"
      renderCard={(credit, i) => {
        const num = (i + 1).toString().padStart(2, "0");
        return (
          <div
            key={credit.id}
            className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm bg-[#16140d]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 45%, rgba(201, 162, 75, 0.10) 0%, rgba(14, 14, 12, 0.6) 75%)",
            }}
          >
            <span className="chip-text absolute left-4 top-4 text-gold/80">No. {num}</span>
            <span className="chip-text absolute right-4 top-4 text-gold/80">{credit.year}</span>

            {/* The seal — concentric gold ring with the brand at the center */}
            <div
              className="relative flex h-48 w-48 items-center justify-center rounded-full"
              style={{
                border: "1.5px solid rgba(201, 162, 75, 0.7)",
                boxShadow: "0 0 0 8px rgba(14, 14, 12, 0.6), 0 0 0 9px rgba(201, 162, 75, 0.25)",
              }}
            >
              {/* Guilloche ring — dotted */}
              <div
                aria-hidden="true"
                className="absolute inset-3 rounded-full"
                style={{
                  border: "1px dashed rgba(201, 162, 75, 0.3)",
                }}
              />
              <div className="z-10 flex flex-col items-center gap-1.5 px-4 text-center">
                <span
                  className="font-display text-text-primary"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 5vw, 1.5rem)",
                    letterSpacing: "0",
                    lineHeight: 1.05,
                  }}
                >
                  {credit.brand}
                </span>
                <div className="h-px w-8 bg-gold/60" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold">
                  {credit.medium}
                </span>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
