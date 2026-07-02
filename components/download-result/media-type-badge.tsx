import {
  Clapperboard,
  Film,
  ImageIcon,
  Layers,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { DownloadMediaType } from "@/types/download-result";
import { MEDIA_TYPE_LABELS } from "@/types/download-result";
import { cn } from "@/lib/utils";

const MEDIA_TYPE_ICONS: Record<DownloadMediaType, LucideIcon> = {
  video: Film,
  photo: ImageIcon,
  carousel: Layers,
  story: Clapperboard,
};

interface MediaTypeBadgeProps {
  mediaType: DownloadMediaType;
  className?: string;
}

export function MediaTypeBadge({ mediaType, className }: MediaTypeBadgeProps) {
  const Icon = MEDIA_TYPE_ICONS[mediaType];

  return (
    <Badge variant="primary" className={cn("gap-1.5", className)}>
      <Icon className="h-3.5 w-3.5" />
      {MEDIA_TYPE_LABELS[mediaType]}
    </Badge>
  );
}
