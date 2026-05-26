import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Photo exploration — Slate",
  robots: { index: false, follow: false },
};

const PHOTOS = [
  {
    slug: "p1",
    name: "02 · Headshot Blazer (current)",
    note: "Brown blazer, brown backdrop. Tight face, lots of brown.",
  },
  {
    slug: "p2",
    name: "01 · Full-body White Shirt",
    note: "Wider shot, neutral studio bg. More environmental.",
  },
  {
    slug: "p3",
    name: "03 · Outdoor Denim",
    note: "Denim jacket outdoors. Younger commercial energy.",
  },
  { slug: "p4", name: "04 · Seated Mint Shirt", note: "Seated with chai, mint shirt. Range shot." },
] as const;

export default function PhotoBoard() {
  return (
    <main className="min-h-svh bg-slate-bg px-6 py-10 text-text-primary">
      <header className="mx-auto mb-10 max-w-[1400px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
          D1 · Photo exploration · V3 Framed Portrait
        </p>
        <h1
          className="mt-2 font-display text-3xl font-semibold md:text-5xl"
          style={{ fontVariationSettings: '"opsz" 72, "SOFT" 50, "WONK" 1' }}
        >
          Which photo composes best in the frame?
        </h1>
        <p className="mt-3 max-w-[60ch] text-text-secondary">
          Same V3 layout (chosen hero direction), four photos. Each iframe is 375 × 812 — phone
          width. The frame shape and matting are identical; only the photo inside changes.
        </p>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {PHOTOS.map((p) => (
          <article key={p.slug} className="flex flex-col gap-3">
            <header className="flex items-baseline justify-between">
              <Link
                href={`/design/photo/${p.slug}`}
                className="font-display text-base font-semibold text-text-primary underline-offset-4 hover:underline"
              >
                {p.name}
              </Link>
            </header>
            <p className="text-xs text-text-secondary">{p.note}</p>
            <div className="overflow-hidden rounded-md border border-border-dark bg-slate-bg">
              <iframe
                src={`/design/photo/${p.slug}`}
                title={p.name}
                className="block h-[812px] w-[375px] max-w-full"
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
