import {
  getAdPreviewLabel,
  isValidAdSlot,
  shouldLoadAdSense,
  shouldShowAdPlacements,
} from "@/lib/ads/preview";

export type AdPlacement =
  "display" | "horizontal" | "inArticle" | "inFeed" | "sidebar";

export type AdSlotKey =
  | "globalTop"
  | "globalBottom"
  | "homeHero"
  | "homeBetweenSections"
  | "homeLeft"
  | "homeRight"
  | "homeLeftSecondary"
  | "homeRightSecondary"
  | "downloaderTop"
  | "downloaderBottom"
  | "downloadResult"
  | "downloadPopup"
  | "blogList"
  | "blogPost"
  | "faq";

const slotEnvMap: Record<AdSlotKey, string> = {
  globalTop: "NEXT_PUBLIC_ADS_SLOT_GLOBAL_TOP",
  globalBottom: "NEXT_PUBLIC_ADS_SLOT_GLOBAL_BOTTOM",
  homeHero: "NEXT_PUBLIC_ADS_SLOT_HOME_HERO",
  homeBetweenSections: "NEXT_PUBLIC_ADS_SLOT_HOME_SECTIONS",
  homeLeft: "NEXT_PUBLIC_ADS_SLOT_HOME_LEFT",
  homeRight: "NEXT_PUBLIC_ADS_SLOT_HOME_RIGHT",
  homeLeftSecondary: "NEXT_PUBLIC_ADS_SLOT_HOME_LEFT_SECONDARY",
  homeRightSecondary: "NEXT_PUBLIC_ADS_SLOT_HOME_RIGHT_SECONDARY",
  downloaderTop: "NEXT_PUBLIC_ADS_SLOT_DOWNLOADER_TOP",
  downloaderBottom: "NEXT_PUBLIC_ADS_SLOT_DOWNLOADER_BOTTOM",
  downloadResult: "NEXT_PUBLIC_ADS_SLOT_DOWNLOAD_RESULT",
  downloadPopup: "NEXT_PUBLIC_ADS_SLOT_DOWNLOAD_POPUP",
  blogList: "NEXT_PUBLIC_ADS_SLOT_BLOG_LIST",
  blogPost: "NEXT_PUBLIC_ADS_SLOT_BLOG_POST",
  faq: "NEXT_PUBLIC_ADS_SLOT_FAQ",
};

const placementFallback: Record<AdSlotKey, AdPlacement> = {
  globalTop: "horizontal",
  globalBottom: "horizontal",
  homeHero: "display",
  homeBetweenSections: "inFeed",
  homeLeft: "sidebar",
  homeRight: "sidebar",
  homeLeftSecondary: "sidebar",
  homeRightSecondary: "sidebar",
  downloaderTop: "horizontal",
  downloaderBottom: "display",
  downloadResult: "inArticle",
  downloadPopup: "inArticle",
  blogList: "inFeed",
  blogPost: "inArticle",
  faq: "display",
};

function readEnv(key: string): string {
  return process.env[key]?.trim() ?? "";
}

function readPlacementSlot(placement: AdPlacement): string {
  if (placement === "horizontal") {
    return readEnv("NEXT_PUBLIC_ADS_SLOT_HORIZONTAL");
  }
  if (placement === "inArticle") {
    return readEnv("NEXT_PUBLIC_ADS_SLOT_IN_ARTICLE");
  }
  if (placement === "inFeed") {
    return readEnv("NEXT_PUBLIC_ADS_SLOT_IN_FEED");
  }
  if (placement === "sidebar") {
    return readEnv("NEXT_PUBLIC_ADS_SLOT_SIDEBAR");
  }
  return readEnv("NEXT_PUBLIC_ADS_SLOT_DISPLAY");
}

export const adsConfig = {
  get enabled(): boolean {
    return readEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED") === "true";
  },
  get clientId(): string {
    return readEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID");
  },
  get publisherId(): string {
    return readEnv("GOOGLE_ADSENSE_PUBLISHER_ID");
  },
  isConfigured(): boolean {
    return shouldLoadAdSense();
  },
  shouldShowPlacements(): boolean {
    return shouldShowAdPlacements();
  },
  shouldLoadAds(): boolean {
    return shouldLoadAdSense();
  },
  isValidSlot(slot: string | null): boolean {
    return slot ? isValidAdSlot(slot) : false;
  },
  getPreviewLabel(key: AdSlotKey): string {
    return getAdPreviewLabel(key, placementFallback[key]);
  },
  getSlot(key: AdSlotKey): string | null {
    const explicit = readEnv(slotEnvMap[key]);
    if (explicit) return explicit;

    if (key === "homeLeftSecondary") {
      const primary = readEnv(slotEnvMap.homeLeft);
      if (primary) return primary;
    }

    if (key === "homeRightSecondary") {
      const primary = readEnv(slotEnvMap.homeRight);
      if (primary) return primary;
    }

    const fallbackPlacement = placementFallback[key];
    const placementSlot = readPlacementSlot(fallbackPlacement);
    if (placementSlot) return placementSlot;

    return readPlacementSlot("display") || null;
  },
  getFormat(key: AdSlotKey): AdPlacement {
    return placementFallback[key];
  },
};

export function isPublicAdsRoute(pathname: string): boolean {
  return !pathname.startsWith("/admin") && !pathname.startsWith("/api");
}
