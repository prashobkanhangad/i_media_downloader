import {
  THEME_TRANSITION_CLASS,
  THEME_TRANSITION_DURATION_MS,
} from "@/lib/theme/config";

export function enableThemeTransition(): void {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  root.classList.add(THEME_TRANSITION_CLASS);

  window.setTimeout(() => {
    root.classList.remove(THEME_TRANSITION_CLASS);
  }, THEME_TRANSITION_DURATION_MS);
}

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
