# Slate — Design System

> Bound rules. When in doubt, this file wins.

## Aesthetic direction

**Film festival programme meets actor's headshot card.** Cinematic, restrained, warm. Not techy. Not playful. Not corporate. Closer to A24 marketing or MUBI than to a SaaS landing page. The product should feel like _something an actor would be proud to print_.

Inspirations to study, not imitate: A24 film microsites, MUBI Notebook, the title cards of late-2010s OTT Hindi shows (Mirzapur, Made in Heaven, Trial by Fire), classic Bollywood title typography.

What to avoid: gradients-on-white, purple/blue tech vibes, every-startup-Inter, big square avatars, generic "platform" feel, anything that looks like Linkedin/Behance.

---

## Color tokens

```css
/* base */
--slate-bg: #0e0e0c; /* deep charcoal, not pure black */
--slate-surface: #161613; /* subtle lift above bg, for cards and panels on dark sections */
--slate-cream: #f5efe3; /* warm ivory — text on dark, bg on light sections */
--slate-cream-2: #ece3d0; /* muted variant for surfaces in light sections */

/* text */
--text-primary: #f5efe3; /* on dark */
--text-secondary: #c8c2b5; /* on dark, muted */
--text-tertiary: #8a857b; /* on dark, low-emphasis */
--text-on-light: #1a1916; /* near-black for cream sections */

/* accent — used sparingly */
--gold: #c9a24b; /* muted brass, not flashy */
--gold-soft: #e8c97a; /* hover state, focus rings */

/* signal */
--danger: #c84b3c; /* terracotta, not Bootstrap red */
--success: #6b8e5a; /* muted olive */

/* borders / dividers */
--border-dark: rgba(245, 239, 227, 0.08);
--border-light: rgba(26, 25, 22, 0.08);

/* shadow */
--shadow-cinematic: 0 24px 64px -20px rgba(0, 0, 0, 0.6), 0 8px 24px -12px rgba(0, 0, 0, 0.4);
```

**Usage rule:** gold is an accent, never a CTA fill colour. CTA fills are cream on dark, near-black on light. Gold is reserved for focus rings, underlines, the wordmark dot, and one or two intentional highlights per page.

---

## Typography

```css
--font-display: "Fraunces", ui-serif, Georgia, serif;
--font-body: "Geist", "Inter Tight", system-ui, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
--font-devanagari: "Noto Serif Devanagari", "Mangal", serif;
```

**Fraunces** is loaded as a subset variable woff2: Latin only, weight axis 400–700, `opsz` axis live (used at three sizes), with `SOFT` and `WONK` pinned as CSS constants at `SOFT 50` and `WONK 1` via `font-variation-settings`. Total file weight ~50–65KB — this fits the CD view performance budget on India 3G/patchy 4G. Self-hosted from `public/fonts/`, loaded via `next/font/local` with `font-display: swap`.

Variants (all use the same single woff2 file, axes set per element via CSS):

- Display L (actor names on profile hero): `Fraunces` 700 weight, `opsz` 144, `SOFT` 50, `WONK` 1. Size ~64–96px on desktop, 44px on mobile. Letter spacing -0.02em.
- Display M (section headers, marketing H1): Fraunces 600, `opsz` 72, same SOFT/WONK. Size 40–56px.
- Display S (card titles): Fraunces 600, `opsz` 36, same SOFT/WONK. Size 24–28px.

**Body** sizes:

- Body L (intro paragraphs on marketing): 18–20px, line-height 1.55, weight 400
- Body M (everything else): 15–16px, line-height 1.6, weight 400
- Body S (captions, metadata): 13–14px, line-height 1.5, weight 500
- Stats chip: 13px mono, uppercase, letter-spacing 0.08em — used for "5'9" · 22–26 · Hindi, English"

**Numbers** for ages, heights, years — always in `--font-mono`. It's the one place we lean into the analog feel.

