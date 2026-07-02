import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/seo/blog-posts";
import { sitemapPages } from "@/lib/seo/pages";
import { getSiteUrl } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = sitemapPages.map((page) => ({
    url: getSiteUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogPostPages = blogPosts.map((post) => ({
    url: getSiteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPostPages];
}
