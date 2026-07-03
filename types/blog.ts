export interface BlogAuthor {
  name: string;
  bio?: string;
  avatar?: string;
  twitter?: string;
  website?: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: BlogAuthor | string;
  category: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  image?: string;
  faq?: BlogFaqItem[];
  draft?: boolean;
}

export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  featured: boolean;
  popular: boolean;
  image?: string;
  readingTime: string;
  readingMinutes: number;
  wordCount: number;
  faq?: BlogFaqItem[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  headings: BlogHeading[];
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  count: number;
}

export interface BlogPaginationResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface BlogAdjacentPosts {
  previous: BlogPostMeta | null;
  next: BlogPostMeta | null;
}

export interface BlogSearchOptions {
  query: string;
  page?: number;
  pageSize?: number;
}
