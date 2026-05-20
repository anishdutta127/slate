# Slate â€” Project Context

> **Read this first, every session.** It is the source of truth for what we are building, why, and how.

---

## What Slate is

**Slate is the actors' club of Mumbai.** Free, mobile-first web app for fresher and early-career actors. We help them build a cinematic portfolio at `slate.club/yourname`, send it as a beautiful WhatsApp pitch (not an ugly Drive link), and join a real-life community that meets every Sunday in Aram Nagar.

**The product wedge is distribution, not discovery.** Talentrack and MCCC are casting marketplaces. We are not. We are the layer the actor controls: their presence, their pitch, their people.

**Promise:** *"Look ready before the audition. Send one link. Grow with others doing the same."*

---

## Who it is for

**Primary user â€” the fresher.** 19â€“28, in Mumbai (most often in Andheri / Versova / Aram Nagar / Goregaon). Often a year or two into the grind. Has a handful of ad-film credits or nothing at all. Currently sends a messy Drive link or a paragraph of YouTube URLs on WhatsApp when applying. No website. Maybe an Instagram. Burned â‚¹25K on a "portfolio shoot" that delivered jpegs. Tried Talentrack, got lost in 7 lakh profiles. Lives off auditions in person at Aram Nagar.

**Secondary user â€” the casting professional (CD, casting coordinator, assistant CD).** Sees 200â€“500 submissions per role on WhatsApp. Scans on mobile in two seconds. Needs: name, age range, height, languages, current city, one photo, one clip, contact. If they don't see those in two seconds, they swipe to the next.

We design for both. The same URL serves both. We never make the CD work harder.

---

## What we are NOT building

- A casting call aggregator (this is the Talentrack/MCCC trap)
- An "AI will get you cast" gimmick
- A directory of CD phone numbers (legally messy, instantly spammy)
- Pay-to-apply or pay-for-visibility tiers
- A native mobile app (PWA is fine)
- A pretty portfolio for the actor's ego alone â€” every design choice serves the CD's two-second scan too

---

## Naming, voice, identity

- **Product name:** Slate
- **Tagline (working):** "The actors' club of Mumbai."
- **Sub-tagline (working):** "Build a profile that looks like a film poster. Send it like a pro. Grow with others doing the same."
- **URL pattern:** `slate.club/yourname` (no `/@`, no `/a/`). Reserve admin, about, club, manifesto, login, signup, dashboard, api, sitemap.
- **Voice:** Warm, cinematic, slightly Bollywood, slightly underground film festival. Not corporate. Not LinkedIn. Never says "users" â€” says "actors" or "members". Never says "platform" â€” says "Slate" or "the club".

---

## Visual identity (locked)

- **Palette:**
  - Background: `#0E0E0C` (deep charcoal, never pure black)
  - Surface / cream: `#F5EFE3` (warm ivory)
  - Accent: `#C9A24B` (muted gold, not flashy)
  - Muted text: `#A8A29A`
  - Border / divider: rgba(245, 239, 227, 0.08)
- **Typography:**
  - Display: a heavy serif with character â€” `Fraunces` (variable, free on Google Fonts) for big actor names and headlines
  - Body: `Inter Tight` or `Geist` for everything else (sans, clean, not generic Inter)
  - Mono (for stats card chips like height/age): `JetBrains Mono` at small sizes
- **Texture:** Subtle film grain overlay, ~2â€“3% opacity, fixed position, on dark sections only
- **Motion:** Slow, confident, cinematic. No bouncy springs. Use `Motion` (formerly Framer Motion) on React. Page load = staggered reveal of hero photo â†’ name â†’ tagline â†’ stats. Hover on photos = subtle tilt + warm vignette. Avoid parallax-for-its-own-sake.
- **Photography:** The hero photo is everything. Always render at the actor's chosen crop, no auto-crop.

---

## The locked MVP (V1)

Four pieces, nothing more.

### 1. The Profile Page (`slate.club/yourname`)

Mobile-first. One design (no template picker in V1). Two render modes on the same URL:

