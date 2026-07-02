"use client";

import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { AdUnit } from "@/components/ads/ad-unit";
import type { AdSlotKey } from "@/lib/ads/config";
import { adsConfig } from "@/lib/ads/config";
import { useAdsLive, useShowAdPlacements } from "@/hooks/use-ads-enabled";
import { cn } from "@/lib/utils";

interface AdSidebarProps {
  slotKey: AdSlotKey;
  className?: string;
  label?: string;
}

export function AdSidebar({
  slotKey,
  className,
  label = "Advertisement",
}: AdSidebarProps) {
  const showPlacements = useShowAdPlacements();
  const adsLive = useAdsLive();
  const slot = adsConfig.getSlot(slotKey);
  const placement = adsConfig.getFormat(slotKey);
  const useLiveUnit = adsLive && adsConfig.isValidSlot(slot);

  if (!showPlacements) {
    return null;
  }

  return (
    <aside className={cn("w-full", className)} aria-label={label}>
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-muted/20 px-2 py-3">
        <p className="mb-2 text-center text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </p>
        {useLiveUnit && slot ? (
          <AdUnit
            slot={slot}
            placement={placement}
            className="min-h-[250px] w-full"
          />
        ) : (
          <AdPlaceholder
            label={adsConfig.getPreviewLabel(slotKey)}
            placement={placement}
            vertical
          />
        )}
      </div>
    </aside>
  );
}
