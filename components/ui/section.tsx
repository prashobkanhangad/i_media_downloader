"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { appleEase } from "@/utils/animation";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  containerClassName?: string;
}

function Section({
  id,
  title,
  subtitle,
  badge,
  centered = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative py-20 md:py-28", className)}
      {...props}
    >
      <div
        className={cn(
          "container mx-auto max-w-6xl px-4 sm:px-6",
          containerClassName,
        )}
      >
        {(badge || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: appleEase }}
            className={cn("mb-12 md:mb-16", centered && "text-center")}
          >
            {badge && (
              <p className="mb-4 text-sm font-medium tracking-wide text-primary uppercase">
                {badge}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-4 text-base text-muted-foreground sm:text-lg",
                  centered && "mx-auto max-w-2xl",
                )}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

interface SectionGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
}

function SectionGrid({ className, columns = 3, ...props }: SectionGridProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-5 md:gap-6", gridCols[columns], className)}
      {...props}
    />
  );
}

export { Section, SectionGrid };
