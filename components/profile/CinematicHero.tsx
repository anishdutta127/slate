"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { TalentImage } from "@/components/profile/TalentImage";
import { cn } from "@/lib/cn";
import type { Talent } from "@/types/talent";

interface CinematicHeroProps {
  talent: Talent;
  /** Tailwind object-position class for the photo inside the frame.
   *  Defaults to object-[center_18%]. Override per-photo for best composition. */
  objectClass?: string;
}

// Hero on /[slug] — Framed Portrait treatment (V3 from the A1 exploration).
// Deep charcoal stage, gold-bordered frame with generous matting around a
// portrait of the actor, museum-plate caption below: name in Fraunces, gold
// gradient rule, mono stats, italic tagline.
//
// Motion: caption block reveals staggered after the photo. The frame itself
// stays still — the dignity of the composition comes from holding the photo
// where it is. No ken-burns inside the frame; the frame doesn't move.
// All animation respects useReducedMotion.

const ease = [0.16, 1, 0.3, 1] as const;

export function CinematicHero({
  talent,
  objectClass = "object-[center_25%]",
}: CinematicHeroProps) {
  const reduced = useReducedMotion();
  const reveal = (delayMs: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.4 : 0.7,
      delay: delayMs / 1000,
      ease,
    },
  });

  return (
    <section
      aria-label={`${talent.name}, portrait`}
      className="relative flex h-svh min-h-[680px] w-full flex-col items-center justify-center overflow-hidden bg-slate-bg px-6 py-10 md:py-16"
    >
      {/* Wordmark top-left */}
      <Link
        href="/"
        className="absolute left-6 top-6 z-30 flex items-baseline gap-1.5 text-text-primary opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg md:left-12 md:top-10"
      >
        <span
          className="font-display text-sm font-semibold tracking-tight"
          style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
        >
          Slate.
        </span>
        <span className="inline-block h-1 w-1 rounded-full bg-gold" />
        <span className="ml-1 devanagari text-text-secondary">स्लेट</span>
      </Link>

      {/* Top-right "Quick view" link to the CD view — C1 signposting */}
      <Link
        href={`/${talent.slug}/c`}
        className="absolute right-6 top-6 z-30 font-mono text-[11px] uppercase tracking-[0.15em] text-gold/70 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:text-gold focus-visible:underline focus-visible:outline-none md:right-12 md:top-10"
      >
        Quick view →
      </Link>

      {/* The frame */}
      <motion.div
        {...reveal(0)}
        className="relative aspect-[3/4] w-full max-w-[320px] p-2 md:max-w-[380px]"
        style={{
          border: "1px solid rgba(201, 162, 75, 0.6)",
          boxShadow:
            "0 30px 80px -25px rgba(0,0,0,0.8), 0 0 0 1px rgba(201, 162, 75, 0.15)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <TalentImage
            photo={talent.hero}
            talentSlug={talent.slug}
            fill
            priority
            sizes="(min-width: 768px) 380px, 320px"
            className={cn("object-cover", objectClass)}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(14,14,12,0.4) 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* Museum-plate caption */}
      <div className="mt-10 flex flex-col items-center gap-3 text-center md:mt-12">
        <motion.span
          {...reveal(150)}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
        >
          Now Showing · {talent.city}
        </motion.span>
        <motion.h1
          {...reveal(250)}
          className="font-display text-text-primary"
          style={{
            fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
            fontWeight: 600,
            fontSize: "clamp(2rem, 7vw, 3rem)",
            letterSpacing: "-0.015em",
            lineHeight: 1.05,
          }}
        >
          {talent.name}
        </motion.h1>
        <motion.div
          {...reveal(400)}
          className="h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent"
        />
        <motion.p
          {...reveal(500)}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary"
        >
          Plays {talent.plays.min}-{talent.plays.max} · {talent.height.display} ·{" "}
          {talent.languages.join(" · ")}
        </motion.p>
        {talent.tagline ? (
          <motion.p
            {...reveal(650)}
            className="mt-2 max-w-[28ch] text-balance text-sm italic leading-relaxed text-text-tertiary"
          >
            {talent.tagline}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
