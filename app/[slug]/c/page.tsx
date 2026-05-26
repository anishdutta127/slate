import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { TalentImage } from "@/components/profile/TalentImage";
import { getAllTalentSlugs, getTalentBySlug, getTelUrl, getWhatsAppUrl } from "@/lib/talent";
import { displayPhone } from "@/lib/phone";

// CD view. Information-only, no animation, dense layout. The most important
// fact comes first; everything else fits below the fold. Above-the-fold target
// on a 375x812 viewport is the entire info card + the two contact buttons.
// All photos lazy-load below; the WORK list is a short text rundown rather
// than thumbnails so the page weight stays tight.
//
// Reached via the /api/r/[ref] redirect from every WhatsApp send (M4). Also
// directly linkable. ISR-cached for 60s.

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
    title: `${t.name} — ${t.city} actor (Plays ${t.plays.min}-${t.plays.max})`,
    description: `${t.name}, ${t.city}-based actor. Plays ${t.plays.min}-${t.plays.max}. ${t.height.display}. ${t.languages.join(", ")}.`,
    robots: { index: false, follow: false }, // CD view is meant to be shared, not indexed
  };
}

export default async function CdView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTalentBySlug(slug);
  if (!t) notFound();

  const firstName = t.name.split(" ")[0]!;
  // Trailing space is intentional: WhatsApp's prefilled message opens with the
  // cursor right after our line, so the CD can keep typing without first
  // tapping space themselves.
  const whatsappMessage = `Hi ${firstName}, saw your profile on Slate `;

  return (
    <main className="relative mx-auto min-h-svh max-w-[680px] bg-slate-bg px-4 py-6 text-text-primary">
      {/* Top-right escape hatch to the cinematic view. Per C2: gold underline
          decoration is always visible (not hover-only), padding gives a real
          touch target on mobile so CDs don't have to pixel-aim a thin link. */}
      <Link
        href={`/${t.slug}`}
        className="absolute right-2 top-3 -m-1 inline-block rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-gold/80 underline decoration-gold/40 decoration-1 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold focus-visible:text-gold focus-visible:decoration-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
      >
        ← Full profile
      </Link>

      {/* Info card — must fit + 2 buttons in 375x812 viewport */}
      <section
        className="rounded-md border border-border-dark bg-slate-surface p-4"
        aria-labelledby="cd-name"
      >
        <div className="flex gap-4">
          <div className="relative h-[200px] w-[160px] shrink-0 overflow-hidden rounded-sm bg-slate-bg">
            <TalentImage photo={t.hero} talentSlug={t.slug} fill priority sizes="160px" />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <h1
              id="cd-name"
              className="font-display text-[22px] font-semibold leading-tight tracking-tight text-text-primary"
              style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
            >
              {t.name}
            </h1>
            {t.tagline ? (
              <p className="text-sm leading-snug text-text-secondary">{t.tagline}</p>
            ) : null}
            <p className="font-mono text-sm leading-snug text-text-secondary">
              Plays {t.plays.min}-{t.plays.max} · {t.height.display}
            </p>
            <p className="font-mono text-sm leading-snug text-text-secondary">{t.city}</p>
            <p className="font-mono text-sm leading-snug text-text-secondary">
              {t.languages.join(" · ")} · {t.accent} accent
            </p>
            <p className="font-mono text-sm leading-snug text-text-secondary">
              <span className="chip-text text-gold">EXP</span> {t.training}
            </p>
          </div>
        </div>
      </section>

      {/* Contact: tel: and wa.me are anchors, not buttons (semantic).
          Two-line treatment — primary line uses the actor's first name to
          bring warmth; secondary mono line gives the actionable detail. */}
      <div className="mt-4 flex flex-col gap-2" role="group" aria-label={`Contact ${t.name}`}>
        <a
          href={getTelUrl(t.contact.phone)}
          aria-label={`Call ${t.name} at ${displayPhone(t.contact.phone)}`}
          className="flex w-full flex-col items-center justify-center rounded-2xl bg-slate-cream px-6 py-3 text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
        >
          <span className="text-base font-medium">Call {firstName}</span>
          <span className="font-mono text-xs text-text-on-light/70">
            {displayPhone(t.contact.phone)}
          </span>
        </a>
        <a
          href={getWhatsAppUrl(t.contact.phone, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${t.name} on WhatsApp at ${displayPhone(t.contact.phone)}`}
          className="flex w-full flex-col items-center justify-center rounded-2xl border border-border-dark px-6 py-3 text-text-primary transition-colors hover:bg-slate-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
        >
          <span className="text-base font-medium">Message {firstName}</span>
          <span className="font-mono text-xs text-text-tertiary">
            WhatsApp · {displayPhone(t.contact.phone)}
          </span>
        </a>
      </div>

      {/* WORK — text-only list */}
      <section className="mt-8" aria-labelledby="cd-work">
        <h2 id="cd-work" className="chip-text mb-3 text-gold">
          WORK
        </h2>
        <ul className="flex flex-col">
          {t.credits.map((credit) => (
            <li key={credit.id} className="border-b border-border-dark last:border-b-0">
              <a
                href={credit.urls[0]!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${credit.brand} ${credit.medium} ${credit.year} (opens in new tab)`}
                className="flex items-center justify-between py-3 text-text-primary transition-colors hover:bg-slate-surface focus-visible:outline-none focus-visible:bg-slate-surface"
              >
                <span className="text-base">
                  {credit.brand} <span className="text-text-tertiary">·</span>{" "}
                  <span className="font-mono text-sm uppercase text-text-secondary">
                    {credit.medium}
                  </span>{" "}
                  <span className="text-text-tertiary">·</span>{" "}
                  <span className="font-mono text-sm text-text-secondary">{credit.year}</span>
                </span>
                <span aria-hidden="true" className="text-gold">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* PHOTOS — horizontal scroll strip including hero */}
      <section className="mt-8" aria-labelledby="cd-photos">
        <h2 id="cd-photos" className="chip-text mb-3 text-gold">
          PHOTOS
        </h2>
        <div
          className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {[t.hero, ...t.gallery].map((photo) => (
            <div
              key={photo.slug}
              className="relative h-[200px] w-[160px] shrink-0 snap-start overflow-hidden rounded-sm bg-slate-surface"
            >
              <TalentImage photo={photo} talentSlug={t.slug} fill sizes="160px" />
            </div>
          ))}
        </div>
      </section>

      {/* Quiet footer */}
      <footer className="mt-10 flex flex-col items-center gap-6 border-t border-border-dark pt-6 text-center">
        <Link
          href={`/${t.slug}`}
          className="text-sm text-gold underline-offset-4 hover:underline focus-visible:underline"
        >
          See full profile →
        </Link>
        <Link
          href="/"
          className="flex items-baseline gap-2 text-text-tertiary hover:text-text-secondary"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.15em]">Made on Slate</span>
          <span className="font-mono text-[11px] text-text-tertiary">·</span>
          <span className="devanagari">स्लेट</span>
        </Link>
      </footer>
    </main>
  );
}
