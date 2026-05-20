import { cn } from "@/lib/cn";

interface SectionLabelProps {
  number: string; // "01", "02", etc.
  label: string;
  devanagari?: string; // optional Hindi accent
  className?: string;
}

// Numbered section header — gold mono uppercase: "01 · SHOWREEL".
// Devanagari accent renders smaller and muted next to the English, via the
// .devanagari helper class.
export function SectionLabel({ number, label, devanagari, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em] text-gold",
        className,
      )}
    >
      <span>{number}</span>
      <span className="mx-2 text-gold/40">·</span>
      <span>{label}</span>
      {devanagari ? (
        <>
          <span className="mx-2 text-gold/40">·</span>
          <span className="devanagari text-gold/80">{devanagari}</span>
        </>
      ) : null}
    </p>
  );
}
