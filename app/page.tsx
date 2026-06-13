import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/visual/Section";
import { Divider } from "@/components/visual/Divider";
import { Wordmark } from "@/components/visual/Wordmark";
import { PhoneFrame } from "@/components/visual/PhoneFrame";
import { SectionLabel } from "@/components/profile/SectionLabel";
import { BeforeAfterShowcase } from "@/components/marketing/BeforeAfterShowcase";
import { ASHISH } from "@/lib/talent/ashish";

export const metadata: Metadata = {
  title: "Slate — the actors' club of Mumbai",
  description:
    "Make a profile that looks like a film poster. Send it like a pro on WhatsApp. Grow with the club every Sunday in Aram Nagar.",
};

// M2 landing. Replaces the placeholder. Built in the same visual language
// we locked for /ashish (Framed Portrait + Cover Story + Slate is the
// magazine that features actors). Copy is placeholder-quality where the
// user's voice matters; structural microcopy is final.

export default function HomePage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <Section
        tone="dark"
        as="main"
        className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16 md:flex-row md:items-center md:gap-16 md:px-12 md:py-24"
      >
        {/* Left: pitch + CTA */}
        <div className="flex max-w-[28rem] flex-col items-start text-left">
          <Wordmark size="md" />
          <p className="chip-text mt-8 text-gold">
            The actors&apos; club of Mumbai · <span className="devanagari">स्लेट</span>
          </p>
          <h1
            className="mt-4 font-display text-text-primary"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
              fontWeight: 700,
              fontSize: "clamp(2.75rem, 9vw, 4.5rem)",
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
            }}
          >
            Look ready
            <br />
            before the
            <br />
            audition.
          </h1>
          <p className="mt-6 max-w-[34ch] text-balance text-base leading-relaxed text-text-secondary md:text-lg">
            A profile that looks like a film poster. Sent as a beautiful link, not a Drive folder. Backed by a real club that meets every Sunday in Aram Nagar.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-cream px-7 text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
            >
              Make yours
            </Link>
            <Link
              href={`/${ASHISH.slug}`}
              className="text-sm text-gold underline-offset-4 hover:underline focus-visible:underline"
            >
              See a real profile →
            </Link>
          </div>
        </div>

        {/* Right: live preview of Ashish's CD view in a phone frame */}
        <div className="mt-12 w-full max-w-[280px] md:mt-0 md:w-auto md:flex-shrink-0">
          <PhoneFrame tilt="right">
            <iframe
              src={`/${ASHISH.slug}/c`}
              title={`${ASHISH.name} profile preview`}
              className="block h-full w-full"
              loading="lazy"
            />
          </PhoneFrame>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            slate.club/{ASHISH.slug}
          </p>
        </div>
      </Section>

      {/* ========== BEFORE/AFTER ========== */}
      <Section tone="dark" className="border-t border-border-dark px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-16 max-w-[640px] text-center">
            <SectionLabel number="01" label="Before / After" />
            <h2
              className="mt-6 font-display text-text-primary"
              style={{
                fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                fontWeight: 600,
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              The same actor, the same pitch.
            </h2>
            <p className="mt-4 text-text-secondary">
              One link replaces the wall of text every fresher sends today.
            </p>
          </div>
          <BeforeAfterShowcase />
        </div>
      </Section>

      {/* ========== WHAT SLATE GIVES YOU ========== */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-16">
            <SectionLabel number="02" label="What you get" />
            <h2
              className="mt-6 max-w-[18ch] font-display text-text-primary"
              style={{
                fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                fontWeight: 600,
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Three things, done well.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                num: "01",
                title: "A profile that looks like a film poster",
                body: "Cinematic hero, your headshot framed properly, brand work and bio in one beautifully typeset page. Built to make casting directors stop scrolling.",
              },
              {
                num: "02",
                title: "Send it like a pro on WhatsApp",
                body: "One link unfurls into a preview card with your photo, age range, height, languages. No more pasting six YouTube URLs in a row.",
              },
              {
                num: "03",
                title: "Grow with the club every Sunday",
                body: "Free meetup in Aram Nagar — scene work, cold reads, monthly Slate Nights with working actors and casting coordinators. Real-life, not Discord.",
              },
            ].map((card) => (
              <article
                key={card.num}
                className="relative flex flex-col rounded-sm bg-[#161613] p-6 md:p-8"
                style={{ boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)" }}
              >
                <span className="chip-text text-gold">{card.num}</span>
                <h3
                  className="mt-4 font-display text-text-primary"
                  style={{
                    fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                  }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== THE FIRST PROFILE — Ashish ========== */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1">
              <SectionLabel number="03" label="The first profile" />
              <h2
                className="mt-6 font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                }}
              >
                Meet {ASHISH.name.split(" ")[0]}.
              </h2>
              <p className="mt-4 max-w-[40ch] text-text-secondary">
                Six years on stage and screen. Faces you&apos;ve seen in Honda, Cipla, Zepto, Nilkamal, and Smotect. One of the first on Slate.
              </p>
              <p className="mt-3 max-w-[40ch] text-sm italic leading-relaxed text-text-tertiary">
                His page is what we want every fresher profile to look like by the third audition.
              </p>
              <Link
                href={`/${ASHISH.slug}`}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-gold/40 px-6 text-base font-medium text-text-primary transition-colors hover:bg-slate-cream hover:text-text-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                See {ASHISH.name.split(" ")[0]}&apos;s full profile →
              </Link>
            </div>

            <div className="order-1 flex justify-center md:order-2">
              <PhoneFrame tilt="left">
                <iframe
                  src={`/${ASHISH.slug}/c`}
                  title={`${ASHISH.name} CD view`}
                  className="block h-full w-full"
                  loading="lazy"
                />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== THE CLUB ========== */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Placeholder photo block — meetup pics go here later */}
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:aspect-[4/5]"
              style={{
                background:
                  "linear-gradient(135deg, #161613 0%, #1a1916 50%, #0a0a09 100%)",
                boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)",
              }}
            >
              {/* Subtle grid pattern to read as "this is a photo placeholder" */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(201,162,75,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,75,0.05) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <span className="chip-text text-gold/60">Meetup photos</span>
                <span className="font-mono text-[10px] text-text-tertiary">
                  Coming after Sunday
                </span>
              </div>
            </div>

            <div>
              <SectionLabel number="04" label="The club" devanagari="क्लब" />
              <h2
                className="mt-6 font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                }}
              >
                Sundays in Aram Nagar.
              </h2>
              <p className="mt-4 max-w-[40ch] text-text-secondary">
                Free. Hosted by us. Scene work, cold reads, monthly Slate Nights with a working actor or casting coordinator. We cap the club at ~80 vetted members so it stays a room, not a Discord.
              </p>
              <Link
                href="/club"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-slate-cream px-7 text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                Apply to join
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== HOW IT WORKS ========== */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-16 text-center">
            <SectionLabel number="05" label="How it works" />
            <h2
              className="mt-6 font-display text-text-primary"
              style={{
                fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                fontWeight: 600,
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Fifteen minutes to ready.
            </h2>
          </div>

          <ol className="mx-auto grid max-w-[900px] grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {[
              {
                step: "I",
                title: "Make your profile",
                body: "Phone number, name, slug. Upload a few photos. Paste your reel or record one in the browser. Add the stats. Done.",
              },
              {
                step: "II",
                title: "Send your link",
                body: "From the dashboard, pick a message preset, paste the casting director's number, tap. WhatsApp opens with everything prefilled.",
              },
              {
                step: "III",
                title: "Join the club",
                body: "Get vetted into the WhatsApp community. Show up on Sunday in Aram Nagar. The rest is on you.",
              },
            ].map((s) => (
              <li key={s.step} className="flex flex-col items-center text-center">
                <span
                  className="font-display text-gold"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                    fontWeight: 700,
                    fontSize: "3rem",
                    lineHeight: 1,
                  }}
                >
                  {s.step}
                </span>
                <Divider className="my-5 max-w-[6rem]" />
                <h3
                  className="font-display text-text-primary"
                  style={{
                    fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1',
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-text-secondary">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ========== FINAL CTA ========== */}
      <Section
        tone="dark"
        className="border-t border-border-dark px-6 py-32 text-center md:px-12 md:py-40"
      >
        <div className="mx-auto max-w-[640px]">
          <SectionLabel number="06" label="Get your Slate" devanagari="शुरू करें" className="justify-center text-center" />
          <h2
            className="mt-6 font-display text-text-primary"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            Are you an actor?
          </h2>
          <p
            className="mt-3 font-display italic text-text-secondary"
            style={{
              fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)",
              lineHeight: 1.3,
            }}
          >
            Then make this yours.
          </p>
          <p className="mx-auto mt-6 max-w-[40ch] text-text-tertiary">
            Free. No watermarks. No paywalls. We&apos;ll meet you in person on Sunday.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-14 items-center justify-center rounded-full bg-slate-cream px-10 text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
            >
              Make your Slate
            </Link>
            <Link
              href="/manifesto"
              className="text-sm text-gold underline-offset-4 hover:underline focus-visible:underline"
            >
              Read the manifesto first →
            </Link>
          </div>
        </div>
      </Section>

      {/* ========== FOOTER ========== */}
      <Section
        tone="dark"
        as="footer"
        className="border-t border-border-dark px-6 py-16 md:px-12"
      >
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <Link
            href="/"
            className="flex items-baseline gap-2 text-text-primary opacity-80 transition-opacity hover:opacity-100"
          >
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
              Made on Slate
            </span>
            <span className="font-mono text-xs text-text-tertiary">·</span>
            <span className="devanagari text-text-tertiary">स्लेट</span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em]">
            <Link href="/manifesto" className="text-text-secondary hover:text-text-primary">
              Manifesto
            </Link>
            <Link href="/club" className="text-text-secondary hover:text-text-primary">
              The club
            </Link>
            <Link href={`/${ASHISH.slug}`} className="text-text-secondary hover:text-text-primary">
              First profile
            </Link>
            <a
              href="https://www.instagram.com/slate.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary"
            >
              Instagram
            </a>
          </nav>

          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Mumbai · 2026
          </p>
        </div>
      </Section>
    </>
  );
}
