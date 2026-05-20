import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  tone?: "cream" | "dark";
}

const base =
  "inline-flex items-center justify-center font-body font-medium transition-colors duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-slate-bg disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-base rounded-full",
  lg: "h-12 px-8 text-base rounded-full",
};

// "primary" is the fill button. On dark sections it is cream-on-dark; on cream
// sections it is dark-on-cream. Never gold — gold is reserved for accent.
const variantsByTone = {
  cream: {
    primary: "bg-slate-cream text-text-on-light hover:bg-slate-cream-2",
    ghost:
      "border border-border-dark text-text-primary hover:bg-slate-surface hover:border-slate-cream/20",
    link:
      "h-auto px-0 rounded-none text-text-primary underline-offset-4 hover:text-gold-soft " +
      "decoration-gold decoration-1 hover:decoration-gold-soft underline",
  },
  dark: {
    primary: "bg-slate-bg text-slate-cream hover:bg-slate-surface",
    ghost:
      "border border-border-light text-text-on-light hover:bg-slate-cream-2",
    link:
      "h-auto px-0 rounded-none text-text-on-light underline-offset-4 hover:text-gold " +
      "decoration-gold decoration-1 underline",
  },
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", tone = "cream", type = "button", ...rest },
  ref,
) {
  const variantClass = variantsByTone[tone][variant];
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, sizes[size], variantClass, className)}
      {...rest}
    />
  );
});
