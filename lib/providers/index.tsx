"use client";

import { type ReactNode } from "react";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { Toaster } from "@/components/feedback";
import { GlobalLoading } from "@/components/loading/global-loading";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { QueryProvider } from "@/lib/providers/query-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ErrorBoundary>
          <AnalyticsProvider />
          {children}
          <GlobalLoading />
          <Toaster position="top-right" richColors closeButton />
        </ErrorBoundary>
      </QueryProvider>
    </ThemeProvider>
  );
}
