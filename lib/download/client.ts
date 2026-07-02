import { getAnalyticsContext } from "@/lib/analytics/storage";
import type { DownloadResult } from "@/server/types/download";
import type { ApiResponse } from "@/server/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export async function requestDownload(url: string): Promise<DownloadResult> {
  const context = getAnalyticsContext();

  const response = await fetch(`${API_BASE}/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      sessionId: context.sessionId,
      visitorId: context.visitorId,
      path: context.path,
      mediaType: null,
    }),
  });

  const json = (await response.json()) as ApiResponse<DownloadResult>;

  if (!response.ok || !json.success) {
    throw new Error("error" in json ? json.error : "Download request failed");
  }

  return json.data;
}

export async function triggerFileDownload(
  url: string,
  filename = "instagram-media",
) {
  const proxyUrl = `${API_BASE}/download/file?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
  const response = await fetch(proxyUrl);

  if (!response.ok) {
    throw new Error("Failed to download file");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(objectUrl);
}
