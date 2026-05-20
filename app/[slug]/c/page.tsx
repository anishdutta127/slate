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

  const whatsappMessage = `Hi ${t.name.split(" ")[0]}, saw your Slate profile`;

  return (
    <main className="mx-auto min-h-svh max-w-[680px] bg-slate-bg px-4 py-6 text-text-primary">
      {/* Info card — must fit + 2 buttons in 375x812 viewport */}
      <section
        className="rounded-md border border-border-dark bg-slate-surface p-4"
        aria-labelledby="cd-name"
      >
        <div className="flex gap-4">
          <div className="relative h-[200px] w-[160px] shrink-0 overflow-hidden rounded-sm bg-slate-bg">
            <TalentImage
              photo={t.hero}
              talentSlug={t.slug}
              fill
              priority
              sizes="160px"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <h1
              id="cd-name"
              className="font-display text-[22px] font-semibold leading-tight tracking-tight text-text-primary"
              style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
            >
              {t.name}
            </h1>
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

      {/* Contact: tel: and wa.me are anchors, not buttons (semantic). The pill
          styling matches the Button primitive exactly. */}
      <div className="mt-4 flex flex-col gap-2" role="group" aria-label="Contact Ashish">
        <a
          href={getTelUrl(t.contact.phone)}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-slate-cream px-6 text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
        >
          Call {displayPhone(t.contact.phone)}
        </a>
        <a
          href={getWhatsAppUrl(t.contact.phone, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-full items-center justify-center rounded-full border border-border-dark px-6 text-base font-medium text-text-primary transition-colors hover:bg-slate-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg"
        >
          WhatsApp
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
              <TalentImage
                photo={photo}
                talentSlug={t.slug}
                fill
                sizes="160px"
              />
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
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-tertiary hover:text-text-secondary"
        >
          Made on Slate
        </Link>
      </footer>
    </main>
  );
}
