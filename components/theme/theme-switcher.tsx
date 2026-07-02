"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { ThemeIcon } from "@/components/theme/theme-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppTheme } from "@/hooks/use-app-theme";
import { THEME_OPTIONS, type ThemeMode } from "@/lib/theme";
import { cn } from "@/lib/utils";

const OPTION_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

interface ThemeSwitcherProps {
  className?: string;
  align?: "start" | "center" | "end";
}

export function ThemeSwitcher({
  className,
  align = "end",
}: ThemeSwitcherProps) {
  const { theme, resolvedTheme, mounted, setTheme } = useAppTheme();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-xl", className)}
          aria-label="Change theme"
        >
          <ThemeIcon theme={theme} resolvedTheme={resolvedTheme} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-44">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as ThemeMode)}
        >
          {THEME_OPTIONS.map((option) => {
            const Icon = OPTION_ICONS[option.value];

            return (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                className="gap-2"
              >
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                {option.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
