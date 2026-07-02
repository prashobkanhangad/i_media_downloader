import { AlertCircle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface DownloadResultErrorProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function DownloadResultError({
  message = "Something went wrong while fetching this media.",
  onRetry,
  className,
}: DownloadResultErrorProps) {
  return (
    <GlassCard
      className={cn(
        "flex flex-col items-center justify-center px-6 py-12 text-center",
        className,
      )}
      role="alert"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertCircle className="h-7 w-7 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">
        Unable to load media
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-6 rounded-2xl"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
      )}
    </GlassCard>
  );
}
