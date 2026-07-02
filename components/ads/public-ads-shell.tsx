"use client";

import { AdBanner } from "@/components/ads/ad-banner";
import { useShowAdPlacements } from "@/hooks/use-ads-enabled";
import { cn } from "@/lib/utils";

interface PublicAdsShellProps {
  position: "top" | "bottom";
  className?: string;
}

export function PublicAdsShell({ position, className }: PublicAdsShellProps) {
  const showPlacements = useShowAdPlacements();

  if (!showPlacements) {
    return null;
  }

  return (
    <div className={cn("container mx-auto px-4 sm:px-6", className)}>
      <AdBanner
        slotKey={position === "top" ? "globalTop" : "globalBottom"}
        compact={position === "top"}
      />
    </div>
  );
}
