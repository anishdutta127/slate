import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Section } from "@/components/visual/Section";
import { Divider } from "@/components/visual/Divider";
import { Wordmark } from "@/components/visual/Wordmark";
import { PhoneFrame } from "@/components/visual/PhoneFrame";
import { SectionLabel } from "@/components/profile/SectionLabel";
import { BeforeAfterShowcase } from "@/components/marketing/BeforeAfterShowcase";
import { ASHISH } from "@/lib/talent/ashish";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Slate, the fresher actors' club of Mumbai",
  description:
    "Join the Mumbai actors' club, get your casting profile made, send a beautiful link on WhatsApp, and practise with other freshers every week.",
};

const actorWins = [
  {
    eyebrow: "Free for founding members",
    title: "Join the Mumbai actors' circle",
    body: "Get into a vetted WhatsApp community for freshers, scene partners, practice prompts, safe casting alerts, and weekly rooms in Aram Nagar.",
    devanagari: "अपना circle बनाओ",
  },
  {
    eyebrow: "Your joining prize",
    title: "We make your CD profile",
    body: "Not a boring Drive folder. A clean casting view with photos, stats, reel links, and a cinematic page you can proudly send.",
    devanagari: "profile ready",
  },
  {
    eyebrow: "Made for WhatsApp",
    title: "Send one link, not six links",
    body: "Your profile opens with a preview card, a short pitch, and your contact details. It looks professional even inside a messy chat.",
    devanagari: "भेजो like a pro",
  },
];

const offerCards = [
  {
    name: "Founder Club",
    price: "Free",
    note: "For the first Mumbai batch",
    items: [
      "WhatsApp community",
      "Weekly practice circle",
      "Casting safety notes",
      "Free CD profile made with us",
    ],
    cta: "Apply to join",
    href: "/club",
    featured: true,
  },
  {
    name: "Cinematic Page",
    price: "₹99",
    note: "Launch price after the first batch",
    items: [
      "Film-poster profile page",
      "Link thumbnail cards",
      "Share-ready WhatsApp preview",
      "No messy Google Drive pitch",
    ],
    cta: "See sample",
    href: `/${ASHISH.slug}`,
    featured: false,
  },
  {
    name: "Outreach Desk",
    price: "Pilot",
    note: "For Ashish and trusted working actors first",
    items: [
      "Shortlisted contacts only",
      "Email plus WhatsApp workflow",
      "Template review before sending",
      "Reply tracking and follow-ups",
    ],
    cta: "Read the pilot plan",
    href: "#outreach",
    featured: false,
  },
];

const howItWorks = [
  {
    step: "I",
    title: "Apply to the club",
    body: "Name, phone, Instagram, city, and why you are acting. Hinglish is fine. English polish is not the test.",
  },
  {
    step: "II",
    title: "We help build your profile",
    body: "We collect photos, intro video, reel links, language, height, age range, and training. Then we make it look casting-ready.",
  },
  {
    step: "III",
    title: "Send it and practise weekly",
    body: "Use your link when you message casting teams. Come to the Sunday room to improve your intro, scenes, and confidence.",
  },
];

