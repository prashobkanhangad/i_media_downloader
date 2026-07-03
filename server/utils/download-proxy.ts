import { ApiException, ValidationException } from "@/server/utils/api-error";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const ALLOWED_HOST_SUFFIXES = [
  "cdninstagram.com",
  "fbcdn.net",
  "instagram.com",
];

export function isAllowedDownloadUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;

    const host = parsed.hostname.toLowerCase();
    return ALLOWED_HOST_SUFFIXES.some(
      (suffix) => host === suffix || host.endsWith(`.${suffix}`),
    );
  } catch {
    return false;
  }
}

export function sanitizeDownloadFilename(filename: string): string {
  const cleaned = filename
    .replace(/[/\\?%*:|"<>]/g, "")
    .replace(/\s+/g, "-")
    .trim();

  return cleaned || "instagram-media";
}

export async function fetchProxiedMedia(
  sourceUrl: string,
  filename: string,
): Promise<Response> {
  if (!isAllowedDownloadUrl(sourceUrl)) {
    throw new ValidationException("Invalid download URL");
  }

  const upstream = await fetch(sourceUrl, {
    headers: {
      "User-Agent": USER_AGENT,
      Referer: "https://www.instagram.com/",
    },
    redirect: "follow",
  });

  if (!upstream.ok) {
    throw new ApiException("Failed to fetch media file", 502);
  }

  const contentType =
    upstream.headers.get("content-type") ?? "application/octet-stream";
  const safeFilename = sanitizeDownloadFilename(filename);
  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set(
    "Content-Disposition",
    `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`,
  );

  const contentLength = upstream.headers.get("content-length");
  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  if (!upstream.body) {
    const buffer = await upstream.arrayBuffer();
    return new Response(buffer, { headers, status: 200 });
  }

  return new Response(upstream.body, { headers, status: 200 });
}
