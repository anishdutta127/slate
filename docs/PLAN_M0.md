# M0 Plan — Scaffold + Design System

Generated 2026-05-20. Status: DRAFT, awaiting approval.
Scope: M0 only. Do not implement M1+ scope.

## What M0 ships

A working Next.js 15 app at `localhost:3000`, with:

1. **Repo scaffolded** — Next.js 15 App Router + Turbopack, TypeScript strict, Tailwind v4, no `src/` directory, no Inter font anywhere.
2. **Design tokens live** — DESIGN.md color and spacing tokens encoded as CSS variables inside `app/globals.css` via Tailwind v4's `@theme` block. Single source of truth for all future components.
3. **Fonts self-hosted and loaded** — Fraunces (variable woff2, Latin subset, weight 400-700, opsz axis live, SOFT 50 / WONK 1 pinned via `font-variation-settings`), Geist (variable woff2), JetBrains Mono (variable woff2). All under `public/fonts/`, loaded via `next/font/local` with `font-display: swap`. No FOIT.
4. **Base layout with grain overlay** — `app/layout.tsx` renders dark background, body font, and the SVG `<Grain/>` overlay (fixed, pointer-events:none, ~2.5% opacity, mix-blend-mode: overlay on dark sections only).
5. **Five atoms built** — `<Wordmark/>`, `<Button/>` (primary, ghost, link), `<Chip/>` (mono uppercase), `<Divider/>` (gold gradient fade-to-transparent), `<Grain/>`.
6. **`/style` route** — gated dev-only, renders every atom on BOTH dark and cream backgrounds. Visual QA surface for the design system.
7. **Placeholder `/` route** — minimal landing so Lighthouse has something to score. Single hero, wordmark, tagline. M2 will rewrite.
8. **shadcn/ui CLI initialized** — but zero primitives bulk-installed. Init only.

## What M0 does NOT ship

- No DB. No Drizzle. No Neon. (M3.)
- No auth. No Firebase. No Better Auth. (M3.)
- No R2. No upload presigning. (M3.)
- No Ashish profile page. No `/[slug]`. (M1.)
- No marketing landing copy beyond the placeholder. (M2.)
- No middleware. (Reserved file only.)
- No PostHog, no analytics. (M2/M3.)

## Dependency list (pnpm)

```bash
# Runtime
pnpm add next@latest react@latest react-dom@latest
pnpm add motion           # framer-motion v12 successor, cinematic easings
pnpm add clsx tailwind-merge   # standard className utilities for Button variants
pnpm add zod              # used by lib/env.ts placeholder; cheap to add now

# Dev
pnpm add -D typescript @types/node @types/react @types/react-dom
pnpm add -D tailwindcss@latest @tailwindcss/postcss postcss   # v4 line
pnpm add -D autoprefixer  # postcss companion
pnpm add -D eslint eslint-config-next
```

Explicit non-installs in M0 (defer to milestone shown):

