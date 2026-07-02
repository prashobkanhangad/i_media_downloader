"use client";

import { User } from "lucide-react";

import { MediaTypeBadge } from "@/components/download-result/media-type-badge";
import type { DownloadResultData } from "@/types/download-result";
import { cn } from "@/lib/utils";

interface DownloadResultMetaProps {
  data: DownloadResultData;
  className?: string;
}

export function DownloadResultMeta({
  data,
  className,
}: DownloadResultMetaProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15">
            <User className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">
              {data.username ? `@${data.username}` : "Instagram User"}
            </p>
            <p className="text-xs text-muted-foreground">Username</p>
          </div>
        </div>
        <MediaTypeBadge mediaType={data.mediaType} />
      </div>

      {data.caption && (
        <div className="rounded-2xl border border-white/15 bg-white/20 p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Caption
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {data.caption}
          </p>
        </div>
      )}
    </div>
  );
}
