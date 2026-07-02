import type {
  AnalyticsEventDocument,
  AnalyticsEventType,
  DashboardQuery,
  DashboardStats,
  EventListItem,
  PaginatedQuery,
  PaginatedResult,
  TimelineItem,
  UserListItem,
} from "@/server/types/analytics";
import type {
  TrackDownloadInput,
  TrackPageViewInput,
} from "@/server/types/analytics";

export interface IAnalyticsRepository {
  insertEvent(event: AnalyticsEventDocument): Promise<void>;
  getDashboardStats(query: DashboardQuery): Promise<DashboardStats>;
  getTimelineStats(query: DashboardQuery): Promise<TimelineItem[]>;
  listEvents(
    query: PaginatedQuery & { type?: AnalyticsEventType },
  ): Promise<PaginatedResult<EventListItem>>;
  listUsers(query: PaginatedQuery): Promise<PaginatedResult<UserListItem>>;
}

export interface IAnalyticsService {
  trackPageView(input: TrackPageViewInput): Promise<void>;
  trackDownload(input: TrackDownloadInput): Promise<void>;
  getDashboard(query?: DashboardQuery): Promise<DashboardStats>;
  getTimeline(query?: DashboardQuery): Promise<TimelineItem[]>;
  listEvents(
    query: PaginatedQuery & { type?: AnalyticsEventType },
  ): Promise<PaginatedResult<EventListItem>>;
  listUsers(query: PaginatedQuery): Promise<PaginatedResult<UserListItem>>;
}
