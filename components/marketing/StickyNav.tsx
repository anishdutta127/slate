"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/visual/Wordmark";
import { cn } from "@/lib/cn";

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-[border-color,background-color] duration-300",
        scrolled
          ? "border-b border-border-dark bg-slate-bg/80"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 md:px-12">
        <Link href="/" className="flex items-baseline gap-2">
          <Wordmark size="sm" />
          <span className="font-devanagari text-[13px] text-gold" style={{ opacity: 0.7 }}>
            स्लेट
          </span>
        </Link>

        <div className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] md:flex">
          <a href="#how" className="text-text-secondary transition-colors hover:text-text-primary">
            How it works
          </a>
          <a href="#club" className="text-text-secondary transition-colors hover:text-text-primary">
            The Club
          </a>
          <a
            href="#pricing"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            Pricing
          </a>
          <a
            href="#ashish"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            A profile
          </a>
        </div>

        <Link
          href="/signup"
          className="inline-flex h-9 items-center justify-center rounded-full bg-slate-cream px-5 text-sm font-medium text-text-on-light transition-colors hover:bg-slate-cream-2"
        >
          Join the club
        </Link>
      </nav>
    </header>
  );
}
