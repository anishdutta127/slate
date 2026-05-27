# Slate — Revision 2 Handover (Homepage + Profiles)

> For Claude Code in `C:\Users\anish\Projects\slate`, branch `m3-community-first`.
> This is a substantial revision based on founder review of the rev-1 preview. Read fully before starting.
> Deploy to PREVIEW only. Founder reviews before any production push.

---

## WHY THIS REVISION

The rev-1 homepage was structurally good but had specific problems:

1. The display font (Fraunces) is too hard to read for our Hindi-first, English-as-second-language audience.
2. The hero "shows off the actor" instead of "showing off the product" (the profile itself).
3. We over-committed to weekly meetups, which aren't the real value yet.
4. The two profile types (CD view vs cinematic) aren't clearly shown or differentiated.
5. The cinematic profile's credit thumbnails and photo display are weak.
6. Em-dashes appear on the site and must be removed everywhere.

This revision fixes all of that.

---

## GLOBAL CHANGE 1 — FONT SYSTEM (affects the whole site)

Replace the display font everywhere. Fraunces is OUT for headlines.

- **Headlines / display:** **Geist** (already available in the project) at heavy weights (600/700). Big, bold, modern, instantly readable. Impact comes from size and weight, not ornament. This is the Linear / Vercel / modern-startup premium look.
- **Body:** Geist regular / Inter Tight (keep current body).
- **Mono:** JetBrains Mono (unchanged, for stats/labels).
- **Hindi:** switch from Noto Serif Devanagari to **Noto Sans Devanagari** (cleaner match to a sans system, more readable for Hindi-first readers). Re-subset to the characters used.
- Remove Fraunces from the build entirely (font files, @font-face, tokens) unless it's still used somewhere we want a serif accent. Default: no serif. If a single serif accent is wanted later we revisit. Update DESIGN.md tokens: `--font-display` now points to Geist.

Update DESIGN.md to reflect the new type system and note the reason (readability for non-native-English audience).

## GLOBAL CHANGE 2 — NO EM-DASHES

Search the entire codebase (all .tsx, .ts, .md, copy strings) for the em-dash character and remove every one. Replace with a regular hyphen "-" where a dash is needed, or restructure the sentence with a period or comma. This applies to all user-facing copy. Verify with a grep before committing: zero em-dashes in any user-facing string.

## GLOBAL CHANGE 3 — IMAGERY STRATEGY

We are NOT using stock or scraped photos. For all non-Ashish image slots (community, club, practice, mood sections), build **abstract code-generated visuals**: SVG + CSS gradients, film-grain texture, theatre-light glows (radial gradients in gold/amber), geometric compositions in the charcoal/cream/gold palette. These evoke "cinema / stage / Mumbai film world" through mood and light, not literal photos.

Build a small set of reusable visual components in `components/visual/`:

- `StageGlow.tsx` — a radial amber/gold spotlight glow on charcoal, like a stage light
- `FilmStrip.tsx` — an abstract film-strip / frame motif in gold hairlines
- `GrainField.tsx` — a richer grain + gradient field for section backgrounds
- `MoodTile.tsx` — a composable abstract tile (gradient + grain + optional glow) used wherever we'd otherwise put a stock photo

Every place that uses one of these instead of a real photo gets an HTML comment: `{/* TODO: swap for real meetup/audition photo when available */}` so the founder can replace them later.

Ashish's real photos stay where they genuinely belong: the hero phone demo, the Meet Ashish section, and his actual profile pages. Nowhere else.

---

## HOMEPAGE REVISION (`app/page.tsx`)

### Hero — REBUILD as "the profile is the product"

The hero must show off THE PROFILE, not the actor. The actor in it is incidental; the point is "you get one beautiful link instead of a mess of them, and we make it for you, free."

**Left column copy (reframed):**

