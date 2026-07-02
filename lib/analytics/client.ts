import { getAnalyticsContext } from "@/lib/analytics/storage";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

async function sendAnalyticsEvent(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<void> {
  try {
    await fetch(`${API_BASE}/analytics/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Analytics should never block user experience
  }
}

export async function trackPageView(path?: string): Promise<void> {
  const context = getAnalyticsContext();

  await sendAnalyticsEvent("page-view", {
    ...context,
    path: path ?? context.path,
  });
}

export async function trackDownload(
  url: string,
  mediaType?: string | null,
): Promise<void> {
  const context = getAnalyticsContext();

  await sendAnalyticsEvent("download", {
    ...context,
    url,
    mediaType: mediaType ?? null,
  });
}

export type { DashboardStats } from "@/server/types/analytics";
