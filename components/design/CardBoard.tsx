import type { TalentCredit } from "@/types/talent";
import type { ReactNode } from "react";

interface CardBoardProps {
  credits: readonly TalentCredit[];
  title: string;
  /** Renders one card. Receives index for any per-card variation. */
  renderCard: (credit: TalentCredit, index: number) => ReactNode;
}

// Shared shell for the A2 credit-card exploration. Each variant page passes
// its own renderCard function; the grid layout and "Six brands. One year."
// header stay identical so we compare card design only.
export function CardBoard({ credits, title, renderCard }: CardBoardProps) {
  return (
    <main className="min-h-svh bg-slate-bg px-5 py-10 text-text-primary">
      <header className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
          02 · Selected work
        </p>
        <h2
          className="mt-3 font-display"
          style={{
            fontWeight: 600,
            fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {title}
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {credits.map((credit, i) => renderCard(credit, i))}
      </div>
    </main>
  );
}
