import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/visual/Section";
import { Wordmark } from "@/components/visual/Wordmark";
import { Divider } from "@/components/visual/Divider";

export const metadata: Metadata = {
  title: "Sign up — Slate",
  description: "Make your Slate profile in 15 minutes. Coming with M3.",
};

// /signup is M3 (auth + onboarding). For now the landing's main CTA lands
// here on an honest holding page: tell them what's coming, point them at
// the action they CAN take today (apply to the Sunday club). When M3 wires
// up phone OTP + the 5-step onboarding flow, this file gets replaced.

export default function SignupPage() {
  return (
    <Section
      tone="dark"
      as="main"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
    >
      <Wordmark size="md" />

      <p className="chip-text mt-12 text-gold">Sign-up · coming with M3</p>
      <h1
        className="mt-6 max-w-[20ch] font-display text-text-primary"
        style={{
          fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          letterSpacing: "-0.025em",
          lineHeight: 0.95,
        }}
      >
        Profile builder lands soon.
      </h1>
      <p className="mt-6 max-w-[36ch] text-balance text-base leading-relaxed text-text-secondary md:text-lg">
        Phone OTP, photo upload, in-browser reel recording, the whole 15-minute flow. We&apos;re
        building it. You&apos;ll get a Slate of your own within weeks.
      </p>

      <Divider className="my-10 max-w-[14rem]" />

      <p className="max-w-[36ch] text-balance text-text-tertiary">
        Until then, the door you can walk through today is the Sunday club.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/club"
          className="inline-flex h-12 items-center justify-center rounded-full bg-slate-cream px-7 text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
        >
          Apply to the club
        </Link>
        <Link
          href="/manifesto"
          className="text-sm text-gold underline-offset-4 hover:underline focus-visible:underline"
        >
          Read the manifesto →
        </Link>
      </div>

      <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
        Made on Slate · <span className="devanagari">स्लेट</span>
      </p>
    </Section>
  );
}
