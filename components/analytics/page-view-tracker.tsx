"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackPageView } from "@/lib/analytics/client";

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;

    if (lastTracked.current === fullPath) return;
    lastTracked.current = fullPath;

    trackPageView(fullPath);
  }, [pathname, searchParams]);

  return null;
}
