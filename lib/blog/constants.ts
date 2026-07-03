import type { BlogAuthor } from "@/types/blog";

export const BLOG_CONTENT_DIR = "content/blog";
export const BLOG_PAGE_SIZE = 9;
export const BLOG_RECENT_LIMIT = 5;
export const BLOG_RELATED_LIMIT = 3;
export const BLOG_POPULAR_LIMIT = 4;

export const DEFAULT_BLOG_AUTHOR: BlogAuthor = {
  name: "IG Downloader Team",
  bio: "Tips and guides for saving Instagram reels, videos, photos, and stories.",
  website: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};
