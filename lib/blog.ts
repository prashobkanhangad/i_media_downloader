import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

import {
  BLOG_CONTENT_DIR,
  BLOG_PAGE_SIZE,
  BLOG_POPULAR_LIMIT,
  BLOG_RECENT_LIMIT,
  BLOG_RELATED_LIMIT,
  DEFAULT_BLOG_AUTHOR,
} from "@/lib/blog/constants";
import {
  extractHeadings,
  matchesCategorySlug,
  matchesTagSlug,
  normalizeAuthor,
  paginateItems,
  slugify,
} from "@/lib/blog/utils";
import type {
  BlogAdjacentPosts,
  BlogCategory,
  BlogFrontmatter,
  BlogPaginationResult,
  BlogPost,
  BlogPostMeta,
  BlogSearchOptions,
  BlogTag,
} from "@/types/blog";

const contentDirectory = path.join(process.cwd(), BLOG_CONTENT_DIR);

function ensureContentDirectory(): void {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }
}

function getMdxFilePaths(): string[] {
  ensureContentDirectory();

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(contentDirectory, file));
}

function parseFrontmatter(data: Record<string, unknown>): BlogFrontmatter {
  const author = data.author ?? DEFAULT_BLOG_AUTHOR.name;
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];

  return {
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString()),
    updated: data.updated ? String(data.updated) : undefined,
    author: author as BlogFrontmatter["author"],
    category: String(data.category ?? "General"),
    tags,
    featured: Boolean(data.featured),
    popular: Boolean(data.popular),
    image: data.image ? String(data.image) : undefined,
    faq: Array.isArray(data.faq)
      ? data.faq.filter(
          (item): item is { question: string; answer: string } =>
            typeof item === "object" &&
            item !== null &&
            "question" in item &&
            "answer" in item,
        )
      : undefined,
    draft: Boolean(data.draft),
  };
}

function toBlogPost(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(data);

  if (frontmatter.draft) {
    return null;
  }

  const stats = readingTime(content);
  const slug = path.basename(filePath, ".mdx");

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    updated: frontmatter.updated,
    author: normalizeAuthor(frontmatter.author) ?? DEFAULT_BLOG_AUTHOR,
    category: frontmatter.category,
    tags: frontmatter.tags,
    featured: frontmatter.featured ?? false,
    popular: frontmatter.popular ?? false,
    image: frontmatter.image,
    readingTime: stats.text,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    wordCount: stats.words,
    faq: frontmatter.faq,
    content,
    headings: extractHeadings(content),
  };
}

function toMeta(post: BlogPost): BlogPostMeta {
  const {
    slug,
    title,
    description,
    date,
    updated,
    author,
    category,
    tags,
    featured,
    popular,
    image,
    readingTime,
    readingMinutes,
    wordCount,
    faq,
  } = post;

  return {
    slug,
    title,
    description,
    date,
    updated,
    author,
    category,
    tags,
    featured,
    popular,
    image,
    readingTime,
    readingMinutes,
    wordCount,
    faq,
  };
}

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function loadAllPosts(): BlogPost[] {
  return sortByDateDesc(
    getMdxFilePaths()
      .map(toBlogPost)
      .filter((post): post is BlogPost => post !== null),
  );
}

export function getAllBlogs(): BlogPostMeta[] {
  return loadAllPosts().map(toMeta);
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return toBlogPost(filePath);
}

export function getRelatedBlogs(
  slug: string,
  limit = BLOG_RELATED_LIMIT,
): BlogPostMeta[] {
  const current = getBlogBySlug(slug);
  if (!current) return [];

  const scored = loadAllPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = 0;
      if (post.category === current.category) score += 3;
      score += post.tags.filter((tag) => current.tags.includes(tag)).length;
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(({ post }) => toMeta(post));

  if (scored.length > 0) return scored;

  return getRecentBlogs(limit).filter((post) => post.slug !== slug);
}

export function getRecentBlogs(limit = BLOG_RECENT_LIMIT): BlogPostMeta[] {
  return loadAllPosts().slice(0, limit).map(toMeta);
}

export function getPopularBlogs(limit = BLOG_POPULAR_LIMIT): BlogPostMeta[] {
  const posts = loadAllPosts();
  const popular = posts.filter((post) => post.popular);

  if (popular.length >= limit) {
    return popular.slice(0, limit).map(toMeta);
  }

  const remaining = posts
    .filter((post) => !post.popular)
    .slice(0, limit - popular.length);

  return [...popular, ...remaining].map(toMeta);
}

export function getFeaturedBlogs(): BlogPostMeta[] {
  return loadAllPosts()
    .filter((post) => post.featured)
    .map(toMeta);
}

export function getCategories(): BlogCategory[] {
  const counts = new Map<string, number>();

  for (const post of loadAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getTags(): BlogTag[] {
  const counts = new Map<string, number>();

  for (const post of loadAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getCategoryBySlug(slug: string): BlogCategory | null {
  return getCategories().find((category) => category.slug === slug) ?? null;
}

export function getTagBySlug(slug: string): BlogTag | null {
  return getTags().find((tag) => tag.slug === slug) ?? null;
}

export function getBlogsByCategory(categorySlug: string): BlogPostMeta[] {
  return loadAllPosts()
    .filter((post) => matchesCategorySlug(post.category, categorySlug))
    .map(toMeta);
}

export function getBlogsByTag(tagSlug: string): BlogPostMeta[] {
  return loadAllPosts()
    .filter((post) => post.tags.some((tag) => matchesTagSlug(tag, tagSlug)))
    .map(toMeta);
}

export function searchBlogs({
  query,
  page = 1,
  pageSize = BLOG_PAGE_SIZE,
}: BlogSearchOptions): BlogPaginationResult<BlogPostMeta> {
  const normalized = query.trim().toLowerCase();

  const results = !normalized
    ? loadAllPosts().map(toMeta)
    : loadAllPosts()
        .filter((post) => {
          const haystack = [
            post.title,
            post.description,
            post.category,
            post.author.name,
            ...post.tags,
            post.content,
          ]
            .join(" ")
            .toLowerCase();

          return haystack.includes(normalized);
        })
        .map(toMeta);

  return paginateItems(results, page, pageSize);
}

export function paginateBlogs(
  posts: BlogPostMeta[],
  page = 1,
  pageSize = BLOG_PAGE_SIZE,
): BlogPaginationResult<BlogPostMeta> {
  return paginateItems(posts, page, pageSize);
}

export function getAdjacentBlogs(slug: string): BlogAdjacentPosts {
  const posts = loadAllPosts().map(toMeta);
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export function getAllBlogSlugs(): string[] {
  return loadAllPosts().map((post) => post.slug);
}

export function getAllCategorySlugs(): string[] {
  return getCategories().map((category) => category.slug);
}

export function getAllTagSlugs(): string[] {
  return getTags().map((tag) => tag.slug);
}
