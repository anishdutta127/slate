"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TalentImage } from "@/components/profile/TalentImage";
import type { TalentPhoto } from "@/types/talent";

interface CinematicSlideshowProps {
  photos: readonly TalentPhoto[];
  talentSlug: string;
}

export function CinematicSlideshow({ photos, talentSlug }: CinematicSlideshowProps) {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [reduced, next, current]);

  const variants = {
    enter: (d: number) => ({
      x: reduced ? 0 : d > 0 ? "8%" : "-8%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: reduced ? 0 : d > 0 ? "-8%" : "8%",
      opacity: 0,
    }),
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Main image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-gold/10 bg-slate-bg">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <TalentImage
              photo={photos[current]!}
              talentSlug={talentSlug}
              fill
              sizes="(min-width: 768px) 70vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-bg/50 text-text-primary backdrop-blur-sm transition-colors hover:bg-slate-bg/80"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-bg/50 text-text-primary backdrop-blur-sm transition-colors hover:bg-slate-bg/80"
        >
          ›
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-4 flex justify-center gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.slug}
            onClick={() => goTo(i)}
            aria-label={`View photo ${i + 1}`}
            className={`relative h-16 w-12 overflow-hidden rounded-sm transition-all duration-300 ${
              i === current
                ? "ring-1 ring-gold ring-offset-2 ring-offset-slate-bg"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <TalentImage
              photo={photo}
              talentSlug={talentSlug}
              fill
              sizes="48px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
