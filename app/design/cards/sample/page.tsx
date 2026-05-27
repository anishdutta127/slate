import type { TalentCredit } from "@/types/talent";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// ONE-card sample per variant, laid out 3x2 at 1200 wide.
// Built so the entire 6-variant comparison fits in a single screenshot
// without the user having to scroll. Pick the variant whose card you like,
// then say "cards V<N>" and we move to A3.

// Use the Honda credit as the representative card for every variant.
const HONDA = ASHISH.credits.find((c) => c.brand === "Honda")!;

// ---- VARIANT RENDERERS (matching the per-variant pages exactly) ----

function V1Card({ credit, index }: { credit: TalentCredit; index: number }) {
  const corner = { x: "0%", y: "0%" };
  const num = (index + 1).toString().padStart(2, "0");
  return (
    <div
      className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-bg"
      style={{
        backgroundImage: `radial-gradient(circle at ${corner.x} ${corner.y}, rgba(201, 162, 75, 0.4) 0%, rgba(201, 162, 75, 0) 60%), radial-gradient(circle at 100% 100%, rgba(0,0,0,0.5) 0%, transparent 70%)`,
      }}
    >
      <span className="chip-text absolute left-4 top-4 rounded-full border border-gold/40 px-2 py-0.5 text-gold">
        {num}
      </span>
      <span
        className="px-6 text-center font-display text-text-primary"
        style={{
          fontWeight: 700,
          fontSize: "2.4rem",
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
}

function V2Card({ credit, index }: { credit: TalentCredit; index: number }) {
  const num = (index + 1).toString().padStart(2, "0");
  const Sprockets = ({ side }: { side: "top" | "bottom" }) => (
    <div
      className={`absolute inset-x-0 flex justify-around bg-[#0a0a09] px-2 py-1.5 ${
        side === "top" ? "top-0" : "bottom-0"
      }`}
    >
      {Array.from({ length: 8 }).map((_, idx) => (
        <span key={idx} className="block h-2 w-3 rounded-sm bg-slate-bg/90" />
      ))}
    </div>
  );
  return (
    <div
      className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-sm bg-[#1a1916]"
      style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)" }}
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
            fontWeight: 600,
            fontSize: "2.2rem",
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
}

function V3Card({ credit, index }: { credit: TalentCredit; index: number }) {
  const palette = {
    primary: "rgba(201, 162, 75, 0.18)",
    secondary: "rgba(200, 75, 60, 0.10)",
  };
  const num = (index + 1).toString().padStart(2, "0");
  return (
    <div
      className="relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-md bg-slate-bg"
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 70% at 30% 30%, ${palette.primary} 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, ${palette.secondary} 0%, transparent 70%), linear-gradient(135deg, transparent 30%, rgba(0,0,0,0.3) 100%)`,
      }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay"
        preserveAspectRatio="none"
      >
        <filter id="brush-sample">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed={index + 1} />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="2" intercept="-0.5" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#brush-sample)" />
      </svg>
      <span className="chip-text absolute left-4 top-4 text-gold/80">{num}</span>
      <div className="relative z-10 p-5">
        <p
          className="font-display text-text-primary"
          style={{
            fontWeight: 600,
            fontSize: "2rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {credit.brand}
        </p>
        <p className="chip-text mt-2 text-text-secondary">
          {credit.medium} · {credit.year}
        </p>
      </div>
    </div>
  );
}

function V4Card({ credit, index }: { credit: TalentCredit; index: number }) {
  const issue = (index + 1).toString().padStart(2, "0");
  return (
    <div
      className="relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-sm bg-[#161613] p-5"
      style={{ boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)" }}
    >
      <div className="flex items-baseline justify-between border-b border-gold/30 pb-2">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-xs font-semibold tracking-tight text-text-primary">
            Slate.
          </span>
          <span className="inline-block h-1 w-1 rounded-full bg-gold" />
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/80">
          Iss. {issue} · {credit.year}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center py-4">
        <p className="chip-text mb-3 text-gold">Cover Story</p>
        <p
          className="font-display text-text-primary"
          style={{
            fontWeight: 700,
            fontSize: "2.6rem",
            letterSpacing: "-0.03em",
            lineHeight: 0.88,
          }}
        >
          {credit.brand}
        </p>
      </div>
      <p className="text-balance text-xs italic leading-relaxed text-text-secondary">
        The {credit.medium.toLowerCase()} that put a face to the brand.
      </p>
    </div>
  );
}

function V5Card({ credit, index }: { credit: TalentCredit; index: number }) {
  const num = (index + 1).toString().padStart(2, "0");
  return (
    <div className="relative flex aspect-[4/5] w-full flex-col justify-between rounded-sm bg-[#0a0a09] p-6">
      <span className="chip-text text-gold">{num}</span>
      <div className="flex flex-col gap-3">
        <span
          className="font-display text-text-primary"
          style={{
            fontWeight: 600,
            fontSize: "1.85rem",
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
      <span className="self-end font-mono text-base text-gold/60">↗</span>
    </div>
  );
}

function V6Card({ credit, index }: { credit: TalentCredit; index: number }) {
  const num = (index + 1).toString().padStart(2, "0");
  return (
    <div
      className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm bg-[#16140d]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 45%, rgba(201, 162, 75, 0.10) 0%, rgba(14, 14, 12, 0.6) 75%)",
      }}
    >
      <span className="chip-text absolute left-4 top-4 text-gold/80">No. {num}</span>
      <span className="chip-text absolute right-4 top-4 text-gold/80">{credit.year}</span>
      <div
        className="relative flex h-40 w-40 items-center justify-center rounded-full"
        style={{
          border: "1.5px solid rgba(201, 162, 75, 0.7)",
          boxShadow: "0 0 0 8px rgba(14, 14, 12, 0.6), 0 0 0 9px rgba(201, 162, 75, 0.25)",
        }}
      >
        <div
          className="absolute inset-3 rounded-full"
          style={{ border: "1px dashed rgba(201, 162, 75, 0.3)" }}
        />
        <div className="z-10 flex flex-col items-center gap-1.5 px-4 text-center">
          <span
            className="font-display text-text-primary"
            style={{
              fontWeight: 700,
              fontSize: "1.2rem",
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
}

// ---- LAYOUT ----

const VARIANTS = [
  { slug: "v1", name: "V1 · Bold Wordmark", Render: V1Card },
  { slug: "v2", name: "V2 · Film Strip", Render: V2Card },
  { slug: "v3", name: "V3 · Painterly", Render: V3Card },
  { slug: "v4", name: "V4 · Cover Story", Render: V4Card },
  { slug: "v5", name: "V5 · Restraint", Render: V5Card },
  { slug: "v6", name: "V6 · Seal", Render: V6Card },
] as const;

export default function CardSampleGrid() {
  return (
    <main className="min-h-svh bg-slate-bg px-8 py-10 text-text-primary">
      <header className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
          A2 · Credit card sample grid
        </p>
        <h1
          className="mt-2 font-display"
          style={{
            fontWeight: 600,
            fontSize: "2rem",
          }}
        >
          One card per variant. Pick the language.
        </h1>
      </header>
      <div className="grid grid-cols-3 gap-6">
        {VARIANTS.map((v, idx) => {
          const Render = v.Render;
          return (
            <article key={v.slug} className="flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
                {v.name}
              </p>
              <Render credit={HONDA} index={idx} />
            </article>
          );
        })}
      </div>
    </main>
  );
}
