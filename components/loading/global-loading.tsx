"use client";

import { AnimatePresence, motion } from "framer-motion";

import { ProgressBar } from "@/components/loading/progress-bar";
import { Spinner } from "@/components/loading/spinner";
import { useGlobalLoading } from "@/hooks/use-global-loading";
import { cn } from "@/lib/utils";

interface GlobalLoadingProps {
  className?: string;
}

export function GlobalLoading({ className }: GlobalLoadingProps) {
  const { isLoading, message } = useGlobalLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6",
            "bg-background/80 backdrop-blur-sm",
            className,
          )}
          role="alert"
          aria-live="assertive"
          aria-busy="true"
        >
          <Spinner size="lg" />
          {message && (
            <p className="text-sm font-medium text-muted-foreground">
              {message}
            </p>
          )}
          <div className="w-48">
            <ProgressBar indeterminate />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