- Eyebrow (mono gold): "Mumbai · The actors' club"
- Headline (Geist, very bold, large, READABLE): "One link. Everything a casting director needs." (or similar — the idea is ONE link replacing many messy ones). Keep it short, punchy, simple English. A non-native speaker should get it instantly.
- Sub: "Join the club and we build you a free profile that looks professional. Share one link instead of a pile of Google Drive and YouTube links."
- Hindi accent line (Noto Sans Devanagari in gold + English): "एक लिंक, बस। One link, that's all."
- CTAs: primary "Join the club, free" → /signup ; ghost "See how it works" → #how
- Founding note (mono): "Founding batch open. First 100 members get their profile made free." ("Founding batch open." in gold.)

**Right column — the phone as a PRODUCT DEMO (this is the key change):**
The phone screen shows the profile WORKING, full and visible at first glance:

- **Top half of screen:** an auto-swiping photo gallery cycling through Ashish's 4 photos (smooth crossfade or slide, ~2.5s each, pauses on hover, respects prefers-reduced-motion by showing just the first photo). The full photo must be visible, not cropped to a face.
- **Bottom half of screen:** a compact list of Ashish's tappable WORK links (Honda, Cipla, Zepto, Nilkamal, Smotect) rendered as small rows with the brand name + medium + a small external-link arrow. These are real links (from lib/talent/ashish.ts) opening in new tabs. This demonstrates "all your work, one tap away."
- The phone frame should be large enough that both halves are legible. It's fine for the phone to be the dominant element on the right.
- Keep the two floating cards (founder liked them) but REWORD away from weekly meetups:
  - Card 1: "Free profile, made for you" / "No design skills needed"
  - Card 2: "First access" / "Meet working actors"

The whole hero now reads: "here's the beautiful thing you get, and it's free."

### Before/After — KEEP (founder liked it)

Keep the WhatsApp before/after section as-is from rev-1. It works. Just apply the new font and remove any em-dashes. Confirm the "ugly" side is genuinely ugly (raw truncated links in mono) and the Slate side genuinely clean.

### How it works — KEEP structure, reword step 3

Three steps. Reword step 3 away from "weekly practice":

1. "Join the club" / "Apply to the Mumbai actors' club. Freshers welcome. No CV, no fees." / "क्लब से जुड़ो।"
2. "Get your profile" / "We build you a clean, casting-ready profile from your photos and work. Free for the founding batch." / "प्रोफाइल बनवाओ।"
3. "Get access" / "Book a practice slot with a working actor, get your first introductions, share your link like a pro." / "आगे बढ़ो।"

### What you get — REWORD around real value

Three tiles, reworded:

1. "A profile that opens doors" / photos, work links, casting view and cinematic view, one shareable link.
2. "First access to working actors" / a community where you can reach experienced actors, ask for contacts, and book practice slots.
3. "Your first introductions" / we help you get seen by the right people, the right way.
   (Drop the "weekly practice in Aram Nagar" tile. Replace with the access framing above.)

### Meet Ashish — REBUILD to show BOTH profile types clearly

This section currently doesn't show the two profile types. Rebuild it as the place a visitor LEARNS the difference:

- Heading: "Meet Ashish. One of the first." (Geist bold)
- His framed photo + pull-quote ("Six years on stage and screen. Built for ad films, ready for the long form.") + credit pills (tappable, real links).
- Then TWO clear preview cards side by side, each tappable:
  - **"Casting view"** card: a mini-thumbnail of the /ashish/c layout + label "Fast, scannable. What a casting director sees in two seconds." + button "Open casting view" → /ashish/c
  - **"Cinematic view"** card: a mini-thumbnail of the /ashish layout + label "The full story. Photos, work, the whole profile." + button "Open cinematic view" → /ashish
- This teaches the visitor that every Slate member gets both, for different audiences.

### Pricing — REVISE to show the real ladder

Keep two main columns but update content:

- **Free (The Club):** casting-ready profile / both casting + cinematic views / clean WhatsApp share / the Mumbai actors' community / ask seniors for contacts / **your first practice slot free**.
- **Paid features (show the ladder, even if pricing is TBD):** Present these as a set of upgrades, not one plan:
  - "Practice slots" - ₹299 to ₹499 per 30 min with a working actor (first one free).
  - "Cinematic Pro" - ₹99, custom link, no watermark, see who opened your profile.
  - "Reach recruiters directly" - price coming soon, badge "Premium". Sub-line: "Personalised WhatsApp and email to verified casting contacts, sent on your behalf. Reviewed, never spam." (This is the managed outreach feature, framed safely.)
