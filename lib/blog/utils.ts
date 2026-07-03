import type { BlogAuthor, BlogHeading } from "@/types/blog";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function normalizeAuthor(author: BlogAuthor | string): BlogAuthor {
  if (typeof author === "string") {
    return { name: author };
  }
  return author;
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function extractHeadings(content: string): BlogHeading[] {
  const headings: BlogHeading[] = [];

  for (const line of content.split("\n")) {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    if (level < 2 || level > 4) continue;

    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    headings.push({
      id: slugify(text),
      text,
      level: level as 2 | 3 | 4,
    });
  }

  return headings;
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number,
): {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
} {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
  };
}

export function matchesCategorySlug(category: string, slug: string): boolean {
  return slugify(category) === slug;
}

export function matchesTagSlug(tag: string, slug: string): boolean {
  return slugify(tag) === slug;
}
