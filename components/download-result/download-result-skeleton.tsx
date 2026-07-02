import { cn } from "@/lib/utils";

interface DownloadResultSkeletonProps {
  className?: string;
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl bg-muted/60", className)}
      aria-hidden
    />
  );
}

export function DownloadResultSkeleton({
  className,
}: DownloadResultSkeletonProps) {
  return (
    <div
      className={cn("w-full space-y-5", className)}
      role="status"
      aria-label="Loading download result"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-3 w-20" />
          </div>
        </div>
        <SkeletonBlock className="h-7 w-20 rounded-full" />
      </div>

      <SkeletonBlock className="aspect-[4/5] w-full sm:aspect-video" />

      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
        <SkeletonBlock className="h-4 w-2/3" />
      </div>

      <SkeletonBlock className="h-12 w-full rounded-2xl" />
    </div>
  );
}
