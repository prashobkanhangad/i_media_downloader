import { getDownloaderService } from "@/server/container";
import type { AnalyzeRequest, AnalyzeResult } from "@/server/types/analyze";
import { ValidationException } from "@/server/utils/api-error";

export class AnalyzeService {
  constructor(private readonly downloaderService = getDownloaderService()) {}

  /**
   * Analyzes an Instagram URL and returns metadata about the content.
   * Delegates URL parsing to DownloaderService.
   */
  async analyze(request: AnalyzeRequest): Promise<AnalyzeResult> {
    const validation = this.downloaderService.validateInstagramURL(request.url);

    if (!validation.isValid || !validation.normalized) {
      throw new ValidationException(
        validation.error ?? "Invalid Instagram URL",
      );
    }

    const mediaType = this.downloaderService.detectMediaType(
      validation.normalized,
    );
    const parsed = this.downloaderService.parseShortcode(validation.normalized);

    return {
      url: validation.normalized,
      mediaType,
      isSupported: mediaType !== "unknown" && parsed !== null,
      analyzedAt: new Date().toISOString(),
    };
  }
}
