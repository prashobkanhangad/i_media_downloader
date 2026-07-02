"use client";

import { Suspense } from "react";

import { PageViewTracker } from "@/components/analytics/page-view-tracker";

function PageViewTrackerInner() {
  return <PageViewTracker />;
}

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}
