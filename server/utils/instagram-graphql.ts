import type { MediaType } from "@/server/types/analyze";
import type { RawMediaCarouselItem } from "@/server/types/downloader";
import { ApiException } from "@/server/utils/api-error";

const INSTAGRAM_APP_ID = "936619743392459";
const DEFAULT_DOC_ID = "24368985919464652";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

interface GraphqlImageCandidate {
  url?: string;
  width?: number;
  height?: number;
}

interface GraphqlVideoVersion {
  url?: string;
  width?: number;
  height?: number;
}

interface GraphqlMediaItem {
  code?: string;
  media_type?: number;
  video_duration?: number | null;
  caption?: { text?: string | null } | null;
  user?: { username?: string | null } | null;
  video_versions?: GraphqlVideoVersion[];
  image_versions2?: {
    candidates?: GraphqlImageCandidate[];
  };
  carousel_media?: GraphqlMediaItem[];
}

export interface ParsedInstagramMedia {
  username: string | null;
  caption: string | null;
  downloadUrl: string | null;
  thumbnailUrl: string | null;
  previewUrl: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  isCarousel: boolean;
  carouselItems: RawMediaCarouselItem[];
}

function getDocId(): string {
  return process.env.INSTAGRAM_GRAPHQL_DOC_ID ?? DEFAULT_DOC_ID;
}

function parseSetCookie(header: string | null): string {
  if (!header) return "";

  return header
    .split(/,(?=\s*[^;]+=[^;]+)/)
    .map((part) => part.split(";")[0]?.trim())
    .filter(Boolean)
    .join("; ");
}

function extractCsrfToken(cookieHeader: string): string {
  const match = cookieHeader.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return match?.[1] ?? "";
}

async function bootstrapInstagramSession(): Promise<{
  csrfToken: string;
  cookieHeader: string;
}> {
  const response = await fetch("https://www.instagram.com/", {
    headers: { "User-Agent": USER_AGENT },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new ApiException("Unable to reach Instagram", 502);
  }

  const setCookie = response.headers.get("set-cookie");
  const cookieHeader = parseSetCookie(setCookie);
  const csrfToken = extractCsrfToken(cookieHeader);

  if (!csrfToken) {
    throw new ApiException("Unable to initialize Instagram session", 502);
  }

  return { csrfToken, cookieHeader };
}

function pickBestVideo(
  versions?: GraphqlVideoVersion[],
): GraphqlVideoVersion | null {
  if (!versions?.length) return null;
  return versions.reduce<GraphqlVideoVersion>((best, current) => {
    const bestSize = (best.width ?? 0) * (best.height ?? 0);
    const currentSize = (current.width ?? 0) * (current.height ?? 0);
    return currentSize > bestSize ? current : best;
  }, versions[0]);
}

function pickBestImage(
  candidates?: GraphqlImageCandidate[],
): GraphqlImageCandidate | null {
  if (!candidates?.length) return null;
  return candidates.reduce<GraphqlImageCandidate>((best, current) => {
    const bestSize = (best.width ?? 0) * (best.height ?? 0);
    const currentSize = (current.width ?? 0) * (current.height ?? 0);
    return currentSize > bestSize ? current : best;
  }, candidates[0]);
}

function parseCarouselItem(
  item: GraphqlMediaItem,
  index: number,
): RawMediaCarouselItem | null {
  const video = pickBestVideo(item.video_versions);
  const image = pickBestImage(item.image_versions2?.candidates);
  const downloadUrl = video?.url ?? image?.url ?? null;

  if (!downloadUrl) return null;

  return {
    id: item.code ?? `slide-${index + 1}`,
    type: video?.url ? "video" : "photo",
    thumbnailUrl: image?.url ?? video?.url ?? null,
    previewUrl: video?.url ?? image?.url ?? null,
    downloadUrl,
    width: video?.width ?? image?.width ?? null,
    height: video?.height ?? image?.height ?? null,
    duration: item.video_duration ?? null,
  };
}

function parseMediaItem(item: GraphqlMediaItem): ParsedInstagramMedia {
  const carouselItems = (item.carousel_media ?? [])
    .map((slide, index) => parseCarouselItem(slide, index))
    .filter((slide): slide is RawMediaCarouselItem => slide !== null);

  if (carouselItems.length > 0) {
    const first = carouselItems[0];
    return {
      username: item.user?.username ?? null,
      caption: item.caption?.text ?? null,
      downloadUrl: first.downloadUrl,
      thumbnailUrl: first.thumbnailUrl,
      previewUrl: first.previewUrl,
      width: first.width ?? null,
      height: first.height ?? null,
      duration: first.duration ?? null,
      isCarousel: carouselItems.length > 1,
      carouselItems,
    };
  }

  const video = pickBestVideo(item.video_versions);
  const image = pickBestImage(item.image_versions2?.candidates);
  const downloadUrl = video?.url ?? image?.url ?? null;

  return {
    username: item.user?.username ?? null,
    caption: item.caption?.text ?? null,
    downloadUrl,
    thumbnailUrl: image?.url ?? video?.url ?? null,
    previewUrl: video?.url ?? image?.url ?? null,
    width: video?.width ?? image?.width ?? null,
    height: video?.height ?? image?.height ?? null,
    duration: item.video_duration ?? null,
    isCarousel: false,
    carouselItems: [],
  };
}

export async function fetchInstagramMediaByShortcode(
  shortcode: string,
): Promise<ParsedInstagramMedia> {
  const { csrfToken, cookieHeader } = await bootstrapInstagramSession();
  const variables = JSON.stringify({ shortcode });
  const body = `variables=${encodeURIComponent(variables)}&doc_id=${getDocId()}`;

  const response = await fetch("https://www.instagram.com/graphql/query", {
    method: "POST",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-IG-App-ID": INSTAGRAM_APP_ID,
      "X-CSRFToken": csrfToken,
      Cookie: cookieHeader,
    },
    body,
  });

  if (!response.ok) {
    throw new ApiException("Instagram media lookup failed", 502);
  }

  const payload = (await response.json()) as {
    data?: {
      xdt_api__v1__media__shortcode__web_info?: {
        items?: GraphqlMediaItem[];
      };
    };
    errors?: Array<{ message?: string }>;
  };

  const item =
    payload.data?.xdt_api__v1__media__shortcode__web_info?.items?.[0];

  if (!item) {
    const message =
      payload.errors?.[0]?.message ??
      "Media not found. The post may be private or unavailable.";
    throw new ApiException(message, 404);
  }

  const parsed = parseMediaItem(item);

  if (!parsed.downloadUrl) {
    throw new ApiException("No downloadable media found for this URL", 404);
  }

  return parsed;
}

export function isStoryMediaType(mediaType: MediaType): boolean {
  return mediaType === "story";
}
