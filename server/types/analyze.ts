export type MediaType = "reel" | "post" | "story" | "igtv" | "unknown";

export interface AnalyzeRequest {
  url: string;
}

export interface AnalyzeData {
  url: string;
  mediaType: MediaType;
  isSupported: boolean;
}

export interface AnalyzeResult {
  url: string;
  mediaType: MediaType;
  isSupported: boolean;
  analyzedAt: string;
}