export default function HomePage() {
  return (
    <>
      <Section
        tone="dark"
        as="main"
        className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16 md:flex-row md:items-center md:gap-16 md:px-12 md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] opacity-70"
          style={{
            background:
              "radial-gradient(circle at 30% 10%, rgba(201,162,75,0.20), transparent 34%), radial-gradient(circle at 75% 25%, rgba(245,239,227,0.10), transparent 28%)",
          }}
        />

        <div className="relative z-10 flex max-w-[29rem] flex-col items-start text-left">
          <Wordmark size="md" />
          <p className="chip-text mt-8 text-gold">
            Mumbai fresher actors&apos; club · <span className="devanagari">नया circle</span>
          </p>
          <h1
            className="mt-4 font-display text-text-primary"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
              fontWeight: 700,
              fontSize: "clamp(2.75rem, 9vw, 4.65rem)",
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
            }}
          >
            Stop sending
            <br />
            ugly audition
            <br />
            links.
          </h1>
          <p className="mt-6 max-w-[36ch] text-balance text-base leading-relaxed text-text-secondary md:text-lg">
            Join the Slate actors&apos; club in Mumbai. We help freshers get into the right rooms,
            practise every week, and get a CD-ready profile made for free while the founding batch
            is open.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/club"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-cream px-7 text-base font-medium text-text-on-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream-2 hover:shadow-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
            >
              Join the club
            </Link>
            <Link
              href={`/${ASHISH.slug}`}
              className="text-sm text-gold underline-offset-4 hover:underline focus-visible:underline"
            >
              See profile sample →
            </Link>
          </div>
          <p className="mt-5 max-w-[38ch] font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
            Free now for founding members. Cinematic page later starts at ₹99.
          </p>
        </div>

        <div className="relative z-10 mt-12 w-full max-w-[280px] md:mt-0 md:w-auto md:flex-shrink-0">
          <div
            className="absolute -inset-4 rounded-[2.5rem] bg-gold/10 blur-2xl"
            aria-hidden="true"
          />
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

      <Section tone="dark" className="border-t border-border-dark px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-[680px] text-center">
            <SectionLabel
              number="01"
              label="The wedge"
              devanagari="असल problem"
              className="justify-center text-center"
            />
            <h2 className="display-m mt-6 text-text-primary">
              Casting is controlled. Your presentation does not have to be.
            </h2>
            <p className="mt-5 text-balance text-text-secondary">
              We are not starting with another audition board. We are starting with what every actor
              can use today, a beautiful profile, a clean WhatsApp pitch, and a real Mumbai circle.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {actorWins.map((card, i) => (
              <ShinyCard key={card.title} index={i}>
                <p className="chip-text text-gold">{card.eyebrow}</p>
                <h3 className="display-s mt-4 text-text-primary">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{card.body}</p>
                <p className="devanagari mt-6 text-sm text-gold/80">{card.devanagari}</p>
              </ShinyCard>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-14 max-w-[640px] text-center">
            <SectionLabel
              number="02"
              label="Before / After"
              className="justify-center text-center"
            />
            <h2 className="display-m mt-6 text-text-primary">
              One link replaces the audition link dump.
            </h2>
            <p className="mt-4 text-text-secondary">
              The same actor, the same work, but one version feels like a forward and one version
              feels like a professional introduction.
            </p>
          </div>
          <BeforeAfterShowcase />
        </div>
      </Section>

      <Section tone="dark" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-14">
            <SectionLabel number="03" label="Launch offer" devanagari="founding batch" />
            <h2 className="display-m mt-6 max-w-[18ch] text-text-primary">
              Community first. Profile as the prize.
            </h2>
            <p className="mt-4 max-w-[48ch] text-text-secondary">
              The club stays free while we build trust. The paid product starts only when actors
              already see the value of having a Slate link.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {offerCards.map((card) => (
              <PricingCard key={card.name} card={card} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-14 text-center">
            <SectionLabel
              number="04"
              label="How it works"
              devanagari="simple hai"
              className="justify-center text-center"
            />
            <h2 className="display-m mt-6 text-text-primary">From newcomer to share-ready.</h2>
          </div>

          <ol className="mx-auto grid max-w-[920px] grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {howItWorks.map((s) => (
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
                <h3 className="display-s text-text-primary">{s.title}</h3>
                <p className="mt-3 max-w-[29ch] text-sm leading-relaxed text-text-secondary">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="dark" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1">
              <SectionLabel number="05" label="Sample profile" devanagari="casting view" />
              <h2 className="display-m mt-6 text-text-primary">
                Meet {ASHISH.name.split(" ")[0]}.
              </h2>
              <p className="mt-4 max-w-[42ch] text-text-secondary">
                Six years on stage and screen. Honda, Cipla, Zepto, Nilkamal, Smotect, and Rings & I
                in one page. This is the level we want freshers to aspire to, even if their first
                version is simpler.
              </p>
              <p className="mt-3 max-w-[42ch] text-sm italic leading-relaxed text-text-tertiary">
                The CD view is scannable. The cinematic view is memorable. Both share the same data.
              </p>
              <Link
                href={`/${ASHISH.slug}`}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-gold/40 px-6 text-base font-medium text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream hover:text-text-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
              >
                See full profile →
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

      <Section
        id="outreach"
        tone="dark"
        className="border-y border-border-dark px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <SectionLabel number="06" label="Bulk outreach" devanagari="careful mode" />
            <h2 className="display-m mt-6 text-text-primary">
              Ashish&apos;s request becomes a pilot, not a spam cannon.
            </h2>
            <p className="mt-5 max-w-[43ch] text-text-secondary">
              Bulk WhatsApp is powerful but risky. We should first price it as a managed outreach
              desk with opt-in or known contacts, approved templates, and manual review before any
              message goes out.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              [
                "WhatsApp API",
                "Use only for approved templates and consented contacts. Actor cold blasts should not be the default product.",
              ],
              [
                "Email first",
                "Cheaper, safer, and easier to test. Use polished profile links, subject lines, and follow-up tracking.",
              ],
              [
                "Pilot price",
                "₹2,999 setup plus message cost for the first 250 contacts. Manual quality check included.",
              ],
              [
                "Scale price",
                "₹7,999 to ₹14,999 per campaign once reply tracking, lists, and templates are working.",
              ],
            ].map(([title, body], i) => (
              <ShinyCard key={title} index={i} compact>
                <h3 className="display-s text-text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{body}</p>
              </ShinyCard>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark" className="px-6 py-28 text-center md:px-12 md:py-36">
        <div className="mx-auto max-w-[660px]">
          <SectionLabel
            number="07"
            label="Start here"
            devanagari="entry"
            className="justify-center text-center"
          />
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
            New to Mumbai?
          </h2>
          <p
            className="mt-3 font-display italic text-text-secondary"
            style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)", lineHeight: 1.3 }}
          >
            Come as you are. Leave with a better first impression.
          </p>
          <p className="mx-auto mt-6 max-w-[42ch] text-text-tertiary">
            Founding members get the club, the WhatsApp community, and a CD-ready profile made with
            us for free.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/club"
              className="inline-flex h-14 items-center justify-center rounded-full bg-slate-cream px-10 text-base font-medium text-text-on-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-cream-2 hover:shadow-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
            >
              Apply to join
            </Link>
            <Link
              href="/manifesto"
              className="text-sm text-gold underline-offset-4 hover:underline focus-visible:underline"
            >
              Read the manifesto →
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="dark" as="footer" className="border-t border-border-dark px-6 py-16 md:px-12">
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
              Sample profile
            </Link>
          </nav>

          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Mumbai · 2026
          </p>
        </div>
      </Section>
    </>
  );
}

function ShinyCard({
  children,
  index,
  compact,
}: {
  children: ReactNode;
  index: number;
  compact?: boolean;
}) {
  const glow = index % 2 === 0 ? "rgba(201,162,75,0.16)" : "rgba(245,239,227,0.10)";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-sm bg-[#161613] transition-all duration-300 hover:-translate-y-1",
        compact ? "p-5 md:p-6" : "p-6 md:p-8",
      )}
      style={{ boxShadow: "inset 0 0 0 1px rgba(201, 162, 75, 0.15)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, rgba(245,239,227,0.05) 38%, rgba(201,162,75,0.10) 46%, transparent 58%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}

function PricingCard({ card }: { card: (typeof offerCards)[number] }) {
  return (
    <article
      className={cn(
        "group relative flex min-h-[26rem] flex-col overflow-hidden rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 md:p-8",
        card.featured ? "bg-slate-cream text-text-on-light" : "bg-[#161613] text-text-primary",
      )}
      style={{
        boxShadow: card.featured
          ? "0 24px 72px -30px rgba(201,162,75,0.70)"
          : "inset 0 0 0 1px rgba(201, 162, 75, 0.15)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,162,75,0.85), rgba(245,239,227,0.65), transparent)",
        }}
      />
      <p className={cn("chip-text", card.featured ? "text-text-on-light/60" : "text-gold")}>
        {card.name}
      </p>
      <p
        className={cn(
          "mt-5 font-display",
          card.featured ? "text-text-on-light" : "text-text-primary",
        )}
        style={{
          fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
        }}
      >
        {card.price}
      </p>
      <p
        className={cn(
          "mt-2 text-sm",
          card.featured ? "text-text-on-light/70" : "text-text-tertiary",
        )}
      >
        {card.note}
      </p>
      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {card.items.map((item) => (
          <li
            key={item}
            className={cn(
              "text-sm",
              card.featured ? "text-text-on-light/78" : "text-text-secondary",
            )}
          >
            <span className={card.featured ? "text-text-on-light" : "text-gold"}>•</span> {item}
          </li>
        ))}
      </ul>
      <Link
        href={card.href}
        className={cn(
          "mt-8 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
          card.featured
            ? "bg-text-on-light text-slate-cream hover:bg-[#2a2925] focus-visible:ring-offset-slate-cream"
            : "border border-gold/40 text-text-primary hover:bg-slate-cream hover:text-text-on-light focus-visible:ring-offset-slate-bg",
        )}
      >
        {card.cta}
      </Link>
    </article>
  );
}