**Devanagari accents** — Noto Serif Devanagari, custom-subset to only the glyphs we use (~10 KB woff2). Render via the `.devanagari` helper class, which sets the family, opacity 0.7, and font-size 0.85em relative to the parent. Always paired with English siblings, always smaller and quieter. Used in exactly these placements: cinematic hero wordmark (`Slate. · स्लेट`), cinematic about section header (`About · के बारे में`), cinematic contact section header (`Get in touch · संपर्क करें`), cinematic footer (`Made on Slate · स्लेट`), and one touch on the CD view footer (`Made on Slate · स्लेट`). The CD page is otherwise pure English — the accent is reserved for the closing wordmark only so it signals belonging without compromising the page's information density. To add a new Devanagari phrase, edit `PHRASES` in `scripts/subset-devanagari.ts` and re-run.

---

## Spatial system

Tailwind defaults are fine, but commit to a few rhythms:

- Section vertical padding: `py-24` desktop, `py-16` mobile minimum
- Profile page hero: `min-h-[100svh]` (modern svh, not vh)
- Max content width: `max-w-[1120px]` for marketing, `max-w-[680px]` for editorial / manifesto, profile hero is full-bleed
- Mobile horizontal padding: `px-6`, scale to `px-8` md, `px-12` lg
- Grid gaps: 24px or 32px, never tighter than 16

---

## Motion

Use Motion (formerly Framer Motion) v12.

**Curves:**

```ts
export const ease = {
  cinematic: [0.16, 1, 0.3, 1], // out-expo, smooth deceleration
  enter: [0.22, 1, 0.36, 1], // similar, slightly snappier
  exit: [0.7, 0, 0.84, 0], // in-expo
};
```

**Durations:**

- Micro (hover, focus): 200ms
- Standard (card, modal): 400ms
- Hero / page-load reveal: 800–1200ms with stagger

**Page load on profile:**

1. Hero photo fades up + scales from 1.02 → 1.0 (1000ms, cinematic ease)
2. Name reveals (delay 200ms, 600ms duration, y from 24px)
3. Tagline reveals (delay 400ms)
4. Stats chip row reveals (delay 600ms, stagger 60ms per chip)
5. Scroll-down hint pulses at delay 1400ms

Hover on photos: subtle 2deg tilt + brightness +0.05. No 3D-tilt-on-cursor library. Just CSS transforms triggered by hover.

**Forbidden:** spring physics, bouncy easings, anything that calls attention to itself. The motion should feel like a film transition, not a TikTok effect.

---

## Backgrounds and texture

Film grain is the secret weapon.

```tsx
// components/visual/Grain.tsx
// SVG fractal noise, ~2.5% opacity, absolute-positioned within its parent
// Section, pointer-events:none. Renders only when tone="dark"; returns null
// for tone="light". Never mount Grain directly in a page — let <Section/>
// own the bg + grain pairing.
```

Reference implementation: a tiny SVG `<filter><feTurbulence baseFrequency="0.9" numOctaves="2"/></filter>` rendered as an absolute-positioned overlay inside a `<Section tone="dark">` (which is `position: relative`). Cheaper than a PNG and crisp on retina. `mix-blend-mode: overlay` registers the texture against the dark bg without ever bleeding into adjacent cream sections.

**Vignette:** the hero photo on profiles has a subtle vignette via a `radial-gradient` overlay, edges darkened by ~20%. This is what gives the cinematic feel.

---

## Components — the V1 set

We keep this list deliberately small. Every component must serve a real need on the locked V1 surface. No empty Storybook entries.

### Atoms

- `<Section tone="dark|light"/>` — structural primitive every page composes from. Owns background color, text color, and grain texture as a single dial. Pages never set bg or grain directly; they wrap content in `<Section>` and let the tone decide. `tone="dark"` gives charcoal bg + cream text + grain overlay. `tone="light"` gives cream bg + near-black text + no grain. This is what prevents grain from ever leaking onto a cream surface.
- `<Wordmark/>` — the Slate logotype. Fraunces, with a small gold dot.
- `<Button/>` — three variants: `primary` (cream on dark), `ghost` (border-only), `link` (text with gold underline on hover). `tone="cream"` for use on dark sections, `tone="dark"` for use on light sections.
- `<Chip/>` — for stats and skills. Mono font, uppercase, hairline border. Accepts the same `tone` prop.
- `<Divider/>` — a hairline gold gradient that fades to transparent at edges. The signature detail.
- `<Grain/>` — the texture overlay. Used by `<Section/>` internally; pages should not mount Grain directly. Accepts `tone="dark|light"` — renders the SVG fractal noise only when `tone="dark"`, returns null when `tone="light"`.

