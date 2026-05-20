# Slate — Architecture

## High-level

Single Next.js 15 App Router app. Server-rendered profiles. Edge OG images. Postgres + Drizzle. R2 for media. Phone OTP via MSG91. Vercel host.

```
┌──────────────────────────────────────────────────────────┐
│                       Vercel Edge                        │
│  ┌──────────────────┐    ┌──────────────────┐            │
│  │ Static pages /   │    │ Edge: /api/og/*  │            │
│  │ ISR profile SSR  │    │ Edge: /api/r/:ref│            │
│  └──────────────────┘    └──────────────────┘            │
└──────────────┬───────────────────────────────────────────┘
               │
        ┌──────┴──────────┐
        │ Node serverless │  Auth, uploads, sends API
        └──────┬──────────┘
               │
   ┌───────────┼────────────┐
   │           │            │
┌──┴────┐  ┌───┴───┐   ┌────┴────┐
│ Neon  │  │  R2   │   │ MSG91   │
│  PG   │  │ media │   │  OTP    │
└───────┘  └───────┘   └─────────┘
```

## File layout

```
slate/
├── CLAUDE.md                       # source of truth, read every session
├── DESIGN.md                       # visual system, bound rules
├── ARCHITECTURE.md                 # this file
├── README.md                       # public-facing, kept thin
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
├── middleware.ts                   # reserved; no CD-view referrer detection needed (route handles it)
│
├── app/
│   ├── layout.tsx                  # root layout: fonts, grain overlay, theme
│   ├── globals.css                 # tailwind imports + design tokens as CSS vars
│   ├── page.tsx                    # marketing landing
│   ├── manifesto/page.tsx
│   ├── club/page.tsx
│   ├── login/page.tsx
│   ├── onboard/
│   │   ├── layout.tsx              # progress dots, exit guard
│   │   ├── basics/page.tsx
│   │   ├── face/page.tsx
│   │   ├── reel/page.tsx
│   │   ├── stats/page.tsx
│   │   └── ready/page.tsx
│   ├── me/
│   │   ├── page.tsx                # dashboard: sends feed, edit profile, etc
│   │   ├── edit/page.tsx
│   │   └── send/page.tsx           # the WhatsApp send flow
│   │
│   ├── [slug]/
│   │   ├── page.tsx                # PUBLIC PROFILE — cinematic (server component)
│   │   ├── opengraph-image.tsx     # PER-PROFILE OG (edge)
│   │   ├── not-found.tsx
│   │   └── c/
│   │       └── page.tsx            # CD VIEW — tight scannable card (server component, reached via /api/r/[ref])
│   │
│   └── api/
│       ├── auth/[...all]/route.ts  # Better Auth handler
│       ├── slugs/check/route.ts    # slug availability
│       ├── uploads/route.ts        # presigned R2 URL
│       ├── sends/route.ts          # log a send, return ref id
│       ├── r/[ref]/route.ts        # redirect + log open
│       ├── og/[slug]/route.tsx     # alternate OG endpoint (keeps next/og logic centralized)
│       └── club/apply/route.ts
│
├── components/
│   ├── visual/
│   │   ├── Grain.tsx
│   │   ├── Wordmark.tsx
│   │   ├── Divider.tsx
│   │   ├── Vignette.tsx
│   │   └── PhoneFrame.tsx          # for the landing demo
│   ├── primitives/
│   │   ├── Button.tsx
│   │   ├── Chip.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── profile/
│   │   ├── ProfileHero.tsx         # cinematic mode hero
│   │   ├── ProfileCdHeader.tsx     # CD-mode top card
│   │   ├── ProfileStatsCard.tsx
│   │   ├── ShowreelEmbed.tsx
│   │   ├── CreditsGrid.tsx
│   │   ├── PhotosGallery.tsx
│   │   └── ContactCard.tsx
│   ├── marketing/
│   │   ├── Hero.tsx
│   │   ├── BeforeAfter.tsx
│   │   ├── ClubBlock.tsx
│   │   ├── ManifestoBlock.tsx
│   │   └── Footer.tsx
│   ├── onboard/
│   │   ├── SlugPicker.tsx
│   │   ├── PhonePhotoPicker.tsx
│   │   ├── InBrowserRecorder.tsx
│   │   └── ReelLinkPicker.tsx
│   └── dashboard/
│       ├── SendCard.tsx
│       └── OpensFeed.tsx
│
├── lib/
│   ├── env.ts                      # zod-validated env vars
│   ├── auth.ts                     # Better Auth config
│   ├── db.ts                       # drizzle client
│   ├── r2.ts                       # presign + upload helpers
│   ├── msg91.ts                    # OTP send + verify
│   ├── slugs.ts                    # reserved list + validators
│   ├── og.ts                       # shared OG image helpers
│   ├── embed.ts                    # detect YouTube/IG/FB/Drive and produce embed URL + thumbnail
│   ├── send-templates.ts           # the 4 message presets
│   └── phone.ts                    # normalize, mask, format Indian numbers
│
├── db/
│   ├── schema.ts                   # drizzle tables
│   ├── seed.ts                     # seeds Ashish's profile
│   └── migrations/                 # generated, committed
│
├── types/
│   └── index.ts                    # shared types
│
├── public/
│   ├── fonts/
│   │   ├── Fraunces.var.woff2
│   │   ├── Geist.var.woff2
│   │   └── JetBrainsMono.var.woff2
│   └── og-fallback.png             # used if image gen fails
│
└── assets/                         # NOT shipped to /public — source assets
    └── ashish/
        ├── 01-fullbody-white-shirt.jpeg
        ├── 02-headshot-blazer.jpeg
        ├── 03-outdoor-denim.jpeg
        └── 04-seated-mint-shirt.jpeg
```