- `drizzle-orm`, `pg`, `@neondatabase/serverless` → M3
- `better-auth`, `firebase`, `firebase-admin` → M3
- `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner` → M3
- `sharp` → M3 (server-side image processing, no source images served raw yet)
- `next/og` → M1 (only needed when we build Ashish's per-profile OG image)

`shadcn/ui` is initialized but no primitives installed (we'll `pnpm dlx shadcn@latest add button input` etc. when M3 needs them).

## File-by-file diff preview

New files (M0):

```
.env.example                                           # placeholder env keys, no secrets
.eslintrc.json                                         # next/core-web-vitals base, strict ts rule on
.prettierrc.json                                       # 2-space, single-quote, no semi (or whatever feels right; minimal)
.npmrc                                                 # engine-strict=true, pnpm-side
next.config.ts                                         # turbopack on, image domains placeholder (empty until M1)
tsconfig.json                                          # strict: true, target ES2022, paths alias @/*
postcss.config.mjs                                     # tailwindcss v4 + autoprefixer
package.json                                           # name=slate (unscoped), scripts: dev|build|lint|typecheck|format
pnpm-lock.yaml                                         # generated

app/layout.tsx                                         # root layout, html lang=en, font CSS vars, body bg, <Grain/>
app/globals.css                                        # @import tailwindcss + @theme block with DESIGN.md tokens
app/page.tsx                                           # placeholder hero — wordmark + tagline only
app/style/page.tsx                                     # dev-only style guide; throws 404 in production

components/visual/Grain.tsx                            # SVG feTurbulence overlay, fixed, pointer-events none
components/visual/Wordmark.tsx                         # Fraunces "Slate" + gold dot
components/visual/Divider.tsx                          # gold gradient hairline, fade to transparent at edges

components/primitives/Button.tsx                       # primary | ghost | link variants, cva or hand-rolled cn()
components/primitives/Chip.tsx                         # mono uppercase, hairline border

lib/cn.ts                                              # clsx + tailwind-merge helper
lib/env.ts                                             # zod-validated env stub (returns empty object in M0; pattern set)

public/fonts/Fraunces-VariableFont_opsz,wght.woff2     # subset, Latin only, opsz+wght axes
public/fonts/Geist-Variable.woff2                      # variable woff2
public/fonts/JetBrainsMono-Variable.woff2              # variable woff2

types/index.ts                                         # empty shared types module (stub)
```

Touched (existing) files:

```
.gitignore        # add /node_modules, /.next, /public/fonts/.DS_Store, /~/, /.claude/
README.md         # add a "Local dev" run note for the /style route
```

Out-of-band (do not commit, mention in handoff):

- The stray `~/` directory in repo root (Windows tilde misfire) — user to delete manually.

Estimated total new lines: ~600 (most of it is config + the /style page).

## Build order — exact step sequence

1. **Pre-flight:** confirm `pnpm` installed (`pnpm -v`). If not, instruct user to `corepack enable && corepack prepare pnpm@latest --activate`.
2. **Scaffold** with the official template, then strip what we don't want:
   ```bash
   pnpm dlx create-next-app@latest slate --typescript --tailwind --app --no-src-dir --turbo --import-alias "@/*" --eslint --use-pnpm
   ```
   Then `cd slate` if generated in subdir — but we're scaffolding INTO existing repo (which has CLAUDE/ARCHITECTURE/DESIGN). Need to scaffold into a tmp dir, then merge. Alternative: scaffold in-place using `pnpm dlx create-next-app@latest .` and accept the prompt to overwrite — but it will refuse if dir is non-empty. **Cleanest path: scaffold into a tmp, then `mv` only the files we don't already have, never overwriting CLAUDE/ARCHITECTURE/DESIGN/README/.gitignore/docs.**
3. **Install deps** per the list above.
4. **Write `tsconfig.json`** with `strict: true` (verify scaffold's strict mode is on; turn on `noUncheckedIndexedAccess` and `noImplicitOverride` too).
5. **Replace `app/globals.css`** with the @theme block containing every DESIGN.md token.
6. **Download and place font files** in `public/fonts/`. Use Fontsource or Google Fonts for Fraunces variable (we subset locally with `pyftsubset` or use a CDN-subset link saved as woff2). Document the subset command in a comment at top of layout.tsx.
7. **Write `app/layout.tsx`** with next/font/local declarations, font CSS variables wired to body, `<Grain/>` mounted at root.
8. **Write `app/page.tsx`** as the placeholder.
9. **Build the 5 atoms** in `components/visual/` and `components/primitives/`.
10. **Write `app/style/page.tsx`** rendering each atom on both bg colors. Gate behind `if (process.env.NODE_ENV === 'production') notFound()`.
11. **`pnpm dev`** → manually verify: dark bg, grain visible on dark surface, Fraunces renders for wordmark, no FOIT, /style page shows all atoms on both bg sections.
12. **Lighthouse mobile run** on / and /style. Verify Performance >= 95.
13. **Self-review through 4 lenses** (see below).
14. **`pnpm lint && pnpm typecheck && pnpm build`** all green.
15. **Commit** with conventional message; /ship per gstack.

## Done-when (M0 acceptance criteria)

From ARCHITECTURE.md M0:

- [x] /style shows the full atom set on dark AND cream backgrounds
- [x] Hot reload works
- [x] No FOIT (font-display: swap, fonts preloaded)
- [x] Lighthouse mobile Performance >= 95 on / (placeholder)

Added:

- [x] Lighthouse mobile Performance >= 95 on /style
- [x] `pnpm typecheck` passes with strict mode on
- [x] `pnpm lint` passes
- [x] Zero use of Inter font (audit: grep for "Inter" in repo, fail if found outside fallback chains)
- [x] No `src/` directory exists
- [x] package.json `"name": "slate"` (unscoped)
- [x] All 3 fonts are self-hosted in `public/fonts/`, no Google Fonts CDN references
- [x] Grain overlay is SVG `feTurbulence`, not a PNG
- [x] `/style` returns 404 in production

## Self-review through 4 lenses

### CEO review (is M0 ambitious enough?)

**Verdict: scope is right.** M0 is intentionally narrow — it's a foundation, not a feature. Pushing scope into M1 (Ashish page) at this stage would skip the design-system pass and we'd end up patching tokens into ad-hoc places. The risk we're avoiding: building Ashish's page on top of half-defined tokens, then having to refactor every component when DESIGN.md tightens. M0 done right = M1 ships faster.

No expansion recommended. Hold scope.

### Design review (do the tokens encode DESIGN.md correctly?)

**Mostly yes, with two clarifications needed before implementation:**

1. **`--slate-surface: #16161300`** in DESIGN.md is an 8-digit hex with `00` alpha — that means fully transparent. Intentional? If yes, the comment "nothing fancy on dark — depth via shadow + grain" supports it (the variable just resolves to transparent, defaulting to bg). If it was meant to be a near-bg shade for surfaces, it should be `#161613` (6-digit) or similar. **Flag for user confirmation in implementation.**
2. **`--shadow-cinematic`** is referenced in DESIGN.md but no atom in M0 uses it (no card). Define the token but don't apply it anywhere in M0. M1 will use it on the hero photo.

The 5 atoms scoped for M0 align perfectly with the DESIGN.md "Atoms" list. No missing components.

### Eng review (does the architecture hold?)

**Holds, with three eng calls to make explicit:**

1. **Font subsetting strategy.** The Fraunces variable file with opsz+wght axes, Latin-only subset, should land ~50-65KB per DESIGN.md commit. We need to actually run `pyftsubset` or use Google Fonts' subset endpoint and save the result. Document the exact subset command in a comment in `app/layout.tsx` so future devs can regenerate. **Decision needed: pyftsubset locally (requires Python + fontTools) or fonttools-via-Docker, or pre-subset by hand once and check the woff2 into the repo.** Recommendation: check pre-subset woff2 files into repo with a `public/fonts/README.md` documenting the source.
2. **`/style` route gating.** `process.env.NODE_ENV === 'production'` check inside the page component is the simplest gate. Alternative: middleware-based 404. Recommend the in-component check — middleware just for this is overkill at M0.
3. **Tailwind v4 + Turbopack interaction.** Confirmed compatible in 2026, but the official Tailwind v4 Next.js setup uses the `@tailwindcss/postcss` plugin in `postcss.config.mjs`, not the legacy `tailwindcss` plugin. Make sure we use the right one or Turbopack hot reload breaks on globals.css changes.

### DX review (would a new dev feel good in 5 min?)

**One miss to fix in this plan:**

The README has no "what's at /style" hint. A new dev (or future-you) running `pnpm dev` will land on `/` (a sparse placeholder) and have no idea the design system surface exists. Add a one-liner in README:

> Visit `/style` in dev to see every design atom on both background variants.

Otherwise: pnpm scripts cover the four common verbs (dev, build, lint, typecheck), errors will be clear because TypeScript strict is on, no hidden bash setup. M0 should TTHW (time to "hello world") in under 60 seconds after `pnpm install`.

## Risk register

| Risk                                                                | Likelihood | Mitigation                                                                                                      |
| ------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| Tailwind v4 + Turbopack hot reload edge case on globals.css edits   | Low        | Use `@tailwindcss/postcss` plugin per official 2026 setup; document in CONTRIBUTING if encountered              |
| Fraunces subset file too large (>80KB) after subset                 | Low        | Pre-measure with `wc -c`; tighten subset to remove pcrtt opsz extremes if needed                                |
| `pnpm dlx create-next-app` refuses to scaffold into non-empty repo  | Medium     | Scaffold to tmp, selectively merge — don't overwrite CLAUDE/DESIGN/ARCHITECTURE/README/docs/assets              |
| Lighthouse Performance <95 on /style because grain SVG is expensive | Low        | Grain is a single static SVG, fixed, no repaints; should be fine. If not, lower opacity / simplify feTurbulence |
| User hates the placeholder `/` and wants to skip it                 | Low        | Placeholder is genuinely minimal — wordmark + one line. M2 throws it away anyway.                               |

## Locked answers (resolved 2026-05-20)

1. **`--slate-surface`** → typo. Change to `#161613` and update the comment to "subtle lift above bg, for cards and panels on dark sections". Already applied to DESIGN.md in the commit that lands this plan.
2. **`/style` gating** → gate by `NODE_ENV !== 'production'` OR `SLATE_ENABLE_STYLE_GUIDE=1`. Preview deploys can opt in. Document the env var in `README.md` under a "Local development" heading and add it to `.env.example` with a clear comment.
3. **Pre-subset font files** → check 3 woff2 files into `public/fonts/` and ship a `public/fonts/README.md` documenting the exact subset commands used.
4. **Placeholder `/`** → wordmark + tagline + "Coming soon — the manifesto, the club, the first profiles." No clickable links until M2. Render the placeholder using the actual Fraunces/Geist treatment so it doubles as a real token demo.
5. **ESLint + Prettier** → keep both. Add a `pnpm format` script.

## Next steps after approval

1. User answers the 5 open questions above.
2. I scaffold and implement steps 1-15 from "Build order" in one focused session.
3. `/review` runs on the M0 diff.
4. `/qa http://localhost:3000/style` validates atoms in a real browser.
5. `/ship` opens the M0 PR.

## Plan provenance

- Pushbacks resolved in this session: D1 Auth (Firebase Phone Auth locked, M3), D2 Tailwind (v4 confirmed), D3 CD view (separate route `/[slug]/c` locked, M1), D4 Fraunces (subset locked).
- Doc commits backing this plan:
  - `64ccf35` Switch auth to Firebase Phone Auth + Better Auth sessions
  - `15d0acc` Pin Fraunces SOFT/WONK as CSS constants, subset to opsz+Latin+400-700
  - `3943a25` Switch CD view from ?cd=1 to /[slug]/c route
  - `07155fb` Add hair color to Ashish's stats
