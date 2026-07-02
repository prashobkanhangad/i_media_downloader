import type { IAnalyticsService } from "@/server/interfaces/analytics.interface";
import { getAnalyticsService } from "@/server/container";
import { parseJsonBody, successResponse } from "@/server/utils";
import { ApiException } from "@/server/utils/api-error";
import { extractCountryFromHeaders } from "@/server/utils/analytics";
import {
  dashboardQuerySchema,
  trackDownloadSchema,
  trackPageViewSchema,
} from "@/server/validators/analytics.validator";

function verifyAnalyticsApiKey(request: Request): void {
  const apiKey = process.env.ANALYTICS_API_KEY;
  if (!apiKey) {
    throw new ApiException("Analytics API key not configured", 503);
  }

  const provided =
    request.headers.get("x-api-key") ??
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (provided !== apiKey) {
    throw new ApiException("Unauthorized", 401);
  }
}

export class AnalyticsController {
  constructor(
    private readonly analyticsService: IAnalyticsService = getAnalyticsService(),
  ) {}

  async trackPageView(request: Request) {
    const body = await parseJsonBody(request);
    const data = trackPageViewSchema.parse(body);

    await this.analyticsService.trackPageView({
      ...data,
      userAgent: request.headers.get("user-agent"),
      country: extractCountryFromHeaders(request.headers),
    });

    return successResponse({ tracked: true }, "Page view tracked");
  }

  async trackDownload(request: Request) {
    const body = await parseJsonBody(request);
    const data = trackDownloadSchema.parse(body);

    await this.analyticsService.trackDownload({
      ...data,
      userAgent: request.headers.get("user-agent"),
      country: extractCountryFromHeaders(request.headers),
    });

    return successResponse({ tracked: true }, "Download tracked");
  }

  async getDashboard(request: Request) {
    verifyAnalyticsApiKey(request);

    const { searchParams } = new URL(request.url);
    const query = dashboardQuerySchema.parse({
      from: searchParams.get("from") ?? undefined,
      to: searchParams.get("to") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    const stats = await this.analyticsService.getDashboard({
      from: query.from ? new Date(query.from) : undefined,
      to: query.to ? new Date(query.to) : undefined,
      limit: query.limit,
    });

    return successResponse(stats, "Dashboard stats retrieved");
  }
}

export const analyticsController = new AnalyticsController();
