"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";

import type { ThemeMode } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ThemeIconProps {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  className?: string;
}

const iconTransition = {
  initial: { opacity: 0, rotate: -45, scale: 0.8 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 45, scale: 0.8 },
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
};

export function ThemeIcon({ theme, resolvedTheme, className }: ThemeIconProps) {
  const Icon =
    theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div className={cn("relative h-5 w-5", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${theme}-${resolvedTheme}`}
          initial={iconTransition.initial}
          animate={iconTransition.animate}
          exit={iconTransition.exit}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function getThemeIcon(theme: ThemeMode) {
  switch (theme) {
    case "light":
      return Sun;
    case "dark":
      return Moon;
    case "system":
      return Monitor;
  }
}
