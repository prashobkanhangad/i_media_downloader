export type { ApiError, ApiResponse, PaginatedResponse } from "@/types/api";
export type {
  DownloadMediaItem,
  DownloadMediaType,
  DownloadResultData,
  DownloadResultState,
} from "@/types/download-result";
export { MEDIA_TYPE_LABELS } from "@/types/download-result";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
