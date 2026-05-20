import type { Talent } from "@/types/talent";

// Confirmed source data: docs/ASHISH_PROFILE_DATA.md (Ashish, 2026-05-20).
// Real age 32 stays out of code entirely (per CLAUDE.md engineering principle
// #9). Plays range is derived from screen age 25 plus/minus 3.

export const ASHISH: Talent = {
  slug: "ashish",
  name: "Ashish Rawat",
  city: "Mumbai",
  tagline: "A working ad-film actor. Honda. Cipla. Zepto.",
  plays: { min: 22, max: 28 },
  height: { cm: 173, display: "5'8\"" },
  languages: ["Hindi", "English"],
  accent: "North Indian",
  training: "6+ years stage and screen",
  hairColor: "Black",
  bio: "Mumbai-based actor with six years on stage and screen. Faces you've seen in Honda, Cipla, Zepto, Nilkamal, and Smotect commercials. North Indian roots, comfortable in Hindi and English, open to OTT, theatre, and longer formats.",

  hero: {
    slug: "02-headshot-blazer",
    alt: "Ashish Rawat headshot in a warm brown blazer against a brown backdrop, eye contact, slight smile.",
    width: 853,
    height: 1067,
  },

  gallery: [
    {
      slug: "01-fullbody-white-shirt",
      alt: "Ashish Rawat in a full-body shot, white shirt, neutral studio backdrop.",
      width: 1000,
      height: 1500,
    },
    {
      slug: "03-outdoor-denim",
      alt: "Ashish Rawat outdoors in a denim jacket, looser commercial energy.",
      width: 960,
      height: 1280,
    },
    {
      slug: "04-seated-mint-shirt",
      alt: "Ashish Rawat seated with a cup of chai, mint shirt, range shot.",
      width: 1067,
      height: 1600,
    },
  ],

  credits: [
    {
      id: "honda-tvc",
      brand: "Honda",
      medium: "TVC",
      year: 2025,
      urls: ["https://www.instagram.com/reel/DXGdDOHjA6_/"],
    },
    {
      id: "cipla-tvc",
      brand: "Cipla",
      medium: "TVC",
      year: 2025,
      urls: ["https://www.instagram.com/p/DLPad3QK2s1/"],
    },
    {
      id: "zepto-tvc",
      brand: "Zepto",
      medium: "TVC",
      year: 2025,
      urls: ["https://www.facebook.com/share/v/1AYq8JJYEJ/"],
    },
    {
      id: "nilkamal-digital",
      brand: "Nilkamal Furniture",
      medium: "Digital",
      year: 2025,
      urls: ["https://youtu.be/tnVDz4HvhbE"],
    },
    {
      id: "smotect-digital",
      brand: "Smotect",
      medium: "Digital",
      year: 2025,
      urls: ["https://www.instagram.com/reel/DMaZV5ht1Am/"],
    },
    {
      id: "rings-and-i-digital",
      brand: "Rings & I",
      medium: "Digital",
      year: 2025,
      urls: [
        "https://www.facebook.com/share/r/1HtfW5h7CB/",
        "https://www.facebook.com/share/r/1EEdLQR3ZB/",
      ],
    },
  ],

  contact: {
    phone: "+917906231949",
    instagramUrl: "https://www.instagram.com/ashish.rawat138",
    instagramHandle: "ashish.rawat138",
  },
};
