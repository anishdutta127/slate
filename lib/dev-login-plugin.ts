import type { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { user } from "@/db/schema";
import { normalizeIndianPhone } from "@/lib/phone";
import { generateSlugFromPhone } from "@/lib/slugs";
import { env } from "@/lib/env";
import { randomUUID } from "node:crypto";

// Dev login plugin: a custom Better Auth endpoint at POST /sign-in-with-phone.
// Skips OTP entirely. Gated by SLATE_ALLOW_DEV_LOGIN=1 — refuses if unset.
// When Phase 2 lands (Firebase Phone Auth), this plugin stays mounted on
// preview deploys for tester onboarding; production never has the flag set,
// so the endpoint refuses every call.
//
// Internals: upserts a user by phone (creates if missing, finds if existing),
// then uses ctx.context.internalAdapter.createSession + setSessionCookie to
// mint a real Better Auth session. Subsequent auth.api.getSession() calls
// recognize the cookie like any normal sign-in.

export const devLoginPlugin = () =>
  ({
    id: "dev-login",
    endpoints: {
      signInWithPhone: createAuthEndpoint(
        "/sign-in-with-phone",
        {
          method: "POST",
          body: z.object({
            phone: z.string().min(10).max(20),
          }),
        },
        async (ctx) => {
          if (env.SLATE_ALLOW_DEV_LOGIN !== "1") {
            return ctx.json(
              {
                error: "DEV_LOGIN_DISABLED",
                message: "Dev login is not enabled in this environment.",
              },
              { status: 403 },
            );
          }

          const phone = normalizeIndianPhone(ctx.body.phone);
          if (!phone) {
            return ctx.json(
              { error: "INVALID_PHONE", message: "Enter a valid Indian phone number (10 digits)." },
              { status: 400 },
            );
          }

          // Upsert user
          const existing = await db.select().from(user).where(eq(user.phone, phone)).limit(1);
          let dbUser: typeof user.$inferSelect;
          if (existing.length > 0 && existing[0]) {
            dbUser = existing[0];
          } else {
            const slug = await generateSlugFromPhone(phone);
            const id = randomUUID();
            const now = new Date();
            const inserted = await db
              .insert(user)
              .values({
                id,
                name: `Actor ${phone.slice(-4)}`,
                phone,
                slug,
                emailVerified: false,
                createdAt: now,
                updatedAt: now,
              })
              .returning();
            if (!inserted[0]) {
              return ctx.json(
                { error: "USER_CREATE_FAILED", message: "Could not create user." },
                { status: 500 },
              );
            }
            dbUser = inserted[0];
          }

          // Create session via Better Auth's internal adapter
          const newSession = await ctx.context.internalAdapter.createSession(dbUser.id, false);
          if (!newSession) {
            return ctx.json(
              { error: "SESSION_CREATE_FAILED", message: "Could not create session." },
              { status: 500 },
            );
          }

          await setSessionCookie(ctx, {
            session: newSession,
            // Better Auth's session-cookie expects the user shape it knows.
            // Our dbUser has the right id/email/name; phone/slug live in DB
            // and are read on demand via auth.api.getSession + a join.
            user: {
              id: dbUser.id,
              email: dbUser.email ?? "",
              emailVerified: dbUser.emailVerified,
              name: dbUser.name,
              image: dbUser.image ?? null,
              createdAt: dbUser.createdAt,
              updatedAt: dbUser.updatedAt,
            },
          });

          return ctx.json({
            user: {
              id: dbUser.id,
              phone: dbUser.phone,
              slug: dbUser.slug,
              name: dbUser.name,
            },
          });
        },
      ),
    },
  }) satisfies BetterAuthPlugin;
