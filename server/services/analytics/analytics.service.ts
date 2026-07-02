import type { IAnalyticsRepository } from "@/server/interfaces/analytics.interface";
import type { IAnalyticsService } from "@/server/interfaces/analytics.interface";
import type {
  AnalyticsEventDocument,
  DashboardQuery,
  DashboardStats,
  PaginatedQuery,
  PaginatedResult,
  TimelineItem,
  UserListItem,
  AnalyticsEventType,
  EventListItem,
  TrackDownloadInput,
  TrackPageViewInput,
} from "@/server/types/analytics";
import { normalizeReferrer, parseUserAgent } from "@/server/utils/analytics";
import { isMongoConfigured } from "@/server/database/mongodb";

export class AnalyticsService implements IAnalyticsService {
  constructor(private readonly repository: IAnalyticsRepository) {}

  async trackPageView(input: TrackPageViewInput): Promise<void> {
    if (!isMongoConfigured()) return;

    const { device, browser, os } = parseUserAgent(input.userAgent);

    const event: AnalyticsEventDocument = {
      type: "page_view",
      sessionId: input.sessionId,
      visitorId: input.visitorId,
      path: input.path,
      referrer: normalizeReferrer(input.referrer),
      country: input.country ?? null,
      device,
      browser,
      os,
      userAgent: input.userAgent ?? null,
      metadata: {},
      createdAt: new Date(),
    };

    await this.repository.insertEvent(event);
  }

  async trackDownload(input: TrackDownloadInput): Promise<void> {
    if (!isMongoConfigured()) return;

    const { device, browser, os } = parseUserAgent(input.userAgent);

    const event: AnalyticsEventDocument = {
      type: "download",
      sessionId: input.sessionId,
      visitorId: input.visitorId,
      path: input.path,
      referrer: normalizeReferrer(input.referrer),
      country: input.country ?? null,
      device,
      browser,
      os,
      userAgent: input.userAgent ?? null,
      metadata: {
        url: input.url,
        mediaType: input.mediaType ?? null,
      },
      createdAt: new Date(),
    };

    await this.repository.insertEvent(event);
  }

  async getDashboard(query: DashboardQuery = {}): Promise<DashboardStats> {
    if (!isMongoConfigured()) {
      return {
        period: {
          from: new Date().toISOString(),
          to: new Date().toISOString(),
        },
        visitors: { total: 0, unique: 0 },
        downloads: { total: 0 },
        topPages: [],
        countries: [],
        devices: [],
        referrers: [],
      };
    }

    return this.repository.getDashboardStats(query);
  }

  async getTimeline(query: DashboardQuery = {}): Promise<TimelineItem[]> {
    if (!isMongoConfigured()) return [];
    return this.repository.getTimelineStats(query);
  }

  async listEvents(
    query: PaginatedQuery & { type?: AnalyticsEventType },
  ): Promise<PaginatedResult<EventListItem>> {
    if (!isMongoConfigured()) {
      return { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 };
    }
    return this.repository.listEvents(query);
  }

  async listUsers(
    query: PaginatedQuery,
  ): Promise<PaginatedResult<UserListItem>> {
    if (!isMongoConfigured()) {
      return { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 };
    }
    return this.repository.listUsers(query);
  }
}
