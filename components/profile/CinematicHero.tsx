"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { TalentImage } from "@/components/profile/TalentImage";
import { Grain } from "@/components/visual/Grain";
import type { Talent } from "@/types/talent";

interface CinematicHeroProps {
  talent: Talent;
}

// Hero on /[slug]. Full-viewport stack from back to front:
//   1. Hero photo (object-cover, ken-burns via CSS class)
//   2. Radial vignette overlay
//   3. Subtle film grain (Grain tone="dark")
//   4. Top-left wordmark, Slate. · स्लेट, links to /
//   5. Bottom 35% gradient -> overlays the name + stats line + scroll cue
//
// Motion: name and stats line reveal staggered after photo lands. Ken-burns
// is CSS-only (respects prefers-reduced-motion natively via media query).
// Reveal motion respects useReducedMotion (Motion library).

const ease = [0.16, 1, 0.3, 1] as const;

export function CinematicHero({ talent }: CinematicHeroProps) {
  const reduced = useReducedMotion();
  const reveal = (delayMs: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.4 : 0.8,
      delay: delayMs / 1000,
      ease,
    },
  });

  return (
    <section
      aria-label={`${talent.name}, hero photo`}
      className="relative h-svh min-h-[600px] w-full overflow-hidden bg-slate-bg"
    >
      {/* Photo layer with ken-burns */}
      <div className="absolute inset-0 ken-burns motion-reduce:!transform-none">
        <TalentImage
          photo={talent.hero}
          talentSlug={talent.slug}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
      </div>

      {/* Radial vignette — darkens edges so name + stats sit comfortably */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(14, 14, 12, 0.6) 100%)",
        }}
      />

      {/* Film grain over the photo, dark-only */}
      <Grain tone="dark" />

      {/* Top-left wordmark */}
      <Link
        href="/"
        className="absolute left-6 top-6 z-30 flex items-baseline gap-2 text-text-primary opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg md:left-12 md:top-10"
      >
        <span
          className="font-display text-base font-semibold tracking-tight"
          style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
        >
          Slate.
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">·</span>
        <span className="devanagari text-text-secondary">स्लेट</span>
      </Link>

      {/* Bottom gradient (35% height) so name reads clearly over any photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[40%]"
        style={{
          background: "linear-gradient(to top, rgba(14, 14, 12, 0.92) 0%, transparent 100%)",
        }}
      />

      {/* Name + stats stack — overlays the gradient */}
      <div className="absolute inset-x-6 bottom-12 z-20 flex flex-col items-start gap-3 md:inset-x-12 md:bottom-16 md:gap-4">
        <motion.span
          {...reveal(100)}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold"
        >
          {talent.city} · ACTOR
        </motion.span>

        <motion.h1
          {...reveal(200)}
          className="font-display text-text-primary"
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
            fontWeight: 700,
            fontSize: "clamp(3.75rem, 11vw, 6rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {talent.name}
        </motion.h1>

        <motion.p
          {...reveal(500)}
          className="font-mono text-sm text-text-secondary md:text-base"
        >
          Plays {talent.plays.min}-{talent.plays.max} <span className="text-text-tertiary">·</span>{" "}
          {talent.height.display} <span className="text-text-tertiary">·</span>{" "}
          {talent.languages.join(" & ")}
        </motion.p>
      </div>

      {/* Scroll cue at very bottom-center */}
      <motion.div
        {...reveal(1400)}
        aria-hidden="true"
        className="scroll-cue absolute inset-x-0 bottom-4 z-20"
      />
    </section>
  );
}
