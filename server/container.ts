import type { IAnalyticsRepository } from "@/server/interfaces/analytics.interface";
import type { IAnalyticsService } from "@/server/interfaces/analytics.interface";
import type { IDownloaderService } from "@/server/interfaces/downloader-service.interface";
import type { IMediaExtractor } from "@/server/interfaces/media-extractor.interface";
import type { IUrlValidator } from "@/server/interfaces/url-validator.interface";
import { AnalyticsRepository } from "@/server/repositories/analytics.repository";
import { AnalyticsService } from "@/server/services/analytics/analytics.service";
import {
  DownloaderService,
  InstagramGraphqlExtractor,
  PlaceholderMediaExtractor,
  UrlValidatorAdapter,
} from "@/server/services/downloader";

export interface ServiceContainer {
  downloaderService: IDownloaderService;
  analyticsService: IAnalyticsService;
  analyticsRepository: IAnalyticsRepository;
}

export interface ServiceContainerDependencies {
  urlValidator?: IUrlValidator;
  mediaExtractor?: IMediaExtractor;
  analyticsRepository?: IAnalyticsRepository;
  analyticsService?: IAnalyticsService;
}

let container: ServiceContainer | null = null;

export function createServiceContainer(
  deps: ServiceContainerDependencies = {},
): ServiceContainer {
  const urlValidator = deps.urlValidator ?? new UrlValidatorAdapter();
  const mediaExtractor =
    deps.mediaExtractor ??
    (process.env.INSTAGRAM_USE_PLACEHOLDER_EXTRACTOR === "true"
      ? new PlaceholderMediaExtractor()
      : new InstagramGraphqlExtractor());
  const analyticsRepository =
    deps.analyticsRepository ?? new AnalyticsRepository();
  const analyticsService =
    deps.analyticsService ?? new AnalyticsService(analyticsRepository);

  return {
    downloaderService: new DownloaderService(urlValidator, mediaExtractor),
    analyticsRepository,
    analyticsService,
  };
}

export function getServiceContainer(): ServiceContainer {
  if (!container) {
    container = createServiceContainer();
  }
  return container;
}

export function resetServiceContainer(): void {
  container = null;
}

export function getDownloaderService(): IDownloaderService {
  return getServiceContainer().downloaderService;
}

export function getAnalyticsService(): IAnalyticsService {
  return getServiceContainer().analyticsService;
}

export function getAnalyticsRepository(): IAnalyticsRepository {
  return getServiceContainer().analyticsRepository;
}
