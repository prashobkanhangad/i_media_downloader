import { z } from "zod";

const INSTAGRAM_HOSTS = ["instagram.com", "www.instagram.com"] as const;

const INSTAGRAM_PATH_PATTERNS = [
  /^\/reel\/[\w-]+/i,
  /^\/reels\/[\w-]+/i,
  /^\/p\/[\w-]+/i,
  /^\/stories\/[\w.-]+\/[\w-]+/i,
  /^\/stories\/highlights\/[\w-]+/i,
] as const;

export const INSTAGRAM_URL_EXAMPLES = [
  "https://instagram.com/reel/ABC123",
  "https://instagram.com/p/ABC123",
  "https://instagram.com/reels/ABC123",
  "https://instagram.com/stories/username/123456789",
] as const;

export function normalizeInstagramUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function isValidInstagramUrl(value: string): boolean {
  if (!value.trim()) return false;

  try {
    const url = new URL(normalizeInstagramUrl(value));
    const isInstagramHost = INSTAGRAM_HOSTS.includes(
      url.hostname.toLowerCase() as (typeof INSTAGRAM_HOSTS)[number],
    );

    if (!isInstagramHost) return false;

    return INSTAGRAM_PATH_PATTERNS.some((pattern) =>
      pattern.test(url.pathname),
    );
  } catch {
    return false;
  }
}

export const instagramUrlSchema = z
  .string()
  .min(1, "URL is required")
  .transform(normalizeInstagramUrl)
  .refine((value) => {
    try {
      z.string().url().parse(value);
      return true;
    } catch {
      return false;
    }
  }, "Please enter a valid URL")
  .refine(isValidInstagramUrl, {
    message: "Enter a valid Instagram URL (reel, post, reels, or stories link)",
  });

export const urlSchema = z.object({
  url: instagramUrlSchema,
});

export type UrlFormValues = z.infer<typeof urlSchema>;

export function validateInstagramUrl(value: string) {
  return instagramUrlSchema.safeParse(value);
}
