import type { IMediaExtractor } from "@/server/interfaces/media-extractor.interface";
import type {
  ExtractMediaOptions,
  RawMediaPayload,
} from "@/server/types/downloader";
import { ApiException } from "@/server/utils/api-error";
import {
  fetchInstagramMediaByShortcode,
  isStoryMediaType,
} from "@/server/utils/instagram-graphql";

export class InstagramGraphqlExtractor implements IMediaExtractor {
  async extract(options: ExtractMediaOptions): Promise<RawMediaPayload> {
    if (isStoryMediaType(options.mediaType)) {
      throw new ApiException(
        "Story downloads are not supported yet. Try a public reel or post link.",
        400,
      );
    }

    const media = await fetchInstagramMediaByShortcode(options.shortcode);

    return {
      source: "instagram-graphql",
      url: options.url,
      shortcode: options.shortcode,
      mediaType: options.mediaType,
      username: media.username,
      caption: media.caption,
      title: media.caption,
      thumbnailUrl: media.thumbnailUrl,
      downloadUrl: media.downloadUrl,
      previewUrl: media.previewUrl,
      width: media.width,
      height: media.height,
      duration: media.duration,
      isCarousel: media.isCarousel,
      carouselItems: media.carouselItems,
      raw: {
        username: media.username,
        isCarousel: media.isCarousel,
        carouselCount: media.carouselItems.length,
      },
    };
  }
}
