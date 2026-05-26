import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/visual/Section";
import { Wordmark } from "@/components/visual/Wordmark";
import { Divider } from "@/components/visual/Divider";

export const metadata: Metadata = {
  title: "Manifesto — Slate",
  description: "Why Slate exists. The story behind the actors' club of Mumbai.",
};

// /manifesto — long-form editorial. Narrow reading column, generous
// leading, dropped capitals, pull quotes for rhythm. Copy below is
// placeholder structured by section; the actual voice is yours to write.
// Marked clearly so it's obvious which prose to swap.

export default function ManifestoPage() {
  return (
    <>
      <Section tone="dark" as="main" className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1120px]">
          <Wordmark size="md" />
        </div>

        {/* Title block */}
        <div className="mx-auto mt-20 max-w-[720px] text-center md:mt-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Manifesto · <span className="devanagari">घोषणा</span>
          </p>
          <h1
            className="mt-6 font-display text-text-primary"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
              fontWeight: 700,
              fontSize: "clamp(3rem, 9vw, 5.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
            }}
          >
            Why we built
            <br />
            this thing.
          </h1>
          <p
            className="mt-8 font-display italic text-text-secondary"
            style={{
              fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
              lineHeight: 1.45,
            }}
          >
            For every fresher actor in Mumbai who has ever sent a Drive link to a casting director
            and watched the read receipt go cold.
          </p>
          <Divider className="mx-auto mt-12 max-w-[14rem]" />
        </div>

        {/* Body */}
        <article
          className="prose-slate mx-auto mt-20 max-w-[640px] text-text-secondary md:mt-28"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
            lineHeight: 1.7,
          }}
        >
          {/* [PLACEHOLDER COPY — REPLACE WITH ANISH'S VOICE] */}
          <p>
            <span
              className="float-left mr-2 mt-1 font-display text-text-primary"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                fontWeight: 700,
                fontSize: "4.5rem",
                lineHeight: 0.85,
              }}
            >
              W
            </span>
            e started by watching what actually happens between a fresher actor and a casting
            director on WhatsApp. The actor sends a Drive folder of videos, three Instagram reel
            links, and a screenshot of their stats. The casting director, scrolling through two
            hundred such messages a day, taps nothing. The actor refreshes for an hour. Then
            it&apos;s 11 PM, and tomorrow there&apos;s another audition.
          </p>

          <p className="mt-8">
            This is the part nobody told them in acting school. The job is half the craft, half the
            pitch. The pitch is happening on a messaging app with one chance to get tapped.
          </p>

          <BlockQuote>
            Slate is not a casting marketplace. It&apos;s the layer the actor controls — their
            presence, their pitch, their people.
          </BlockQuote>

          <p className="mt-8">
            [PLACEHOLDER — paragraph on what we&apos;re NOT. We&apos;re not Talentrack. We&apos;re
            not MCCC. We&apos;re not another &quot;AI will get you cast&quot; gimmick. We don&apos;t
            take a cut of jobs. Replace with your real framing of the &quot;not&quot; the user needs
            to hear.]
          </p>

          <p className="mt-8">
            [PLACEHOLDER — paragraph on what we ARE. A free, mobile-first profile builder + WhatsApp
            send kit + a real-world club. Open with the moment a fresher first sees their own
            film-poster profile — that&apos;s the emotional truth this paragraph should land.]
          </p>

          <SectionHeading>The club</SectionHeading>

          <p>
            [PLACEHOLDER — paragraph on the Sunday meetup in Aram Nagar. Why in-person matters. The
            vetting story. Who&apos;s welcome and who isn&apos;t. Founder voice; first person
            plural.]
          </p>

          <SectionHeading>What we won&apos;t do</SectionHeading>

          <p>
            [PLACEHOLDER — paragraph on the lines we won&apos;t cross. No paid tiers at launch. No
            pay-to-apply. No data sold to anyone, ever. No spammy casting-director-number
            directories. List the boundaries.]
          </p>

          <SectionHeading>What you can do</SectionHeading>

          <p>
            [PLACEHOLDER — closing call to action. Make a profile in 15 minutes. Send your link to
            the next casting director. Come to Sunday in Aram Nagar. Don&apos;t wait for permission.
            Land on a specific, do-this-today action.]
          </p>
        </article>

        {/* Signature + CTA */}
        <div className="mx-auto mt-24 max-w-[640px] text-center">
          <Divider className="mx-auto max-w-[10rem]" />
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            — [Founder name], Mumbai · 2026
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-cream px-7 text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
            >
              Make your Slate
            </Link>
            <Link
              href="/club"
              className="text-sm text-gold underline-offset-4 hover:underline focus-visible:underline"
            >
              Apply to the club →
            </Link>
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
            <Link href="/club" className="text-text-secondary hover:text-text-primary">
              Club
            </Link>
          </nav>
        </div>
      </Section>
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-14 font-display text-text-primary"
      style={{
        fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
        fontWeight: 600,
        fontSize: "clamp(1.5rem, 4vw, 2rem)",
        letterSpacing: "-0.015em",
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );
}

function BlockQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-gold/60 pl-6">
      <p
        className="font-display italic text-text-primary"
        style={{
          fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
          lineHeight: 1.45,
          fontWeight: 400,
        }}
      >
        {children}
      </p>
    </blockquote>
  );
}
