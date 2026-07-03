/**
 * @deprecated Use `@/lib/blog` instead.
 */
import { getAllBlogs, getBlogBySlug } from "@/lib/blog";

export const blogPosts = getAllBlogs();
export const getBlogPost = getBlogBySlug;

export type { BlogPostMeta as BlogPost } from "@/types/blog";
