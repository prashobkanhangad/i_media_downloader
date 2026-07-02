export const siteConfig = {
  name: "Instagram Video Downloader",
  shortName: "IG Downloader",
  description:
    "Download Instagram videos, reels, photos, and stories in HD quality. Free, fast, and no login required.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  locale: "en_US",
  language: "en",
  twitterHandle: "@igdownloader",
  email: "support@example.com",
  ogImage: {
    width: 1200,
    height: 630,
    alt: "Instagram Video Downloader — Free HD Downloads",
  },
  keywords: [
    "instagram video downloader",
    "instagram reel downloader",
    "download instagram videos",
    "instagram story downloader",
    "instagram photo downloader",
    "save instagram reels",
  ],
} as const;

export function getSiteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getOgImageUrl(): string {
  return getSiteUrl("/opengraph-image");
}
