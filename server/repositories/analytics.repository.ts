import type { Filter } from "mongodb";

import { ANALYTICS_COLLECTIONS } from "@/server/database/collections";
import { ensureAnalyticsIndexes } from "@/server/database/indexes";
import { getDatabase, isMongoConfigured } from "@/server/database/mongodb";
import type { IAnalyticsRepository } from "@/server/interfaces/analytics.interface";
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
import { getDefaultDateRange } from "@/server/utils/analytics";

function resolveDateRange(query: DashboardQuery | PaginatedQuery) {
  return query.from && query.to
    ? { from: query.from, to: query.to }
    : getDefaultDateRange();
}

function emptyPaginated<T>(page = 1, pageSize = 10): PaginatedResult<T> {
  return { items: [], total: 0, page, pageSize, totalPages: 0 };
}

export class AnalyticsRepository implements IAnalyticsRepository {
  private async getCollection() {
    if (!isMongoConfigured()) throw new Error("MongoDB not configured");
    await ensureAnalyticsIndexes();
    const db = await getDatabase();
    return db.collection<AnalyticsEventDocument>(ANALYTICS_COLLECTIONS.EVENTS);
  }

  async insertEvent(event: AnalyticsEventDocument): Promise<void> {
    const collection = await this.getCollection();
    await collection.insertOne(event);
  }

  async getDashboardStats(query: DashboardQuery): Promise<DashboardStats> {
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

    const { from, to } = resolveDateRange(query);
    const limit = query.limit ?? 10;
    const collection = await this.getCollection();
    const dateFilter = { createdAt: { $gte: from, $lte: to } };

    const [
      pageViewStats,
      downloadTotal,
      topPages,
      countries,
      devices,
      referrers,
    ] = await Promise.all([
      collection
        .aggregate<{ total: number; unique: number }>([
          { $match: { ...dateFilter, type: "page_view" } },
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              unique: { $addToSet: "$visitorId" },
            },
          },
          { $project: { total: 1, unique: { $size: "$unique" } } },
        ])
        .toArray(),
      collection.countDocuments({ ...dateFilter, type: "download" }),
      collection
        .aggregate<{ label: string; count: number }>([
          { $match: { ...dateFilter, type: "page_view" } },
          { $group: { _id: "$path", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: limit },
          { $project: { _id: 0, label: "$_id", count: 1 } },
        ])
        .toArray(),
      collection
        .aggregate<{ label: string; count: number }>([
          { $match: { ...dateFilter, country: { $ne: null } } },
          { $group: { _id: "$country", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: limit },
          { $project: { _id: 0, label: "$_id", count: 1 } },
        ])
        .toArray(),
      collection
        .aggregate<{ label: string; count: number }>([
          { $match: dateFilter },
          { $group: { _id: "$device", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $project: { _id: 0, label: "$_id", count: 1 } },
        ])
        .toArray(),
      collection
        .aggregate<{ label: string; count: number }>([
          { $match: { ...dateFilter, referrer: { $ne: null } } },
          { $group: { _id: "$referrer", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: limit },
          { $project: { _id: 0, label: "$_id", count: 1 } },
        ])
        .toArray(),
    ]);

    const visitors = pageViewStats[0] ?? { total: 0, unique: 0 };

    return {
      period: { from: from.toISOString(), to: to.toISOString() },
      visitors: { total: visitors.total, unique: visitors.unique },
      downloads: { total: downloadTotal },
      topPages,
      countries,
      devices,
      referrers,
    };
  }

  async getTimelineStats(query: DashboardQuery): Promise<TimelineItem[]> {
    if (!isMongoConfigured()) return [];

    const { from, to } = resolveDateRange(query);
    const collection = await this.getCollection();

    const results = await collection
      .aggregate<TimelineItem>([
        { $match: { createdAt: { $gte: from, $lte: to } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            pageViews: {
              $sum: { $cond: [{ $eq: ["$type", "page_view"] }, 1, 0] },
            },
            downloads: {
              $sum: { $cond: [{ $eq: ["$type", "download"] }, 1, 0] },
            },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            date: "$_id",
            pageViews: 1,
            downloads: 1,
          },
        },
      ])
      .toArray();

    return results;
  }

  async listEvents(
    query: PaginatedQuery & { type?: AnalyticsEventType },
  ): Promise<PaginatedResult<EventListItem>> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;

    if (!isMongoConfigured()) return emptyPaginated(page, pageSize);

    const { from, to } = resolveDateRange(query);
    const collection = await this.getCollection();
    const filter: Filter<AnalyticsEventDocument> = {
      createdAt: { $gte: from, $lte: to },
    };

    if (query.type) filter.type = query.type;
    if (query.search) {
      filter.$or = [
        { path: { $regex: query.search, $options: "i" } },
        { country: { $regex: query.search, $options: "i" } },
        { referrer: { $regex: query.search, $options: "i" } },
      ];
    }

    const [total, docs] = await Promise.all([
      collection.countDocuments(filter),
      collection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray(),
    ]);

    const items: EventListItem[] = docs.map((doc) => ({
      id: doc._id?.toString() ?? "",
      type: doc.type,
      path: doc.path,
      country: doc.country,
      device: doc.device,
      referrer: doc.referrer,
      browser: doc.browser,
      os: doc.os,
      metadata: doc.metadata,
      createdAt: doc.createdAt.toISOString(),
    }));

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async listUsers(
    query: PaginatedQuery,
  ): Promise<PaginatedResult<UserListItem>> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;

    if (!isMongoConfigured()) return emptyPaginated(page, pageSize);

    const { from, to } = resolveDateRange(query);
    const collection = await this.getCollection();

    const matchStage: Filter<AnalyticsEventDocument> = {
      createdAt: { $gte: from, $lte: to },
    };

    if (query.search) {
      matchStage.visitorId = { $regex: query.search, $options: "i" };
    }

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: "$visitorId",
          visits: {
            $sum: { $cond: [{ $eq: ["$type", "page_view"] }, 1, 0] },
          },
          downloads: {
            $sum: { $cond: [{ $eq: ["$type", "download"] }, 1, 0] },
          },
          lastSeen: { $max: "$createdAt" },
          country: { $last: "$country" },
          device: { $last: "$device" },
        },
      },
      { $sort: { lastSeen: -1 as const } },
      {
        $facet: {
          items: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
          total: [{ $count: "count" }],
        },
      },
    ];

    const [result] = await collection
      .aggregate<{
        items: Array<{
          _id: string;
          visits: number;
          downloads: number;
          lastSeen: Date;
          country: string | null;
          device: UserListItem["device"];
        }>;
        total: Array<{ count: number }>;
      }>(pipeline)
      .toArray();

    const total = result?.total[0]?.count ?? 0;
    const items: UserListItem[] = (result?.items ?? []).map((user) => ({
      visitorId: user._id,
      visits: user.visits,
      downloads: user.downloads,
      lastSeen: user.lastSeen.toISOString(),
      country: user.country,
      device: user.device,
    }));

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
