"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import type {
  DownloadMediaItem,
  DownloadResultData,
} from "@/types/download-result";
import { cn } from "@/lib/utils";

interface DownloadResultActionsProps {
  data: DownloadResultData;
  activeCarouselIndex?: number;
  onDownload?: (item?: DownloadMediaItem) => void;
  downloading?: boolean;
  className?: string;
}

export function DownloadResultActions({
  data,
  activeCarouselIndex = 0,
  onDownload,
  downloading = false,
  className,
}: DownloadResultActionsProps) {
  const activeItem =
    data.mediaType === "carousel" && data.items?.length
      ? data.items[activeCarouselIndex]
      : undefined;

  const canDownload = Boolean(activeItem?.downloadUrl ?? data.downloadUrl);

  const handleDownload = () => {
    onDownload?.(activeItem);
  };

  if (data.mediaType === "carousel" && data.items && data.items.length > 1) {
    return (
      <div className={cn("flex flex-col gap-2 sm:flex-row", className)}>
        <Button
          type="button"
          onClick={handleDownload}
          disabled={!canDownload || downloading}
          className="h-12 flex-1 rounded-2xl text-base font-semibold"
        >
          <Download className="h-5 w-5" />
          {downloading
            ? "Downloading..."
            : `Download Slide ${activeCarouselIndex + 1}`}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onDownload?.()}
          disabled={downloading}
          className="h-12 rounded-2xl sm:shrink-0"
        >
          Download All
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      onClick={handleDownload}
      disabled={!canDownload || downloading}
      className={cn(
        "h-12 w-full rounded-2xl text-base font-semibold",
        className,
      )}
    >
      <Download className="h-5 w-5" />
      {downloading ? "Downloading..." : "Download"}
    </Button>
  );
}
