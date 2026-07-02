"use client";

import { ImageOff, Play } from "lucide-react";

import { DownloadResultCarousel } from "@/components/download-result/download-result-carousel";
import type {
  DownloadMediaItem,
  DownloadMediaType,
  DownloadResultData,
} from "@/types/download-result";
import { cn } from "@/lib/utils";

interface DownloadResultPreviewProps {
  data: DownloadResultData;
  activeCarouselIndex?: number;
  onCarouselIndexChange?: (index: number) => void;
  className?: string;
}

export function DownloadResultPreview({
  data,
  activeCarouselIndex,
  onCarouselIndexChange,
  className,
}: DownloadResultPreviewProps) {
  if (data.mediaType === "carousel" && data.items?.length) {
    return (
      <DownloadResultCarousel
        items={data.items}
        activeIndex={activeCarouselIndex}
        onActiveIndexChange={onCarouselIndexChange}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/15 bg-black/5 dark:border-white/10 dark:bg-black/20",
        data.mediaType === "story" && "max-w-sm",
        className,
      )}
    >
      <SingleMediaPreview
        mediaType={data.mediaType}
        thumbnailUrl={data.thumbnailUrl}
        previewUrl={data.previewUrl}
        duration={data.duration}
      />
    </div>
  );
}

interface SingleMediaPreviewProps {
  mediaType: DownloadMediaType;
  thumbnailUrl: string | null;
  previewUrl: string | null;
  duration?: number | null;
}

function SingleMediaPreview({
  mediaType,
  thumbnailUrl,
  previewUrl,
  duration,
}: SingleMediaPreviewProps) {
  const isStory = mediaType === "story";
  const isVideo = mediaType === "video" || mediaType === "story";

  if (isVideo && previewUrl) {
    return (
      <div className="relative">
        <video
          src={previewUrl}
          poster={thumbnailUrl ?? undefined}
          controls
          playsInline
          className={cn(
            "w-full bg-black object-contain",
            isStory ? "aspect-[9/16] max-h-[32rem]" : "aspect-video",
          )}
        />
        {duration != null && (
          <span className="absolute right-3 bottom-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
            {formatDuration(duration)}
          </span>
        )}
      </div>
    );
  }

  if (thumbnailUrl || previewUrl) {
    return (
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl ?? thumbnailUrl ?? ""}
          alt="Media preview"
          className={cn(
            "w-full object-cover",
            isStory ? "aspect-[9/16] max-h-[32rem]" : "aspect-video",
          )}
        />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Play className="h-6 w-6 translate-x-0.5 text-foreground" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-muted",
        isStory ? "aspect-[9/16] max-h-[32rem]" : "aspect-video",
      )}
    >
      <ImageOff className="h-10 w-10 text-muted-foreground" />
    </div>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export type { DownloadMediaItem };
