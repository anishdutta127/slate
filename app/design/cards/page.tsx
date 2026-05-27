import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Credit cards exploration — Slate",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  { slug: "v1", name: "Bold Wordmark", note: "Brand name dominates, gold radial gradient." },
  {
    slug: "v2",
    name: "Film Strip",
    note: "35mm sprocket holes top + bottom. Material cinema reference.",
  },
  {
    slug: "v3",
    name: "Painterly",
    note: "Brushstroke noise + warm palette per card. Curated print series.",
  },
  {
    slug: "v4",
    name: "Cover Story",
    note: "Each card is a magazine cover. Mast head, headline, cover line.",
  },
  { slug: "v5", name: "Restraint", note: "Pure black + one gold rule. Swiss/Helvetica poster." },
  { slug: "v6", name: "Seal", note: "Circular gold stamp + guilloche ring. Mark of authenticity." },
] as const;

export default function CardsBoard() {
  return (
    <main className="min-h-svh bg-slate-bg px-6 py-10 text-text-primary">
      <header className="mx-auto mb-10 max-w-[1400px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
          A2 · Credit card exploration · 02 Selected Work
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-5xl">
          Six card directions.
        </h1>
        <p className="mt-3 max-w-[60ch] text-text-secondary">
          Each iframe renders the same 6 brand credits (Honda, Cipla, Zepto, Nilkamal, Smotect,
          Rings & I) in one card style. Cards in production will be a 2-column desktop grid; here we
          show single-column at phone width so the card design reads at its real size.
        </p>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {VARIANTS.map((v) => (
          <article key={v.slug} className="flex flex-col gap-3">
            <header className="flex items-baseline justify-between">
              <Link
                href={`/design/cards/${v.slug}`}
                className="font-display text-lg font-semibold text-text-primary underline-offset-4 hover:underline"
              >
                {v.slug.toUpperCase()} · {v.name}
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                375 · cards
              </span>
            </header>
            <p className="text-sm text-text-secondary">{v.note}</p>
            <div className="overflow-hidden rounded-md border border-border-dark bg-slate-bg">
              <iframe
                src={`/design/cards/${v.slug}`}
                title={v.name}
                className="block h-[1200px] w-[375px] max-w-full"
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
