import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/cn";
import { Grain } from "@/components/visual/Grain";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone: "dark" | "light";
  as?: ElementType;
}

// Section is the structural primitive every page composes from.
// It owns three things together: background color, text color, and grain
// texture. The tone prop is the single dial — "dark" gives charcoal bg +
// cream text + grain overlay; "light" gives cream bg + near-black text + no
// grain (per DESIGN.md). Pages never set bg or grain directly; they wrap
// content in Section and let the tone decide. This keeps the design system
// consistent and prevents grain from ever bleeding onto a cream surface.
export function Section({ tone, as: As = "section", className, children, ...props }: SectionProps) {
  const toneClasses =
    tone === "dark" ? "bg-slate-bg text-text-primary" : "bg-slate-cream text-text-on-light";
  return (
    <As {...props} className={cn("relative", toneClasses, className)}>
      <Grain tone={tone} />
      <div className="relative z-20">{children}</div>
    </As>
  );
}
