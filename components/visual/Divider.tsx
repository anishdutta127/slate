import { cn } from "@/lib/cn";

interface DividerProps {
  className?: string;
}

// Signature detail: a hairline gold gradient that fades to transparent at the
// edges. Use to separate sections. Avoid using more than one per fold.
export function Divider({ className }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-px w-full", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, transparent 0%, var(--color-gold) 50%, transparent 100%)",
      }}
    />
  );
}
