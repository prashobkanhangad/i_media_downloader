import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import type { BlogCategory } from "@/types/blog";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: BlogCategory;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link href={`/blog/category/${category.slug}`} className={className}>
      <GlassCard hover className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <FolderOpen className="h-4 w-4" />
          </span>
          <div>
            <p className="font-medium">{category.name}</p>
            <p className="text-sm text-muted-foreground">
              {category.count} article{category.count === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

interface CategoryListProps {
  categories: BlogCategory[];
  className?: string;
}

export function CategoryList({ categories, className }: CategoryListProps) {
  if (categories.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
