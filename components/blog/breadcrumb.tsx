import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import type { BreadcrumbItem } from "@/components/seo/breadcrumbs";
import { cn } from "@/lib/utils";

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BlogBreadcrumb({ items, className }: BlogBreadcrumbProps) {
  return <Breadcrumbs items={items} className={cn("mb-8", className)} />;
}

export type { BreadcrumbItem };
