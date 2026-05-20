import { z } from "zod";

// Env schema. Validated once at boot — if anything required is missing or
// malformed, the app fails loudly here instead of at random query time.

const envSchema = z.object({
  // Runtime
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Feature flags
  SLATE_ENABLE_STYLE_GUIDE: z.enum(["1"]).optional(),
  SLATE_ALLOW_DEV_LOGIN: z.enum(["1"]).optional(),

  // Database (M0.5 onward)
  DATABASE_URL: z.string().url(),
  DIRECT_DATABASE_URL: z.string().url(),

  // Better Auth (M0.5 onward). SECRET is required everywhere. URL is optional
  // because on Vercel deploys VERCEL_URL is set per deploy (unique per preview),
  // and locally we default to http://localhost:3000. Set BETTER_AUTH_URL only
  // when you want to override (e.g. a stable production canonical URL like
  // https://slate.club).
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url().optional(),

  // Vercel injects this automatically on every deploy. Not user-settable.
  VERCEL_URL: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  SLATE_ENABLE_STYLE_GUIDE: process.env.SLATE_ENABLE_STYLE_GUIDE,
  SLATE_ALLOW_DEV_LOGIN: process.env.SLATE_ALLOW_DEV_LOGIN,
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  VERCEL_URL: process.env.VERCEL_URL,
});

// Resolved base URL with the cascade: explicit override > Vercel deploy URL >
// localhost. Always returns an absolute URL with protocol. Use this anywhere
// the app needs to know its own origin (Better Auth baseURL, metadataBase,
// canonical links, redirect targets).
export function getBaseUrl(): string {
  if (env.BETTER_AUTH_URL) return env.BETTER_AUTH_URL;
  if (env.NEXT_PUBLIC_APP_URL) return env.NEXT_PUBLIC_APP_URL;
  if (env.VERCEL_URL) {
    const v = env.VERCEL_URL;
    return v.startsWith("http://") || v.startsWith("https://") ? v : `https://${v}`;
  }
  return "http://localhost:3000";
}