- Keep the centered note: "We reach the right people, personally. We never blast."

### Club section — REWORD, no weekly commitment, abstract visuals

- Change "The club meets every week" to something about the community and access, NOT a weekly meetup promise. E.g. heading "More than a profile. A way in." + Devanagari accent.
- List the real things: a vetted WhatsApp community / book practice slots with working actors / first introductions to the right people / no fees, no gatekeeping.
- Replace Ashish's photos here with the abstract MoodTile/StageGlow visuals (marked TODO for real photos later).

### Final CTA — KEEP, apply font + reword slightly

"Come find your room." stays. Apply Geist. Keep the Hindi line. Remove any em-dash.

### Footer — apply font, keep Devanagari accent.

---

## CINEMATIC PROFILE REVISION (`app/[slug]/page.tsx`)

Two fixes the founder called out:

### Fix 1 — Better credit thumbnails

The current "cover story" branded cards are too empty/bland (big empty space with just brand name). Improve them: tighter composition, the brand name with more presence, a subtle StageGlow or FilmStrip motif behind it, medium + year clearly placed, a visible "watch" affordance. Each card should feel like a designed mini-poster, not an empty box. Keep them tappable to the real work URLs. The one real YouTube thumbnail (Nilkamal) stays as a real thumbnail.

### Fix 2 — Photos as a cinematic slideshow

The "more photos" section is currently a static stack. Rebuild it as a proper cinematic slideshow / carousel: large, one photo at a time or a smooth horizontal cinematic scroll, with elegant transitions (respect prefers-reduced-motion). This should feel like flipping through a lookbook, not scrolling a list. Use the existing 4 photos. Make it the visual highlight of the lower half of the page.

Apply the new Geist font to the cinematic profile headers too (replace Fraunces). Keep the V3 framed-portrait hero treatment but with Geist for the name.

Remove any em-dashes on both profile routes.

---

## WORK ORDER

1. GLOBAL: swap font system to Geist + Noto Sans Devanagari, remove Fraunces, update DESIGN.md. Verify nothing breaks.
2. GLOBAL: grep and remove all em-dashes from user-facing copy.
3. Build the abstract visual components (StageGlow, FilmStrip, GrainField, MoodTile).
4. Rebuild the hero as the profile-product demo (auto-swiping gallery + tappable work links in the phone).
5. Reword How it works, What you get, Club per spec (drop weekly meetups).
6. Rebuild Meet Ashish with the two-profile-type preview cards.
7. Revise Pricing to the new ladder (practice slots, cinematic pro, reach recruiters).
8. Fix cinematic profile: better credit cards + photo slideshow.
9. Replace filler photos with abstract visuals, mark TODOs for real photos.
10. `pnpm format`, `pnpm typecheck`, `pnpm build` - all must pass.
11. Verify desktop 1440 + mobile 375, no horizontal scroll, hero phone fully visible.
12. Commit "Rev 2: Geist font, profile-as-product hero, practice slots, dual profile showcase, cinematic slideshow, abstract visuals, no em-dashes". Push. Deploy PREVIEW only.
13. Report: preview URL, what changed, how hero + Meet Ashish + cinematic slideshow look. Do NOT touch production.

## ACCEPTANCE

- Headlines readable at a glance (Geist, not Fraunces). No hard-to-read display type anywhere.
- Hero shows the PROFILE working (gallery + tappable links), not just a portrait. Full photo visible.
- Zero em-dashes anywhere in user-facing copy.
- No "weekly meetup" promises; replaced with access + practice slots.
- Meet Ashish shows BOTH profile types with clear "open casting view" / "open cinematic view".
- Pricing shows the ladder: free club, practice slots, cinematic pro, reach-recruiters (premium, price TBD).
- Cinematic profile: credit cards look like mini-posters; photos are a cinematic slideshow.
- Non-Ashish imagery is abstract code-generated visuals, marked TODO for real photos.
- Desktop + mobile both clean. typecheck + build pass. Preview deployed, prod untouched.
