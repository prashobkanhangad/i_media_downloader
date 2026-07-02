export type AnalyticsEventType = "page_view" | "download";

export type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

export interface AnalyticsEventDocument {
  type: AnalyticsEventType;
  sessionId: string;
  visitorId: string;
  path: string;
  referrer: string | null;
  country: string | null;
  device: DeviceType;
  browser: string | null;
  os: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface TrackPageViewInput {
  sessionId: string;
  visitorId: string;
  path: string;
  referrer?: string | null;
  userAgent?: string | null;
  country?: string | null;
}

export interface TrackDownloadInput {
  sessionId: string;
  visitorId: string;
  path: string;
  url: string;
  mediaType?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  country?: string | null;
}

export interface DashboardQuery {
  from?: Date;
  to?: Date;
  limit?: number;
}

export interface CountItem {
  label: string;
  count: number;
}

export interface DashboardStats {
  period: {
    from: string;
    to: string;
  };
  visitors: {
    total: number;
    unique: number;
  };
  downloads: {
    total: number;
  };
  topPages: CountItem[];
  countries: CountItem[];
  devices: CountItem[];
  referrers: CountItem[];
}

export interface DailyStatsDocument {
  date: string;
  visitors: number;
  uniqueVisitors: number;
  downloads: number;
  pageViews: number;
  updatedAt: Date;
}

export interface TimelineItem {
  date: string;
  pageViews: number;
  downloads: number;
}

export interface PaginatedQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  from?: Date;
  to?: Date;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface EventListItem {
  id: string;
  type: AnalyticsEventType;
  path: string;
  country: string | null;
  device: DeviceType;
  referrer: string | null;
  browser: string | null;
  os: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface UserListItem {
  visitorId: string;
  visits: number;
  downloads: number;
  lastSeen: string;
  country: string | null;
  device: DeviceType;
}
