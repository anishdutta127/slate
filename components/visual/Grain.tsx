// SVG fractal-noise overlay. Fixed full-viewport, pointer-events disabled,
// mix-blend-mode: overlay so the texture only registers against dark sections.
// DESIGN.md: ~2-3% opacity, "cinematic" — never visible enough to read as noise.

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
      style={{ opacity: 0.025 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <filter id="slate-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#slate-grain)" />
      </svg>
    </div>
  );
}
