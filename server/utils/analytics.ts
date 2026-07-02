import type { DeviceType } from "@/server/types/analytics";

interface ParsedUserAgent {
  device: DeviceType;
  browser: string | null;
  os: string | null;
}

export function parseUserAgent(
  userAgent: string | null | undefined,
): ParsedUserAgent {
  if (!userAgent) {
    return { device: "unknown", browser: null, os: null };
  }

  const ua = userAgent.toLowerCase();

  let device: DeviceType = "desktop";
  if (/tablet|ipad/i.test(userAgent)) {
    device = "tablet";
  } else if (/mobile|iphone|android/i.test(userAgent)) {
    device = "mobile";
  }

  let browser: string | null = null;
  if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("chrome/")) browser = "Chrome";
  else if (ua.includes("safari/") && !ua.includes("chrome/"))
    browser = "Safari";
  else if (ua.includes("firefox/")) browser = "Firefox";
  else if (ua.includes("opera") || ua.includes("opr/")) browser = "Opera";

  let os: string | null = null;
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac os")) os = "macOS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  else if (ua.includes("linux")) os = "Linux";

  return { device, browser, os };
}

export function extractCountryFromHeaders(headers: Headers): string | null {
  const country =
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry") ??
    headers.get("x-country-code") ??
    headers.get("x-appengine-country");

  if (!country || country === "XX" || country === "T1") return null;
  return country.toUpperCase();
}

export function normalizeReferrer(
  referrer: string | null | undefined,
): string | null {
  if (!referrer?.trim()) return null;

  try {
    const url = new URL(referrer);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return "localhost";
    }
    return url.hostname.replace(/^www\./, "");
  } catch {
    return referrer.slice(0, 200);
  }
}

export function getDefaultDateRange(): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);
  from.setHours(0, 0, 0, 0);
  return { from, to };
}
