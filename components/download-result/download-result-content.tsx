"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { DownloadResultActions } from "@/components/download-result/download-result-actions";
import { DownloadResultMeta } from "@/components/download-result/download-result-meta";
import { DownloadResultPreview } from "@/components/download-result/download-result-preview";
import { GlassCard } from "@/components/ui/glass-card";
import type {
  DownloadMediaItem,
  DownloadResultData,
} from "@/types/download-result";
import { cn } from "@/lib/utils";
import { appleEase } from "@/utils/animation";

interface DownloadResultContentProps {
  data: DownloadResultData;
  onDownload?: (item?: DownloadMediaItem) => void;
  downloading?: boolean;
  className?: string;
}

export function DownloadResultContent({
  data,
  onDownload,
  downloading = false,
  className,
}: DownloadResultContentProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: appleEase }}
      className={cn("w-full", className)}
    >
      <GlassCard className="space-y-5 p-4 sm:p-6">
        <DownloadResultMeta data={data} />

        <DownloadResultPreview
          data={data}
          activeCarouselIndex={carouselIndex}
          onCarouselIndexChange={setCarouselIndex}
        />

        <DownloadResultActions
          data={data}
          activeCarouselIndex={carouselIndex}
          onDownload={onDownload}
          downloading={downloading}
        />
      </GlassCard>
    </motion.div>
  );
}
