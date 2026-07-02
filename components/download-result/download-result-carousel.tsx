"use client";

import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { DownloadMediaItem } from "@/types/download-result";
import { cn } from "@/lib/utils";

interface DownloadResultCarouselProps {
  items: DownloadMediaItem[];
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
}

export function DownloadResultCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveIndexChange,
  className,
}: DownloadResultCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;

  const setActiveIndex = (index: number) => {
    if (controlledIndex === undefined) setInternalIndex(index);
    onActiveIndexChange?.(index);
  };

  const goPrev = () => {
    setActiveIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
  };

  const goNext = () => {
    setActiveIndex(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
  };

  const activeItem = items[activeIndex];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/5 dark:border-white/10 dark:bg-black/20">
        <CarouselSlide item={activeItem} />

        {items.length > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute top-1/2 left-2 h-9 w-9 -translate-y-1/2 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={goNext}
              aria-label="Next slide"
              className="absolute top-1/2 right-2 h-9 w-9 -translate-y-1/2 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === activeIndex
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/50",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
                index === activeIndex
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              {item.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.thumbnailUrl}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <ImageOff className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CarouselSlide({ item }: { item: DownloadMediaItem }) {
  if (item.type === "video" && item.previewUrl) {
    return (
      <video
        key={item.id}
        src={item.previewUrl}
        poster={item.thumbnailUrl ?? undefined}
        controls
        playsInline
        className="aspect-square w-full bg-black object-contain sm:aspect-video"
      />
    );
  }

  if (item.previewUrl || item.thumbnailUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={item.id}
        src={item.previewUrl ?? item.thumbnailUrl ?? ""}
        alt="Carousel preview"
        className="aspect-square w-full object-cover sm:aspect-video"
      />
    );
  }

  return (
    <div className="flex aspect-square w-full items-center justify-center bg-muted sm:aspect-video">
      <ImageOff className="h-10 w-10 text-muted-foreground" />
    </div>
  );
}
