import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Section } from "@/components/visual/Section";
import { Wordmark } from "@/components/visual/Wordmark";
import { BeforeAfterShowcase } from "@/components/marketing/BeforeAfterShowcase";
import { StickyNav } from "@/components/marketing/StickyNav";
import { FloatingCards } from "@/components/marketing/FloatingCards";
import { TalentImage } from "@/components/profile/TalentImage";
import { ASHISH } from "@/lib/talent/ashish";

export const metadata: Metadata = {
  title: "Slate, the actors' club of Mumbai",
  description:
    "Join the Mumbai actors' club, get your casting profile made, send a beautiful link on WhatsApp, and practise with other freshers every week.",
};

/* ---------------------------------------------------------------------------
 * Data
 * --------------------------------------------------------------------------- */

const howSteps = [
  {
    num: "1",
    title: "Join the club",
    body: "Apply to the Mumbai actors' club. We welcome freshers. No CV, no fees, no gatekeeping.",
    hindi: "क्लब से जुड़ो।",
  },
  {
    num: "2",
    title: "Get your profile",
    body: "We build you a clean, casting-ready profile from your photos and work. Free for the founding batch.",
    hindi: "प्रोफाइल बनवाओ।",
  },
  {
    num: "3",
    title: "Grow together",
    body: "Practise every Sunday, ask seniors for contacts and advice, send your link like a pro.",
    hindi: "साथ में बढ़ो।",
  },
];

const whatYouGet = [
  {
    icon: "✦",
    title: "A profile that opens doors",
    body: "Photos, intro video, work links, and a clean casting view — all on one cinematic page that looks ready to forward.",
  },
  {
    icon: "◎",
    title: "A real community",
    body: "A vetted WhatsApp circle of Mumbai actors. Ask for contacts, audition leads, honest advice. You're not alone in this city anymore.",
  },
  {
    icon: "☀",
    title: "Weekly practice",
    body: "Slate Sundays in Aram Nagar. Scene work, cold reads, feedback from people who get it. Free, every week.",
  },
];

const freeFeatures = [
  "Casting-ready profile page",
  "Clean WhatsApp share with preview",
  "The Mumbai actors' WhatsApp community",
  "Weekly Slate Sunday practice",
  "Ask seniors for contacts & advice",
];

const proFeatures = [
  "The full cinematic profile page",
  "Custom link & no Slate watermark",
  "See who opened your profile",
];

const proHighlight = "Managed outreach — verified casting contacts";

const proExtras = [
  "Personalised email + WhatsApp, reviewed by us",
  "Reply tracking & follow-up help",
];

const clubBullets = [
  "Weekly scene practice & cold reads",
  "Vetted WhatsApp community",
  "Monthly Slate Nights with working actors & CDs",
  "No fees, no gatekeeping",
];

/* ---------------------------------------------------------------------------
 * Page
 * --------------------------------------------------------------------------- */

