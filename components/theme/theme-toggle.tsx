"use client";

import { ThemeIcon } from "@/components/theme/theme-icon";
import { Button } from "@/components/ui/button";
import { useAppTheme } from "@/hooks/use-app-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/** Compact toggle — cycles light → dark → system */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, resolvedTheme, mounted, cycleTheme } = useAppTheme();

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-xl", className)}
        aria-label="Theme"
        disabled
      >
        <span className="h-5 w-5 animate-pulse rounded-full bg-muted" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-xl", className)}
      aria-label={`Current theme: ${theme}. Click to cycle.`}
      onClick={cycleTheme}
    >
      <ThemeIcon theme={theme} resolvedTheme={resolvedTheme} />
    </Button>
  );
}
