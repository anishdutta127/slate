import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/visual/Section";
import { Wordmark } from "@/components/visual/Wordmark";
import { BeforeAfterShowcase } from "@/components/marketing/BeforeAfterShowcase";
import { StickyNav } from "@/components/marketing/StickyNav";
import { FloatingCards } from "@/components/marketing/FloatingCards";
import { PhoneProductDemo } from "@/components/marketing/PhoneProductDemo";
import { TalentImage } from "@/components/profile/TalentImage";
import { MoodTile } from "@/components/visual/MoodTile";
import { ASHISH } from "@/lib/talent/ashish";

export const metadata: Metadata = {
  title: "Slate, the actors' club of Mumbai",
  description:
    "Join the Mumbai actors' club, get a casting-ready profile, and share one professional link on WhatsApp.",
};

/* ---------------------------------------------------------------------------
 * Data
 * --------------------------------------------------------------------------- */

const howSteps = [
  {
    num: "1",
    title: "Join the club",
    body: "Apply to the Mumbai actors' club. Freshers welcome. No CV, no fees.",
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
    title: "Get access",
    body: "Book a practice slot with a working actor, get your first introductions, share your link like a pro.",
    hindi: "आगे बढ़ो।",
  },
];

const whatYouGet = [
  {
    icon: "✦",
    title: "A profile that opens doors",
    body: "Photos, work links, casting view and cinematic view. One shareable link that looks professional.",
  },
  {
    icon: "◎",
    title: "First access to working actors",
    body: "A community where you can reach experienced actors, ask for contacts, and book practice slots.",
  },
  {
    icon: "☀",
    title: "Your first introductions",
    body: "We help you get seen by the right people, the right way. No cold-messaging, no spam.",
  },
];

const freeFeatures = [
  "Casting-ready profile page",
  "Both casting + cinematic views",
  "Clean WhatsApp share with preview",
  "The Mumbai actors' community",
  "Ask seniors for contacts and advice",
  "Your first practice slot free",
];

const paidFeatures = [
  {
    name: "Practice slots",
    price: "From ₹299",
    description: "30 min with a working actor. First one free.",
  },
  {
    name: "Cinematic Pro",
    price: "₹99",
    description: "Custom link, no watermark, see who opened your profile.",
  },
  {
    name: "Reach recruiters directly",
    price: "Coming soon",
    badge: "Premium",
    description:
      "Personalised WhatsApp and email to verified casting contacts, sent on your behalf. Reviewed, never spam.",
  },
];

const clubBullets = [
  "A vetted WhatsApp community of Mumbai actors",
  "Book practice slots with working actors",
  "First introductions to the right people",
  "No fees, no gatekeeping",
];

/* ---------------------------------------------------------------------------
 * Page
 * --------------------------------------------------------------------------- */

