import type { MediaType } from "@/server/types/analyze";
import type {
  InstagramUrlValidationResult,
  NormalizedMediaResponse,
  ParsedShortcode,
  RawMediaPayload,
} from "@/server/types/downloader";

export interface IDownloaderService {
  validateInstagramURL(url: string): InstagramUrlValidationResult;
  parseShortcode(url: string): ParsedShortcode | null;
  detectMediaType(url: string): MediaType;
  extractMedia(url: string): Promise<RawMediaPayload>;
  normalizeResponse(raw: RawMediaPayload): NormalizedMediaResponse;
}
