import { readdir, mkdir, stat } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import sharp from "sharp";

// Pre-generate WebP + AVIF for each talent photo at the responsive widths
// next/image will request. Run-once tool: `pnpm tsx scripts/optimize-talent-photos.ts`.
// Outputs land under public/talent/<slug>/<name>-<width>.{webp,avif}.
//
// We don't ship the source JPEGs (they live in assets/, gitignored from the
// public bundle). Each web request hits the matching AVIF (smaller, modern)
// or WebP (broader support) at the right width, served from Vercel's CDN.

const WIDTHS = [640, 828, 1080, 1280, 1920] as const;
const QUALITY_AVIF = 60; // visually indistinguishable from 80, ~30% smaller
const QUALITY_WEBP = 78;

interface TalentSet {
  slug: string;
  inputDir: string;
  outputDir: string;
}

const TALENT: TalentSet[] = [
  { slug: "ashish", inputDir: "assets/ashish", outputDir: "public/talent/ashish" },
];

async function optimizeOne(input: string, outputDir: string) {
  const name = basename(input, extname(input));
  const meta = await sharp(input).metadata();
  if (!meta.width) throw new Error(`No width metadata on ${input}`);
  for (const width of WIDTHS) {
    if (width > meta.width) continue; // never upscale
    const target = sharp(input).rotate().resize({ width, withoutEnlargement: true });
    await Promise.all([
      target.clone().avif({ quality: QUALITY_AVIF, effort: 4 }).toFile(join(outputDir, `${name}-${width}.avif`)),
      target.clone().webp({ quality: QUALITY_WEBP, effort: 4 }).toFile(join(outputDir, `${name}-${width}.webp`)),
    ]);
  }
  return { name, sourceWidth: meta.width };
}

async function main() {
  for (const set of TALENT) {
    await mkdir(set.outputDir, { recursive: true });
    const entries = await readdir(set.inputDir);
    const jpegs = entries.filter((e) => /\.(jpe?g|png)$/i.test(e));
    console.log(`\n[${set.slug}] ${jpegs.length} source photos`);
    for (const file of jpegs) {
      const { name, sourceWidth } = await optimizeOne(join(set.inputDir, file), set.outputDir);
      // Report sizes
      const variants = await readdir(set.outputDir);
      const own = variants.filter((v) => v.startsWith(`${name}-`));
      const sized = await Promise.all(
        own.map(async (v) => {
          const s = await stat(join(set.outputDir, v));
          return `${v} (${(s.size / 1024).toFixed(1)} KB)`;
        }),
      );
      console.log(`  ${file} (src ${sourceWidth}w) -> ${sized.join(", ")}`);
    }
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
