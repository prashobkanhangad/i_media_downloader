import { z } from "zod";

import { instagramUrlSchema } from "@/lib/validators/instagram-url";

export const downloadRequestSchema = z.object({
  url: instagramUrlSchema,
  sessionId: z.string().min(1).optional(),
  visitorId: z.string().min(1).optional(),
  path: z.string().min(1).optional(),
  mediaType: z.string().nullable().optional(),
});

export const downloadFileQuerySchema = z.object({
  url: z.string().url(),
  filename: z.string().min(1).max(200).optional().default("instagram-media"),
});

export type DownloadRequestInput = z.infer<typeof downloadRequestSchema>;
export type DownloadFileQueryInput = z.infer<typeof downloadFileQuerySchema>;
