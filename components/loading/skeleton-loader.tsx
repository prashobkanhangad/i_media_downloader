import { cva, type VariantProps } from "class-variance-authority";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const skeletonLoaderVariants = cva("w-full", {
  variants: {
    variant: {
      default: "space-y-3",
      text: "space-y-2",
      media: "space-y-4",
      list: "space-y-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface SkeletonLoaderProps extends VariantProps<
  typeof skeletonLoaderVariants
> {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
  showMedia?: boolean;
}

export function SkeletonLoader({
  variant = "default",
  className,
  lines = 3,
  showAvatar = false,
  showMedia = false,
}: SkeletonLoaderProps) {
  return (
    <div
      className={cn(skeletonLoaderVariants({ variant }), className)}
      role="status"
      aria-label="Loading content"
    >
      {showAvatar && (
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      )}

      {showMedia && <Skeleton className="aspect-video w-full rounded-2xl" />}

      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-4", index === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}
