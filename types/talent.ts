// Strict talent profile types. Shape matches the future Drizzle schema
// (db/schema.ts) closely enough that the M3 swap from hardcoded data to a
// DB-backed `Profile` query is a wiring change, not a redesign.

export type CreditMedium = "TVC" | "Digital" | "Print" | "Theatre" | "Film" | "Series";

export interface TalentCredit {
  readonly id: string; // stable, used as React key
  readonly brand: string; // e.g. "Honda"
  readonly medium: CreditMedium;
  readonly year: number;
  readonly urls: readonly string[]; // primary first; multiple allowed (e.g. Rings & I has two videos)
  readonly thumbnailUrl?: string; // optional manual poster for non-YouTube work links
  readonly thumbnailAlt?: string;
}

export interface TalentPhoto {
  readonly slug: string; // file basename, e.g. "02-headshot-blazer"
  readonly alt: string;
  readonly width: number; // source width (used by next/image for aspect)
  readonly height: number;
}

export interface TalentContact {
  readonly phone: string; // canonical +91XXXXXXXXXX
  readonly instagramUrl: string; // full https url
  readonly instagramHandle: string; // without @
}

export interface TalentPlays {
  readonly min: number;
  readonly max: number;
}

export interface TalentHeight {
  readonly cm: number;
  readonly display: string; // e.g. "5'8\""
}

export interface Talent {
  readonly slug: string; // url path under slate.club/
  readonly name: string;
  readonly city: string;
  /** Two-second pitch shown on the CD view between name and stats.
   *  One line that may wrap. Per-actor; not all profiles will set it. */
  readonly tagline?: string;
  readonly plays: TalentPlays;
  readonly height: TalentHeight;
  readonly languages: readonly string[];
  readonly accent: string;
  readonly training: string;
  readonly hairColor: string;
  readonly bio: string;
  readonly hero: TalentPhoto;
  readonly gallery: readonly TalentPhoto[];
  readonly credits: readonly TalentCredit[];
  readonly contact: TalentContact;
}
