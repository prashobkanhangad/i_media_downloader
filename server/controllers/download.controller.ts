import { getAnalyticsService } from "@/server/container";
import { DownloadService } from "@/server/services/download.service";
import { parseJsonBody, successResponse } from "@/server/utils";
import { extractCountryFromHeaders } from "@/server/utils/analytics";
import { fetchProxiedMedia } from "@/server/utils/download-proxy";
import {
  downloadFileQuerySchema,
  downloadRequestSchema,
} from "@/server/validators/download.validator";

export class DownloadController {
  constructor(
    private readonly downloadService = new DownloadService(),
    private readonly analyticsService = getAnalyticsService(),
  ) {}

  async post(request: Request) {
    const body = await parseJsonBody(request);
    const { url, sessionId, visitorId, path, mediaType } =
      downloadRequestSchema.parse(body);

    const result = await this.downloadService.initiate({ url });

    if (sessionId && visitorId && path) {
      await this.analyticsService.trackDownload({
        sessionId,
        visitorId,
        path,
        url,
        mediaType: mediaType ?? null,
        referrer: request.headers.get("referer"),
        userAgent: request.headers.get("user-agent"),
        country: extractCountryFromHeaders(request.headers),
      });
    }

    return successResponse(result, "Download request accepted");
  }

  async getFile(request: Request) {
    const { searchParams } = new URL(request.url);
    const { url, filename } = downloadFileQuerySchema.parse({
      url: searchParams.get("url"),
      filename: searchParams.get("filename") ?? undefined,
    });

    return fetchProxiedMedia(url, filename);
  }
}

export const downloadController = new DownloadController();
