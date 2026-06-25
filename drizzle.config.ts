import { config } from "dotenv";
import type { Config } from "drizzle-kit";

// Load .env.local explicitly. drizzle-kit runs outside the Next.js process,
// so it doesn't get Next's automatic env loading. Without this, generate /
// migrate / push fail with "Please provide required params for Postgres".
config({ path: ".env.local" });

// DIRECT_DATABASE_URL skips the pooler — drizzle-kit operations (generate,
// migrate, push) need a non-pooled connection because PgBouncer cannot
// handle the prepared statements that the kit issues. Runtime queries
// (lib/db.ts) can stay on the pooled url for serverless edge speed.

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL ?? "",
  },
  verbose: true,
  strict: true,
} satisfies Config;
