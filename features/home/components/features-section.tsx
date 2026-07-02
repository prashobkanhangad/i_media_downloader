"use client";

import { motion } from "framer-motion";

import { GlassCard } from "@/components/ui/glass-card";
import { Section, SectionGrid } from "@/components/ui/section";
import { features } from "@/features/home/data/landing-content";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { appleEase } from "@/utils/animation";

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "-40px",
  });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: appleEase,
      }}
    >
      <GlassCard hover className="h-full">
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl",
            "bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15",
            "dark:from-violet-500/20 dark:to-fuchsia-500/20",
          )}
        >
          <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </GlassCard>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <Section
      id="features"
      badge="Features"
      title="Everything you need"
      subtitle="A premium download experience built for speed, privacy, and simplicity."
    >
      <SectionGrid columns={3}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </SectionGrid>
    </Section>
  );
}
