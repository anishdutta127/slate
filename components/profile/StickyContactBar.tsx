"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface StickyContactBarProps {
  sentinelId: string; // id of an element above the fold; bar appears once it scrolls offscreen
  contactSectionId: string; // smooth-scroll target on tap
  className?: string;
}

// Mobile-only floating "Get in touch" pill. Appears once the user has scrolled
// past the hero (sentinel leaves viewport from the top). Tap smooth-scrolls to
// the contact section. Hidden on md+ (the contact section is always reachable
// via normal scroll on desktop). prefers-reduced-motion: no slide, just appear.
export function StickyContactBar({ sentinelId, contactSectionId }: StickyContactBarProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // Show the bar when the sentinel is NO LONGER on screen (i.e. user
        // has scrolled past it). Don't show before any scroll has happened.
        setVisible(!entry.isIntersecting);
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [sentinelId]);

  const onTap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(contactSectionId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-40 md:hidden"
        >
          <a
            href={`#${contactSectionId}`}
            onClick={onTap}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-cream text-base font-medium text-text-on-light shadow-cinematic transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Get in touch
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
