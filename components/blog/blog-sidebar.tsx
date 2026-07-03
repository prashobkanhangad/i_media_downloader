import { CategoryList } from "@/components/blog/category-card";
import { Newsletter } from "@/components/blog/newsletter";
import { RecentPosts } from "@/components/blog/recent-posts";
import { TOC } from "@/components/blog/toc";
import { GlassCard } from "@/components/ui/glass-card";
import type { BlogCategory, BlogHeading, BlogPostMeta } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogSidebarProps {
  recentPosts?: BlogPostMeta[];
  categories?: BlogCategory[];
  headings?: BlogHeading[];
  showNewsletter?: boolean;
  className?: string;
}

export function BlogSidebar({
  recentPosts = [],
  categories = [],
  headings = [],
  showNewsletter = true,
  className,
}: BlogSidebarProps) {
  return (
    <aside className={cn("space-y-6", className)}>
      {headings.length > 0 ? (
        <GlassCard className="hidden lg:block">
          <TOC headings={headings} />
        </GlassCard>
      ) : null}

      {recentPosts.length > 0 ? (
        <GlassCard>
          <RecentPosts posts={recentPosts} />
        </GlassCard>
      ) : null}

      {categories.length > 0 ? (
        <GlassCard>
          <h3 className="mb-4 text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            Categories
          </h3>
          <CategoryList categories={categories.slice(0, 6)} />
        </GlassCard>
      ) : null}

      {showNewsletter ? <Newsletter compact /> : null}
    </aside>
  );
}
