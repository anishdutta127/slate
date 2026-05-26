import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/visual/Section";
import { Wordmark } from "@/components/visual/Wordmark";
import { SectionLabel } from "@/components/profile/SectionLabel";
import { ClubApplyForm } from "./ClubApplyForm";

export const metadata: Metadata = {
  title: "The club — Slate",
  description:
    "The Slate club helps fresher actors in Mumbai join a vetted WhatsApp community, practise weekly, and get a CD-ready profile made for free during the founding batch.",
};

// /club — application + meetup placeholders. Application form posts to
// /api/club/apply which currently just logs (DB write lands in M5).
// Meetup photos are placeholders until after the first Sunday session.

export default function ClubPage() {
  return (
    <>
      <Section
        tone="dark"
        as="main"
        className="border-b border-border-dark px-6 py-16 md:px-12 md:py-24"
      >
        <div className="mx-auto max-w-[1120px]">
          <Wordmark size="md" />

          <div className="mt-16 grid grid-cols-1 items-start gap-16 md:grid-cols-2">
            <div>
              <SectionLabel number="00" label="The club" devanagari="क्लब" />
              <h1
                className="mt-6 font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 0.95,
                }}
              >
                Sundays in
                <br />
                Aram Nagar.
              </h1>
              <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-text-secondary md:text-lg">
                Free for the founding batch. We help freshers find scene partners, enter useful
                WhatsApp circles, avoid shady casting noise, and practise cold reads with people on
                the same path.
              </p>
              <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-text-tertiary">
                The joining prize is your CD-ready Slate profile, made with us for free for now. We
                cap the WhatsApp community at ~80 vetted members so it stays a room, not a random
                group.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-border-dark pt-8">
                <div>
                  <dt className="chip-text text-gold">When</dt>
                  <dd className="mt-2 text-text-primary">Sundays · 4–7 PM</dd>
                </div>
                <div>
                  <dt className="chip-text text-gold">Where</dt>
                  <dd className="mt-2 text-text-primary">Aram Nagar, Mumbai</dd>
                </div>
                <div>
                  <dt className="chip-text text-gold">Cost</dt>
                  <dd className="mt-2 text-text-primary">Free founding batch</dd>
                </div>
                <div>
                  <dt className="chip-text text-gold">Prize</dt>
                  <dd className="mt-2 text-text-primary">Profile made with us</dd>
                </div>
              </dl>
            </div>

            <div className="md:pl-8">
              <div
                className="rounded-md bg-slate-surface p-6 md:p-8"
                style={{ boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.18)" }}
              >
                <p className="chip-text text-gold">Apply to join</p>
                <p className="mt-3 text-sm text-text-secondary">
                  Five quick fields. Hinglish is fine. We&apos;ll read it like humans, not a form
                  rejection.
                </p>
                <div className="mt-6">
                  <ClubApplyForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Past meetups — placeholder until the first Sunday */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <SectionLabel number="01" label="From the room" />
          <h2
            className="mt-6 max-w-[20ch] font-display text-text-primary"
            style={{
              fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
              fontWeight: 600,
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            The first room is being built.
          </h2>
          <p className="mt-4 max-w-[40ch] text-text-secondary">
            Until the first meetup photos come in, this is the promise: better practice, cleaner
            profiles, safer casting information, and people who actually understand the fresher
            grind.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] overflow-hidden rounded-sm"
                style={{
                  background: "linear-gradient(135deg, #161613 0%, #1a1916 50%, #0a0a09 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.12)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(201,162,75,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,75,0.04) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark" as="footer" className="border-t border-border-dark px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <Link
            href="/"
            className="flex items-baseline gap-2 text-text-tertiary hover:text-text-primary"
          >
            <span className="font-mono text-xs uppercase tracking-[0.15em]">Made on Slate</span>
            <span className="font-mono text-xs">·</span>
            <span className="devanagari">स्लेट</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em]">
            <Link href="/" className="text-text-secondary hover:text-text-primary">
              Home
            </Link>
            <Link href="/manifesto" className="text-text-secondary hover:text-text-primary">
              Manifesto
            </Link>
          </nav>
        </div>
      </Section>
    </>
  );
}
