import { z } from "zod";

import { instagramUrlSchema } from "@/lib/validators/instagram-url";

export const analyzeRequestSchema = z.object({
  url: instagramUrlSchema,
});

export type AnalyzeRequestInput = z.infer<typeof analyzeRequestSchema>;
