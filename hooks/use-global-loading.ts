"use client";

import { useLoadingStore } from "@/store/loading-store";

export function useGlobalLoading() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const message = useLoadingStore((state) => state.message);
  const start = useLoadingStore((state) => state.start);
  const stop = useLoadingStore((state) => state.stop);

  return { isLoading, message, start, stop };
}