### Profile-specific

- `<ProfileHero/>` — hero photo + name + tagline + stats chips. The page anchor.
- `<ProfileStatsCard/>` — the tight, scannable card used both inline on profile and as the dominant element in CD view.
- `<ShowreelEmbed/>` — handles YouTube, Instagram reels, Facebook video, Drive previews. Server-renders the right embed.
- `<CreditsGrid/>` — masonry of brand credits, each opens in a lightbox.
- `<PhotosGallery/>` — vertical scrolling gallery, photos at their natural ratio, no forced squares.
- `<ContactCard/>` — phone (tap-to-call), Instagram, "Send via WhatsApp" CTA (only if visitor matches certain criteria — for the actor's own profile this is irrelevant).

### Marketing-specific

- `<BeforeAfter/>` — the showpiece. Left: a mock WhatsApp chat with messy Drive links and a paragraph. Right: the same actor's Slate link unfurling as a beautiful preview card. This sells the product in one glance.
- `<ClubCalendar/>` — next Sunday meetup date, location, RSVP CTA
- `<ManifestoBlock/>` — narrow column editorial component for the story

### Dashboard / app

- `<OnboardStep/>` — wrapper with progress dots
- `<SlugPicker/>` — live availability check with debounced API
- `<PhonePhotoPicker/>` — drag-drop and choose-from-camera-roll, with crop
- `<InBrowserRecorder/>` — webcam capture for the 30s intro reel, with three on-screen prompt cards
- `<SendCard/>` — the form to send a profile to a number
- `<OpensFeed/>` — the chronological list of opens

---

## CD view — the non-negotiables

The CD view lives at its own route, `/[slug]/c`, reached via the `/api/r/[ref]` redirect from every WhatsApp send. It is a separate Server Component from the cinematic `/[slug]` page (no query-param branching, no shared layout fork). This is the most important screen in the whole product:

1. Top of viewport on mobile (above the fold, no scroll required) shows:
   - Square or 4:5 photo, 40% of viewport width on the left
   - To the right: name (Fraunces, 22px), then a compact stats grid (mono):
     ```
     22 · 5'9" · Mumbai
     Hindi · English · Bhojpuri
     Trained — Anupam Kher's Actor Prepares
     ```
   - Tap-to-call button (cream pill, full-width below the card)
2. Reel embedded immediately below, autoplay disabled, poster image visible (so even with no JS / slow network there's a clear video preview)
3. Three to five additional photos in a horizontal swipeable strip
4. Credits as text-only list (brand · medium · year)
5. A small "See full profile" link in gold at the bottom — links to `/[slug]` (the cinematic view)

**Performance budget for CD view:**

- LCP under 1.2s on a throttled 3G connection
- Total page weight under 500KB before video embed
- No JS required for the contact info or stats to be visible — server-rendered

---

## OG images (`/api/og/[slug]`)

Generated edge-side via `next/og` from `next/server`. Two variants:

- **Default OG (1200×630):** hero photo on left half, name in Fraunces + stats + Slate wordmark on right half, cream background, gold divider line. This is what appears when the profile link is shared on Twitter, LinkedIn, Slack.
- **WhatsApp variant — same image, same URL.** WhatsApp doesn't differentiate. We just need it to look perfect at the 250×250-ish thumbnail size WhatsApp shows.

Test every OG image with the actual WhatsApp preview before considering it done. Use `https://www.opengraph.xyz/` to validate locally.

---

## What "done" looks like for a page

Before any page ships:

- [ ] Tested on iPhone 12 mini width (375px) — the actor's most common device
- [ ] Tested on a budget Android (360px wide, slow 4G)
- [ ] Tested with JavaScript disabled (CD view especially)
- [ ] Lighthouse mobile: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100
- [ ] All images served from R2 via `next/image`, none over 200KB unless intentional hero
- [ ] OG image renders correctly when pasted into a real WhatsApp chat
- [ ] All fonts subset-loaded; no FOIT
- [ ] Hover/focus states for every interactive element (cream-on-dark gets a thin gold ring on focus)
