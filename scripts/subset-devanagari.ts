import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import subsetFont from "subset-font";

// One-shot subsetter for Noto Serif Devanagari.
// Pulls the Fontsource "wght" variable woff2 (~124 KB) and trims it to the
// exact glyphs we use across the whole app, producing a ~10 KB file.
//
// Re-run any time we add a new Devanagari phrase to the UI: add the phrase
// to PHRASES below, then `pnpm tsx scripts/subset-devanagari.ts`. Commit the
// resulting woff2. The source file is fetched fresh each run (not checked in)
// so we don't ship 124 KB through public/fonts.

const PHRASES = [
  "स्लेट", // wordmark (nav, footer, everywhere)
  "के बारे में", // "About" — profile section header
  "संपर्क करें", // "Get in touch" — profile contact section
  "सीन शुरू यहीं से।", // hero hinglish
  "और कैसे होना चाहिए।", // before/after H2
  "बस तीन कदम।", // how it works H2
  "क्लब से जुड़ो।", // step 1
  "प्रोफाइल बनवाओ।", // step 2
  "साथ में बढ़ो।", // step 3
  "हर संडे।", // club section H2
  "॥", // club bullet character
  "मुंबई में नए हो? सही कमरे से शुरू करो।", // final CTA
  "क्लब", // club page section label
  "घोषणा", // manifesto page section label
];

const SOURCE_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource-variable/noto-serif-devanagari@5.2.10/files/noto-serif-devanagari-devanagari-wght-normal.woff2";
const SOURCE_CACHE = ".gstack/cache/NotoSerifDevanagari-source.woff2";
const OUTPUT = "public/fonts/NotoSerifDevanagari-Subset.woff2";

async function getSource(): Promise<Buffer> {
  if (existsSync(SOURCE_CACHE)) return readFile(SOURCE_CACHE);
  console.log(`Fetching source from ${SOURCE_URL}`);
  const r = await fetch(SOURCE_URL);
  if (!r.ok) throw new Error(`Failed to fetch source: HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await writeFile(SOURCE_CACHE, buf);
  return buf;
}

async function main() {
  const text = Array.from(new Set(PHRASES.join(" ").split(""))).join("");
  console.log(`Subsetting to ${text.length} unique chars: ${text}`);

  const source = await getSource();
  const subset = await subsetFont(source, text, {
    targetFormat: "woff2",
  });

  await writeFile(OUTPUT, subset);
  console.log(`${OUTPUT}: ${source.length} -> ${subset.length} bytes`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
