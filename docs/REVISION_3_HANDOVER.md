# Slate — Revision 3 Handover

> For Claude Code in `C:\Users\anish\Projects\slate`, branch `m3-community-first`.
> Founder reviewed rev-2 preview. This round fixes meaning, imagery, and depth. Read fully.
> PREVIEW only. Founder reviews before production.

---

## GUIDING PRINCIPLE (from landing-page research)

The best landing pages (Notion, Linear, Superhuman, Framer) follow these rules. Apply them everywhere:

1. **Outcome-driven headlines, not product statements.** Name WHO it's for and the benefit/transformation. Not "what the product is."
2. **Headlines short** (aim under ~44 characters, max two lines).
3. **One audience, one offer, one primary action** per page.
4. **Show the product working** (we do this with the phone demo).
5. **Whitespace; let it breathe; no cramming.**
6. **Micro-copy under CTAs** to lower friction ("Free for the founding batch").
7. **Story arc: problem to solution** visible in the first fold and reinforced down-page.
8. **Sans-serif for readability** (Geist - already done).

---

## FIX 1 — NAV + HERO GRADIENT (the "black bar looks off" problem)

The current nav is a black slab fighting the gold gradient. Fix:

- Make the nav **transparent** over the hero so the gold gradient flows up behind it. No solid black background at the top of the page.
- Keep it **compact**: reduce vertical height, tighten padding to the top edge.
- On scroll past the hero, THEN it can gain a subtle blurred dark background with a hairline border (the standard pattern). But at the top, over the hero, it's transparent and melts into the gradient.
- The gold radial gradient glow in the hero is good - keep and enhance it. The hero should feel like ONE cohesive lit stage, nav included.

## FIX 2 — HERO IMAGE GETTING CUT OFF

The phone mockup photo is cropping the actor's head/body awkwardly. Fix:

