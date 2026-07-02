export type ThemeMode = "light" | "dark" | "system";

export type ResolvedTheme = "light" | "dark";

export interface ThemeOption {
  value: ThemeMode;
  label: string;
  description: string;
}
