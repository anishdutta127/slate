"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TalentImage } from "@/components/profile/TalentImage";
import type { TalentPhoto, TalentCredit } from "@/types/talent";

interface PhoneProductDemoProps {
  talentSlug: string;
  photos: readonly TalentPhoto[];
  credits: readonly TalentCredit[];
}

export function PhoneProductDemo({ talentSlug, photos, credits }: PhoneProductDemoProps) {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(next, 2500);
    return () => clearInterval(id);
  }, [reduced, paused, next]);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px] lg:w-[320px]">
      <div
        className="relative overflow-hidden rounded-[2.5rem] bg-slate-surface p-2.5"
        style={{
          boxShadow: "0 30px 80px -30px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(245,239,227,0.08)",
        }}
      >
        {/* Speaker pill */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1a1916]"
        />
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2rem]" style={{ aspectRatio: "9/19.5" }}>
          {/* Photo gallery - top half */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "52%" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={reduced ? { opacity: 0.8 } : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0.8 } : { opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <TalentImage
                  photo={photos[current]!}
                  talentSlug={talentSlug}
                  fill
                  priority={current === 0}
                  sizes="320px"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current ? "w-4 bg-gold" : "w-1 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Gradient transition */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 z-[1]"
            style={{
              top: "46%",
              height: "12%",
              background: "linear-gradient(to bottom, transparent, #161613)",
            }}
          />

          {/* Work links - bottom half */}
          <div
            className="absolute bottom-0 left-0 right-0 z-[2] flex flex-col gap-0 bg-[#161613] px-4 pb-4 pt-2"
            style={{ top: "52%" }}
          >
            <p className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-gold">Work</p>
            <div className="flex flex-col">
              {credits.slice(0, 5).map((credit) => (
                <a
                  key={credit.id}
                  href={credit.urls[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/[0.06] py-[6px] last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-text-primary">
                      {credit.brand}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-text-tertiary">
                      {credit.medium}
                    </span>
                  </div>
                  <svg
                    className="h-2.5 w-2.5 text-text-tertiary transition-colors group-hover:text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
