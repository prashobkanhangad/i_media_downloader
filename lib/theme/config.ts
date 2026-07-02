import type { ThemeMode, ThemeOption } from "@/lib/theme/types";

export const THEME_STORAGE_KEY = "ig-downloader-theme";

export const DEFAULT_THEME: ThemeMode = "system";

export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    description: "Always use light mode",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Always use dark mode",
  },
  {
    value: "system",
    label: "System",
    description: "Match your device settings",
  },
];

export const THEME_TRANSITION_CLASS = "theme-transition";

export const THEME_TRANSITION_DURATION_MS = 300;
