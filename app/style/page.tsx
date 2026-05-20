import { notFound } from "next/navigation";
import { Wordmark } from "@/components/visual/Wordmark";
import { Divider } from "@/components/visual/Divider";
import { Button } from "@/components/primitives/Button";
import { Chip } from "@/components/primitives/Chip";

// Force per-request rendering so the env check runs at request time, not build
// time. Without this, `next build` would prerender /style as a static 404 and
// setting SLATE_ENABLE_STYLE_GUIDE on a preview deploy later would have no effect.
export const dynamic = "force-dynamic";

// Gated: hidden in production unless SLATE_ENABLE_STYLE_GUIDE=1.
// Dev (localhost) always shows it; preview deploys can opt in by setting the env var.
function isVisible() {
  if (process.env.NODE_ENV !== "production") return true;
  return process.env.SLATE_ENABLE_STYLE_GUIDE === "1";
}

const SWATCHES = [
  { name: "slate-bg", value: "#0E0E0C", on: "cream" as const },
  { name: "slate-surface", value: "#161613", on: "cream" as const },
  { name: "slate-cream", value: "#F5EFE3", on: "dark" as const },
  { name: "slate-cream-2", value: "#ECE3D0", on: "dark" as const },
  { name: "gold", value: "#C9A24B", on: "dark" as const },
  { name: "gold-soft", value: "#E8C97A", on: "dark" as const },
  { name: "danger", value: "#C84B3C", on: "cream" as const },
  { name: "success", value: "#6B8E5A", on: "cream" as const },
];