## Environment variables

```
DATABASE_URL=                   # Neon postgres pooled url
DIRECT_DATABASE_URL=            # Neon direct url for migrations

R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=slate-media
R2_PUBLIC_URL=                  # e.g. https://media.slate.club

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=                # https://slate.club in prod, http://localhost:3000 dev

MSG91_AUTH_KEY=
MSG91_TEMPLATE_ID=              # OTP template id
MSG91_SENDER_ID=SLATEX

NEXT_PUBLIC_APP_URL=            # https://slate.club
```

## Build order — the literal milestones for Claude Code

Each milestone is a green PR. Don't merge to main until the milestone's "Done when" passes.

### M0 — Scaffold + design system (target: day 1–2)

1. `npx create-next-app@latest slate --typescript --tailwind --app --no-src-dir --turbo`
2. Install: `motion`, `drizzle-orm`, `pg`, `better-auth`, `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, `sharp`, `zod`, `clsx`, `tailwind-merge`, `next/og`
3. Install dev: `drizzle-kit`, `@types/node`
4. Set up Tailwind v4 tokens in `app/globals.css` (CSS variables from DESIGN.md)
5. Load Fraunces, Geist, JetBrains Mono via `next/font/local` (woff2 self-hosted in `public/fonts`)
6. Build `<Grain/>`, `<Wordmark/>`, `<Divider/>`, `<Button/>`, `<Chip/>`
7. Create a `/style` route (gated dev-only) that renders every atom for visual QA
8. **Done when:** `/style` shows the full atom set on dark and cream backgrounds, hot reload works, no FOIT, Lighthouse on `/` (a placeholder) gives Perf 95+

### M1 — Ashish's page, hand-built static (target: day 3–4)

This is the one we ship publicly first. No DB. Just file-based.

1. Optimise Ashish's 4 photos → WebP and AVIF, multiple sizes, store in `/public/talent/ashish/`. Recommended hero crop on `02-headshot-blazer.jpeg`.
2. Build all profile components against a hardcoded data object `/lib/talent/ashish.ts` that matches the future DB schema. This is our seed and our type test.
3. Build `app/[slug]/page.tsx` (cinematic) to first route only when `slug === 'ashish'`, using the hardcoded data
4. Build `<ProfileHero/>`, `<ProfileStatsCard/>`, `<ShowreelEmbed/>`, `<CreditsGrid/>`, `<PhotosGallery/>`, `<ContactCard/>`
5. Build `app/[slug]/c/page.tsx` (CD view) as its own server component, using `<ProfileCdHeader/>` + shared `<ProfileStatsCard/>` + `<ShowreelEmbed/>`. No client JS required.
6. Build `app/[slug]/opengraph-image.tsx` for Ashish with `next/og`. Test by pasting `https://slate.club/ashish` into a real WhatsApp chat.
7. **Done when:** `/ashish` looks beautiful on iPhone 12 mini AND `/ashish/c` shows name/age/height/contact/reel above the fold AND the WhatsApp preview card unfurls with his hero photo and stats

### M2 — Marketing landing (target: day 5–6)

1. `/` with: hero (line: "The actors' club of Mumbai."), the before/after WhatsApp comparison (this is the hero feature, use a mocked-up `<PhoneFrame/>` on each side), a "live profile" embed showing Ashish's page (in a phone frame), club teaser, manifesto teaser, footer
2. `/manifesto` — long-form editorial. We'll write the copy together. Reserve the route.
3. `/club` — next meetup, application form, photos placeholder
4. **Done when:** landing tells the story in one scroll, before/after is visceral, mobile is flawless

