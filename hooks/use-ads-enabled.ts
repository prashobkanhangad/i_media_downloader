"use client";

import { usePathname } from "next/navigation";

import { useMounted } from "@/hooks/use-mounted";
import { isPublicAdsRoute } from "@/lib/ads/config";
import {
  shouldLoadAdSense,
  shouldShowAdPlacements,
} from "@/lib/ads/preview";

export function useShowAdPlacements() {
  const mounted = useMounted();
  const pathname = usePathname();

  return mounted && shouldShowAdPlacements() && isPublicAdsRoute(pathname);
}

export function useAdsLive() {
  const showPlacements = useShowAdPlacements();
  return showPlacements && shouldLoadAdSense();
}

/** @deprecated Use useShowAdPlacements or useAdsLive */
export function useAdsEnabled() {
  return useAdsLive();
}

/** @deprecated Use useShowAdPlacements */
export function useAdsConfigured() {
  const mounted = useMounted();
  return mounted && shouldShowAdPlacements();
}
