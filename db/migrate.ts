import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

// Some Indian ISPs (Reliance Jio observed) refuse DNS for Neon's
// ep-*.aws.neon.tech subdomains AND block outbound port 53 to public
// resolvers (8.8.8.8, 1.1.1.1). DoH (DNS over HTTPS) bypasses this entirely
// since it goes over port 443 like normal web traffic. We resolve the
// hostname via Cloudflare DoH once, then connect pg by IP with TLS
// servername set to the original hostname so cert validation still works.

config({ path: ".env.local" });

interface DoHAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface DoHResponse {
  Status: number;
  Answer?: DoHAnswer[];
}

async function dohResolve(hostname: string): Promise<string> {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(hostname)}&type=A`;
  const r = await fetch(url, { headers: { Accept: "application/dns-json" } });
  if (!r.ok) throw new Error(`DoH HTTP ${r.status}`);
  const json = (await r.json()) as DoHResponse;
  if (json.Status !== 0 || !json.Answer) {
    throw new Error(`DoH NXDOMAIN or no answer for ${hostname}`);
  }
  const a = json.Answer.find((x) => x.type === 1);
  if (!a) throw new Error(`No A record for ${hostname}`);
  return a.data;
}

async function main() {
  const url = process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DIRECT_DATABASE_URL (or DATABASE_URL) must be set");
  }

  const parsed = new URL(url);
  const hostname = parsed.hostname;
  const port = parsed.port ? Number(parsed.port) : 5432;
  const database = parsed.pathname.slice(1);
  const dbUser = decodeURIComponent(parsed.username);
  const password = decodeURIComponent(parsed.password);

  console.log(`Resolving ${hostname} via Cloudflare DoH...`);
  const ip = await dohResolve(hostname);
  console.log(`-> ${ip}`);

  const client = new Client({
    host: ip,
    port,
    database,
    user: dbUser,
    password,
    ssl: {
      rejectUnauthorized: true,
      servername: hostname,
    },
  });

  await client.connect();
  const db = drizzle(client);

  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migrations complete.");

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
