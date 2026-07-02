import type { SeoPageKey } from "@/lib/seo/pages";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Instagram Video Downloader",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/opengraph-image`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@example.com",
    },
  };
}

export function getWebSiteJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Instagram Video Downloader",
    url: siteUrl,
    description:
      "Download Instagram videos, reels, photos, and stories in HD quality.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?url={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getWebApplicationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Instagram Video Downloader",
    url: siteUrl,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online tool to download Instagram reels, videos, photos, and stories.",
  };
}

export function getWebPageJsonLd(
  pageKey: SeoPageKey,
  title: string,
  description: string,
  path: string,
) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteUrl}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Instagram Video Downloader",
      url: siteUrl,
    },
    about: {
      "@type": "Thing",
      name: pageKey === "home" ? "Instagram Downloader" : title,
    },
  };
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function getFaqPageJsonLd(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    url: `${siteUrl}/faq`,
  };
}

export function getBlogJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Instagram Downloader Blog",
    description:
      "Tips, guides, and updates about downloading Instagram content.",
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Instagram Video Downloader",
    },
  };
}

export function getBlogPostingJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    url: `${siteUrl}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "Instagram Video Downloader",
    },
    publisher: {
      "@type": "Organization",
      name: "Instagram Video Downloader",
    },
  };
}
