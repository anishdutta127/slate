import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ReactDOM from "react-dom";
import { Section } from "@/components/visual/Section";
import { Divider } from "@/components/visual/Divider";
import { CinematicHero } from "@/components/profile/CinematicHero";
import { ParallaxImage } from "@/components/profile/ParallaxImage";
import { CreditCard } from "@/components/profile/CreditCard";
import { BrandedFallbackCard } from "@/components/profile/BrandedFallbackCard";
import { SectionLabel } from "@/components/profile/SectionLabel";
import { StickyContactBar } from "@/components/profile/StickyContactBar";
import { getAllTalentSlugs, getTalentBySlug, getTelUrl, getWhatsAppUrl } from "@/lib/talent";
import { displayPhone } from "@/lib/phone";
import { getBaseUrl } from "@/lib/env";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllTalentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTalentBySlug(slug);
  if (!t) return { title: "Not found" };
  return {
    title: `${t.name} — ${t.city} actor`,
    description: t.bio,
    openGraph: {
      type: "profile",
      url: `${getBaseUrl()}/${t.slug}`,
      title: `${t.name} — ${t.city} actor`,
      description: t.bio,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTalentBySlug(slug);
  if (!t) notFound();

  // Preload the hero photo at the size the hero will request so the LCP
  // image starts downloading at HTML-parse time, not after layout. React 19
  // hoists the call to a <link rel="preload"> tag in <head>.
  const heroSrc = `/talent/${t.slug}/${t.hero.slug}-828.webp`;
  ReactDOM.preload(heroSrc, { as: "image", fetchPriority: "high" });

  const honda = t.credits.find((c) => c.brand === "Honda")!;
  const otherCredits = t.credits.filter((c) => c.brand !== "Honda");
  // Trailing space is intentional — leaves the cursor primed right after our
  // line in WhatsApp's compose. Mirrors the CD view.
  const whatsappMessage = `Hi ${t.name.split(" ")[0]}, saw your profile on Slate `;

  return (
    <>
      <CinematicHero talent={t} />

      {/* Sentinel: when this scrolls offscreen, the mobile sticky contact bar appears */}
      <div id="post-hero-sentinel" aria-hidden="true" className="h-px" />

      {/* ============ 01 · SHOWREEL ============ */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <SectionLabel number="01" label="Showreel" />
          <h2
            className="mt-6 max-w-[20ch] font-display text-4xl font-semibold tracking-tight text-text-primary md:text-6xl"
            style={{ fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1' }}
          >
            Honda. The headline.
          </h2>

          <a
            href={honda.urls[0]!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${honda.brand} ${honda.medium} on Instagram (opens in new tab)`}
            className="group relative mt-10 block aspect-video w-full overflow-hidden rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-slate-bg hover:ring-1 hover:ring-gold/40"
          >
            {/* Showreel card uses the branded fallback at 16:9 since Honda is on
                Instagram (no scrapable thumbnail). Branded card design carries the
                same visual identity as the credits grid below. */}
            <div className="absolute inset-0">
              <BrandedFallbackCard
                brand={honda.brand}
                medium={honda.medium}
                year={honda.year}
                index={0}
                className="!aspect-auto h-full !w-full"
              />
            </div>

            {/* Centered play icon overlay */}
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-slate-bg/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <svg className="ml-1 h-8 w-8 fill-gold" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </a>

          <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Tap to watch on Instagram
          </p>
        </div>
      </Section>

      {/* ============ 02 · SELECTED WORK ============ */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <SectionLabel number="02" label="Selected work" />
          <h2
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-6xl"
            style={{ fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1' }}
          >
            Six brands. One year.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {otherCredits.map((credit, i) => (
              <CreditCard key={credit.id} credit={credit} index={i + 1} />
            ))}
          </div>

          <p className="mt-12 text-center font-mono text-sm text-text-secondary">
            Visiting Mumbai? Available for auditions this week.
          </p>
        </div>
      </Section>

      {/* ============ 03 · PORTFOLIO ============ */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <SectionLabel number="03" label="Portfolio" />
          <h2
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-6xl"
            style={{ fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1' }}
          >
            More of him.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.gallery.map((photo) => (
              <ParallaxImage
                key={photo.slug}
                photo={photo}
                talentSlug={t.slug}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ============ 04 · ABOUT ============ */}
      <Section tone="dark" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[680px] text-center">
          <SectionLabel number="04" label="About" devanagari="के बारे में" />
          <h2
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-6xl"
            style={{ fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1' }}
          >
            The actor.
          </h2>

          <p
            className="mt-10 text-balance font-display italic text-text-secondary"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            {t.bio}
          </p>

          <Divider className="my-12" />

          <dl className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                Training
              </dt>
              <dd className="mt-1 text-base text-text-primary">{t.training}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                Languages
              </dt>
              <dd className="mt-1 text-base text-text-primary">{t.languages.join(" · ")}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                Based in
              </dt>
              <dd className="mt-1 text-base text-text-primary">{t.city}</dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* ============ 05 · GET IN TOUCH ============ */}
      <Section tone="dark" as="section" className="px-6 py-24 md:px-12 md:py-32">
        <div id="contact" className="mx-auto max-w-[680px] text-center">
          <SectionLabel number="05" label="Get in touch" devanagari="संपर्क करें" />
          <h2
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-6xl"
            style={{ fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1' }}
          >
            He&apos;s ready when you are.
          </h2>

          <div className="mx-auto mt-12 flex max-w-[480px] flex-col gap-3">
            <ContactRow
              href={getTelUrl(t.contact.phone)}
              label="Call"
              detail={displayPhone(t.contact.phone)}
            />
            <ContactRow
              href={getWhatsAppUrl(t.contact.phone, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              label="WhatsApp"
              detail="Send a message"
            />
            <ContactRow
              href={t.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              label="Instagram"
              detail={`@${t.contact.instagramHandle}`}
            />
          </div>
        </div>
      </Section>

      {/* ============ Footer ============ */}
      <Section tone="dark" as="footer" className="border-t border-border-dark px-6 py-16 md:px-12">
        <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
          <Link
            href="/"
            className="flex items-baseline gap-2 text-text-primary opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          >
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
              Made on Slate
            </span>
            <span className="font-mono text-xs text-text-tertiary">·</span>
            <span className="devanagari text-text-tertiary">स्लेट</span>
          </Link>

          <Link
            href="/"
            className="text-sm text-gold underline-offset-4 hover:underline focus-visible:underline"
          >
            Are you an actor? Get yours →
          </Link>

          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Photos belong to {t.name}. Brand work referenced from public sources.
          </p>
        </div>
      </Section>

      {/* Mobile-only floating contact pill, appears after the hero */}
      <StickyContactBar sentinelId="post-hero-sentinel" contactSectionId="contact" />
    </>
  );
}

// Big tappable contact row. Hairline gold border, dark surface, 24px vertical
// padding. Brief cream flash on tap signals the action triggered before nav.
function ContactRow({
  href,
  target,
  rel,
  label,
  detail,
}: {
  href: string;
  target?: string;
  rel?: string;
  label: string;
  detail: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="group flex flex-col items-center justify-center gap-1 rounded-md border border-gold/30 bg-slate-surface px-6 py-6 transition-all duration-200 hover:border-gold/60 hover:bg-slate-cream hover:text-text-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg active:bg-slate-cream active:text-text-on-light"
    >
      <span className="font-display text-2xl font-semibold tracking-tight text-text-primary group-hover:text-text-on-light group-active:text-text-on-light">
        {label}
      </span>
      <span className="font-mono text-sm text-text-secondary group-hover:text-text-on-light/70 group-active:text-text-on-light/70">
        {detail}
      </span>
    </a>
  );
}
