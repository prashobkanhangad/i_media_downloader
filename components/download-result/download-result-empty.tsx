import { Inbox } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface DownloadResultEmptyProps {
  title?: string;
  description?: string;
  className?: string;
}

export function DownloadResultEmpty({
  title = "No media to display",
  description = "Paste an Instagram URL above to preview and download content.",
  className,
}: DownloadResultEmptyProps) {
  return (
    <GlassCard
      className={cn(
        "flex flex-col items-center justify-center px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60">
        <Inbox className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </GlassCard>
  );
}