export default function StylePage() {
  if (!isVisible()) notFound();

  return (
    <div className="min-h-svh">
      {/* =============== Header =============== */}
      <header className="border-b border-border-dark px-6 py-8 md:px-12">
        <Wordmark size="md" />
        <p className="chip-text mt-3 text-text-tertiary">Style guide · dev only</p>
      </header>

      {/* =============== Dark section =============== */}
      <section className="bg-slate-bg px-6 py-16 md:px-12 md:py-24">
        <SectionHeader tone="cream">On dark</SectionHeader>

        <Block label="Typography">
          <div className="space-y-6">
            <p className="display-l text-text-primary">Display L</p>
            <p className="display-m text-text-primary">Display M</p>
            <p className="display-s text-text-primary">Display S</p>
            <p className="body-l text-text-primary">
              Body L — Mumbai-based actor with six years on stage and screen.
            </p>
            <p className="body-m text-text-secondary">
              Body M — Faces you have seen in Honda, Cipla, Zepto, Nilkamal, and Smotect
              commercials.
            </p>
            <p className="body-s text-text-tertiary">
              Body S — North Indian, comfortable in Hindi and English.
            </p>
            <p className="chip-text text-text-secondary">
              CHIP TEXT · 5&apos;8&quot; · 22-28 · HINDI · ENGLISH
            </p>
          </div>
        </Block>

        <Block label="Divider">
          <Divider />
        </Block>

        <Block label="Buttons (tone: cream-on-dark)">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" tone="cream">
              Send Profile
            </Button>
            <Button variant="ghost" tone="cream">
              Preview
            </Button>
            <Button variant="link" tone="cream">
              See full profile
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="primary" tone="cream" size="sm">
              Small
            </Button>
            <Button variant="primary" tone="cream" size="md">
              Medium
            </Button>
            <Button variant="primary" tone="cream" size="lg">
              Large
            </Button>
          </div>
        </Block>

        <Block label="Chips">
          <div className="flex flex-wrap gap-2">
            <Chip tone="cream">22-28</Chip>
            <Chip tone="cream">5&apos;8&quot;</Chip>
            <Chip tone="cream">HINDI</Chip>
            <Chip tone="cream">ENGLISH</Chip>
            <Chip tone="cream">MUMBAI</Chip>
          </div>
        </Block>

        <Block label="Wordmark">
          <div className="flex flex-wrap items-baseline gap-8">
            <Wordmark size="sm" />
            <Wordmark size="md" />
            <Wordmark size="lg" />
          </div>
        </Block>
      </section>

      {/* =============== Cream section =============== */}
      <section className="bg-slate-cream px-6 py-16 text-text-on-light md:px-12 md:py-24">
        <SectionHeader tone="dark">On cream</SectionHeader>

        <Block label="Typography" tone="dark">
          <div className="space-y-6">
            <p className="display-l text-text-on-light">Display L</p>
            <p className="display-m text-text-on-light">Display M</p>
            <p className="display-s text-text-on-light">Display S</p>
            <p className="body-l text-text-on-light">
              Body L — Mumbai-based actor with six years on stage and screen.
            </p>
            <p className="body-m text-text-on-light/80">
              Body M — Faces you have seen in Honda, Cipla, Zepto, Nilkamal, and Smotect
              commercials.
            </p>
            <p className="body-s text-text-on-light/60">
              Body S — North Indian, comfortable in Hindi and English.
            </p>
            <p className="chip-text text-text-on-light/70">
              CHIP TEXT · 5&apos;8&quot; · 22-28 · HINDI · ENGLISH
            </p>
          </div>
        </Block>

        <Block label="Divider" tone="dark">
          <Divider />
        </Block>

        <Block label="Buttons (tone: dark-on-cream)" tone="dark">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" tone="dark">
              Send Profile
            </Button>
            <Button variant="ghost" tone="dark">
              Preview
            </Button>
            <Button variant="link" tone="dark">
              See full profile
            </Button>
          </div>
        </Block>

        <Block label="Chips" tone="dark">
          <div className="flex flex-wrap gap-2">
            <Chip tone="dark">22-28</Chip>
            <Chip tone="dark">5&apos;8&quot;</Chip>
            <Chip tone="dark">HINDI</Chip>
            <Chip tone="dark">ENGLISH</Chip>
            <Chip tone="dark">MUMBAI</Chip>
          </div>
        </Block>

        <Block label="Wordmark" tone="dark">
          <div className="flex flex-wrap items-baseline gap-8">
            <Wordmark size="sm" tone="dark" />
            <Wordmark size="md" tone="dark" />
            <Wordmark size="lg" tone="dark" />
          </div>
        </Block>
      </section>

      {/* =============== Color swatches =============== */}
      <section className="bg-slate-bg px-6 py-16 md:px-12 md:py-24">
        <SectionHeader tone="cream">Color tokens</SectionHeader>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {SWATCHES.map((s) => (
            <div
              key={s.name}
              className="rounded-lg border border-border-dark p-4"
              style={{ backgroundColor: s.value, color: s.on === "cream" ? "#F5EFE3" : "#1A1916" }}
            >
              <p className="chip-text">{s.name}</p>
              <p className="body-s mt-1 font-mono">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =============== Footer =============== */}
      <footer className="border-t border-border-dark bg-slate-bg px-6 py-12 md:px-12">
        <p className="body-s text-text-tertiary">
          DESIGN.md is the source of truth. If you see drift here, update DESIGN.md first, then{" "}
          <code className="font-mono">app/globals.css</code> to match.
        </p>
      </footer>
    </div>
  );
}

function SectionHeader({
  children,
  tone = "cream",
}: {
  children: React.ReactNode;
  tone?: "cream" | "dark";
}) {
  const color = tone === "cream" ? "text-text-primary" : "text-text-on-light";
  return (
    <h2 className={`display-m mb-12 ${color}`}>
      {children}
    </h2>
  );
}

function Block({
  label,
  tone = "cream",
  children,
}: {
  label: string;
  tone?: "cream" | "dark";
  children: React.ReactNode;
}) {
  const labelColor = tone === "cream" ? "text-text-tertiary" : "text-text-on-light/50";
  return (
    <div className="mb-16">
      <p className={`chip-text mb-6 ${labelColor}`}>{label}</p>
      {children}
    </div>
  );
}