export default function HomePage() {
  // Non-null: these are static data entries we control (lib/talent/ashish.ts)
  const blazerPhoto = ASHISH.gallery[0]!; // 02-headshot-blazer
  const fullbodyPhoto = ASHISH.gallery[1]!; // 01-fullbody-white-shirt
  const seatedPhoto = ASHISH.gallery[2]!; // 04-seated-mint-shirt

  return (
    <>
      <StickyNav />

      {/* ============================================================
       * 1.2 — Hero
       * ============================================================ */}
      <Section
        tone="dark"
        as="main"
        className="relative overflow-hidden pt-[120px] pb-16 lg:min-h-svh lg:pb-0"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[42rem] opacity-75"
          style={{
            background:
              "radial-gradient(circle at 18% 12%, rgba(201,162,75,0.24), transparent 32%), radial-gradient(circle at 82% 24%, rgba(245,239,227,0.12), transparent 30%)",
          }}
        />

        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left column */}
          <div className="flex max-w-[560px] flex-col items-start">
            {/* Eyebrow */}
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
              <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
              Mumbai · The actors&apos; club
            </p>

            {/* H1 */}
            <h1
              className="mt-5 font-display text-text-primary"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                fontWeight: 600,
                fontSize: "clamp(40px, 7vw, 76px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
              }}
            >
              Your first profile should feel like your{" "}
              <em className="text-gold-soft" style={{ fontStyle: "italic" }}>
                first break.
              </em>
            </h1>

            {/* Subhead */}
            <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-text-secondary">
              Join the Slate actors&apos; club in Mumbai. Get a free, casting-ready profile,
              practise every week with other actors, and find your way into the right rooms.
            </p>

            {/* Hinglish */}
            <p className="mt-4 text-[15px] text-text-tertiary">
              <span className="font-devanagari text-gold" style={{ fontStyle: "normal" }}>
                सीन शुरू यहीं से।
              </span>
              {"  "}
              <span className="italic">The scene starts here.</span>
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-full bg-slate-cream px-7 text-base font-medium text-text-on-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream-2 hover:shadow-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                Join the club — it&apos;s free
              </Link>
              <a
                href="#ashish"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gold/35 px-7 text-base font-medium text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-slate-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                See a profile →
              </a>
            </div>

            {/* Founding note */}
            <p className="mt-5 font-mono text-[12px] tracking-[0.04em] text-text-tertiary">
              <span className="font-semibold text-gold">Founding batch open.</span> First 100
              members get their profile made for free.
            </p>
          </div>

          {/* Right column — phone mockup */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
            <div className="relative mx-auto w-[260px] sm:w-[280px] lg:w-[300px]">
              {/* Phone frame */}
              <div
                className="relative overflow-hidden rounded-[2.5rem] bg-slate-surface p-2.5"
                style={{
                  boxShadow:
                    "0 30px 80px -30px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(245,239,227,0.08)",
                }}
              >
                {/* Speaker pill */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-2 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1a1916]"
                />
                {/* Screen */}
                <div
                  className="relative overflow-hidden rounded-[2rem]"
                  style={{ aspectRatio: "9/19.5" }}
                >
                  {/* Photo */}
                  <TalentImage
                    photo={blazerPhoto}
                    talentSlug={ASHISH.slug}
                    priority
                    fill
                    sizes="300px"
                    className="object-cover object-[center_15%]"
                  />
                  {/* Gradient fade */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 45%, rgba(22,22,19,0.6) 65%, #161613 88%)",
                    }}
                  />
                  {/* Text overlay */}
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-gold">
                      Mumbai · Actor
                    </p>
                    <p
                      className="mt-1 font-display text-[26px] font-semibold leading-tight text-text-primary"
                      style={{
                        fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1',
                      }}
                    >
                      Ashish Rawat
                    </p>
                    <p className="mt-1 font-mono text-[10px] tracking-wide text-text-secondary">
                      Plays 22-28 · 5&apos;8&quot; · Hindi &amp; English
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <FloatingCards />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
       * 1.3 — Before / After
       * ============================================================ */}
      <Section
        tone="dark"
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(180deg, #0e0e0c 0%, #0a0a08 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">The problem</p>
          <h2 className="display-m mt-6 text-text-primary">
            How you apply now.{" "}
            <span className="font-devanagari text-[0.7em] text-gold" style={{ opacity: 0.8 }}>
              और कैसे होना चाहिए।
            </span>
          </h2>
          <p className="mt-5 max-w-[600px] text-text-secondary">
            Right now your work lives in a messy WhatsApp message. Drive links, YouTube dumps, a
            wall of text. Casting people scroll past it in two seconds. Slate fixes the thing they
            actually see.
          </p>

          <div className="mt-14">
            <BeforeAfterShowcase />
          </div>
        </div>
      </Section>

      {/* ============================================================
       * 1.4 — How it works
       * ============================================================ */}
      <Section tone="dark" id="how" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            How it works
          </p>
          <h2 className="display-m mt-6 text-text-primary">
            Three steps.{" "}
            <span className="font-devanagari text-[0.7em] text-gold" style={{ opacity: 0.8 }}>
              बस तीन कदम।
            </span>
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {howSteps.map((step) => (
              <article
                key={step.num}
                className="group relative overflow-hidden rounded-sm bg-[#161613] p-6 transition-all duration-300 hover:-translate-y-1 md:p-8"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.35)",
                  }}
                />
                <span
                  className="font-display text-gold/20"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                    fontWeight: 700,
                    fontSize: "4.5rem",
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </span>
                <h3 className="display-s mt-4 text-text-primary">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{step.body}</p>
                <p className="mt-5 font-devanagari text-sm text-gold/70">{step.hindi}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
       * 1.5 — What you get
       * ============================================================ */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            What you get
          </p>
          <h2 className="display-m mt-6 text-text-primary">More than a portfolio.</h2>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {whatYouGet.map((tile) => (
              <article
                key={tile.title}
                className="group relative overflow-hidden rounded-sm bg-[#161613] p-6 transition-all duration-300 hover:-translate-y-1 md:p-8"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.35)",
                  }}
                />
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-lg text-gold">
                  {tile.icon}
                </span>
                <h3 className="display-s mt-5 text-text-primary">{tile.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{tile.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
       * 1.6 — Ashish showcase
       * ============================================================ */}
      <Section
        tone="dark"
        id="ashish"
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(180deg, #0a0a08 0%, #0e0e0c 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — framed portrait */}
            <div className="flex flex-col items-center">
              <div
                className="relative overflow-hidden rounded-sm bg-slate-surface p-3"
                style={{
                  boxShadow:
                    "0 24px 64px -20px rgba(0,0,0,0.6), 0 8px 24px -12px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(201,162,75,0.25)",
                  maxWidth: 380,
                }}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px]">
                  <TalentImage
                    photo={blazerPhoto}
                    talentSlug={ASHISH.slug}
                    fill
                    sizes="(min-width: 1024px) 380px, 320px"
                    className="object-cover object-[center_15%]"
                  />
                </div>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                Ashish Rawat · slate.club/ashish
              </p>
            </div>

            {/* Right — copy + credits */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                One of the first
              </p>
              <h2 className="display-m mt-6 text-text-primary">Meet Ashish.</h2>

              {/* Pull-quote */}
              <blockquote className="mt-6 border-l-2 border-gold/60 pl-5">
                <p
                  className="font-display italic text-text-primary"
                  style={{
                    fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                    lineHeight: 1.45,
                    fontWeight: 400,
                  }}
                >
                  Six years on stage and screen. Built for ad films, ready for the long form.
                </p>
              </blockquote>

              {/* Credit pills — linked */}
              <div className="mt-8 flex flex-wrap gap-2">
                {ASHISH.credits.map((credit) => (
                  <a
                    key={credit.id}
                    href={credit.urls[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/pill inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-text-primary transition-all duration-200 hover:border-gold/60 hover:bg-slate-surface"
                  >
                    {credit.brand}
                    <svg
                      className="h-3 w-3 text-text-tertiary opacity-0 transition-opacity group-hover/pill:opacity-100"
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

              <p className="mt-6 max-w-[440px] text-sm leading-relaxed text-text-secondary">
                This is what a Slate profile looks like. Yours will look just as good — whether you
                have six credits or none yet.
              </p>

              <Link
                href={`/${ASHISH.slug}`}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-gold/40 px-6 text-base font-medium text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream hover:text-text-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                See his full profile →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
       * 1.7 — Pricing
       * ============================================================ */}
      <Section tone="dark" id="pricing" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            Free to join
          </p>
          <h2 className="display-m mt-6 text-text-primary">
            Start free. Grow when you&apos;re ready.
          </h2>
          <p className="mt-5 max-w-[560px] text-text-secondary">
            The club and your first profile are free for the founding batch. When you want more
            reach, we have tools that do the work for you.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Free card */}
            <article
              className="flex flex-col rounded-sm bg-[#161613] p-6 md:p-8"
              style={{ boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)" }}
            >
              <p className="chip-text text-gold">The Club</p>
              <p
                className="mt-4 font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  lineHeight: 0.95,
                }}
              >
                Free
              </p>
              <p className="mt-2 text-sm text-text-tertiary">Founding batch</p>
              <p className="mt-4 text-sm text-text-secondary">
                Everything you need to start showing up like a professional.
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-0.5 text-gold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-cream text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                Join the club
              </Link>
            </article>

            {/* Pro card */}
            <article
              className="relative flex flex-col overflow-hidden rounded-sm p-6 md:p-8"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(201,162,75,0.5)",
                background: "linear-gradient(160deg, #161613 0%, rgba(201,162,75,0.06) 100%)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent"
              />
              <div className="flex items-center gap-3">
                <p className="chip-text text-gold">Slate Pro + Outreach</p>
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-gold">
                  For serious profiles
                </span>
              </div>
              <p
                className="mt-4 font-display text-text-primary"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  lineHeight: 0.95,
                }}
              >
                ₹99{" "}
                <span className="text-[0.4em] font-normal tracking-normal text-text-tertiary">
                  /cinematic page
                </span>
              </p>
              <p className="mt-4 text-sm text-text-secondary">
                When you&apos;re ready to be seen by the right people, we help you reach them —
                properly, never spam.
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-0.5 text-gold">✓</span>
                    {f}
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm font-medium text-gold">
                  <span className="mt-0.5">✓</span>
                  {proHighlight}
                </li>
                {proExtras.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-0.5 text-gold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup?intent=pro"
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-cream text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                Talk to us
              </Link>
            </article>
          </div>

          <p className="mt-8 text-center font-mono text-[11px] tracking-[0.06em] text-text-tertiary">
            Outreach is{" "}
            <span className="font-semibold text-text-secondary">managed and respectful</span>. We
            never blast. We reach the right people, on your behalf, with messages worth reading.
          </p>
        </div>
      </Section>

      {/* ============================================================
       * 1.8 — Club
       * ============================================================ */}
      <Section
        tone="dark"
        id="club"
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(180deg, #0e0e0c 0%, #0a0a08 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                Slate Sundays
              </p>
              <h2 className="display-m mt-6 text-text-primary">
                The club meets every week.{" "}
                <span className="font-devanagari text-[0.7em] text-gold" style={{ opacity: 0.8 }}>
                  हर संडे।
                </span>
              </h2>
              <p className="mt-5 max-w-[440px] text-text-secondary">
                Every Sunday in Aram Nagar, freshers come together for scene work, cold reads, and
                honest feedback. The WhatsApp community carries the energy through the week.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {clubBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-text-secondary">
                    <span className="font-devanagari text-gold" style={{ opacity: 0.8 }}>
                      ॥
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href="/club"
                className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-slate-cream px-7 text-base font-medium text-text-on-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream-2 hover:shadow-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                Apply to join
              </Link>
            </div>

            {/* Right — photo grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Tall photo */}
              <div
                className="relative row-span-2 overflow-hidden rounded-sm"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(245,239,227,0.08)",
                }}
              >
                <Image
                  src={`/talent/${ASHISH.slug}/${fullbodyPhoto.slug}-828.webp`}
                  alt={fullbodyPhoto.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, 180px"
                  className="object-cover"
                />
              </div>
              {/* Square photos */}
              <div
                className="relative aspect-square overflow-hidden rounded-sm"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(245,239,227,0.08)",
                }}
              >
                <Image
                  src={`/talent/${ASHISH.slug}/${ASHISH.hero.slug}-828.webp`}
                  alt={ASHISH.hero.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, 180px"
                  className="object-cover"
                />
              </div>
              <div
                className="relative aspect-square overflow-hidden rounded-sm"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(245,239,227,0.08)",
                }}
              >
                <Image
                  src={`/talent/${ASHISH.slug}/${seatedPhoto.slug}-828.webp`}
                  alt={seatedPhoto.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, 180px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
       * 1.9 — Final CTA
       * ============================================================ */}
      <Section tone="dark" id="join" className="py-24 md:py-36">
        <div className="mx-auto max-w-[660px] px-6 text-center md:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            Are you an actor?
          </p>
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
            Come find your room.
          </h2>
          <p className="mx-auto mt-6 max-w-[42ch] text-text-secondary">
            Mumbai is hard alone. It&apos;s different with a club behind you. Join the founding
            batch — your profile, your community, your first break.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-slate-cream px-10 text-base font-medium text-text-on-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream-2 hover:shadow-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
          >
            Join the Slate club — free →
          </Link>
          <p className="mt-6 font-devanagari text-[15px] text-gold" style={{ opacity: 0.8 }}>
            मुंबई में नए हो? सही कमरे से शुरू करो।
          </p>
        </div>
      </Section>

      {/* ============================================================
       * 1.10 — Footer
       * ============================================================ */}
      <Section tone="dark" as="footer" className="border-t border-border-dark px-6 py-16 md:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <Link
            href="/"
            className="flex items-baseline gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <Wordmark size="sm" />
            <span className="font-devanagari text-[13px] text-gold" style={{ opacity: 0.7 }}>
              स्लेट
            </span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em]">
            <a href="#how" className="text-text-secondary hover:text-text-primary">
              How it works
            </a>
            <Link href="/club" className="text-text-secondary hover:text-text-primary">
              The Club
            </Link>
            <a href="#pricing" className="text-text-secondary hover:text-text-primary">
              Pricing
            </a>
            <Link href="/manifesto" className="text-text-secondary hover:text-text-primary">
              Manifesto
            </Link>
            <a
              href={ASHISH.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary"
            >
              Instagram
            </a>
          </nav>

          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Made in Mumbai ·{" "}
            <span className="font-devanagari text-gold" style={{ opacity: 0.7 }}>
              स्लेट
            </span>
          </p>
        </div>
      </Section>
    </>
  );
}
