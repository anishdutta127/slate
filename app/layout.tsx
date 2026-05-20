import type { Metadata } from "next";
import localFont from "next/font/local";
import { Grain } from "@/components/visual/Grain";
import "./globals.css";

// Fraunces variable (Latin subset, opsz + wght axes — see public/fonts/README.md)
const fraunces = localFont({
  src: "../public/fonts/Fraunces-Variable.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "400 700",
  preload: true,
});

// Geist variable (Latin subset, wght axis)
const geist = localFont({
  src: "../public/fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
  preload: true,
});

// JetBrains Mono variable (Latin subset, wght axis)
const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: "100 800",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Slate — the actors' club of Mumbai",
    template: "%s — Slate",
  },
  description:
    "Build a profile that looks like a film poster. Send it like a pro. Grow with others doing the same.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative min-h-screen bg-slate-bg text-text-primary antialiased">
        {children}
        <Grain />
      </body>
    </html>
  );
}
