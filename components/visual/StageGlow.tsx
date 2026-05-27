interface StageGlowProps {
  className?: string;
}

export function StageGlow({ className }: StageGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,162,75,0.18) 0%, rgba(201,162,75,0.06) 40%, transparent 70%), radial-gradient(ellipse 80% 60% at 50% 60%, rgba(232,201,122,0.08) 0%, transparent 60%)",
      }}
    />
  );
}
