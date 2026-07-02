import { getDownloaderService } from "@/server/container";
import type { DownloadRequest, DownloadResult } from "@/server/types/download";
import { ValidationException } from "@/server/utils/api-error";
import { generateJobId } from "@/server/utils/helpers";

export class DownloadService {
  constructor(private readonly downloaderService = getDownloaderService()) {}

  /**
   * Initiates a download job for the given Instagram URL.
   * Uses DownloaderService for validation and media extraction pipeline.
   */
  async initiate(request: DownloadRequest): Promise<DownloadResult> {
    const validation = this.downloaderService.validateInstagramURL(request.url);

    if (!validation.isValid) {
      throw new ValidationException(
        validation.error ?? "Invalid Instagram URL",
      );
    }

    const raw = await this.downloaderService.extractMedia(request.url);
    const media = this.downloaderService.normalizeResponse(raw);

    return {
      jobId: generateJobId(),
      url: media.url,
      status: media.downloadUrl ? "completed" : "pending",
      createdAt: media.extractedAt,
      shortcode: media.shortcode,
      mediaType: media.mediaType,
      username: media.username,
      caption: media.caption,
      downloadUrl: media.downloadUrl,
      thumbnailUrl: media.thumbnailUrl,
      previewUrl: media.previewUrl,
      duration: media.duration,
      isCarousel: media.isCarousel,
      carouselItems: media.carouselItems,
    };
  }
}
