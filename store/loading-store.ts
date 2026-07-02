import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LoadingState {
  isLoading: boolean;
  message: string | null;
  start: (message?: string) => void;
  stop: () => void;
}

export const useLoadingStore = create<LoadingState>()(
  devtools(
    (set) => ({
      isLoading: false,
      message: null,
      start: (message) => set({ isLoading: true, message: message ?? null }),
      stop: () => set({ isLoading: false, message: null }),
    }),
    { name: "LoadingStore" },
  ),
);
