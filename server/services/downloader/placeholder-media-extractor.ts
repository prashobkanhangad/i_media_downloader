import type { IMediaExtractor } from "@/server/interfaces/media-extractor.interface";
import type {
  ExtractMediaOptions,
  RawMediaPayload,
} from "@/server/types/downloader";

/**
 * Placeholder media extractor.
 * Replace with an official API provider implementation — no scraping.
 */
export class PlaceholderMediaExtractor implements IMediaExtractor {
  async extract(options: ExtractMediaOptions): Promise<RawMediaPayload> {
    return {
      source: "placeholder",
      url: options.url,
      shortcode: options.shortcode,
      mediaType: options.mediaType,
      raw: {
        note: "Media extraction not yet implemented",
        shortcode: options.shortcode,
        mediaType: options.mediaType,
      },
    };
  }
}
