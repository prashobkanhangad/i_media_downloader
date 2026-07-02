import type { AdPlacement, AdSlotKey } from "@/lib/ads/config";

const PLACEHOLDER_PATTERN = /X{4,}|x{4,}|^0+$/;

function isPlaceholderValue(value: string): boolean {
  if (!value) return true;
  return PLACEHOLDER_PATTERN.test(value.replace(/\s/g, ""));
}

export function isValidAdSenseClientId(clientId: string): boolean {
  return /^ca-pub-\d{10,}$/i.test(clientId.trim());
}

export function isValidAdSlot(slot: string): boolean {
  return /^\d{6,}$/.test(slot.trim()) && !isPlaceholderValue(slot);
}

export function shouldShowAdPlacements(): boolean {
  return process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED === "true";
}

export function shouldLoadAdSense(): boolean {
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID?.trim() ?? "";
  return shouldShowAdPlacements() && isValidAdSenseClientId(clientId);
}

export function getAdPreviewLabel(
  slotKey: AdSlotKey,
  placement: AdPlacement,
): string {
  return `${slotKey} · ${placement}`;
}
