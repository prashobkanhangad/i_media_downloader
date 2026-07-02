import type { MediaType } from "@/server/types/analyze";
import type { DownloadResult } from "@/server/types/download";
import type {
  DownloadMediaType,
  DownloadResultData,
} from "@/types/download-result";

function mapMediaType(mediaType: string): DownloadMediaType {
  switch (mediaType as MediaType) {
    case "reel":
    case "igtv":
      return "video";
    case "story":
      return "story";
    case "post":
      return "photo";
    default:
      return "video";
  }
}

export function mapDownloadResult(result: DownloadResult): DownloadResultData {
  const mediaType = result.isCarousel
    ? "carousel"
    : mapMediaType(result.mediaType);

  return {
    id: result.jobId,
    mediaType,
    username: result.username,
    caption: result.caption,
    thumbnailUrl: result.thumbnailUrl,
    previewUrl: result.previewUrl ?? result.downloadUrl,
    downloadUrl: result.downloadUrl,
    duration: result.duration,
    items: result.carouselItems.map((item) => ({
      id: item.id,
      type: item.type,
      thumbnailUrl: item.thumbnailUrl,
      previewUrl: item.previewUrl,
      downloadUrl: item.downloadUrl,
      width: item.width,
      height: item.height,
      duration: item.duration,
    })),
  };
}
