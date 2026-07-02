import type { IUrlValidator } from "@/server/interfaces/url-validator.interface";
import type { InstagramUrlValidationResult } from "@/server/types/downloader";
import { validateInstagramUrl } from "@/lib/validators/instagram-url";

export class UrlValidatorAdapter implements IUrlValidator {
  validate(url: string): InstagramUrlValidationResult {
    const result = validateInstagramUrl(url);

    if (result.success) {
      return {
        isValid: true,
        normalized: result.data,
      };
    }

    return {
      isValid: false,
      error: result.error.issues[0]?.message ?? "Invalid Instagram URL",
    };
  }
}
