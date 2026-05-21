import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  /** Tilt the frame slightly to give it weight in compositions. Defaults to none. */
  tilt?: "left" | "right" | "none";
  className?: string;
  /** Aspect-ratio hint for the screen contents. Defaults to 9/19.5 (modern iPhone). */
  aspect?: string;
}

// Phone bezel + screen container for the landing's "look what your profile
// becomes" moments. Two main uses:
//   1. Embedding a live preview of Ashish's /ashish/c page in a phone frame
//   2. The before/after section showing a fake WhatsApp pitch vs a Slate
//      link unfurl, side-by-side
// Frame styling is deliberate: subtle gold inner ring on a dark bezel so the
// frame reads as "looking at a phone" without competing with the screen content.

export function PhoneFrame({
  children,
  tilt = "none",
  className,
  aspect = "9/19.5",
}: PhoneFrameProps) {
  const tiltClass =
    tilt === "left"
      ? "rotate-[-3deg]"
      : tilt === "right"
        ? "rotate-[3deg]"
        : "";
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[260px] rounded-[2.4rem] bg-[#0a0a09] p-[6px] transition-transform",
        tiltClass,
        className,
      )}
      style={{
        boxShadow:
          "0 30px 80px -30px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(201, 162, 75, 0.18)",
      }}
    >
      {/* Speaker pill at top */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-2 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1a1916]"
      />
      {/* Screen */}
      <div
        className="relative overflow-hidden rounded-[2rem] bg-slate-bg"
        style={{ aspectRatio: aspect }}
      >
        {children}
      </div>
    </div>
  );
}
