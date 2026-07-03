import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { formatBlogDate } from "@/lib/blog/utils";
import type { BlogAdjacentPosts } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogPostNavigationProps {
  adjacent: BlogAdjacentPosts;
  className?: string;
}

export function BlogPostNavigation({
  adjacent,
  className,
}: BlogPostNavigationProps) {
  if (!adjacent.previous && !adjacent.next) return null;

  return (
    <nav
      aria-label="Article navigation"
      className={cn("grid gap-4 md:grid-cols-2", className)}
    >
      {adjacent.previous ? (
        <Link
          href={`/blog/${adjacent.previous.slug}`}
          className="group rounded-3xl border border-border/50 bg-background/50 p-5 transition-colors hover:border-violet-500/20 hover:bg-muted/20"
        >
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </span>
          <p className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
            {adjacent.previous.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatBlogDate(adjacent.previous.date)}
          </p>
        </Link>
      ) : (
        <div />
      )}

      {adjacent.next ? (
        <Link
          href={`/blog/${adjacent.next.slug}`}
          className="group rounded-3xl border border-border/50 bg-background/50 p-5 text-right transition-colors hover:border-violet-500/20 hover:bg-muted/20"
        >
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            Next
            <ChevronRight className="h-4 w-4" />
          </span>
          <p className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
            {adjacent.next.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatBlogDate(adjacent.next.date)}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
