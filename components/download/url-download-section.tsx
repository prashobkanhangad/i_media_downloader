"use client";

import { useEffect, useRef } from "react";

import { DownloadResult } from "@/components/download-result";
import { AdBanner } from "@/components/ads/ad-banner";
import { DownloadAdPopup } from "@/components/ads/download-ad-popup";
import { UrlDownloadForm } from "@/features/home/components/url-download-form";
import { useInstagramDownload } from "@/hooks/use-instagram-download";
import type { UrlFormValues } from "@/lib/validators/instagram-url";
import { cn } from "@/lib/utils";

interface UrlDownloadSectionProps {
  className?: string;
  formClassName?: string;
  resultClassName?: string;
  variant?: "default" | "hero";
  showIdleResult?: boolean;
}

export function UrlDownloadSection({
  className,
  formClassName,
  resultClassName,
  variant = "hero",
  showIdleResult = false,
}: UrlDownloadSectionProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const {
    state,
    data,
    error,
    downloading,
    adPopupOpen,
    submit,
    downloadFile,
    confirmDownloadFromPopup,
    handleAdPopupOpenChange,
    retry,
  } = useInstagramDownload();

  const isLoading = state === "loading";

  useEffect(() => {
    if (state === "success" || state === "error") {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [state]);

  const handleSubmit = (values: UrlFormValues) => {
    void submit(values.url);
  };

  const resultState = showIdleResult || state !== "idle" ? state : "idle";

  return (
    <div className={cn("w-full space-y-6", className)}>
      <UrlDownloadForm
        variant={variant}
        className={formClassName}
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleSubmit}
      />

      {(showIdleResult || state !== "idle") && (
        <div ref={resultRef} className="space-y-6">
          <DownloadResult
            state={resultState}
            data={data}
            error={error}
            downloading={downloading}
            onDownload={downloadFile}
            onRetry={retry}
            className={resultClassName}
          />
          {(state === "success" || state === "error") && (
            <AdBanner slotKey="downloadResult" compact />
          )}
        </div>
      )}

      <DownloadAdPopup
        open={adPopupOpen}
        onOpenChange={handleAdPopupOpenChange}
        onContinue={confirmDownloadFromPopup}
        downloading={downloading}
      />
    </div>
  );
}
