export type DownloadStatus = "pending" | "processing" | "completed" | "failed";

export interface DownloadRequest {
  url: string;
}

export interface DownloadData {
  jobId: string;
  url: string;
  status: DownloadStatus;
}

export interface DownloadResult {
  jobId: string;
  url: string;
  status: DownloadStatus;
  createdAt: string;
  shortcode: string;
  mediaType: string;
  username: string | null;
  caption: string | null;
  downloadUrl: string | null;
  thumbnailUrl: string | null;
  previewUrl: string | null;
  duration: number | null;
  isCarousel: boolean;
  carouselItems: Array<{
    id: string;
    type: "video" | "photo";
    thumbnailUrl: string | null;
    previewUrl: string | null;
    downloadUrl: string | null;
    width?: number | null;
    height?: number | null;
    duration?: number | null;
  }>;
}
