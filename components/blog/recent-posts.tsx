import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatBlogDate } from "@/lib/blog/utils";
import type { BlogPostMeta } from "@/types/blog";
import { cn } from "@/lib/utils";

interface RecentPostsProps {
  posts: BlogPostMeta[];
  title?: string;
  className?: string;
}

export function RecentPosts({
  posts,
  title = "Recent Articles",
  className,
}: RecentPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={cn("space-y-4", className)} aria-label={title}>
      <h3 className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
        {title}
      </h3>
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-border/50 bg-background/50 p-4 transition-colors hover:border-violet-500/20 hover:bg-muted/30"
          >
            <p className="font-medium tracking-tight transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
              {post.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatBlogDate(post.date)} · {post.readingTime}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface RelatedPostsProps {
  posts: BlogPostMeta[];
  className?: string;
}

export function RelatedPosts({ posts, className }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section
      className={cn("space-y-5", className)}
      aria-label="Related articles"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Related Articles
        </h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-3xl border border-border/50 bg-background/50 p-5 transition-all hover:border-violet-500/20 hover:bg-muted/20"
          >
            <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
              {post.category}
            </p>
            <h3 className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
