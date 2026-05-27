import type { Metadata } from "next";
import localFont from "next/font/local";
import { getBaseUrl } from "@/lib/env";
import "./globals.css";

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

// Noto Sans Devanagari (Devanagari subset for accent phrases).
const devanagari = localFont({
  src: "../public/fonts/NotoSansDevanagari.woff2",
  variable: "--font-noto-sans-devanagari",
  display: "swap",
  weight: "400 700",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Slate - the actors' club of Mumbai",
    template: "%s - Slate",
  },
  description:
    "Build a profile that looks like a film poster. Send it like a pro. Grow with others doing the same.",
  metadataBase: new URL(getBaseUrl()),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${jetbrainsMono.variable} ${devanagari.variable}`}
    >
      <body className="min-h-svh bg-slate-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
