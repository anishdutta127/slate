import { CardBoard } from "@/components/design/CardBoard";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// CARD V2 — Film Strip.
// Each card framed as a 35mm film strip: sprocket holes top + bottom,
// brand wordmark on the central "frame". Material-honest reference to
// cinema — credit cards as celluloid stills.

function Sprockets({ side }: { side: "top" | "bottom" }) {
  return (
    <div
      className={`absolute inset-x-0 flex justify-around bg-[#0a0a09] px-2 py-1.5 ${
        side === "top" ? "top-0" : "bottom-0"
      }`}
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, idx) => (
        <span key={idx} className="block h-2 w-3 rounded-sm bg-slate-bg/90" />
      ))}
    </div>
  );
}

export default function CardV2() {
  return (
    <CardBoard
      credits={ASHISH.credits}
      title="V2 · Film Strip"
      renderCard={(credit, i) => {
        const num = (i + 1).toString().padStart(2, "0");
        return (
          <div
            key={credit.id}
            className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-sm bg-[#1a1916]"
            style={{
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)",
            }}
          >
            <Sprockets side="top" />
            <Sprockets side="bottom" />

            <span className="absolute left-5 top-7 font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
              {num} / {credit.year}
            </span>

            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <span
                className="font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem, 8vw, 3rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {credit.brand}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                {credit.medium}
              </span>
            </div>
          </div>
        );
      }}
    />
  );
}
