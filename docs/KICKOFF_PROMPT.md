# Claude Code Kickoff Prompt

> Copy everything below this line and paste it as your first message to Claude Code, after the four planning files (`CLAUDE.md`, `DESIGN.md`, `ARCHITECTURE.md`, `README.md`) are in the project root.

---

I'm building Slate — the actors' club of Mumbai. The full product spec is in `CLAUDE.md`. The visual system is in `DESIGN.md`. The engineering plan and build order is in `ARCHITECTURE.md`. Read all three before you do anything.

We're using the gstack workflow. Today we're starting **M0 — Scaffold + design system**. Do not skip ahead to M1 or M2.

Before you write any code, please:

1. Read `CLAUDE.md`, `DESIGN.md`, `ARCHITECTURE.md` end to end
2. Run `/office-hours` on this prompt: _"M0 scaffold and design system for Slate. The deliverable is a Next.js 15 app with Tailwind v4 tokens matching DESIGN.md, fonts loaded, the base layout with the grain overlay, and a `/style` route showing every atom (Button, Chip, Divider, Wordmark) on both dark and cream backgrounds."_
3. Push back on anything in my plan that you think is wrong. I want disagreement, not compliance. Specifically interrogate: (a) the choice of Better Auth + MSG91 for phone OTP (vs Clerk vs Supabase Auth), (b) Tailwind v4 vs v3 stability today, (c) whether the CD view should be a query param or a separate route, (d) whether Fraunces is the right display font given subset weight on India 3G.
4. Once we've debated those, run `/autoplan` for the M0 milestone only. Save the plan, do NOT implement yet.
5. Show me the plan and the diff preview.

After I approve, you'll implement M0 end to end, then run `/review` on the diff, then `/qa http://localhost:3000/style`, then `/ship`.

A few firm constraints:

- The project name in `package.json` is `slate`, scope is unscoped (no `@slate/` etc.)
- `pnpm` not npm
- TypeScript strict mode on
- No `src/` directory — use the `app/`-at-root layout per ARCHITECTURE.md
- No `Inter` font anywhere. Display = Fraunces, body = Geist, mono = JetBrains Mono. Self-hosted from `public/fonts/`, loaded via `next/font/local`.
- Tailwind v4 (the new CSS-first config) if it's stable — if you have a concrete reason it's not ready, recommend v3 and tell me why
- shadcn/ui CLI added but only the primitives we actually use (Button, Input, Form, Dialog later). Don't bulk-install the whole library.
- The grain overlay must be SVG-based fractal noise (`feTurbulence`), not a PNG. Mix-blend overlay, fixed position, pointer-events none.
- Lighthouse mobile Performance must be 95+ on `/style` and a placeholder `/` before we ship M0.

The photos for our first profile (Ashish Rawat) are in `assets/ashish/`. Do not touch them in M0 — they're for M1.

Begin with step 1 above. Read the three planning files first. Then we talk.
