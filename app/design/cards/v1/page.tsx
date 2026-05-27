import { CardBoard } from "@/components/design/CardBoard";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// CARD V1 — Bold Wordmark.
// Brand name dominates each card in Fraunces 700, large. Subtle gradient
// background per card (gold radial from a rotating corner). Card-number pill
// top-left, mono medium·year bottom. Closest to the current production
// branded fallback, but louder, with more typographic confidence.

const GRADIENT_CORNERS = [
  { x: "0%", y: "0%" },
  { x: "100%", y: "0%" },
  { x: "100%", y: "100%" },
  { x: "0%", y: "100%" },
  { x: "50%", y: "0%" },
  { x: "50%", y: "100%" },
] as const;

export default function CardV1() {
  return (
    <CardBoard
      credits={ASHISH.credits}
      title="V1 · Bold Wordmark"
      renderCard={(credit, i) => {
        const corner = GRADIENT_CORNERS[i % GRADIENT_CORNERS.length]!;
        const num = (i + 1).toString().padStart(2, "0");
        return (
          <div
            key={credit.id}
            className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-bg"
            style={{
              backgroundImage: `radial-gradient(circle at ${corner.x} ${corner.y}, rgba(201, 162, 75, 0.4) 0%, rgba(201, 162, 75, 0) 60%), radial-gradient(circle at ${100 - parseFloat(corner.x)}% ${100 - parseFloat(corner.y)}%, rgba(0,0,0,0.5) 0%, transparent 70%)`,
            }}
          >
            <span className="chip-text absolute left-4 top-4 rounded-full border border-gold/40 px-2 py-0.5 text-gold">
              {num}
            </span>
            <span
              className="px-6 text-center font-display text-text-primary"
              style={{
                fontWeight: 700,
                fontSize: "clamp(2rem, 9vw, 3.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
              }}
            >
              {credit.brand}
            </span>
            <span className="chip-text absolute bottom-4 left-4 text-text-secondary">
              {credit.medium} · {credit.year}
            </span>
          </div>
        );
      }}
    />
  );
}
