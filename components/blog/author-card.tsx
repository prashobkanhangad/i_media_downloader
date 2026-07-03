import Link from "next/link";

import type { BlogAuthor } from "@/types/blog";
import { cn } from "@/lib/utils";

interface AuthorCardProps {
  author: BlogAuthor;
  className?: string;
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-3xl border border-white/20 bg-white/40 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]",
        className,
      )}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-semibold text-white">
        {author.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={author.avatar}
            alt={author.name}
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          author.name.charAt(0).toUpperCase()
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">Written by</p>
        <p className="mt-1 text-lg font-semibold tracking-tight">
          {author.name}
        </p>
        {author.bio ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {author.bio}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          {author.website ? (
            <Link
              href={author.website}
              className="font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </Link>
          ) : null}
          {author.twitter ? (
            <Link
              href={author.twitter}
              className="font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
