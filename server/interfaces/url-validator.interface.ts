import type { InstagramUrlValidationResult } from "@/server/types/downloader";

export interface IUrlValidator {
  validate(url: string): InstagramUrlValidationResult;
}
