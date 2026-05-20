# Slate

The actors' club of Mumbai.

Build a profile that looks like a film poster. Send it like a pro. Grow with others doing the same.

---

This is the source code for [slate.club](https://slate.club). Mobile-first web app for fresher and early-career actors in Mumbai.

## What's inside

- A beautiful, cinematic profile page at `slate.club/yourname`
- A scannable CD view of the same page, optimised for the casting professional opening it on WhatsApp
- A WhatsApp send kit that turns a Drive-link pitch into a film-poster preview card
- A real-life community: weekly meetups, peer scene work, monthly Slate Nights

## Read this first

Three files, in this order:

1. [`CLAUDE.md`](./CLAUDE.md) — what we're building, who for, and what we're not building
2. [`DESIGN.md`](./DESIGN.md) — the visual system, locked
3. [`ARCHITECTURE.md`](./ARCHITECTURE.md) — file layout, milestones, build order

Every Claude Code session must read `CLAUDE.md` before doing anything.

## Quick start

```bash
pnpm install
cp .env.example .env.local        # fill in env keys as milestones land
pnpm dev                          # localhost:3000
```

From M3 onward, `pnpm dev` will also require `pnpm db:generate && pnpm db:migrate && pnpm db:seed` (Drizzle + Neon, seeds Ashish Rawat's profile so `/ashish` works). Those scripts ship in M3.

## Local development

Today (M0) ships:

- `pnpm dev` — Next.js 15 + Turbopack on `localhost:3000`
- `pnpm lint` — ESLint via `next lint`
- `pnpm typecheck` — `tsc --noEmit`, strict mode
- `pnpm format` — Prettier write
- `pnpm build` — production build

Routes that exist today:

- `localhost:3000/` — placeholder landing (wordmark + tagline + coming-soon)
- `localhost:3000/style` — every design atom on dark and cream backgrounds (Wordmark, Button, Chip, Divider, Grain, typography scale, color tokens)

The `/style` route is gated. In dev (`NODE_ENV !== 'production'`) it always renders. In a production build it 404s unless the env var `SLATE_ENABLE_STYLE_GUIDE=1` is set — so you can opt it on for a Vercel preview deploy to share the design system snapshot, but it stays hidden in real prod.

From M1: `localhost:3000/ashish` (cinematic profile) and `localhost:3000/ashish/c` (CD scan view).

## Tech

Next.js 15 (App Router, Turbopack) · TypeScript · Tailwind v4 · shadcn/ui · Motion v12 · Drizzle ORM · Neon Postgres · Better Auth (sessions) + Firebase Phone Auth (OTP delivery) · Cloudflare R2 · Vercel.

## Status

Pre-launch. M0–M2 in progress. First public profile (Ashish Rawat) is the reference.

## Built with gstack

Engineering workflow follows [gstack](https://github.com/garrytan/gstack). `/office-hours` → `/autoplan` → implement → `/review` → `/qa` → `/ship`.

## License

Proprietary. All rights reserved. Slate is a product, not a template — please don't copy it.

Profile photos belong to the actors. Brand work referenced from public sources.