- The auto-swiping gallery must show each **full photo** properly contained (object-fit that shows the whole photo, letterboxed if needed within the phone's top half, rather than cropping heads).
- Ensure the phone frame height accommodates both the full gallery photo (top) and the work links (bottom) without clipping either. Test at 1440, 1024, 375. Nothing clipped at any width.

## FIX 3 — HERO HEADLINE (the "statement in the air" problem)

The current "One link. Everything a casting director needs." is a product statement, not an outcome for the user. Rewrite to be about the ACTOR's outcome, short, simple English a non-native speaker gets instantly. Use ONE of these (pick the strongest, or a close variant):

- "Get seen by the right people." (sub: "Free profile. One link. Made for you.")
- "Your work deserves better than a Drive link."
- "Look like a working actor. Today."

My recommendation: **"Get seen by the right people."** as H1 (short, outcome, about them), with sub-headline "Join the club and get a free professional profile. Share one link, not a pile of Drive and YouTube links." Keep the Hindi accent line "एक लिंक, बस। One link, that's all." Keep micro-copy under the primary CTA: "Free for the founding batch. No payment."

## FIX 4 — HERO: USE THE BLANK SPACE + BETTER HOVER CHIPS

Two changes to the phone-demo area:

(a) **The hovering info chips currently say "Free profile, made for you" and "First access / Meet working actors."** "First access" doesn't communicate value. Replace BOTH floating chips with **expressive USP chips** that sell the product's benefits. Rotate through or show 2-3 of these (pick the strongest, phrased tight and benefit-led):

- "Fast for casting directors" / "Everything they need in 2 seconds"
- "No clutter" / "One link, not ten"
- "Beautiful, customizable" / "Looks professionally made"
- "One-tap to your work" / "Honda, Cipla, Zepto, all in one place"

These chips should feel like little value-prop callouts pointing at the product, teaching the visitor WHY this is good as they look at it.

(b) **The blank space below the work links in/around the phone** (founder noticed dead space): use it to tease the premium bulk-messaging feature. Add a small, tasteful callout card near the bottom of the hero visual area: an icon + "Reach 50 casting directors in one click" + sub "Premium - personalised WhatsApp & email, sent for you" + a small "See premium →" link that scrolls to #pricing. This fills the dead space AND plants the upsell early. Keep it visually secondary to the free CTA.

## FIX 5 — BEFORE/AFTER: HIGHLIGHT THE BULK MESSAGING

Founder loves the Drive-dump vs Slate-profile comparison. Add to it: below the two columns, a one-line band with a redirect to the premium feature. Something like: "Sending to many people? **Slate Premium sends personalised messages to verified casting contacts, for you.**" with a "See how →" link to #pricing. One line, tasteful, plants the premium seed right where the pain (sending to many people) is most felt.

## FIX 6 — NEW SECTION: "EVERYTHING YOU GET" (the highlights of the club)

Founder wants a clear section laying out everything Slate club membership includes - free AND paid, as one aspirational list of value. Add a dedicated section after "How it works":

Heading: "Everything in the club." (Geist bold) + Hindi accent.
A clean grid/list of what membership unlocks, each with an icon and one tight benefit line. Mark which are free and which are premium:

- **Free:** A professional profile (casting view + cinematic view)
- **Free:** One shareable link instead of many
- **Free:** The Mumbai actors' community (ask seniors for contacts, referrals, tips)
- **Free:** Your first practice session with a working actor
- **Premium:** More practice sessions with working actors (₹299-499 / 30 min)
- **Premium:** Cinematic Pro profile (custom link, no watermark, see who viewed)
- **Premium:** Reach recruiters directly (personalised bulk WhatsApp + email to verified casting contacts, sent for you)

Make free items feel generous and premium items feel like natural next steps, not paywalls. This section is the "wow, you get all this" moment.

## FIX 7 — MEET ASHISH: FILL THE BLANK LEFT SIDE WITH REAL VALUE

The left side (just a small framed photo + caption) is too empty. The two-profile-view cards (Casting view / Cinematic view) are good, keep them. But fill the left column with the COMMUNITY USPs - the real value of connecting with senior actors. Add a compact list/cards on the left:

- "Referrals from working actors" / "The contacts that actually move careers"
- "Practice with people who've done it" / "Book a session, get real feedback"
- "Group tips & audition leads" / "A WhatsApp community that shares"
- "You're not alone in this city" / "Freshers and working actors, together"

So the Meet Ashish section becomes: left = why the community matters (the senior-actor connection USPs), right = the two profile views. It teaches both halves of the offer (the profile AND the people).

Make the framed Ashish photo bigger and properly shown (the tiny empty box in rev-2 was broken - the photo wasn't loading or was too small). Fix it so his photo displays properly and prominently.

## FIX 8 — CINEMATIC PROFILE: GO ALL OUT (`app/[slug]/page.tsx`)

Founder's note: the cinematic view is currently just the CD view but bigger. It needs to be a genuinely richer, more cinematic showcase of Ashish's acting life. Make it deeper and more editorial. Add these sections (use placeholder content where we don't have real data yet, clearly marked for the founder to fill via Ashish):

- **Bigger, more dramatic hero** (keep V3 framed portrait but more cinematic - stage glow, grain, the works).
- **A cinematic photo slideshow** (the lookbook carousel from rev-2 spec - large, elegant, one of the visual highlights).
- **Improved credit cards** as mini-posters (not empty boxes - StageGlow/FilmStrip motif behind brand name, medium, year, watch affordance).
- **NEW: "In their words" / director quotes** - a section for 1-3 short quotes from directors/CDs Ashish has worked with. Placeholder quotes marked `{/* TODO: real director quote */}` so founder collects them. Styled as large editorial pull-quotes with attribution.
- **NEW: "Beyond the work" / passions** - a short section on who Ashish is beyond credits (his training, what drives him, range, languages, what he wants to play next). Placeholder copy marked TODO. This humanizes him - the "acting life and beyond" the founder asked for.
- **NEW: "Range" strip** - if we want, a row of his photos labeled by the kind of role each suggests (e.g. "The everyman", "The romantic", "The intense one") to show casting range. Optional, build if it fits cleanly.
- Keep contact section and the "quick view" link to /ashish/c.

The cinematic profile should feel like an actor's feature in a film magazine, not a resume. Editorial, spacious, image-led.

## FIX 9 — IMAGERY: USE REAL ATMOSPHERIC STOCK (not weird boxes, not literal stock-actor cheese)

The abstract boxes look weird/empty. Replace with REAL atmospheric imagery from FREE commercial-use sources (Unsplash / Pexels), graded into our palette:

- Pull SPECIFIC atmospheric, non-cheesy images: empty theatre with stage lights, film set at distance, stage lighting/spotlights, hands holding a script, a dark cinema, audition room mood, Mumbai street/film-world atmosphere. NOT smiling models with clapperboards. NOT literal "happy actor" stock.
- Source via Unsplash Source API or direct Unsplash/Pexels image URLs (commercial-use, no attribution required for Unsplash; Pexels similar). If using their APIs needs a key, use direct hotlinked URLs to specific photos you select, OR download a small curated set into /public/atmosphere/ and commit them.
- Grade each into the Slate palette: dark overlay, slight gold/amber tint, grain on top, so they feel like Slate not like a stock library.
- Use these for: the community/club sections, the "Everything in the club" section backdrop, any mood moment. Mark each with a comment noting the source and that the founder can swap for real Slate photos later.
- Keep Ashish's real photos for: hero phone demo, Meet Ashish, his profile pages.

If any sourced image looks even slightly cheesy or off-brand, prefer a tasteful dark gradient + grain + stage-glow over a bad photo. Quality bar: would this look at home on an A24 or MUBI site? If not, don't use it.

## FIX 10 — ENDING (the "come find your room" is weird)

Replace the final CTA headline. Founder wants something about belonging/tribe but better phrased. Options:

- "Find your people." (sub: "Mumbai is hard alone. The club has your back.")
- "Join your tribe." (founder's instinct, but a touch generic)
- "You don't have to do this alone."
- "Every actor needs a crew."

My recommendation: **"Find your people."** - warm, simple, about belonging, easy English. Keep the Hindi accent line below it. Keep the big primary CTA "Join the club, free".

## GLOBAL (still apply)

- Geist headlines, Noto Sans Devanagari accents (from rev-2).
- Zero em-dashes anywhere.
- Desktop 1440 + mobile 375 both clean, no horizontal scroll, no clipped images.
- All CTAs point to real routes.

---

## WORK ORDER

1. Fix nav (transparent over hero, compact, blur-on-scroll) + enhance hero gold gradient.
2. Fix hero headline to outcome-driven + short. Fix sub + micro-copy.
3. Fix hero phone: full photos in gallery (no clipping), USP hover chips, premium bulk-message callout in the dead space.
4. Add premium one-liner band to Before/After.
5. Build "Everything in the club" highlights section.
6. Rebuild Meet Ashish: community USPs on left, two profile views on right, fix the broken/tiny photo.
7. Cinematic profile: go all out - dramatic hero, photo slideshow, mini-poster credit cards, director quotes (TODO), passions/beyond (TODO), optional range strip.
8. Source + grade real atmospheric imagery; replace weird abstract boxes. Quality bar = A24/MUBI.
9. Fix ending headline to "Find your people."
10. format, typecheck, build - all pass. Verify 1440 + 375, no clipping, no h-scroll.
11. Commit "Rev 3: outcome hero, transparent nav, USP chips, premium teasers, highlights section, richer Meet Ashish, all-out cinematic profile, atmospheric imagery, new ending". Push. Deploy PREVIEW.
12. Report preview URL + how hero, highlights, Meet Ashish, and cinematic profile look. Do NOT touch production.

## ACCEPTANCE

- Nav is transparent/compact over the hero gradient; no black slab.
- Headline is short, outcome-driven, about the actor (not a product statement).
- Hero photos never clip; gallery shows full photos; USP chips sell benefits; premium teaser fills dead space.
- Before/After has a premium bulk-message one-liner with link to pricing.
- "Everything in the club" section lays out free + premium value clearly.
- Meet Ashish: left side full of community USPs, right side two profile views, photo displays properly.
- Cinematic profile is genuinely richer than CD view: slideshow, poster credit cards, director quotes, passions section.
- Imagery is real atmospheric (theatre/stage/film mood) graded to palette, or tasteful gradients - never weird empty boxes, never cheesy stock.
- Ending is "Find your people." or approved variant.
- No em-dashes. Desktop + mobile clean. Build passes. Preview only.
