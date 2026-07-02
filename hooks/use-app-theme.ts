"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";

import { useMounted } from "@/hooks/use-mounted";
import {
  DEFAULT_THEME,
  enableThemeTransition,
  type ThemeMode,
} from "@/lib/theme";

export function useAppTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const mounted = useMounted();

  const currentTheme = (theme ?? DEFAULT_THEME) as ThemeMode;
  const activeTheme = (resolvedTheme ?? "light") as "light" | "dark";

  const setAppTheme = useCallback(
    (nextTheme: ThemeMode) => {
      enableThemeTransition();
      setTheme(nextTheme);
    },
    [setTheme],
  );

  const toggleTheme = useCallback(() => {
    setAppTheme(activeTheme === "dark" ? "light" : "dark");
  }, [activeTheme, setAppTheme]);

  const cycleTheme = useCallback(() => {
    const order: ThemeMode[] = ["light", "dark", "system"];
    const currentIndex = order.indexOf(currentTheme);
    const nextTheme = order[(currentIndex + 1) % order.length] ?? "system";
    setAppTheme(nextTheme);
  }, [currentTheme, setAppTheme]);

  return {
    theme: currentTheme,
    resolvedTheme: activeTheme,
    systemTheme: (systemTheme ?? "light") as "light" | "dark",
    mounted,
    isDark: activeTheme === "dark",
    isLight: activeTheme === "light",
    isSystem: currentTheme === "system",
    setTheme: setAppTheme,
    toggleTheme,
    cycleTheme,
  };
}
