"use client";

import { useCallback, useState } from "react";

import { mapDownloadResult } from "@/lib/download/map-result";
import { requestDownload, triggerFileDownload } from "@/lib/download/client";
import { trackDownload } from "@/lib/analytics/client";
import { shouldShowAdPlacements } from "@/lib/ads/preview";
import { toast } from "@/lib/toast";
import type {
  DownloadMediaItem,
  DownloadResultData,
  DownloadResultState,
} from "@/types/download-result";

function buildDownloadFilename(
  data: DownloadResultData | null,
  item?: DownloadMediaItem,
): string {
  const mediaType = item?.type ?? data?.mediaType;
  const extension = mediaType === "photo" ? "jpg" : "mp4";
  const username = data?.username?.replace(/[^\w.-]/g, "") || "instagram";

  return `${username}-media.${extension}`;
}

export function useInstagramDownload() {
  const [state, setState] = useState<DownloadResultState>("idle");
  const [data, setData] = useState<DownloadResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [lastUrl, setLastUrl] = useState<string | null>(null);
  const [adPopupOpen, setAdPopupOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<
    DownloadMediaItem | undefined
  >(undefined);

  const submit = useCallback(async (url: string) => {
    setState("loading");
    setError(null);
    setData(null);
    setLastUrl(url);

    try {
      const result = await requestDownload(url);
      const mapped = mapDownloadResult(result);
      setData(mapped);
      setState("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setState("error");
      toast.error(message);
    }
  }, []);

  const executeDownload = useCallback(
    async (item?: DownloadMediaItem) => {
      const url = item?.downloadUrl ?? data?.downloadUrl;
      if (!url) {
        toast.error("Download URL is not available yet");
        return;
      }

      setDownloading(true);
      try {
        await triggerFileDownload(url, buildDownloadFilename(data, item));
        if (lastUrl) {
          await trackDownload(lastUrl, data?.mediaType ?? null);
        }
        toast.success("Download started");
      } catch {
        toast.error("Failed to start download");
      } finally {
        setDownloading(false);
      }
    },
    [data?.downloadUrl, data?.mediaType, lastUrl],
  );

  const downloadFile = useCallback(
    (item?: DownloadMediaItem) => {
      const url = item?.downloadUrl ?? data?.downloadUrl;
      if (!url) {
        toast.error("Download URL is not available yet");
        return;
      }

      if (shouldShowAdPlacements()) {
        setPendingDownload(item);
        setAdPopupOpen(true);
        return;
      }

      void executeDownload(item);
    },
    [data?.downloadUrl, executeDownload],
  );

  const confirmDownloadFromPopup = useCallback(() => {
    void executeDownload(pendingDownload);
    setAdPopupOpen(false);
    setPendingDownload(undefined);
  }, [executeDownload, pendingDownload]);

  const handleAdPopupOpenChange = useCallback((open: boolean) => {
    setAdPopupOpen(open);
    if (!open) {
      setPendingDownload(undefined);
    }
  }, []);

  const retry = useCallback(() => {
    if (lastUrl) void submit(lastUrl);
  }, [lastUrl, submit]);

  const reset = useCallback(() => {
    setState("idle");
    setData(null);
    setError(null);
    setLastUrl(null);
    setAdPopupOpen(false);
    setPendingDownload(undefined);
  }, []);

  return {
    state,
    data,
    error: error ?? undefined,
    downloading,
    adPopupOpen,
    submit,
    downloadFile,
    confirmDownloadFromPopup,
    handleAdPopupOpenChange,
    retry,
    reset,
  };
}
