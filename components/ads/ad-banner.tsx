"use client";

import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { AdUnit } from "@/components/ads/ad-unit";
import type { AdSlotKey } from "@/lib/ads/config";
import { adsConfig } from "@/lib/ads/config";
import { useAdsLive, useShowAdPlacements } from "@/hooks/use-ads-enabled";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  slotKey: AdSlotKey;
  className?: string;
  compact?: boolean;
  label?: string;
}

export function AdBanner({
  slotKey,
  className,
  compact = false,
  label = "Advertisement",
}: AdBannerProps) {
  const showPlacements = useShowAdPlacements();
  const adsLive = useAdsLive();
  const slot = adsConfig.getSlot(slotKey);
  const placement = adsConfig.getFormat(slotKey);
  const useLiveUnit = adsLive && adsConfig.isValidSlot(slot);

  if (!showPlacements) {
    return null;
  }

  return (
    <aside
      className={cn(
        "mx-auto w-full max-w-5xl",
        compact ? "py-2" : "py-4",
        className,
      )}
      aria-label={label}
    >
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-muted/20 px-3 py-3 sm:px-4">
        <p className="mb-2 text-center text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </p>
        {useLiveUnit && slot ? (
          <AdUnit slot={slot} placement={placement} className="min-h-[90px]" />
        ) : (
          <AdPlaceholder
            label={adsConfig.getPreviewLabel(slotKey)}
            placement={placement}
          />
        )}
      </div>
    </aside>
  );
}
