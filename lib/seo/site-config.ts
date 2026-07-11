function normalizeBaseUrl(url: string): string {
  return url.replace(/\/$/, "");
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) {
    return normalizeBaseUrl(explicit);
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) {
    const host = vercelProduction.replace(/^https?:\/\//, "");
    return normalizeBaseUrl(`https://${host}`);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const host = vercelUrl.replace(/^https?:\/\//, "");
    return normalizeBaseUrl(`https://${host}`);
  }

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[seo] NEXT_PUBLIC_APP_URL is not set. Sitemap and canonical URLs may be invalid. Set it to your production domain (e.g. https://example.com).",
    );
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Instagram Video Downloader",
  shortName: "IG Downloader",
  description:
    "Download Instagram videos, reels, photos, and stories in HD quality. Free, fast, and no login required.",
  url: resolveSiteUrl(),
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
