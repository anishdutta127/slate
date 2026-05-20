import { z } from "zod";

// Env schema. M0 only validates what M0 actually reads. New keys land here as
// later milestones consume them (DATABASE_URL in M3, FIREBASE_* in M3, etc.).
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  SLATE_ENABLE_STYLE_GUIDE: z.enum(["1"]).optional(),
});

export type Env = z.infer<typeof envSchema>;

// Parse once on import. If it fails, the app should fail loudly at boot, not at
// some random request. This is the right place for that.
export const env: Env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  SLATE_ENABLE_STYLE_GUIDE: process.env.SLATE_ENABLE_STYLE_GUIDE,
});
