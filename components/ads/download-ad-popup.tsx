"use client";

import { Download } from "lucide-react";

import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { AdUnit } from "@/components/ads/ad-unit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdsLive, useShowAdPlacements } from "@/hooks/use-ads-enabled";
import { adsConfig } from "@/lib/ads/config";

interface DownloadAdPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  downloading?: boolean;
}

export function DownloadAdPopup({
  open,
  onOpenChange,
  onContinue,
  downloading = false,
}: DownloadAdPopupProps) {
  const showPlacements = useShowAdPlacements();
  const adsLive = useAdsLive();
  const slot = adsConfig.getSlot("downloadPopup");
  const placement = adsConfig.getFormat("downloadPopup");
  const useLiveUnit = adsLive && adsConfig.isValidSlot(slot);

  if (!showPlacements) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your download is ready</DialogTitle>
          <DialogDescription>
            View this message, then continue to save your file.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/20 px-3 py-3">
          <p className="mb-2 text-center text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Advertisement
          </p>
          {useLiveUnit && slot ? (
            <AdUnit
              slot={slot}
              placement={placement}
              className="min-h-[250px]"
            />
          ) : (
            <AdPlaceholder
              label={adsConfig.getPreviewLabel("downloadPopup")}
              placement={placement}
            />
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={onContinue}
            disabled={downloading}
            className="h-11 w-full rounded-xl font-semibold sm:w-auto"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Downloading..." : "Continue Download"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
