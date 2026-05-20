import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "cream" | "dark";
}

// Stats chip — mono uppercase, hairline border. Used for things like
// "5'8\" · 22–28 · Hindi". Tiny, scannable, analog.
export function Chip({ className, tone = "cream", children, ...rest }: ChipProps) {
  const toneClass =
    tone === "cream"
      ? "border-border-dark text-text-secondary"
      : "border-border-light text-text-on-light/70";
  return (
    <span
      className={cn(
        "chip-text inline-flex items-center rounded-full border px-2.5 py-1",
        toneClass,
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
