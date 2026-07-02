import type { MediaType } from "@/server/types/analyze";

export interface InstagramUrlValidationResult {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

export interface ValidatedInstagramUrl {
  original: string;
  normalized: string;
  hostname: string;
  pathname: string;
}

export interface ParsedShortcode {
  shortcode: string;
  mediaType: MediaType;
}

export interface RawMediaCarouselItem {
  id: string;
  type: "video" | "photo";
  thumbnailUrl: string | null;
  previewUrl: string | null;
  downloadUrl: string | null;
  width?: number | null;
  height?: number | null;
  duration?: number | null;
}

export interface RawMediaPayload {
  source: "placeholder" | "instagram-graphql";
  url: string;
  shortcode: string;
  mediaType: MediaType;
  username?: string | null;
  caption?: string | null;
  title?: string | null;
  thumbnailUrl?: string | null;
  downloadUrl?: string | null;
  previewUrl?: string | null;
  width?: number | null;
  height?: number | null;
  duration?: number | null;
  isCarousel?: boolean;
  carouselItems?: RawMediaCarouselItem[];
  raw: Record<string, unknown>;
}

export interface NormalizedMediaResponse {
  url: string;
  shortcode: string;
  mediaType: MediaType;
  username: string | null;
  caption: string | null;
  title: string | null;
  thumbnailUrl: string | null;
  downloadUrl: string | null;
  previewUrl: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  isCarousel: boolean;
  carouselItems: RawMediaCarouselItem[];
  extractedAt: string;
}

export interface ExtractMediaOptions {
  url: string;
  shortcode: string;
  mediaType: MediaType;
}
