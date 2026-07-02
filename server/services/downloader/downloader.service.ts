import type { IDownloaderService } from "@/server/interfaces/downloader-service.interface";
import type { IMediaExtractor } from "@/server/interfaces/media-extractor.interface";
import type { IUrlValidator } from "@/server/interfaces/url-validator.interface";
import type { MediaType } from "@/server/types/analyze";
import type {
  InstagramUrlValidationResult,
  NormalizedMediaResponse,
  ParsedShortcode,
  RawMediaPayload,
} from "@/server/types/downloader";
import { ValidationException } from "@/server/utils/api-error";
import { normalizeInstagramUrl } from "@/lib/validators/instagram-url";

export class DownloaderService implements IDownloaderService {
  constructor(
    private readonly urlValidator: IUrlValidator,
    private readonly mediaExtractor: IMediaExtractor,
  ) {}

  validateInstagramURL(url: string): InstagramUrlValidationResult {
    return this.urlValidator.validate(url);
  }

  detectMediaType(url: string): MediaType {
    const normalized = normalizeInstagramUrl(url);
    const pathname = new URL(normalized).pathname;

    if (/^\/reels?\//i.test(pathname)) return "reel";
    if (/^\/p\//i.test(pathname)) return "post";
    if (/^\/stories\//i.test(pathname)) return "story";
    if (pathname.includes("/tv/")) return "igtv";

    return "unknown";
  }

  parseShortcode(url: string): ParsedShortcode | null {
    const validation = this.validateInstagramURL(url);
    if (!validation.isValid || !validation.normalized) return null;

    const mediaType = this.detectMediaType(validation.normalized);
    const pathname = new URL(validation.normalized).pathname;
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return null;

    let shortcode: string | null = null;

    switch (mediaType) {
      case "reel":
      case "post":
        shortcode = segments[1] ?? null;
        break;
      case "story":
        shortcode =
          segments[0] === "stories" && segments[1] === "highlights"
            ? (segments[2] ?? null)
            : (segments[2] ?? segments[1] ?? null);
        break;
      case "igtv":
        shortcode = segments[segments.length - 1] ?? null;
        break;
      default:
        shortcode = segments[segments.length - 1] ?? null;
    }

    if (!shortcode) return null;

    return { shortcode, mediaType };
  }

  async extractMedia(url: string): Promise<RawMediaPayload> {
    const validation = this.validateInstagramURL(url);

    if (!validation.isValid || !validation.normalized) {
      throw new ValidationException(
        validation.error ?? "Invalid Instagram URL",
      );
    }

    const parsed = this.parseShortcode(validation.normalized);

    if (!parsed) {
      throw new ValidationException("Unable to parse shortcode from URL");
    }

    return this.mediaExtractor.extract({
      url: validation.normalized,
      shortcode: parsed.shortcode,
      mediaType: parsed.mediaType,
    });
  }

  normalizeResponse(raw: RawMediaPayload): NormalizedMediaResponse {
    return {
      url: raw.url,
      shortcode: raw.shortcode,
      mediaType: raw.mediaType,
      username: raw.username ?? null,
      caption: raw.caption ?? raw.title ?? null,
      title: raw.title ?? raw.caption ?? null,
      thumbnailUrl: raw.thumbnailUrl ?? null,
      downloadUrl: raw.downloadUrl ?? null,
      previewUrl: raw.previewUrl ?? raw.downloadUrl ?? null,
      width: raw.width ?? null,
      height: raw.height ?? null,
      duration: raw.duration ?? null,
      isCarousel: raw.isCarousel ?? false,
      carouselItems: raw.carouselItems ?? [],
      extractedAt: new Date().toISOString(),
    };
  }
}
