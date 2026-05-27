import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Hero exploration - Slate",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    slug: "v1",
    name: "Two-Column Editorial",
    note: "Photo left, typography right. Programme-spread feel.",
  },
  {
    slug: "v2",
    name: "Cinema Vignette",
    note: "Full-bleed, heavy radial darken, A24/MUBI hero.",
  },
  {
    slug: "v3",
    name: "Framed Portrait",
    note: "Gold-bordered frame on a charcoal stage. Museum plate.",
  },
  {
    slug: "v4",
    name: "Color-Graded Crop",
    note: "Extreme crop, amber/teal grade, single hero word.",
  },
  {
    slug: "v5",
    name: "Programme Cover",
    note: "Photo small, editorial typography dominates. Magazine cover.",
  },
  {
    slug: "v6",
    name: "Negative Space",
    note: "Photo right, name in dark left half. Saul Bass film poster.",
  },
] as const;

export default function DesignBoard() {
  return (
    <main className="min-h-svh bg-slate-bg px-6 py-10 text-text-primary">
      <header className="mx-auto mb-10 max-w-[1400px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
          Design exploration · /ashish hero
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-5xl">Six directions.</h1>
        <p className="mt-3 max-w-[60ch] text-text-secondary">
          Each iframe below is a complete hero treatment at iPhone 12 mini width (375 × 812). Click
          any variant title to open it full-screen on its own route. The user picks; the others get
          deleted.
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-tertiary">
          Live links:{" "}
          <Link href="/ashish" className="text-gold hover:underline">
            /ashish (current)
          </Link>
          {" · "}
          <Link href="/ashish/c" className="text-gold hover:underline">
            /ashish/c (CD)
          </Link>
        </p>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {VARIANTS.map((v) => (
          <article key={v.slug} className="flex flex-col gap-3">
            <header className="flex items-baseline justify-between">
              <Link
                href={`/design/${v.slug}`}
                className="font-display text-lg font-semibold text-text-primary underline-offset-4 hover:underline"
              >
                {v.slug.toUpperCase()} · {v.name}
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                375 × 812
              </span>
            </header>
            <p className="text-sm text-text-secondary">{v.note}</p>
            <div className="overflow-hidden rounded-md border border-border-dark bg-slate-bg">
              <iframe
                src={`/design/${v.slug}`}
                title={v.name}
                className="block h-[812px] w-[375px] max-w-full"
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>

      <footer className="mx-auto mt-16 max-w-[1400px] border-t border-border-dark pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
          When you've picked, paste the variant letter (V1–V6) back to Claude. A1 then runs
          /design-html to convert it into production code, and /design/* routes get removed.
        </p>
      </footer>
    </main>
  );
}