- **Cinematic view (default):** full-bleed hero photo, name in Fraunces display, one-line tagline, then vertical scroll: showreel â†’ headshots â†’ stats card â†’ training/credits â†’ contact CTA. Subtle motion. Dark mode default.
- **CD view (scannable):** triggered by `?cd=1` query param (used in all our generated WhatsApp links) OR when referrer is `wa.me` / WhatsApp. Top of page collapses to a tight info card: photo (left), name + age + height + languages + city + contact (right), reel embedded directly below. No animation. A small "see full profile" link at the bottom switches to cinematic view. **This detail wins the product.**

### 2. The Send (WhatsApp distribution kit)

From the actor's dashboard:
- "Send Profile" button â†’ enter phone number â†’ pick from 4 message presets (Ad film fresher / OTT / Theatre / Custom) â†’ optionally add role / project name â†’ opens WhatsApp via `wa.me/<number>?text=<encoded>` with prefilled message + the link including `?cd=1&ref=<send_id>`.
- The link, when opened, unfurls into a rich preview on WhatsApp: actor photo, name, age range, height, "Mumbai-based actor". This is implemented via dynamic OG image generation (per profile) at `/api/og/<slug>`.
- **Tracking:** every generated link has a `ref` id. We log open events server-side via a redirect or pixel. The actor sees, in their dashboard, a feed: "Opened by [masked number] Â· 2h ago Â· watched 18s of reel". One line per send. No funnels, no graphs.

### 3. The Club (community)

At launch this is intentionally low-tech. Inside the app:
- A `/club` page on the marketing site: photos from last meetup, next meetup date, "Join the Club" form (name, Insta, photo, one line about why they're acting).
- Manual vetting by us, acceptance via WhatsApp.
- One vetted WhatsApp community (cap ~80 active members at launch).
- Weekly Sunday meetup in Aram Nagar â€” free, we host, scene work + cold reads.
- Monthly Slate Night with a guest (working actor, casting coordinator). Filmed for Instagram.

No in-app chat or feed in V1. We're not building Discord. WhatsApp is where the actors already live.

### 4. The Onboarding (the "15 minutes to ready" flow)

Five screens, each is its own step. Each is optional after step 1.

1. **The basics.** Phone OTP login, name, slug picker (live availability check), city (default Mumbai). 30 seconds.
2. **Your face.** Upload 1 hero photo + up to 4 more. Drag and drop or camera roll. Auto-orient. Let actor pick which is the hero.
3. **Your reel.** Paste a YouTube / Drive / Instagram link (we embed cleanly) OR upload a 30s intro video OR record in-browser using the device camera with on-screen prompts ("Say your name. Where you're from. One role you'd love to play."). 60% of freshers have no reel â€” the in-browser record is the unlock.
4. **The stats card.** Age range (dropdown, 5-yr buckets), height (dropdown, cm + inches displayed), languages (multi-select chips, top 12 Indian + English), accents (chips), training (free text, 1 line), one-line bio (140 char limit, shown live).
5. **Ready check.** Live preview of the profile page on a phone frame. "Send Profile" CTA. If the reel is missing, a soft nudge: "Profile is live. Add a reel anytime to make it 10Ã— stronger." Then: "Want to join the Mumbai club?" â†’ link to /club.

---

## What we explicitly defer

- **AI feedback on reel / profile completeness score.** v2. Once we have 200+ profiles. Currently it would be guessing.
- **Multiple templates / 3D portfolios.** v2 paid tier. References: portfolio-3d, React-Portfolio.
- **Casting call listings.** v3 or never. Depends on what we learn.
- **Outreach tracker beyond simple sent/opened feed.** v2.
- **Native app.** Probably never. PWA forever.
- **Paid tiers.** v2 at earliest. Free at launch, no watermarks, no friction.
- **Casting director side / login.** v3. They use the link without an account. That is a feature, not a bug.

---

## Tech stack (locked)

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) + Turbopack | Server components, OG image gen, fast |
| Language | TypeScript | Strict mode on |
| UI | Tailwind CSS v4 + shadcn/ui | Standard, fast, hackable |
| Animation | Motion (framer-motion v12) | Cinematic curves |
| Database | Postgres on Neon | Serverless, cheap, scales fine for our load |
| ORM | Drizzle | Type-safe, migrations clean |
| Auth | Better Auth | Phone OTP (Twilio Verify or MSG91 for India) + Google later |
| File storage | Cloudflare R2 | S3-compatible, near-free at our scale |
| Image opt | `next/image` + Sharp | Standard |
| Video | YouTube / IG embeds first. Mux later if hosting our own | Free at launch |
| Hosting | Vercel | Edge OG, ISR, free tier covers us for months |
| Analytics | PostHog (self-host or cloud free tier) + Plausible for the marketing site | Privacy-first |
| WhatsApp send | `https://wa.me/<number>?text=<encoded>` â€” client opens user's own WhatsApp. **No business API, no template approvals, no cost.** | Our user sends, not us. |
| OTP / phone | MSG91 (India-first, cheap) | Twilio is overkill |

