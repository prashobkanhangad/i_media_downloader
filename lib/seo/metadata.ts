import type { Metadata, Viewport } from "next";

import { getOgImageUrl, getSiteUrl, siteConfig } from "@/lib/seo/site-config";
import { getSeoPage, type SeoPageKey } from "@/lib/seo/pages";

interface CreatePageMetadataOptions {
  path?: string;
  noIndex?: boolean;
}

export function createPageMetadata(
  pageKey: SeoPageKey,
  overrides?: Partial<Metadata>,
  options?: CreatePageMetadataOptions,
): Metadata {
  const page = getSeoPage(pageKey);
  const path = options?.path ?? page.path;
  const canonicalUrl = getSiteUrl(path);
  const ogImageUrl = getOgImageUrl();

  return {
    metadataBase: new URL(siteConfig.url),
    title: page.title,
    description: page.description,
    keywords: [...page.keywords, ...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      title: page.title,
      description: page.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: siteConfig.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImageUrl],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: options?.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    ...overrides,
  };
}

export function createRootMetadata(): Metadata {
  const home = getSeoPage("home");

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: home.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.shortName,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

/** @deprecated Use createPageMetadata or createRootMetadata */
export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  return { ...createRootMetadata(), ...overrides };
}

export { siteConfig, getSiteUrl, getOgImageUrl };
