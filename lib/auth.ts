import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { devLoginPlugin } from "@/lib/dev-login-plugin";
import * as schema from "@/db/schema";

// Better Auth instance. Phase 1 (M0.5) mounts the dev-login plugin which
// exposes POST /api/auth/sign-in-with-phone. Phase 2 (pre-launch) will add
// the Firebase Phone Auth bridge as an additional plugin; dev-login stays
// mounted on preview deploys only, gated by SLATE_ALLOW_DEV_LOGIN.

// Resolve the active base URL. On Vercel preview deploys, VERCEL_URL is set
// per deploy and unique to each push, so we use it. On localhost the env
// var BETTER_AUTH_URL wins. trustedOrigins gets the Vercel preview pattern
// so cookies/redirects accept the dynamic hostname.
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
const baseURL = vercelUrl ?? env.BETTER_AUTH_URL;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.vercel.app",
    env.BETTER_AUTH_URL,
    ...(vercelUrl ? [vercelUrl] : []),
  ],
  emailAndPassword: {
    // Disabled in Phase 1 — we don't ship password auth at all.
    enabled: false,
  },
  user: {
    additionalFields: {
      phone: { type: "string", required: true, input: false },
      slug: { type: "string", required: true, input: false },
    },
  },
  plugins: [devLoginPlugin(), nextCookies()],
});

export type Auth = typeof auth;
export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
