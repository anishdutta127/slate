# Ashish Rawat — Profile Source Data

> The first profile on Slate. This is the canonical data. In M1 it becomes a TypeScript object at `lib/talent/ashish.ts`. Please review and correct anything wrong before we ship.

## Identity

- **Full name:** Ashish Rawat
- **Slug:** `ashish` (consider `ashish-rawat` if `ashish` should be reserved for a future actor named just Ashish; my pick is `ashish` for the cleaner URL on the first profile)
- **City:** Mumbai
- **Instagram:** https://www.instagram.com/ashish.rawat138

## To confirm with him before publishing

- [ ] Date of birth (so we can show "Age 25" not just an age range)
- [ ] Height (cm preferred, we'll show cm + ft/in)
- [ ] Languages he speaks fluently (for the chip row)
- [ ] Any specific accents he can do
- [ ] Training — acting school, workshops, or self-taught?
- [ ] Best contact number (we mask in CD view, full visible only when viewer taps "Call")
- [ ] His own one-line bio in his own words — we'll polish but the voice should be his

## Stats card (placeholder — confirm)

| Field | Placeholder |
|---|---|
| Age range | 22–27 (confirm) |
| Height | 5'9" / 175cm (confirm) |
| Languages | Hindi, English (confirm + add any) |
| Accents | TBD |
| City | Mumbai |
| Training | TBD |

## Bio (placeholder — to be rewritten in his voice)

> Working ad-film actor based in Mumbai. Honda, Cipla, Zepto, Nilkamal — face of the new generation of Hindi commercial actors. Open to OTT, theatre, and longer formats.

We'll rewrite this once we talk to him. It should sound like *him*, not like a Talentrack template.

## Photos

All four are in `assets/ashish/`. Recommended treatment:

| File | Use | Notes |
|---|---|---|
| `01-fullbody-white-shirt.jpeg` | Stats card / casting reference | Full body, dark studio, neutral wardrobe — perfect for the "what does this actor look like" CD glance |
| `02-headshot-blazer.jpeg` | **HERO** (recommended) | Eye contact, warm, brown blazer on brown backdrop reads cinematic |
| `03-outdoor-denim.jpeg` | Gallery / "available, approachable" range | Outdoor, denim jacket — shows the casual/young commercial face |
| `04-seated-mint-shirt.jpeg` | Gallery / "thoughtful, range" | Seated with chai, mint shirt, kurta-pyjama — shows traditional + young blend |

Hero pick rationale: image 2 has the strongest eye contact and the warmest palette match to our cream/brown design system. Image 3 is a strong alternative if we want a more "fresher" energy. Worth showing him both and letting him choose.

## Brand work — credits grid

These are real, broadcast credits. They should appear prominently on his profile because they're his strongest signal. Render as a 2-column grid on mobile, 3-column on desktop, each card with brand name + medium + a thumbnail (pulled from the embed) + tap to play modal.

| # | Brand | Medium | Year | URL | Embed type |
|---|---|---|---|---|---|
| 1 | Honda | TVC | 2025 (confirm) | https://www.instagram.com/reel/DXGdDOHjA6_/ | Instagram reel |
| 2 | Cipla | TVC | 2025 (confirm) | https://www.instagram.com/p/DLPad3QK2s1/ | Instagram post |
| 3 | Zepto | TVC | 2025 (confirm) | https://www.facebook.com/share/v/1AYq8JJYEJ/ | Facebook video |
| 4 | Nilkamal Furniture | Digital | 2025 (confirm) | https://youtu.be/tnVDz4HvhbE | YouTube |
| 5 | Smotect | Digital | 2025 (confirm) | https://www.instagram.com/reel/DMaZV5ht1Am/ | Instagram reel |
| 6 | Rings & I | Digital | 2025 (confirm) | https://www.facebook.com/share/r/1HtfW5h7CB/ | Facebook reel |
| 6b | Rings & I (second piece) | Digital | 2025 (confirm) | https://www.facebook.com/share/r/1EEdLQR3ZB/ | Facebook reel |

**Showreel for M1:** until we cut a proper 90-second showreel, the **Honda TVC** is the headline clip in the `<ShowreelEmbed/>` slot. The rest live in `<CreditsGrid/>` below.

## Embed handling

`lib/embed.ts` needs to handle all four sources cleanly:

```ts
type EmbedKind = 'youtube' | 'instagram_reel' | 'instagram_post' | 'facebook_video' | 'facebook_reel' | 'drive' | 'upload';

// for each: normalise the URL, extract an ID, return:
// { kind, embedUrl, thumbnailUrl, originalUrl }
```

Notes per source:

- **YouTube:** straightforward, `youtu.be/<id>` → `youtube.com/embed/<id>`. Thumbnail at `i.ytimg.com/vi/<id>/maxresdefault.jpg`.
- **Instagram (reel & post):** Use Instagram's official `oembed` is gated behind FB app review. Workaround: server-side scrape the page for `og:image` + `og:video:secure_url` and use those. Cache aggressively. For embed, use the `instagram.com/<reel|p>/<id>/embed/` URL in an iframe — works without API key.
- **Facebook video / reel:** Same pattern as Instagram (FB owns it). Iframe via `facebook.com/plugins/video.php?href=<encoded>`. Falls back to a click-through if the iframe is blocked.
- **Drive:** `drive.google.com/file/d/<id>/preview` works for iframes if sharing is "anyone with link". We add a soft warning in the dashboard if the link isn't accessible.

Edge case to handle gracefully: Instagram embed sometimes blocks based on referrer. We always provide a fallback "Open on Instagram" link below the embed.
