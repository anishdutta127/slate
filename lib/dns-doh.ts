import dns from "node:dns";

// Some Indian ISPs (Reliance Jio observed) refuse DNS for Neon's
// ep-*.aws.neon.tech subdomains AND block outbound port 53 to public
// resolvers. When SLATE_USE_DOH=1 is set (intended for local dev on
// affected networks), we monkey-patch dns.lookup to resolve via Cloudflare
// DNS-over-HTTPS. Vercel and any healthy network leaves the env var
// unset and gets normal fast DNS.

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

interface CacheEntry {
  ip: string;
  family: 4 | 6;
  expires: number;
}

const cache = new Map<string, CacheEntry>();

async function dohResolve(hostname: string): Promise<{ ip: string; family: 4 | 6 }> {
  const r = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(hostname)}&type=A`,
    { headers: { Accept: "application/dns-json" } },
  );
  if (!r.ok) throw new Error(`DoH HTTP ${r.status}`);
  const json = (await r.json()) as DoHResponse;
  if (json.Status !== 0 || !json.Answer) {
    throw new Error(`DoH NXDOMAIN for ${hostname}`);
  }
  const a = json.Answer.find((x) => x.type === 1);
  if (!a) throw new Error(`No A record for ${hostname}`);
  return { ip: a.data, family: 4 };
}

type LookupCallback = (err: NodeJS.ErrnoException | null, address: string, family: number) => void;

let patched = false;

export function installDohLookup(): void {
  if (patched) return;
  if (process.env.SLATE_USE_DOH !== "1") {
    // eslint-disable-next-line no-console
    console.log("[dns-doh] SLATE_USE_DOH != 1, leaving dns.lookup untouched");
    return;
  }
  // eslint-disable-next-line no-console
  console.log("[dns-doh] patching dns.lookup with Cloudflare DoH");

  const original = dns.lookup;

  // Type intentionally loose; node's dns.lookup has overloaded signatures
  // and we just need to intercept the (host, opts, cb) and (host, cb) forms.
  const dohLookup = function (hostname: string, optionsOrCb: unknown, maybeCb?: unknown): void {
    const cb = (typeof optionsOrCb === "function" ? optionsOrCb : maybeCb) as LookupCallback;

    const cached = cache.get(hostname);
    if (cached && cached.expires > Date.now()) {
      cb(null, cached.ip, cached.family);
      return;
    }

    dohResolve(hostname)
      .then(({ ip, family }) => {
        cache.set(hostname, { ip, family, expires: Date.now() + 300_000 });
        cb(null, ip, family);
      })
      .catch(() => {
        // Fall back to system DNS — at worst it fails the same way it would
        // have without the patch.
        (original as unknown as (...args: unknown[]) => void)(hostname, optionsOrCb, maybeCb);
      });
  };

  // @ts-expect-error — replacing a built-in
  dns.lookup = dohLookup;
  patched = true;
}

installDohLookup();
