"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value?: number;
  indeterminate?: boolean;
  className?: string;
  barClassName?: string;
  label?: string;
}

export function ProgressBar({
  value = 0,
  indeterminate = false,
  className,
  barClassName,
  label = "Loading progress",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : clampedValue}
    >
      {indeterminate ? (
        <motion.div
          className={cn(
            "absolute h-full w-1/3 rounded-full bg-primary",
            barClassName,
          )}
          animate={{ x: ["-100%", "400%"] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : (
        <motion.div
          className={cn("h-full rounded-full bg-primary", barClassName)}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
}
