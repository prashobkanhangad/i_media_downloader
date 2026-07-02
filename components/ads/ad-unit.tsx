"use client";

import { useEffect, useRef } from "react";

import { adFormatProps } from "@/lib/ads/formats";
import type { AdPlacement } from "@/lib/ads/config";
import { adsConfig } from "@/lib/ads/config";
import { pushAdSenseAd } from "@/lib/ads/utils";
import { cn } from "@/lib/utils";

interface AdUnitProps {
  slot: string;
  placement?: AdPlacement;
  className?: string;
  testId?: string;
}

export function AdUnit({
  slot,
  placement = "display",
  className,
  testId,
}: AdUnitProps) {
  const initialized = useRef(false);
  const format = adFormatProps[placement];

  useEffect(() => {
    if (!adsConfig.isConfigured() || !slot || initialized.current) return;
    initialized.current = true;
    pushAdSenseAd();
  }, [slot]);

  if (!adsConfig.isConfigured() || !slot) {
    return null;
  }

  return (
    <ins
      className={cn("adsbygoogle block", className)}
      style={{ display: "block" }}
      data-ad-client={adsConfig.clientId}
      data-ad-slot={slot}
      data-ad-format={format.format}
      {...(format.layout ? { "data-ad-layout": format.layout } : {})}
      {...(format.layoutKey ? { "data-ad-layout-key": format.layoutKey } : {})}
      data-full-width-responsive="true"
      data-testid={testId}
    />
  );
}
