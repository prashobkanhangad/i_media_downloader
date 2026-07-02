"use client";

import { DownloadResultContent } from "@/components/download-result/download-result-content";
import { DownloadResultEmpty } from "@/components/download-result/download-result-empty";
import { DownloadResultError } from "@/components/download-result/download-result-error";
import { DownloadResultSkeleton } from "@/components/download-result/download-result-skeleton";
import type {
  DownloadMediaItem,
  DownloadResultData,
  DownloadResultState,
} from "@/types/download-result";
import { cn } from "@/lib/utils";

export interface DownloadResultProps {
  state?: DownloadResultState;
  data?: DownloadResultData | null;
  error?: string;
  downloading?: boolean;
  onDownload?: (item?: DownloadMediaItem) => void;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function DownloadResult({
  state = "empty",
  data,
  error,
  downloading = false,
  onDownload,
  onRetry,
  emptyTitle,
  emptyDescription,
  className,
}: DownloadResultProps) {
  return (
    <div className={cn("w-full", className)}>
      {state === "loading" && <DownloadResultSkeleton />}

      {state === "error" && (
        <DownloadResultError message={error} onRetry={onRetry} />
      )}

      {state === "empty" && (
        <DownloadResultEmpty
          title={emptyTitle}
          description={emptyDescription}
        />
      )}

      {state === "success" && data && (
        <DownloadResultContent
          data={data}
          onDownload={onDownload}
          downloading={downloading}
        />
      )}

      {state === "idle" && (
        <DownloadResultEmpty
          title={emptyTitle ?? "Ready when you are"}
          description={
            emptyDescription ??
            "Enter an Instagram link to see a preview and download options."
          }
        />
      )}
    </div>
  );
}

export { DownloadResultContent } from "@/components/download-result/download-result-content";
export { DownloadResultEmpty } from "@/components/download-result/download-result-empty";
export { DownloadResultError } from "@/components/download-result/download-result-error";
export { DownloadResultSkeleton } from "@/components/download-result/download-result-skeleton";
export { MediaTypeBadge } from "@/components/download-result/media-type-badge";
