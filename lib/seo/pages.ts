export type SeoPageKey =
  | "home"
  | "reels"
  | "videos"
  | "photos"
  | "stories"
  | "faq"
  | "blog"
  | "privacy"
  | "terms"
  | "dmca";

export interface SeoPageConfig {
  key: SeoPageKey;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  changeFrequency:
    "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export const seoPages: Record<SeoPageKey, SeoPageConfig> = {
  home: {
    key: "home",
    path: "/",
    title: "Instagram Video Downloader — Free HD Reels & Stories",
    description:
      "Download Instagram videos, reels, photos, and stories in HD quality. Free online tool — no login, no watermark, works on all devices.",
    keywords: [
      "instagram video downloader",
      "instagram reel downloader",
      "download instagram videos",
      "instagram story downloader",
      "free instagram downloader",
    ],
    changeFrequency: "daily",
    priority: 1,
  },
  reels: {
    key: "reels",
    path: "/reels",
    title: "Instagram Reels Downloader — Save Reels in HD",
    description:
      "Download Instagram Reels in full HD quality for free. Paste a reel link and save videos instantly — no app or login required.",
    keywords: [
      "instagram reels downloader",
      "download instagram reels",
      "save instagram reels",
      "reel downloader hd",
    ],
    changeFrequency: "weekly",
    priority: 0.9,
  },
  videos: {
    key: "videos",
    path: "/videos",
    title: "Instagram Video Downloader — Download IG Videos Free",
    description:
      "Download Instagram videos from posts and IGTV in the highest quality. Fast, free, and works on mobile and desktop.",
    keywords: [
      "download instagram video",
      "instagram video saver",
      "igtv downloader",
      "instagram post video download",
    ],
    changeFrequency: "weekly",
    priority: 0.9,
  },
  photos: {
    key: "photos",
    path: "/photos",
    title: "Instagram Photo Downloader — Save Images in HD",
    description:
      "Download Instagram photos and images in full resolution. Free online photo saver — paste any post link to download.",
    keywords: [
      "instagram photo downloader",
      "download instagram pictures",
      "save instagram images",
      "instagram image downloader",
    ],
    changeFrequency: "weekly",
    priority: 0.85,
  },
  stories: {
    key: "stories",
    path: "/stories",
    title: "Instagram Story Downloader — Save Stories Free",
    description:
      "Download Instagram stories before they expire. Save story videos and photos from public accounts instantly.",
    keywords: [
      "instagram story downloader",
      "download instagram stories",
      "save instagram story",
      "story saver instagram",
    ],
    changeFrequency: "weekly",
    priority: 0.85,
  },
  faq: {
    key: "faq",
    path: "/faq",
    title: "FAQ — Instagram Downloader Help & Answers",
    description:
      "Frequently asked questions about our Instagram video downloader. Learn about quality, privacy, supported formats, and more.",
    keywords: [
      "instagram downloader faq",
      "how to download instagram videos",
      "instagram downloader help",
    ],
    changeFrequency: "monthly",
    priority: 0.7,
  },
  blog: {
    key: "blog",
    path: "/blog",
    title: "Blog — Instagram Download Tips & Guides",
    description:
      "Read guides and tips on downloading Instagram reels, videos, photos, and stories. Stay updated with the latest features.",
    keywords: [
      "instagram download guide",
      "instagram tips",
      "save instagram content",
    ],
    changeFrequency: "weekly",
    priority: 0.75,
  },
  privacy: {
    key: "privacy",
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "Learn how we collect, use, and protect your information when you use our Instagram downloader service.",
    keywords: [
      "privacy policy",
      "data protection",
      "instagram downloader privacy",
    ],
    changeFrequency: "yearly",
    priority: 0.5,
  },
  terms: {
    key: "terms",
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms and conditions for using our Instagram downloader, including acceptable use and limitations of liability.",
    keywords: ["terms of service", "terms and conditions", "user agreement"],
    changeFrequency: "yearly",
    priority: 0.5,
  },
  dmca: {
    key: "dmca",
    path: "/dmca",
    title: "DMCA Policy",
    description:
      "Copyright and DMCA takedown information for rights holders reporting infringing content.",
    keywords: ["dmca", "copyright policy", "takedown notice"],
    changeFrequency: "yearly",
    priority: 0.5,
  },
};

export const sitemapPages = Object.values(seoPages);

export function getSeoPage(key: SeoPageKey): SeoPageConfig {
  return seoPages[key];
}
