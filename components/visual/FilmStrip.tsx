import { cn } from "@/lib/cn";

interface FilmStripProps {
  className?: string;
}

export function FilmStrip({ className }: FilmStripProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full opacity-[0.12]"
        preserveAspectRatio="none"
      >
        {/* Top sprocket holes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={`t-${i}`}
            x={8 + i * 33}
            y={8}
            width={12}
            height={16}
            rx={2}
            stroke="#C9A24B"
            strokeWidth={0.8}
          />
        ))}
        {/* Bottom sprocket holes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={`b-${i}`}
            x={8 + i * 33}
            y={176}
            width={12}
            height={16}
            rx={2}
            stroke="#C9A24B"
            strokeWidth={0.8}
          />
        ))}
        {/* Frame borders */}
        <line x1={0} y1={28} x2={400} y2={28} stroke="#C9A24B" strokeWidth={0.5} />
        <line x1={0} y1={172} x2={400} y2={172} stroke="#C9A24B" strokeWidth={0.5} />
        {/* Frame dividers */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`d-${i}`}
            x1={80 * (i + 1)}
            y1={28}
            x2={80 * (i + 1)}
            y2={172}
            stroke="#C9A24B"
            strokeWidth={0.3}
          />
        ))}
      </svg>
    </div>
  );
}
