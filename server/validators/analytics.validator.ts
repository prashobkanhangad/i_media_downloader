import { z } from "zod";

export const trackPageViewSchema = z.object({
  sessionId: z.string().min(1),
  visitorId: z.string().min(1),
  path: z.string().min(1),
  referrer: z.string().nullable().optional(),
});

export const trackDownloadSchema = z.object({
  sessionId: z.string().min(1),
  visitorId: z.string().min(1),
  path: z.string().min(1),
  url: z.string().url(),
  mediaType: z.string().nullable().optional(),
  referrer: z.string().nullable().optional(),
});

export const dashboardQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type TrackPageViewInput = z.infer<typeof trackPageViewSchema>;
export type TrackDownloadInput = z.infer<typeof trackDownloadSchema>;
