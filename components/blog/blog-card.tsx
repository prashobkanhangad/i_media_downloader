"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { ReadingTime } from "@/components/blog/reading-time";
import { TagBadge } from "@/components/blog/tag-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { formatBlogDate, slugify } from "@/lib/blog/utils";
import type { BlogPostMeta } from "@/types/blog";
import { cn } from "@/lib/utils";
import { appleEase } from "@/utils/animation";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
  className?: string;
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: appleEase }}
      className={className}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <GlassCard
          hover
          className={cn(
            "flex h-full flex-col overflow-hidden p-0",
            featured && "md:flex-row",
          )}
        >
          {post.image ? (
            <div
              className={cn(
                "relative overflow-hidden bg-muted/40",
                featured ? "md:w-2/5" : "aspect-[16/9]",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ) : (
            <div
              className={cn(
                "bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-rose-500/10",
                featured ? "md:w-2/5 md:min-h-[220px]" : "aspect-[16/9]",
              )}
            />
          )}

          <div
            className={cn(
              "flex flex-1 flex-col p-5 sm:p-6",
              featured && "md:p-8",
            )}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Link
                href={`/blog/category/${slugify(post.category)}`}
                onClick={(event) => event.stopPropagation()}
                className="font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                {post.category}
              </Link>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <span aria-hidden>·</span>
              <ReadingTime
                minutes={post.readingMinutes}
                label={post.readingTime}
              />
            </div>

            <h2
              className={cn(
                "mt-3 font-semibold tracking-tight text-foreground transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400",
                featured ? "text-2xl sm:text-3xl" : "text-xl",
              )}
            >
              {post.title}
            </h2>

            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                Read
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.article>
  );
}
