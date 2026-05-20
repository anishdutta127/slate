import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

// Better Auth requires the user, session, account, and verification tables.
// Slate adds two custom columns to user: phone (the canonical identity for an
// actor) and slug (the public URL path at slate.club/<slug>). The other
// tables are unchanged from the Better Auth schema so future plugins
// (Google sign-in, Firebase Phone Auth, email link) drop in without
// migrations.

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"), // nullable; populated by Google sign-in later
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),

  // Slate custom
  phone: text("phone").notNull().unique(), // normalized +91XXXXXXXXXX
  slug: text("slug").notNull().unique(), // immutable after first send (M4 enforces)

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"), // raw IP, used by Better Auth for session security
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Reserved for future OAuth providers (Google sign-in, etc).
// No rows during Phase 1 dev login.
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Reserved for OTP / magic-link / email verification flows.
// No rows during Phase 1 dev login; Phase 2 Firebase ID tokens land here.
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