> **Reference:** the open-source `wrk.so` portfolio platform (github.com/9d8dev/wrk) uses almost exactly this stack. Read their `app/`, `db/schema.ts`, and `lib/actions/` as a structural reference. **Do not vendor their code (AGPL).** Use their architecture as inspiration only.

---

## Data model (V1)

```ts
// db/schema.ts (Drizzle)

users
  id (uuid)
  phone (unique, +91-prefixed)
  slug (unique, lowercase, 3-30 chars, [a-z0-9-])
  name
  email (nullable)
  city (default 'Mumbai')
  created_at, updated_at

profiles  // 1:1 with users
  user_id (fk)
  age_range_min, age_range_max
  height_cm
  languages (text[])
  accents (text[])
  training (text)
  bio (text, max 140)
  hero_photo_id (fk photos.id, nullable)
  contact_phone (nullable, defaults to user.phone)
  contact_email (nullable)
  is_published (boolean, default false)
  is_published_at

photos
  id (uuid)
  user_id (fk)
  storage_key (R2 key)
  width, height
  order (int)
  created_at

reels  // 0-1 per user in V1, scope can grow
  id (uuid)
  user_id (fk)
  kind ('youtube' | 'instagram' | 'drive' | 'upload')
  url (canonical, normalized)
  thumbnail_url (we fetch + cache)
  created_at

credits  // optional in V1, lets us seed Ashish's brand credits
  id (uuid)
  user_id (fk)
  brand (e.g. 'Honda')
  kind ('TVC' | 'Digital' | 'Print' | 'Theatre' | 'Film' | 'Series')
  year
  url
  order

sends  // every WhatsApp send, this is the loop
  id (uuid, short, used as ?ref=)
  user_id (fk)
  to_phone_masked (last 4 digits visible)
  preset_used ('ad_film' | 'ott' | 'theatre' | 'custom')
  role_label (nullable)
  created_at

send_opens
  id
  send_id (fk sends.id)
  opened_at
  ip_hash (privacy-respecting)
  watched_reel_seconds (nullable)
  user_agent_class ('mobile' | 'desktop' | 'unknown')

club_applications
  id, name, phone, instagram, city, why, status, created_at
```

---

## Routes (V1)

```
GET  /                              # Marketing landing
GET  /manifesto                     # The story / why Slate exists
GET  /club                          # The club page + applications
GET  /[slug]                        # PUBLIC PROFILE â€” server component, cached
GET  /[slug]?cd=1                   # CD view (same component, different render branch)

GET  /login                         # Phone OTP
GET  /onboard                       # 5-step flow (sub-routes /onboard/1 ... /5)
GET  /me                            # Dashboard (sends feed, profile editor)
GET  /me/edit                       # Profile editor

POST /api/auth/...                  # Better Auth
POST /api/uploads                   # Presigned R2 URL
POST /api/sends                     # Log a send, return ref id
GET  /api/r/:ref                    # Redirect to /[slug]?cd=1 + log open
GET  /api/og/:slug                  # Dynamic OG image (1200x630)
GET  /api/og/:slug/cd               # Tight WhatsApp preview variant
POST /api/club/apply                # Club application
```

---

## Engineering principles for this repo

