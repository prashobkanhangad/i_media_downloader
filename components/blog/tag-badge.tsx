import Link from "next/link";

import { slugify } from "@/lib/blog/utils";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <Link
      href={`/blog/tag/${slugify(tag)}`}
      className={cn(
        "inline-flex rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-violet-500/30 hover:text-foreground",
        className,
      )}
    >
      #{tag}
    </Link>
  );
}
