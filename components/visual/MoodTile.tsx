import { cn } from "@/lib/cn";
import { StageGlow } from "./StageGlow";
import { GrainField } from "./GrainField";

interface MoodTileProps {
  className?: string;
  glow?: boolean;
  gradient?: string;
}

export function MoodTile({ className, glow = true, gradient }: MoodTileProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-sm bg-slate-surface", className)}
      style={{ boxShadow: "inset 0 0 0 1px rgba(245,239,227,0.08)" }}
    >
      {/* TODO: swap for real meetup/audition photo when available */}
      <GrainField
        gradient={
          gradient ??
          "radial-gradient(ellipse at 40% 30%, rgba(201,162,75,0.1) 0%, transparent 60%), linear-gradient(160deg, #161613, #0e0e0c)"
        }
      />
      {glow && <StageGlow className="absolute inset-0" />}
    </div>
  );
}
