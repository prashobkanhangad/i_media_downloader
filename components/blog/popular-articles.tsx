import Link from "next/link";
import { TrendingUp } from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPostMeta } from "@/types/blog";

interface PopularArticlesProps {
  posts: BlogPostMeta[];
}

export function PopularArticles({ posts }: PopularArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section aria-label="Popular articles" className="mb-10">
      <div className="mb-5 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-violet-500" />
        <h2 className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Popular
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-4 sm:hidden">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View all articles
        </Link>
      </div>
    </section>
  );
}
