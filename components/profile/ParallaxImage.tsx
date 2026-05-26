"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { TalentImage } from "@/components/profile/TalentImage";
import type { TalentPhoto } from "@/types/talent";

interface ParallaxImageProps {
  photo: TalentPhoto;
  talentSlug: string;
  sizes?: string;
}

// Subtle scroll-linked parallax for the portfolio section. As the image
// enters the viewport (from 0 to 100% of the offset["start end", "end start"]
// window), its translateY goes from +30px to -30px. Cancelled under
// prefers-reduced-motion.
export function ParallaxImage({ photo, talentSlug, sizes }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={ref}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-gold/10 bg-slate-bg"
    >
      <motion.div style={reduced ? undefined : { y }} className="absolute inset-0">
        <TalentImage
          photo={photo}
          talentSlug={talentSlug}
          fill
          sizes={sizes ?? "(min-width: 768px) 33vw, 100vw"}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
