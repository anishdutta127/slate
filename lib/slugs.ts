import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { user } from "@/db/schema";

// Reserved system slugs that can never be claimed by an actor.
// CLAUDE.md naming, voice, identity: "Reserve admin, about, club, manifesto,
// login, signup, dashboard, api, sitemap."
export const RESERVED_SLUGS = new Set([
  "admin",
  "about",
  "club",
  "manifesto",
  "login",
  "signup",
  "signout",
  "dashboard",
  "api",
  "sitemap",
  "me",
  "robots",
  "favicon",
  "style",
  "_next",
  "ashish", // M1 hand-built page
]);

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/;

export function isValidSlug(slug: string): boolean {
  if (RESERVED_SLUGS.has(slug)) return false;
  return SLUG_REGEX.test(slug);
}

// Phase 1 dev-login slug strategy: derive from the last 4 digits of the
// phone, with a numeric suffix on collision. e.g. +919876543210 -> "3210",
// next user with last4=3210 -> "3210-2", etc. The actor can rename later
// (slug is immutable only AFTER the first WhatsApp send, per CLAUDE.md
// principle #5).
export async function generateSlugFromPhone(phone: string): Promise<string> {
  const last4 = phone.slice(-4);
  let candidate = last4;
  let n = 1;
  while (true) {
    if (isValidSlug(candidate)) {
      const existing = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.slug, candidate))
        .limit(1);
      if (existing.length === 0) return candidate;
    }
    n += 1;
    candidate = `${last4}-${n}`;
    if (n > 100) {
      // safety valve, exceedingly unlikely; fall back to random suffix
      const random = Math.random().toString(36).slice(2, 7);
      candidate = `${last4}-${random}`;
      const exists = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.slug, candidate))
        .limit(1);
      if (exists.length === 0) return candidate;
    }
  }
}
