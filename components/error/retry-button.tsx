"use client";

import { RotateCcw } from "lucide-react";

import { LoadingButton } from "@/components/loading/loading-button";
import { cn } from "@/lib/utils";

interface RetryButtonProps {
  onRetry: () => void;
  loading?: boolean;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
}

export function RetryButton({
  onRetry,
  loading = false,
  label = "Try again",
  className,
  variant = "default",
}: RetryButtonProps) {
  return (
    <LoadingButton
      onClick={onRetry}
      loading={loading}
      loadingText="Retrying..."
      variant={variant}
      className={cn("rounded-2xl", className)}
    >
      <RotateCcw className="h-4 w-4" />
      {label}
    </LoadingButton>
  );
}
