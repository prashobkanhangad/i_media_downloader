import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UiState {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: false,
        setSidebarOpen: (open) => set({ isSidebarOpen: open }),
        toggleSidebar: () =>
          set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      }),
      {
        name: "ui-store",
        partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
      },
    ),
    { name: "UiStore" },
  ),
);
