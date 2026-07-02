export type DownloadMediaType = "video" | "photo" | "carousel" | "story";

export type DownloadResultState =
  "idle" | "loading" | "success" | "error" | "empty";

export interface DownloadMediaItem {
  id: string;
  type: "video" | "photo";
  thumbnailUrl: string | null;
  previewUrl: string | null;
  downloadUrl: string | null;
  width?: number | null;
  height?: number | null;
  duration?: number | null;
}

export interface DownloadResultData {
  id: string;
  mediaType: DownloadMediaType;
  username: string | null;
  caption: string | null;
  thumbnailUrl: string | null;
  previewUrl: string | null;
  downloadUrl: string | null;
  duration?: number | null;
  items?: DownloadMediaItem[];
}

export const MEDIA_TYPE_LABELS: Record<DownloadMediaType, string> = {
  video: "Video",
  photo: "Photo",
  carousel: "Carousel",
  story: "Story",
};
