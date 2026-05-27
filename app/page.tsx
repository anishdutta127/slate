import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Section } from "@/components/visual/Section";
import { Wordmark } from "@/components/visual/Wordmark";
import { BeforeAfterShowcase } from "@/components/marketing/BeforeAfterShowcase";
import { StickyNav } from "@/components/marketing/StickyNav";
import { FloatingCards } from "@/components/marketing/FloatingCards";
import { PhoneProductDemo } from "@/components/marketing/PhoneProductDemo";
import { TalentImage } from "@/components/profile/TalentImage";
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

const clubHighlights = [
  {
    icon: "✦",
    label: "Free",
    title: "A professional profile",
    body: "Casting view + cinematic view, one shareable link",
  },
  {
    icon: "◆",
    label: "Free",
    title: "One link instead of many",
    body: "No more Drive dumps. Everything in one clean page",
  },
  {
    icon: "◎",
    label: "Free",
    title: "The Mumbai actors' community",
    body: "Ask seniors for contacts, referrals, audition tips",
  },
  {
    icon: "☀",
    label: "Free",
    title: "Your first practice session",
    body: "With a working actor. Scene work, real feedback",
  },
  {
    icon: "▲",
    label: "Premium",
    title: "More practice sessions",
    body: "₹299-499 / 30 min with working actors",
  },
  {
    icon: "◈",
    label: "Premium",
    title: "Cinematic Pro profile",
    body: "Custom link, no watermark, see who viewed",
  },
  {
    icon: "⬡",
    label: "Premium",
    title: "Reach recruiters directly",
    body: "Personalised bulk WhatsApp + email to verified casting contacts",
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

const communityUsps = [
  { title: "Referrals from working actors", body: "The contacts that actually move careers" },
  { title: "Practice with people who've done it", body: "Book a session, get real feedback" },
  { title: "Group tips and audition leads", body: "A WhatsApp community that shares" },
  { title: "You're not alone in this city", body: "Freshers and working actors, together" },
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
        className="relative overflow-hidden pt-[100px] pb-16 lg:min-h-svh lg:pb-0"
      >
        {/* Enhanced ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[50rem] opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 8%, rgba(201,162,75,0.28), transparent 50%), radial-gradient(ellipse 60% 40% at 75% 20%, rgba(232,201,122,0.14), transparent 40%), radial-gradient(circle at 50% 0%, rgba(245,239,227,0.06), transparent 30%)",
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

            {/* H1 - outcome-driven, short */}
            <h1
              className="mt-5 font-display text-text-primary"
              style={{
                fontWeight: 700,
                fontSize: "clamp(42px, 8vw, 76px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              Get seen by the right people.
            </h1>

            {/* Subhead */}
            <p className="mt-6 max-w-[460px] text-lg leading-relaxed text-text-secondary">
              Join the club and get a free professional profile. Share one link, not a pile of Drive
              and YouTube links.
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

            {/* Micro-copy under CTA */}
            <p className="mt-3 font-mono text-[11px] tracking-[0.04em] text-text-tertiary">
              Free for the founding batch. No payment.
            </p>
          </div>

          {/* Right column - phone + premium teaser */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
            <PhoneProductDemo
              talentSlug={ASHISH.slug}
              photos={allPhotos}
              credits={ASHISH.credits}
            />
            <FloatingCards />

            {/* Premium teaser below phone */}
            <div className="mx-auto mt-6 max-w-[320px]">
              <a
                href="#pricing"
                className="group flex items-center gap-3 rounded-lg border border-gold/15 bg-slate-surface/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-gold/30"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm text-gold">
                  ⬡
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-text-primary">
                    Reach 50 casting directors in one click
                  </p>
                  <p className="text-[9px] text-text-tertiary">
                    Premium - personalised WhatsApp and email, sent for you
                  </p>
                </div>
                <span className="shrink-0 text-[10px] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </a>
            </div>
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

          {/* Premium bulk-message one-liner */}
          <div className="mt-12 flex items-center justify-center gap-2 rounded-sm border border-gold/15 bg-slate-surface/30 px-6 py-4 text-center">
            <p className="text-sm text-text-secondary">
              Sending to many people?{" "}
              <span className="font-medium text-text-primary">
                Slate Premium sends personalised messages to verified casting contacts, for you.
              </span>
            </p>
            <a
              href="#pricing"
              className="shrink-0 text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
              See how →
            </a>
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
       * EVERYTHING IN THE CLUB
       * ============================================================ */}
      <Section
        tone="dark"
        id="club"
        className="relative py-20 md:py-28"
        style={{
          background: "linear-gradient(180deg, #0e0e0c 0%, #0a0a08 50%, #0e0e0c 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            The full picture
          </p>
          <h2 className="display-m mt-6 text-text-primary">
            Everything in the club.{" "}
            <span className="font-devanagari text-[0.7em] text-gold" style={{ opacity: 0.8 }}>
              क्लब में सब कुछ।
            </span>
          </h2>
          <p className="mt-5 max-w-[560px] text-text-secondary">
            One membership. Profile, community, and access to people who can actually help. Free to
            start, premium when you&apos;re ready.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clubHighlights.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-sm bg-[#161613] p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  boxShadow: `inset 0 0 0 1px ${item.label === "Premium" ? "rgba(201, 162, 75, 0.3)" : "rgba(245, 239, 227, 0.06)"}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gold">{item.icon}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] ${
                      item.label === "Premium"
                        ? "bg-gold/15 text-gold"
                        : "bg-white/5 text-text-tertiary"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-medium text-text-primary">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-text-tertiary">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
       * MEET ASHISH
       * ============================================================ */}
      <Section tone="dark" id="ashish" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            One of the first
          </p>
          <h2 className="display-m mt-6 text-text-primary">Meet Ashish.</h2>

          <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - photo + community USPs */}
            <div>
              {/* Framed portrait - bigger, properly shown */}
              <div
                className="relative mx-auto overflow-hidden rounded-sm bg-slate-surface p-3 lg:mx-0"
                style={{
                  boxShadow:
                    "0 24px 64px -20px rgba(0,0,0,0.6), 0 8px 24px -12px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(201,162,75,0.25)",
                  maxWidth: 420,
                }}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px]">
                  <TalentImage
                    photo={ASHISH.gallery[0]!}
                    talentSlug={ASHISH.slug}
                    fill
                    sizes="(min-width: 1024px) 420px, 360px"
                    className="object-cover object-[center_15%]"
                  />
                </div>
              </div>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary lg:text-left">
                Ashish Rawat · slate.club/ashish
              </p>

              {/* Community USPs */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {communityUsps.map((usp) => (
                  <div
                    key={usp.title}
                    className="flex gap-3 rounded-sm border border-border-dark bg-slate-surface/30 p-4"
                  >
                    <span className="mt-0.5 text-gold">॥</span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{usp.title}</p>
                      <p className="mt-0.5 text-xs text-text-tertiary">{usp.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - quote + credits + two profile views */}
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
                Every member gets two views: a fast casting view for CDs, and a cinematic view for
                the full story. Yours will look just as good.
              </p>

              {/* Two profile type preview cards */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  <p className="mt-1 text-xs text-text-tertiary">What a CD sees in two seconds.</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gold transition-colors group-hover:text-gold-soft">
                    Open casting view →
                  </span>
                </Link>

                <Link
                  href={`/${ASHISH.slug}`}
                  className="group relative overflow-hidden rounded-sm border border-gold/20 bg-slate-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-[10px] text-gold">
                      ▶
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
                    Open cinematic view →
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
       * ATMOSPHERE (stage/cinema mood imagery)
       * ============================================================ */}
      <Section
        tone="dark"
        className="py-16 md:py-24"
        style={{
          background: "linear-gradient(180deg, #0e0e0c 0%, #0a0a08 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {/* Source: Unsplash - theatre stage lights. TODO: swap for real Slate photos */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="/atmosphere/theatre-lights.jpg"
                alt=""
                fill
                className="object-cover"
                style={{ filter: "brightness(0.5) sepia(0.3) saturate(0.8)" }}
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-bg/60 to-transparent" />
            </div>
            {/* Source: Unsplash - stage spotlight. TODO: swap for real Slate photos */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="/atmosphere/stage-spotlight.jpg"
                alt=""
                fill
                className="object-cover"
                style={{ filter: "brightness(0.45) sepia(0.25) saturate(0.7)" }}
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-bg/60 to-transparent" />
            </div>
            {/* Source: Unsplash - dark cinema. TODO: swap for real Slate photos */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="/atmosphere/dark-cinema.jpg"
                alt=""
                fill
                className="object-cover"
                style={{ filter: "brightness(0.5) sepia(0.35) saturate(0.6)" }}
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-bg/60 to-transparent" />
            </div>
            {/* Source: Unsplash - Mumbai night. TODO: swap for real Slate photos */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="/atmosphere/mumbai-night.jpg"
                alt=""
                fill
                className="object-cover"
                style={{ filter: "brightness(0.45) sepia(0.2) saturate(0.7)" }}
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-bg/60 to-transparent" />
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
            Find your people.
          </h2>
          <p className="mx-auto mt-6 max-w-[42ch] text-text-secondary">
            Mumbai is hard alone. The club has your back. Join the founding batch. Your profile,
            your community, your first break.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-slate-cream px-10 text-base font-medium text-text-on-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream-2 hover:shadow-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
          >
            Join the club, free
          </Link>
          <p className="mt-6 font-devanagari text-[15px] text-gold" style={{ opacity: 0.8 }}>
            मुंबई में नए हो? सही लोग यहीं मिलेंगे।
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
