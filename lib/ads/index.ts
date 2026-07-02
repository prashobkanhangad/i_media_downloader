export { adsConfig, isPublicAdsRoute } from "@/lib/ads/config";
export type { AdPlacement, AdSlotKey } from "@/lib/ads/config";
export { pushAdSenseAd } from "@/lib/ads/utils";
export {
  getAdPreviewLabel,
  isValidAdSenseClientId,
  isValidAdSlot,
  shouldLoadAdSense,
  shouldShowAdPlacements,
} from "@/lib/ads/preview";
export {
  useAdsConfigured,
  useAdsEnabled,
  useAdsLive,
  useShowAdPlacements,
} from "@/hooks/use-ads-enabled";
