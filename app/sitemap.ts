import type { MetadataRoute } from "next";

import { getAllBlogs, getAllCategorySlugs, getAllTagSlugs } from "@/lib/blog";
import { sitemapPages } from "@/lib/seo/pages";
import { getSiteUrl } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = sitemapPages.map((page) => ({
    url: getSiteUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogPostPages = getAllBlogs().map((post) => ({
    url: getSiteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages = getAllCategorySlugs().map((slug) => ({
    url: getSiteUrl(`/blog/category/${slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }));

  const tagPages = getAllTagSlugs().map((slug) => ({
    url: getSiteUrl(`/blog/tag/${slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogPostPages, ...categoryPages, ...tagPages];
}
