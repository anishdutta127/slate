// IMPORTANT: this import must come first so the DoH lookup is installed
// before pg's connection-parameters module captures dns. Under Turbopack
// bundling the patch may still arrive too late (pg captures dns at module
// init); on healthy DNS networks (Vercel, etc) the patch is a silent no-op
// regardless. See lib/dns-doh.ts.
import "@/lib/dns-doh";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/lib/env";
import * as schema from "@/db/schema";

// Connection strategy:
// - Production (Vercel): system DNS resolves fine, pg connects directly to
//   the Neon pooled endpoint. Pooling at the Neon side, plus pg-pool here.
// - Local dev on networks where the ISP refuses Neon's AWS subdomains
//   (Reliance Jio observed): we still need a way to connect. The Pool below
//   uses pg's built-in DNS which goes through the system resolver. If that
//   fails locally, the user has two options:
//     a) Change Windows DNS to 8.8.8.8 in Network Adapter settings
//     b) Test only against the Vercel preview URL (preview-deploy-first
//        workflow, documented in CLAUDE.md)
//
// We could plug DoH at runtime too, but every request would pay a DNS
// round-trip to Cloudflare. That's fine for a one-shot migration script;
// it's a tax on every page render at runtime. Prefer fixing DNS at the
// system layer for local dev.

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
  max: 10,
});

export const db = drizzle(pool, { schema });

export type Database = typeof db;
