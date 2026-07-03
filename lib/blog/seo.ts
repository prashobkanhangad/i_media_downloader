import type { Metadata } from "next";

import type { BlogPost, BlogPostMeta } from "@/types/blog";
import { getOgImageUrl, getSiteUrl, siteConfig } from "@/lib/seo/site-config";

export function createBlogListingMetadata(
  overrides?: Partial<Metadata>,
): Metadata {
  const canonicalUrl = getSiteUrl("/blog");

  return {
    title: "Blog — Instagram Download Tips & Guides",
    description:
      "Read guides and tips on downloading Instagram reels, videos, photos, and stories.",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: "Blog — Instagram Download Tips & Guides",
      description:
        "Read guides and tips on downloading Instagram reels, videos, photos, and stories.",
      siteName: siteConfig.name,
      images: [{ url: getOgImageUrl(), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog — Instagram Download Tips & Guides",
      description:
        "Read guides and tips on downloading Instagram reels, videos, photos, and stories.",
      images: [getOgImageUrl()],
    },
    ...overrides,
  };
}

export function createBlogPostMetadata(
  post: BlogPost | BlogPostMeta,
): Metadata {
  const canonicalUrl = getSiteUrl(`/blog/${post.slug}`);
  const image = post.image ? getSiteUrl(post.image) : getOgImageUrl();

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags, post.category, ...siteConfig.keywords],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description: post.description,
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export function createCategoryMetadata(
  category: string,
  slug: string,
): Metadata {
  const canonicalUrl = getSiteUrl(`/blog/category/${slug}`);

  return {
    title: `${category} Articles`,
    description: `Browse ${category} articles about Instagram downloads, tips, and guides.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${category} Articles | ${siteConfig.name}`,
      description: `Browse ${category} articles about Instagram downloads.`,
    },
    twitter: {
      card: "summary",
      title: `${category} Articles`,
      description: `Browse ${category} articles about Instagram downloads.`,
    },
  };
}

export function createTagMetadata(tag: string, slug: string): Metadata {
  const canonicalUrl = getSiteUrl(`/blog/tag/${slug}`);

  return {
    title: `#${tag} Articles`,
    description: `Articles tagged with ${tag} on the ${siteConfig.name} blog.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `#${tag} Articles | ${siteConfig.name}`,
      description: `Articles tagged with ${tag}.`,
    },
    twitter: {
      card: "summary",
      title: `#${tag} Articles`,
      description: `Articles tagged with ${tag}.`,
    },
  };
}

export function buildRssFeed(posts: BlogPostMeta[]): string {
  const siteUrl = getSiteUrl();
  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${getSiteUrl(`/blog/${post.slug}`)}</link>
      <guid>${getSiteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${siteUrl}/blog</link>
    <description>${siteConfig.description}</description>
    <language>${siteConfig.language}</language>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
