// Shared layout shell for the /design/vN hero exploration pages.
// Strips all the post-hero content; the variants render ONE hero treatment
// each so they can be compared apples-to-apples in the board iframes at 375
// viewport width. Not used in production — these routes are scaffolded for
// the design-shotgun exploration only.

import type { ReactNode } from "react";

export function HeroExploration({ children }: { children: ReactNode }) {
  return (
    <main className="relative h-svh min-h-[600px] w-full overflow-hidden bg-slate-bg">
      {children}
    </main>
  );
}
