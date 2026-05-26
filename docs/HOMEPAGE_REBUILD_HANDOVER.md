# Slate — Homepage Rebuild + Product Wiring Handover

> For Claude Code, working in `C:\Users\anish\Projects\slate` on branch `m3-community-first`.
> This rebuilds the homepage to a locked design and wires the free/paid product structure.
> A visual reference mockup exists in the founder's Downloads folder (`slate-homepage-preview.html`) — you do NOT need to read it. This spec describes everything precisely. Build in the real Next.js + Tailwind v4 stack using existing components and DESIGN.md tokens.

---

## CONTEXT — read first

1. Read `CLAUDE.md`, `DESIGN.md`, `ARCHITECTURE.md` fully.
2. We are on `m3-community-first`. It builds clean (typecheck + build pass). Current production homepage looks broken on desktop (content trapped in narrow column, empty right side, phone mockup cut off below fold). We are replacing it.
3. The product has evolved to a **community-first actors' club** with a **free tier** (club membership + profile + community + weekly practice) and a **paid tier** (cinematic page at ₹99 + managed outreach). This handover wires that structure.
4. Existing components to reuse, do NOT rebuild: `Section` (tone="dark|light"), `Grain`, `Wordmark`, `Button`, `Chip`, `Divider`. Existing routes: `/`, `/club`, `/manifesto`, `/signup`, `/login`, `/me`, `/ashish`, `/ashish/c`, `/design/*`.
5. Engagement rule: just do it on free reversible actions. Stop and ask only for OAuth, destructive actions, or genuinely ambiguous design calls. Deploy to PREVIEW first, never straight to production. I review the preview before any `vercel --prod`.

---

## PART 1 — REBUILD THE HOMEPAGE (`app/page.tsx`)

Replace the current homepage. It is a long-scroll, community-first landing. Dark theme throughout (use Section tone="dark"; a couple of sections can shift to near-black `#0a0a08` gradients for depth). Mobile-first, but desktop MUST look intentional and premium at 1440px — no narrow trapped column.

Build these sections in order. Each section is full-width background, content constrained to `max-w-[1200px]` centered with `px-6 md:px-12`.

