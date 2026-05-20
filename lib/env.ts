import { z } from "zod";

// Env schema. Validated once at boot — if anything required is missing or
// malformed, the app fails loudly here instead of at random query time.

const envSchema = z.object({
  // Runtime
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  // Feature flags
  SLATE_ENABLE_STYLE_GUIDE: z.enum(["1"]).optional(),
  SLATE_ALLOW_DEV_LOGIN: z.enum(["1"]).optional(),

  // Database (M0.5 onward)
  DATABASE_URL: z.string().url(),
  DIRECT_DATABASE_URL: z.string().url(),

  // Better Auth (M0.5 onward)
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
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
});