1. **Server components by default.** Client only for interactive bits (camera, drag-drop, OTP, dashboard).
2. **No client-side data fetching for the public profile.** It must be SSR'd, ISR-cached, and load in under 1s on 3G. Casting people are on the move.
3. **The CD view must render meaningful content with zero JS.** If JS fails, the contact info, photo, and reel link must still be there. This is non-negotiable.
4. **Every photo runs through Sharp.** No 5MB iPhone photos served raw.
5. **Slugs are immutable after first send.** We don't break links a CD might have saved.
6. **The OG image is a real Edge function with `next/og`.** Not pre-rendered. Must regenerate when profile is edited.
7. **Phone numbers are stored normalized as `+91XXXXXXXXXX`.** Display formatting is a render concern, not a storage concern.
8. **Never leak full phone numbers in tracking UI.** Always mask to last 4 digits when shown to the actor.
9. **Age is shown as a "plays" range, never as a number.** Actors give us their screen age; we render `screen_age plus or minus 3` as the public range (e.g., screen age 25 means "Plays 22-28"). Real age (from DOB) is stored in the DB for our records only and never rendered in any public-facing UI. This is industry-standard and protects the actor.

---

## The launch ladder

| Milestone | What ships | Done when |
|---|---|---|
| **M0 â€” Repo + design system** | Tailwind tokens, Fraunces + body font loaded, color vars, base layout, dark theme, grain overlay | Style guide page renders |
| **M1 â€” Ashish's page, hand-built** | `/ashish` as a static page (no DB). Full visual treatment, both render modes. | Page is shareable, OG image renders correctly on WhatsApp |
| **M2 â€” Marketing landing + manifesto** | `/`, `/manifesto`, `/club`. The before/after section (messy WhatsApp vs Slate). | Lighthouse 95+ on mobile |
| **M3 â€” Auth + onboarding** | Phone OTP, 5-step onboard, profile saved to DB. New users get a real `/[slug]`. | A new user can sign up and have a live profile in 15 min |
| **M4 â€” The Send + tracking** | Dashboard, send flow, ref redirect, opens feed | Sending a profile produces a beautiful WhatsApp preview, opens are tracked |
| **M5 â€” Club applications** | Form on `/club`, admin view to approve | First 20 club members onboarded manually |
| **M6 â€” Launch day** | Aram Nagar Sunday event. Press kit. Founder-first profiles seeded. | We have a public moment |

Aim: M0â€“M2 in week 1. M3â€“M4 in week 2. M5â€“M6 in week 3.

---

## First profile to build: Ashish Rawat

- Instagram: https://www.instagram.com/ashish.rawat138
- Status: working ad-film actor (not a fresher â€” he is the aspiration for our fresher audience)
- Credits (all real, all should appear on his page):
  - Honda â€” TVC â€” https://www.instagram.com/reel/DXGdDOHjA6_/
  - Cipla â€” TVC â€” https://www.instagram.com/p/DLPad3QK2s1/
  - Zepto â€” TVC â€” https://www.facebook.com/share/v/1AYq8JJYEJ/
  - Nilkamal Furniture â€” Digital â€” https://youtu.be/tnVDz4HvhbE
  - Smotect â€” Digital â€” https://www.instagram.com/reel/DMaZV5ht1Am/
  - Rings & I â€” Digital â€” https://www.facebook.com/share/r/1HtfW5h7CB/ + https://www.facebook.com/share/r/1EEdLQR3ZB/
- Photos: 4 in `assets/ashish/`. Hero recommendation: `02-headshot-blazer.jpeg` (warm brown blazer, smiling, eye contact, indoor).
- Showreel: needs to be assembled later from the brand reels above. For M1, we use the Honda TVC as the headline clip and link the rest in a "Selected work" grid below.

---

## Decision log (every locked decision lives here)

- **2026-05-20:** Name = Slate. Slug pattern = `slate.club/yourname`. Palette = charcoal / cream / gold. Display font = Fraunces. We do not build a casting-call aggregator. CD view is a query-param render of the same page, not a separate route. WhatsApp send is `wa.me` only (no Business API at launch). First featured profile = Ashish Rawat.
