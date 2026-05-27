import { cn } from "@/lib/cn";

interface GrainFieldProps {
  className?: string;
  gradient?: string;
}

export function GrainField({ className, gradient }: GrainFieldProps) {
  const id = `grain-field-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {gradient && <div className="absolute inset-0" style={{ background: gradient }} />}
      <svg className="absolute inset-0 h-full w-full mix-blend-overlay" style={{ opacity: 0.04 }}>
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  );
}
