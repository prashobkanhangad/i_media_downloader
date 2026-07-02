import { GlassCard } from "@/components/ui/glass-card";
import { SkeletonLoader } from "@/components/loading/skeleton-loader";
import { cn } from "@/lib/utils";

interface CardLoadingProps {
  className?: string;
  lines?: number;
  showMedia?: boolean;
}

export function CardLoading({
  className,
  lines = 3,
  showMedia = true,
}: CardLoadingProps) {
  return (
    <GlassCard className={cn("p-6", className)}>
      <SkeletonLoader
        variant="media"
        lines={lines}
        showAvatar
        showMedia={showMedia}
      />
    </GlassCard>
  );
}