export default function HomePage() {
  const allPhotos = [ASHISH.hero, ...ASHISH.gallery];

  return (
    <>
      <StickyNav />

      {/* ============================================================
       * HERO
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
                fontWeight: 700,
                fontSize: "clamp(40px, 7vw, 72px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
              }}
            >
              One link.
              <br />
              Everything a casting director needs.
            </h1>

            {/* Subhead */}
            <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-text-secondary">
              Join the club and we build you a free profile that looks professional. Share one link
              instead of a pile of Google Drive and YouTube links.
            </p>

            {/* Hinglish */}
            <p className="mt-4 text-[15px] text-text-tertiary">
              <span className="font-devanagari text-gold" style={{ fontStyle: "normal" }}>
                एक लिंक, बस।
              </span>
              {"  "}
              <span className="italic">One link, that&apos;s all.</span>
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-full bg-slate-cream px-7 text-base font-medium text-text-on-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream-2 hover:shadow-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                Join the club, free
              </Link>
              <a
                href="#how"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gold/35 px-7 text-base font-medium text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-slate-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                See how it works
              </a>
            </div>

            {/* Founding note */}
            <p className="mt-5 font-mono text-[12px] tracking-[0.04em] text-text-tertiary">
              <span className="font-semibold text-gold">Founding batch open.</span> First 100
              members get their profile made free.
            </p>
          </div>

          {/* Right column - phone as product demo */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
            <PhoneProductDemo
              talentSlug={ASHISH.slug}
              photos={allPhotos}
              credits={ASHISH.credits}
            />
            <FloatingCards />
          </div>
        </div>
      </Section>

      {/* ============================================================
       * BEFORE / AFTER
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
       * HOW IT WORKS
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
       * WHAT YOU GET
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
       * MEET ASHISH - dual profile showcase
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
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            One of the first
          </p>
          <h2 className="display-m mt-6 text-text-primary">Meet Ashish. One of the first.</h2>

          {/* Portrait + quote + credits */}
          <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - framed portrait */}
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
                    photo={ASHISH.gallery[0]!}
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

            {/* Right - copy + credits */}
            <div>
              <blockquote className="border-l-2 border-gold/60 pl-5">
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

              {/* Credit pills */}
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
                This is what a Slate profile looks like. Every member gets two views: a fast casting
                view for CDs, and a cinematic view for the full story.
              </p>

              {/* Two profile type preview cards */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Casting view card */}
                <Link
                  href={`/${ASHISH.slug}/c`}
                  className="group relative overflow-hidden rounded-sm border border-gold/20 bg-slate-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-xs text-gold">
                      ⚡
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                      Casting view
                    </span>
                  </div>
                  <p className="text-sm font-medium text-text-primary">Fast, scannable.</p>
                  <p className="mt-1 text-xs text-text-tertiary">
                    What a casting director sees in two seconds.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gold transition-colors group-hover:text-gold-soft">
                    Open casting view
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>

                {/* Cinematic view card */}
                <Link
                  href={`/${ASHISH.slug}`}
                  className="group relative overflow-hidden rounded-sm border border-gold/20 bg-slate-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-xs text-gold">
                      🎬
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                      Cinematic view
                    </span>
                  </div>
                  <p className="text-sm font-medium text-text-primary">The full story.</p>
                  <p className="mt-1 text-xs text-text-tertiary">
                    Photos, work, the whole profile.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gold transition-colors group-hover:text-gold-soft">
                    Open cinematic view
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
       * PRICING
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

            {/* Paid features card */}
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
              <p className="chip-text text-gold">Upgrades</p>
              <p
                className="mt-4 font-display text-text-primary"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  lineHeight: 1.1,
                }}
              >
                When you&apos;re ready for more
              </p>
              <p className="mt-4 text-sm text-text-secondary">
                Pay only for what you need. No subscriptions, no bundles.
              </p>

              <div className="mt-6 flex flex-1 flex-col gap-4">
                {paidFeatures.map((f) => (
                  <div key={f.name} className="rounded-sm border border-gold/15 bg-slate-bg/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-primary">{f.name}</span>
                      {f.badge && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-gold">
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-mono text-xs text-gold">{f.price}</p>
                    <p className="mt-1 text-xs text-text-tertiary">{f.description}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/signup?intent=pro"
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-cream text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                Talk to us
              </Link>
            </article>
          </div>

          <p className="mt-8 text-center font-mono text-[11px] tracking-[0.06em] text-text-tertiary">
            We reach the right people, personally. We never blast.
          </p>
        </div>
      </Section>

      {/* ============================================================
       * CLUB
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
                The club
              </p>
              <h2 className="display-m mt-6 text-text-primary">
                More than a profile. A way in.{" "}
                <span className="font-devanagari text-[0.7em] text-gold" style={{ opacity: 0.8 }}>
                  रास्ता यहीं से।
                </span>
              </h2>
              <p className="mt-5 max-w-[440px] text-text-secondary">
                The profile gets you noticed. The club gets you connected. A real community of
                Mumbai actors helping each other break through.
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

            {/* Right - abstract mood visuals */}
            <div className="grid grid-cols-2 gap-3">
              <MoodTile className="row-span-2 min-h-[280px]" />
              <MoodTile
                className="aspect-square"
                gradient="radial-gradient(ellipse at 60% 40%, rgba(232,201,122,0.12) 0%, transparent 60%), linear-gradient(140deg, #161613, #0e0e0c)"
              />
              <MoodTile
                className="aspect-square"
                glow={false}
                gradient="linear-gradient(160deg, rgba(201,162,75,0.08), #0e0e0c)"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
       * FINAL CTA
       * ============================================================ */}
      <Section tone="dark" id="join" className="py-24 md:py-36">
        <div className="mx-auto max-w-[660px] px-6 text-center md:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            Are you an actor?
          </p>
          <h2
            className="mt-6 font-display text-text-primary"
            style={{
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
            batch. Your profile, your community, your first break.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-slate-cream px-10 text-base font-medium text-text-on-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream-2 hover:shadow-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
          >
            Join the Slate club, free
          </Link>
          <p className="mt-6 font-devanagari text-[15px] text-gold" style={{ opacity: 0.8 }}>
            मुंबई में नए हो? सही कमरे से शुरू करो।
          </p>
        </div>
      </Section>

      {/* ============================================================
       * FOOTER
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
