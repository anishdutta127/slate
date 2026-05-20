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
cp .env.example .env.local        # fill in DATABASE_URL, R2, FIREBASE_*, BETTER_AUTH
pnpm db:generate                  # drizzle migrations from schema
pnpm db:migrate                   # apply to your local/dev DB
pnpm db:seed                      # seeds Ashish Rawat's profile so /ashish works
pnpm dev                          # localhost:3000
```

Then open `localhost:3000/ashish` to see the reference profile, and `localhost:3000/ashish/c` to see the CD render.

## Tech

Next.js 15 (App Router, Turbopack) · TypeScript · Tailwind v4 · shadcn/ui · Motion v12 · Drizzle ORM · Neon Postgres · Better Auth (sessions) + Firebase Phone Auth (OTP delivery) · Cloudflare R2 · Vercel.

## Status

Pre-launch. M0–M2 in progress. First public profile (Ashish Rawat) is the reference.

## Built with gstack

Engineering workflow follows [gstack](https://github.com/garrytan/gstack). `/office-hours` → `/autoplan` → implement → `/review` → `/qa` → `/ship`.

## License

Proprietary. All rights reserved. Slate is a product, not a template — please don't copy it.

Profile photos belong to the actors. Brand work referenced from public sources.
