// Platform detection + thumbnail helpers for the credit cards.
//
// Decided in M1: we do NOT embed Instagram/Facebook iframes. Their embed APIs
// break on mobile, look inconsistent with our design, and are a moving target.
// Every credit becomes a tap-target card that opens the original URL in a new
// tab. YouTube credits get a real thumbnail (i.ytimg.com — stable Google CDN).
// Non-YouTube credits get a branded fallback card rendered in React (see
// components/profile/BrandedFallbackCard.tsx).

export type EmbedKind =
  | "youtube"
  | "instagram_reel"
  | "instagram_post"
  | "facebook_video"
  | "facebook_reel"
  | "unknown";

const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"]);
const INSTAGRAM_HOSTS = new Set(["instagram.com", "www.instagram.com"]);
const FACEBOOK_HOSTS = new Set(["facebook.com", "www.facebook.com", "fb.watch"]);

function safeUrl(input: string): URL | null {
  try {
    return new URL(input);
  } catch {
    return null;
  }
}

export function detectEmbedKind(url: string): EmbedKind {
  const u = safeUrl(url);
  if (!u) return "unknown";
  const host = u.hostname.toLowerCase();

  if (YOUTUBE_HOSTS.has(host)) return "youtube";

  if (INSTAGRAM_HOSTS.has(host)) {
    const seg = u.pathname.split("/").filter(Boolean);
    // /reel/<id>, /reels/<id>, /p/<id>, /tv/<id>
    if (seg[0] === "reel" || seg[0] === "reels") return "instagram_reel";
    if (seg[0] === "p" || seg[0] === "tv") return "instagram_post";
    return "instagram_post";
  }

  if (FACEBOOK_HOSTS.has(host)) {
    const seg = u.pathname.split("/").filter(Boolean);
    // /share/v/<id> — video; /share/r/<id> — reel; /watch/?v=<id> — video
    if (seg[0] === "share" && seg[1] === "v") return "facebook_video";
    if (seg[0] === "share" && seg[1] === "r") return "facebook_reel";
    if (seg[0] === "watch") return "facebook_video";
    if (seg[0] === "reel" || seg[0] === "reels") return "facebook_reel";
    return "facebook_video";
  }

  return "unknown";
}

// Returns the YouTube video id for any youtu.be, youtube.com/watch?v=, or
// youtube.com/shorts/<id> URL. null if the URL doesn't look like YouTube.
export function getYouTubeId(url: string): string | null {
  const u = safeUrl(url);
  if (!u) return null;
  const host = u.hostname.toLowerCase();
  if (!YOUTUBE_HOSTS.has(host)) return null;

  // youtu.be/<id>
  if (host === "youtu.be") {
    const id = u.pathname.slice(1).split("/")[0];
    return id || null;
  }

  // youtube.com/watch?v=<id>
  const vParam = u.searchParams.get("v");
  if (vParam) return vParam;

  // youtube.com/shorts/<id>, /embed/<id>, /live/<id>
  const seg = u.pathname.split("/").filter(Boolean);
  if (seg[0] === "shorts" || seg[0] === "embed" || seg[0] === "live") {
    return seg[1] ?? null;
  }

  return null;
}

export type YouTubeThumbnailQuality = "max" | "hq" | "mq" | "default";

// Stable Google CDN. `maxresdefault` is the high-quality variant but not every
// video has it; if it 404s the browser silently falls back to display, which
// is fine for our usage (we have a branded fallback as the backstop anyway).
export function getYouTubeThumbnail(id: string, quality: YouTubeThumbnailQuality = "max"): string {
  const variant =
    quality === "max"
      ? "maxresdefault"
      : quality === "hq"
        ? "hqdefault"
        : quality === "mq"
          ? "mqdefault"
          : "default";
  return `https://i.ytimg.com/vi/${id}/${variant}.jpg`;
}

// Helper: given any credit URL, return the kind plus an optional precomputed
// thumbnail URL for the cases where we have one without further work.
export interface EmbedInfo {
  kind: EmbedKind;
  youtubeId: string | null;
  thumbnailUrl: string | null;
}

export function getEmbedInfo(url: string): EmbedInfo {
  const kind = detectEmbedKind(url);
  if (kind === "youtube") {
    const id = getYouTubeId(url);
    return {
      kind,
      youtubeId: id,
      thumbnailUrl: id ? getYouTubeThumbnail(id, "max") : null,
    };
  }
  return { kind, youtubeId: null, thumbnailUrl: null };
}
