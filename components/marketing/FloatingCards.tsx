"use client";

import { motion, useReducedMotion } from "motion/react";

export function FloatingCards() {
  const reduced = useReducedMotion();

  return (
    <>
      <motion.div
        className="absolute -left-2 top-[14%] z-10 sm:-left-4 lg:-left-10"
        animate={reduced ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="flex items-start gap-2.5 rounded-lg bg-[#161613]/95 px-3.5 py-2.5 backdrop-blur-sm"
          style={{
            boxShadow: "0 16px 48px -16px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(245,239,227,0.08)",
          }}
        >
          <span className="text-sm text-gold">⚡</span>
          <div>
            <p className="text-[12px] font-medium text-text-primary">Fast for casting directors</p>
            <p className="text-[10px] text-text-tertiary">Everything they need in 2 seconds</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-2 bottom-[20%] z-10 sm:-right-4 lg:-right-8"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <div
          className="flex items-start gap-2.5 rounded-lg bg-[#161613]/95 px-3.5 py-2.5 backdrop-blur-sm"
          style={{
            boxShadow: "0 16px 48px -16px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(245,239,227,0.08)",
          }}
        >
          <span className="text-sm text-gold">✦</span>
          <div>
            <p className="text-[12px] font-medium text-text-primary">One link, not ten</p>
            <p className="text-[10px] text-text-tertiary">Looks professionally made</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
