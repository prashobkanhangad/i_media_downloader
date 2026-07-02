import { z } from "zod";

export const adminLoginSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
});

export const paginatedQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
  search: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  type: z.enum(["page_view", "download"]).optional(),
});

export type PaginatedQueryInput = z.infer<typeof paginatedQuerySchema>;
