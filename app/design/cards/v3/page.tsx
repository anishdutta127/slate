import { CardBoard } from "@/components/design/CardBoard";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// CARD V3 — Painterly Texture.
// Warm painted brushstroke surface as background, brand wordmark overlaid.
// Texture comes from layered SVG noise + multi-stop gradients that mimic an
// oil paint loading. Each card rotates the color emphasis subtly so the
// six together feel like a curated print series, not a template.

const PALETTES = [
  { primary: "rgba(201, 162, 75, 0.18)", secondary: "rgba(200, 75, 60, 0.10)" }, // gold + terra
  { primary: "rgba(107, 142, 90, 0.16)", secondary: "rgba(201, 162, 75, 0.12)" }, // olive + gold
  { primary: "rgba(200, 75, 60, 0.16)", secondary: "rgba(20, 30, 40, 0.20)" }, // terra + teal
  { primary: "rgba(232, 201, 122, 0.18)", secondary: "rgba(60, 30, 10, 0.16)" }, // gold-soft + umber
  { primary: "rgba(20, 30, 40, 0.20)", secondary: "rgba(201, 162, 75, 0.14)" }, // teal + gold
  { primary: "rgba(60, 30, 10, 0.20)", secondary: "rgba(232, 201, 122, 0.12)" }, // umber + gold-soft
] as const;

export default function CardV3() {
  return (
    <CardBoard
      credits={ASHISH.credits}
      title="V3 · Painterly"
      renderCard={(credit, i) => {
        const palette = PALETTES[i % PALETTES.length]!;
        const num = (i + 1).toString().padStart(2, "0");
        return (
          <div
            key={credit.id}
            className="relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-md bg-slate-bg"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 80% 70% at 30% 30%, ${palette.primary} 0%, transparent 70%),
                radial-gradient(ellipse 60% 50% at 80% 70%, ${palette.secondary} 0%, transparent 70%),
                linear-gradient(135deg, transparent 30%, rgba(0,0,0,0.3) 100%)
              `,
            }}
          >
            {/* Brushstroke noise via inline SVG */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay"
              preserveAspectRatio="none"
            >
              <filter id={`brush-${i}`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed={i + 1} />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="2" intercept="-0.5" />
                </feComponentTransfer>
              </filter>
              <rect width="100%" height="100%" filter={`url(#brush-${i})`} />
            </svg>

            <span className="chip-text absolute left-4 top-4 text-gold/80">{num}</span>

            <div className="relative z-10 p-5">
              <p
                className="font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
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
      }}
    />
  );
}