### M3 — Auth + onboarding (target: day 7–9)

1. Drizzle schema, migrations, Neon connection
2. Better Auth with MSG91 OTP provider (custom adapter — Better Auth supports phone via custom plugin)
3. The 5-step onboard flow as separate routes inside a shared layout with progress dots
4. `<SlugPicker/>` with debounced availability check
5. `<PhonePhotoPicker/>` with R2 presigned upload + Sharp resize on server
6. `<InBrowserRecorder/>` with MediaRecorder API, capped at 60s
7. `<ReelLinkPicker/>` with URL parsing in `lib/embed.ts`
8. `/me` dashboard MVP: shows your profile, link to edit, link to send
9. **Done when:** a brand-new phone number can sign up, complete onboarding in 15 min, and have a live `slate.club/<their-slug>` page

### M4 — The Send + tracking (target: day 10–11)

1. `<SendCard/>` form + the 4 message templates from `lib/send-templates.ts`
2. `POST /api/sends` — log the send, return short ref id
3. `GET /api/r/[ref]` — log the open server-side, redirect to `/[slug]/c?ref=[ref]`
4. Optional client beacon on `[slug]` page for "watched reel seconds" — `navigator.sendBeacon` on play / pause / unload
5. `<OpensFeed/>` on the dashboard
6. **Done when:** an actor sends their profile to a number, the recipient opens it on WhatsApp, the actor sees the open in their dashboard within seconds

### M5 — Club + admin (target: day 12)

1. `POST /api/club/apply` with the form on `/club`
2. A simple admin route `/admin` gated by an allow-list of phone numbers in env — list applications, approve/reject (just changes a status flag for now, WhatsApp adds are manual)
3. **Done when:** new applications land in our DB and we can mark them approved

### M6 — Launch (target: day 13–21)

Not code. This is the human bit:
1. Press kit (one-pager PDF, 5 still frames, the manifesto)
2. Hand-build profiles for the first 10–15 members (we onboard them in person at the Sunday event)
3. Aram Nagar Sunday session, scene work, photographed
4. Founder posts: Instagram launch reel, Twitter thread, LinkedIn essay
5. Outreach to 20 working actors (just-broke-out tier) for endorsements

## Development workflow with gstack

Assume the developer has installed gstack (`~/.claude/skills/gstack`). The workflow for every new feature:

1. `/office-hours` — describe what you want, let it interrogate the framing
2. `/autoplan` — full review chain (CEO, design, eng) before code is written
3. Implement against the plan
4. `/review` — staff-engineer pass on the diff
5. `/qa <url>` — real browser, finds bugs
6. `/ship` — opens the PR with coverage audit
7. `/canary` — post-deploy monitoring

For the profile page specifically (M1), use:
- `/design-shotgun` → generates 4-6 variants of the cinematic hero, pick + iterate
- `/design-html` → turns the approved mockup into shippable code that respects DESIGN.md tokens
- `/plan-design-review` → before any profile PR is merged

## Performance budgets (enforced)

| Page | LCP | TBT | JS shipped | Total weight |
|---|---|---|---|---|
| `/` marketing | < 1.8s | < 200ms | < 100KB | < 600KB |
| `/[slug]` cinematic | < 2.0s | < 200ms | < 120KB | < 800KB (excl video) |
| `/[slug]/c` CD view | < 1.2s | < 100ms | < 60KB | < 400KB (excl video) |

The CD view is the strictest because the CD's experience is the make-or-break.

## Security and privacy notes

- Phone numbers stored normalized (`+91XXXXXXXXXX`), never logged in plaintext anywhere except the auth/OTP path
- Send logs mask phone numbers to last 4 in all UI surfaces
- IP addresses for open tracking are hashed (sha256 with a salt rotated quarterly), not stored raw
- Public profile is, well, public — but slug enumeration is rate-limited at the edge
- R2 bucket: public-read for the `talent/` prefix only; user upload paths use signed URLs
- Better Auth sessions: 30-day rolling, refresh on use
- CSRF protection on all POST routes (Better Auth handles login routes; we add a check on `/api/sends` and `/api/club/apply`)

## Out of scope for V1 (do not implement)

- Search across profiles
- Public directory of all actors
- CD-side accounts / login
- Subscriptions or payments
- Templates / theme picker on profiles
- AI feedback on profile
- Casting call listings
- In-app messaging
- Mobile native app
- Cron jobs / scheduled tasks (we do this manually for the club meetup reminders)
