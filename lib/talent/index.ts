import type { Talent } from "@/types/talent";
import { ASHISH } from "@/lib/talent/ashish";

// Phase 1 (M1): a single hardcoded talent. Phase 2 (M3) replaces this with
// a Drizzle query: `await db.select().from(profiles).where(eq(profiles.slug, slug)).limit(1)`.
// The Talent type stays the same; pages don't change.

const ALL: readonly Talent[] = [ASHISH];

export function getTalentBySlug(slug: string): Talent | null {
  return ALL.find((t) => t.slug === slug) ?? null;
}

export function getAllTalentSlugs(): string[] {
  return ALL.map((t) => t.slug);
}

// Phone helpers tied to talent contact, normalized per CLAUDE.md principle #7
// (always store +91XXXXXXXXXX). Display formatting lives in lib/phone.ts.
export function getWhatsAppUrl(phone: string, text: string): string {
  // wa.me expects digits only, no +. Strip the leading "+" but keep country code.
  const digits = phone.replace(/^\+/, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function getTelUrl(phone: string): string {
  return `tel:${phone}`;
}
