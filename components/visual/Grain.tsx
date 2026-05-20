import { useId } from "react";

interface GrainProps {
  tone?: "dark" | "light";
}

// SVG fractal-noise overlay. Absolute-positioned within its parent (which must
// be position: relative — <Section/> handles that). pointer-events disabled.
// mix-blend-overlay registers as cinematic texture against dark backgrounds.
// On light backgrounds we render nothing — DESIGN.md is explicit that grain is
// dark-only.
//
// useId() gives each Grain instance a unique filter id, so multiple dark
// Sections on the same page don't share a duplicate-id collision.
export function Grain({ tone = "dark" }: GrainProps) {
  const id = useId();
  const filterId = `slate-grain-${id}`;
  if (tone === "light") return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
      style={{ opacity: 0.025 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}
