import Link from "next/link";
import { AlertTriangle, FileQuestion, ServerCrash } from "lucide-react";
import type { ReactNode } from "react";

import { RetryButton } from "@/components/error/retry-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorPageVariant = "404" | "500" | "error";

interface ErrorPageProps {
  variant?: ErrorPageVariant;
  title?: string;
  description?: string;
  code?: string;
  errorMessage?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
  children?: ReactNode;
  className?: string;
}

const VARIANT_CONFIG = {
  "404": {
    icon: FileQuestion,
    defaultTitle: "Page not found",
    defaultDescription:
      "The page you are looking for does not exist or has been moved.",
    code: "404",
  },
  "500": {
    icon: ServerCrash,
    defaultTitle: "Server error",
    defaultDescription:
      "Something went wrong on our end. Please try again in a moment.",
    code: "500",
  },
  error: {
    icon: AlertTriangle,
    defaultTitle: "Something went wrong",
    defaultDescription: "An unexpected error occurred. Please try again.",
    code: "Error",
  },
} as const;

export function ErrorPage({
  variant = "error",
  title,
  description,
  code,
  errorMessage,
  onRetry,
  showHomeButton = true,
  children,
  className,
}: ErrorPageProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;
  const displayCode = code ?? config.code;
  const displayTitle = title ?? config.defaultTitle;
  const displayDescription = description ?? config.defaultDescription;

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center px-4 py-16",
        className,
      )}
    >
      <GlassCard className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <Icon className="h-8 w-8 text-destructive" />
        </div>

        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          {displayCode}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {displayTitle}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {displayDescription}
        </p>

        {errorMessage && process.env.NODE_ENV === "development" && (
          <p className="mt-4 rounded-xl bg-muted/60 p-3 text-left font-mono text-xs text-muted-foreground">
            {errorMessage}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {onRetry && (
            <RetryButton onRetry={onRetry} className="w-full sm:w-auto" />
          )}
          {showHomeButton && (
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="/">Go home</Link>
            </Button>
          )}
        </div>

        {children}
      </GlassCard>
    </div>
  );
}
