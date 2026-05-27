import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getTalentBySlug } from "@/lib/talent";
import { getBaseUrl } from "@/lib/env";

// Per-profile OG image, regenerated on each ISR revalidation. Renders at the
// edge via Satori. The hero photo loads as a fetch against the same deploy's
// /talent/<slug>/...webp path. Geist ships as woff2 alongside it.
//
// Layout (1200x630):
//   left half (600px): hero photo, object-cover, slight darken on the right edge
//   right half (600px): cream background with name, stats, URL

export const runtime = "edge";
export const alt = "Slate profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const talent = getTalentBySlug(slug);
  if (!talent) notFound();

  const baseUrl = getBaseUrl();
  const fontUrl = `${baseUrl}/fonts/Geist-Variable.woff2`;
  const heroUrl = `${baseUrl}/talent/${talent.slug}/${talent.hero.slug}-828.webp`;

  const [geistFont, heroBytes] = await Promise.all([
    fetch(fontUrl).then((r) => {
      if (!r.ok) throw new Error(`Geist fetch ${r.status}`);
      return r.arrayBuffer();
    }),
    fetch(heroUrl).then((r) => {
      if (!r.ok) throw new Error(`Hero fetch ${r.status}`);
      return r.arrayBuffer();
    }),
  ]);

  const heroDataUrl = `data:image/webp;base64,${Buffer.from(heroBytes).toString("base64")}`;

  const cream = "#F5EFE3";
  const dark = "#1A1916";
  const gold = "#C9A24B";
  const muted = "#5C564E";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: cream,
        color: dark,
        fontFamily: "Geist",
      }}
    >
      {/* Left half: hero */}
      <div
        style={{
          width: 600,
          height: 630,
          display: "flex",
          position: "relative",
        }}
      >
        <img
          src={heroDataUrl}
          width={600}
          height={630}
          alt=""
          style={{ width: 600, height: 630, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: `linear-gradient(to right, transparent, ${cream})`,
          }}
        />
      </div>

      {/* Right half: type */}
      <div
        style={{
          width: 600,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 60px 50px 30px",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: gold,
          }}
        >
          <span style={{ fontWeight: 600 }}>Slate</span>
          <span
            style={{
              display: "inline-flex",
              width: 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: gold,
            }}
          />
        </div>

        {/* Name + stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: -1.5,
            }}
          >
            {talent.name}
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: muted,
            }}
          >
            Plays {talent.plays.min}-{talent.plays.max} · {talent.city} · {talent.height.display}
          </div>
          <div
            style={{
              width: 160,
              height: 2,
              background: `linear-gradient(to right, ${gold}, transparent)`,
              marginTop: 6,
            }}
          />
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: muted,
          }}
        >
          slate.club/{talent.slug}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geistFont,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