### 1.1 — Sticky nav
- Fixed top, `backdrop-blur`, transparent until scrolled 20px then a hairline bottom border appears.
- Left: wordmark `Slate.` (Fraunces 600, gold dot) followed by small Devanagari `स्लेट` in gold at ~13px, 0.7 opacity.
- Center (hidden below md): links — "How it works" (#how), "The Club" (#club), "Pricing" (#pricing), "A profile" (#ashish).
- Right: primary pill button "Join the club" → links to `/signup` (or `/club` if signup isn't ready; your call, but make it consistent).

### 1.2 — Hero (the desktop fix)
Two-column grid on `lg:` (1.1fr / 0.9fr), single column stacked on mobile. `min-h-[100svh]`, vertically centered, top padding to clear the nav (~120px).

**Left column:**
- Eyebrow (mono, gold, uppercase, 0.2em tracking, with a short gold rule before it): "Mumbai · The actors' club"
- H1 (Fraunces 600, clamp(40px, 7vw, 76px), line-height 1.02, letter-spacing -0.025em): **"Your first profile should feel like your *first break.*"** — the words "first break" in italic + gold-soft color.
- Subhead (Inter Tight, ~18px, text-secondary, max-w-[480px]): "Join the Slate actors' club in Mumbai. Get a free, casting-ready profile, practise every week with other actors, and find your way into the right rooms."
- Hinglish line (italic, text-tertiary, ~15px): Devanagari "सीन शुरू यहीं से।" in gold (not italic) + "  The scene starts here." in muted.
- Two CTAs: primary "Join the club — it's free" (cream pill) → /signup; ghost "See a profile →" → #ashish.
- Founding note (mono, 12px, text-tertiary): "**Founding batch open.** First 100 members get their profile made for free." — "Founding batch open." in gold.

**Right column — the phone mockup (MUST be fully visible above the fold at 1440px, not cropped):**
- A phone frame (~300px wide, aspect 9/19.5, surface bg, 40px radius, hairline border, cinematic shadow, 10px padding).
- Inside: Ashish's hero photo (`02-headshot-blazer`, use the optimized version in `/public/talent/ashish/`) filling top 62%, gradient fade to bg at bottom, then overlaid: mono gold chip "MUMBAI · ACTOR", name "Ashish Rawat" (Fraunces 600, 26px), stats line (mono, 10px) "Plays 22-28 · 5'8" · Hindi & English".
- Two floating cards (absolute positioned, surface-2 bg, hairline border, subtle shadow, gentle infinite float animation via Motion — respect prefers-reduced-motion):
  - Top-left: icon + "Free CD-ready profile" / "Made for you"
  - Bottom-right: icon + "Slate Sundays" / "Aram Nagar · weekly"
- On mobile the floating cards should pull in close to the phone edges so they don't cause horizontal scroll. Test: NO horizontal scroll at any width.

### 1.3 — Before/After (the showpiece — most important section)
Background: subtle gradient dark → near-black.
- Section label (mono gold): "The problem"
- H2: "How you apply now." + small Devanagari "और कैसे होना चाहिए।" in gold
- Intro: "Right now your work lives in a messy WhatsApp message. Drive links, YouTube dumps, a wall of text. Casting people scroll past it in two seconds. Slate fixes the thing they actually see."
- Two columns (stack on mobile, side-by-side on md:):
  - **Left ("Today — the Drive dump"):** A mocked WhatsApp chat. Header with a "CD / Casting Coordinator / online" row. A green outgoing bubble "Send your profile na". Then the actor's ugly reply: a long paragraph bubble ("Hello sir myself Ashish Rawat actor from mumbai age 25 height 5'8 sharing my photos and work below pls consider") followed by FOUR ugly raw-link bubbles in monospace blue showing truncated drive.google.com / youtu.be / instagram.com URLs. Caption below: "Looks the same as 200 other messages. Forgettable."
  - **Right ("With Slate — one link"):** Same chat header. Same green "Send your profile na" bubble. Then a short "Hi, here's my profile" line, then a beautiful Slate preview card: Ashish's photo, name in Fraunces, mono stats line "PLAYS 22-28 · MUMBAI · HINDI, ENGLISH", and the gold URL "◆ slate.club/ashish". Caption: "One tap. Looks like a working actor. Gets saved."

This section sells the product. Make the contrast visceral — the left genuinely ugly, the right genuinely beautiful.

### 1.4 — How it works (`id="how"`)
- Label "How it works", H2 "Three steps." + Devanagari "बस तीन कदम।"
- Three cards (grid-cols-3 on md:, stacked mobile), each with a large faded gold serif number, a Fraunces title, a description, and a small Devanagari line:
  1. "Join the club" / "Apply to the Mumbai actors' club. We welcome freshers. No CV, no fees, no gatekeeping." / "क्लब से जुड़ो।"
  2. "Get your profile" / "We build you a clean, casting-ready profile from your photos and work. Free for the founding batch." / "प्रोफाइल बनवाओ।"
  3. "Grow together" / "Practise every Sunday, ask seniors for contacts and advice, send your link like a pro." / "साथ में बढ़ो।"
- Cards lift on hover (translateY -4px, border brightens).

### 1.5 — What you get
- Label "What you get", H2 "More than a portfolio."
- Three tiles (grid-cols-3 md:): each with a gold icon chip, Fraunces title, description:
  1. "A profile that opens doors" — "Photos, intro video, work links, and a clean casting view — all on one cinematic page that looks ready to forward."
  2. "A real community" — "A vetted WhatsApp circle of Mumbai actors. Ask for contacts, audition leads, honest advice. You're not alone in this city anymore."
  3. "Weekly practice" — "Slate Sundays in Aram Nagar. Scene work, cold reads, feedback from people who get it. Free, every week."

### 1.6 — Ashish showcase (`id="ashish"`)
Background: near-black → bg gradient.
- Two columns (lg:). Left: the framed-portrait treatment (the V3 design already chosen for the cinematic hero — gold 1px border, padding, surface bg, cinematic shadow) showing Ashish's photo, with a mono caption "Ashish Rawat · slate.club/ashish".
- Right: label "One of the first", H2 "Meet Ashish.", a Fraunces italic pull-quote with a gold left border: "Six years on stage and screen. Built for ad films, ready for the long form.", then his credit pills (Honda, Cipla, Zepto, Nilkamal, Smotect) as mono outlined chips, then a line "This is what a Slate profile looks like. Yours will look just as good — whether you have six credits or none yet.", then a ghost button "See his full profile →" linking to `/ashish`.

**IMPORTANT — make the credit pills real:** the founder specifically wants the demo to show that work links are accessible. So in this showcase, the credit pills should be actual links — tapping "Honda" opens his Honda credit URL in a new tab. Pull the URLs from `lib/talent/ashish.ts`. Add a subtle external-link indicator (small arrow on hover) so it's clear they're tappable. This previews the "your links are one tap away" value right on the homepage.

### 1.7 — Pricing (`id="pricing"`)
- Label "Free to join", H2 "Start free. Grow when you're ready.", intro "The club and your first profile are free for the founding batch. When you want more reach, we have tools that do the work for you."
- Two cards side by side (stack mobile):
  - **Free card ("The Club"):** "Free · founding batch". Desc "Everything you need to start showing up like a professional." List (gold checkmarks): casting-ready profile page / clean WhatsApp share with preview / the Mumbai actors' WhatsApp community / weekly Slate Sunday practice / ask seniors for contacts & advice. CTA primary full-width "Join the club" → /signup.
  - **Paid card ("Slate Pro + Outreach"), featured (gold border, faint gold gradient bg, "For serious profiles" badge):** "₹99 /cinematic page". Desc "When you're ready to be seen by the right people, we help you reach them — properly, never spam." List: the full cinematic profile page / custom link & no Slate watermark / see who opened your profile / **Managed outreach — verified casting contacts** (gold) / personalised email + WhatsApp, reviewed by us / reply tracking & follow-up help. CTA primary full-width "Talk to us" → a mailto or a /signup?intent=pro link.
- Below both cards, centered note (mono): "Outreach is **managed and respectful**. We never blast. We reach the right people, on your behalf, with messages worth reading."

### 1.8 — Club (`id="club"`)
Background: bg → near-black gradient.
- Two columns. Left: label "Slate Sundays", H2 "The club meets every week." + Devanagari "हर संडे।", intro about Aram Nagar weekly meetups, a list with Devanagari "॥" bullets (weekly scene practice & cold reads / vetted WhatsApp community / monthly Slate Nights with working actors & CDs / no fees, no gatekeeping), primary CTA "Apply to join" → /club.
- Right: a small photo grid (placeholder — use Ashish's other 3 photos for now, real meetup photos later). One tall + two square, rounded, hairline borders.

### 1.9 — Final CTA (`id="join"`)
Centered, generous padding.
- Label "Are you an actor?", H2 (large) "Come find your room.", intro "Mumbai is hard alone. It's different with a club behind you. Join the founding batch — your profile, your community, your first break.", big primary CTA "Join the Slate club — free →" → /signup, and below it a Devanagari line in gold "मुंबई में नए हो? सही कमरे से शुरू करो।"

### 1.10 — Footer
- Wordmark (Slate. + स्लेट), links (How it works, The Club, Pricing, Manifesto, Instagram), and "Made in Mumbai · स्लेट" in mono with the Devanagari in gold.

---

## PART 2 — DESKTOP LAYOUT CORRECTNESS (the bug we're fixing)

The current homepage fails on desktop. Acceptance criteria for the rebuild:
- At 1440px width: hero is a balanced two-column layout, phone mockup fully visible above the fold, no empty dead space, headline sized for its column not the full viewport.
- At 375px width: everything stacks cleanly, no horizontal scroll anywhere on the page, phone mockup and floating cards fit.
- At 768px and 1024px: graceful intermediate layouts, no broken grids.
- Test all four widths before committing.

---

## PART 3 — HINDI-FRIENDLY VOICE

Use Noto Serif Devanagari (already specified in DESIGN.md, self-host subset). Devanagari accents appear in: nav wordmark, hero hinglish line, before/after H2, how-it-works H2 + each step, club H2 + bullets, final CTA, footer. Keep English as the primary language. The Devanagari is always smaller and gold-tinted — it accents and welcomes, it does not translate. The goal: a Hindi-first actor instantly feels "this place is for me."

---

## PART 4 — VERIFY THE REST OF THE PRODUCT STILL COHERES

After the homepage, do a coherence pass so the founder can hand Ashish a complete thing to review:

1. `/club` — ensure it has a real application form (name, phone, Instagram, city, one line "why you act"). POST to `/api/club/apply`. For now, the API route validates and logs server-side (no DB write yet — DB persistence is a later milestone). Return a friendly success state ("You're in the queue. We'll WhatsApp you about the next Slate Sunday.").
2. `/signup` — currently a placeholder. Make it a real, simple entry: phone number (uses the dev-login flow that already exists behind SLATE_ALLOW_DEV_LOGIN on preview), then a "what brings you to Slate" step. It doesn't need the full 5-step onboarding yet — just enough that a tester can sign in and land on `/me`. Wire it to the existing Better Auth dev-login.
3. `/ashish` and `/ashish/c` — confirm both still work and the V3 framed-portrait hero + chosen credit cards are live. Confirm the credit cards' links open correctly.
4. `/manifesto` — confirm it renders; copy can stay placeholder, founder will write it.
5. Navigation coherence — every CTA on the homepage points somewhere real (no dead links). "Join the club" / "Apply to join" → /club or /signup consistently. "See a profile" → /ashish.

---

## PART 5 — OUTREACH FEATURE (spec only, do NOT build yet)

Do not implement outreach in this pass. Just create `docs/OUTREACH_SPEC.md` capturing the design so it's ready for a later milestone:

- **Framing:** "Managed outreach" — never bulk blasting. Positioned as a paid service for serious profiles.
- **How it works:** Actor upgrades → Slate (the operator, manually at first) takes their profile + a target brief (what roles/projects they want) → Slate reaches a curated list of verified, relevant casting contacts via personalised email (primary) and WhatsApp (only to opted-in / known contacts) → replies tracked → actor sees results.
- **Contact sourcing:** sourced from the founder's network (consented contacts) + careful public sources. This stays a BACKEND operation the founder controls manually — the product never exposes a raw scraper or a "blast 500 numbers" button. The product surface only ever says "verified casting contacts" and "reviewed, respectful messaging."
- **Why not blast:** casting directors blacklist actors and tools that spam them. Blasting would destroy the distribution value of every Slate link. Managed outreach protects the ecosystem.
- **Pilot pricing:** ₹2,999 setup + message costs, up to 250 contacts, manual review, email-first, reply tracker. Later: ₹7,999–14,999 per campaign, larger lists, segmented, email+WhatsApp workflow, reporting.
- **Legal/safety note for the founder:** sourcing contacts from a friend's consented network is fine. Scraping and selling access to CDs' private numbers carries real legal/reputational risk — keep list-building manual and relationship-based at first, validate demand before automating.

---

## WORK ORDER

1. Rebuild `app/page.tsx` per Part 1, reusing existing components. Build section by section.
2. Fix desktop responsiveness per Part 2 — verify at 375 / 768 / 1024 / 1440.
3. Apply Hindi accents per Part 3.
4. Coherence pass per Part 4.
5. Write `docs/OUTREACH_SPEC.md` per Part 5.
6. Run `pnpm format`, `pnpm typecheck`, `pnpm build`. All must pass.
7. `git add .`, exclude `.env.local`, commit "Rebuild homepage: community-first landing + desktop fix + product wiring".
8. Push `m3-community-first`. Deploy a PREVIEW (`vercel`, not `--prod`).
9. Report back: what changed, build status, preview URL, and a short description of how the homepage looks at desktop (1440) and mobile (375) widths. Do NOT deploy to production — founder reviews preview first.

## ACCEPTANCE

- Desktop 1440: homepage first fold balanced and premium, phone visible, no dead space.
- Mobile 375: clean stack, no horizontal scroll.
- All homepage CTAs point to real routes.
- Ashish's credit pills on the homepage are tappable and open his work links.
- Hindi accents present and tasteful.
- `/club`, `/signup`, `/ashish`, `/ashish/c`, `/manifesto` all work.
- typecheck + build pass.
- Preview deployed, production untouched.
