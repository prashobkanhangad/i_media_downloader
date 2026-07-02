"use client";

import Script from "next/script";

import { useAdsLive } from "@/hooks/use-ads-enabled";
import { adsConfig } from "@/lib/ads/config";

export function GoogleAdSenseScript() {
  const adsLive = useAdsLive();

  if (!adsLive) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
