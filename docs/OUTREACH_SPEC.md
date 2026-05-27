# Slate — Managed Outreach Spec

> **Status:** Spec only. Not yet implemented. For a future milestone after M5.

---

## Framing

"Managed outreach" — never bulk blasting. Positioned as a paid service for serious profiles. The product surface only ever says "verified casting contacts" and "reviewed, respectful messaging."

---

## How it works

1. **Actor upgrades** to Slate Pro + Outreach (₹99 cinematic page is the entry point).
2. **Slate (the operator, manually at first)** takes their profile + a target brief — what roles, genres, or projects the actor wants to be considered for.
3. **Slate reaches a curated list of verified, relevant casting contacts** via personalised email (primary channel) and WhatsApp (only to opted-in or known contacts who have previously engaged).
4. **Replies are tracked.** The actor sees results in their dashboard: who opened, who replied, follow-up status.
5. **Slate handles follow-ups** on behalf of the actor, with review and approval at each step.

---

## Contact sourcing

- Sourced from the founder's network (consented contacts) + careful public sources (production house websites, credited casting directors on IMDb, etc.).
- This stays a **backend operation the founder controls manually** — the product never exposes a raw scraper or a "blast 500 numbers" button.
- Contacts are vetted: verified identity, active in casting, opted-in or publicly reachable via professional email.
- The product surface only ever says "verified casting contacts" — never exposes the list or how it was built.

---

## Why not blast

Casting directors blacklist actors and tools that spam them. One bad blast can:

- Get the actor's number blocked by the CD permanently.
- Get Slate's domain blacklisted for email.
- Destroy the distribution value of every Slate link (if CDs learn to associate slate.club with spam).

Managed outreach protects the ecosystem. Every message goes out reviewed, personalised, and to a relevant contact.

---

## Pilot pricing

| Tier              | Price                        | Scope                                      | Notes                                                                                                                    |
| ----------------- | ---------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Pilot**         | ₹2,999 setup + message costs | Up to 250 contacts                         | Manual quality check on every message. Email-first. WhatsApp only for known/consented contacts. Reply tracking included. |
| **Scale (later)** | ₹7,999–₹14,999 per campaign  | Larger lists, segmented by genre/role type | Email + WhatsApp workflow. Reporting dashboard. Follow-up automation with human review gate.                             |

---

## Channels

### Email (primary)

- Cheaper, safer, and easier to test.
- Use polished profile links, subject lines, and follow-up tracking.
- Personalised — not a mail merge template. Each email references the actor's specific work and the CD's recent projects.

### WhatsApp (secondary, careful)

- Use only for consented or previously-engaged contacts.
- Messages go through the actor's own WhatsApp (via `wa.me` with prefilled text), not a Business API blast.
- For scale: approved templates via WhatsApp Business API, with explicit opt-in and message caps per contact per month.

---

## Legal / safety notes for the founder

- **Sourcing from a friend's consented network:** Fine. Personal introductions are the safest path.
- **Scraping CD phone numbers:** Carries real legal and reputational risk (Telecom Commercial Communications Customer Preference Regulations, personal data under DPDP Act). Keep list-building manual and relationship-based at first.
- **Selling access to CD contact lists:** Never. This is not the product.
- **Validate demand before automating.** Run the first 10 campaigns manually. If actors pay and CDs respond, then invest in tooling. If they don't, the spec was wrong and you've lost nothing.

---

## Product surface

The actor sees:

- A "Talk to us" CTA on the pricing card.
- After upgrade: a brief form in `/me` — target roles, genres, any specific CDs or production houses.
- A feed in `/me` showing: "Email sent to [CD name] · [date]", "Opened", "Replied", "Follow-up sent".

The actor never sees:

- The full contact list.
- Raw email addresses or phone numbers of CDs.
- A "send to all" button.
- Any way to bypass the review gate.

---

## Implementation notes (for when we build this)

- Outreach is a **service**, not a self-serve feature. The product wraps the service in a dashboard, but the engine is human review + semi-automated send.
- Start with a Google Sheet + Loops.so (or Resend) for email. Track opens via pixel. Manual WhatsApp via the actor's own phone.
- Graduate to a proper outreach table in Drizzle + a send queue + reply webhooks only after the pilot validates demand.
- The review gate (founder approves every message before send) is the safety mechanism. Remove it only after establishing clear templates and targeting rules.
