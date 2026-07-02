import * as React from "react";

import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-white/20 bg-white/40 p-6 shadow-lg shadow-black/[0.03] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20",
        hover &&
          "transition-all duration-300 hover:border-white/30 hover:bg-white/50 hover:shadow-xl dark:hover:border-white/15 dark:hover:bg-white/[0.08]",
        className,
      )}
      {...props}
    />
  ),
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
