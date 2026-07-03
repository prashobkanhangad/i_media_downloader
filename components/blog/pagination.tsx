import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  basePath?: string;
  searchParams?: Record<string, string | undefined>;
  className?: string;
}

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) params.set(key, value);
    }
  }

  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function BlogPagination({
  page,
  totalPages,
  basePath = "/blog",
  searchParams,
  className,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const previousHref = buildHref(basePath, page - 1, searchParams);
  const nextHref = buildHref(basePath, page + 1, searchParams);

  return (
    <nav
      aria-label="Blog pagination"
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          asChild={page > 1}
          disabled={page <= 1}
        >
          {page > 1 ? (
            <Link href={previousHref}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          asChild={page < totalPages}
          disabled={page >= totalPages}
        >
          {page < totalPages ? (
            <Link href={nextHref}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </nav>
  );
}
