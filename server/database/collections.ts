export const ANALYTICS_COLLECTIONS = {
  EVENTS: "analytics_events",
  DAILY_STATS: "analytics_daily_stats",
} as const;

export const ANALYTICS_INDEXES = {
  EVENTS: [
    { key: { type: 1, createdAt: -1 } },
    { key: { path: 1, createdAt: -1 } },
    { key: { visitorId: 1, createdAt: -1 } },
    { key: { sessionId: 1 } },
    { key: { country: 1, createdAt: -1 } },
    { key: { device: 1, createdAt: -1 } },
    { key: { createdAt: -1 } },
  ],
} as const;
