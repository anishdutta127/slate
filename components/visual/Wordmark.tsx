import { cn } from "@/lib/cn";

interface WordmarkProps {
  size?: "sm" | "md" | "lg";
  tone?: "cream" | "dark";
  className?: string;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
} as const;

const dotSizeClasses = {
  sm: "h-1 w-1",
  md: "h-1.5 w-1.5",
  lg: "h-2 w-2",
} as const;

export function Wordmark({ size = "md", tone = "cream", className }: WordmarkProps) {
  const toneColor = tone === "cream" ? "text-text-primary" : "text-text-on-light";
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 font-display font-semibold tracking-tight",
        sizeClasses[size],
        toneColor,
        className,
      )}
      style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
    >
      Slate
      <span
        aria-hidden="true"
        className={cn("inline-block rounded-full bg-gold", dotSizeClasses[size])}
      />
    </span>
  );
}
