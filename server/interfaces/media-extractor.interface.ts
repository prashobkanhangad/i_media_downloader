import type {
  ExtractMediaOptions,
  RawMediaPayload,
} from "@/server/types/downloader";

export interface IMediaExtractor {
  extract(options: ExtractMediaOptions): Promise<RawMediaPayload>;
}
