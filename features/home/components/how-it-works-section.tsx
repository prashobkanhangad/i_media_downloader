"use client";

import { motion } from "framer-motion";

import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { howItWorksSteps } from "@/features/home/data/landing-content";
import { useInView } from "@/hooks/use-in-view";
import { appleEase } from "@/utils/animation";

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof howItWorksSteps)[number];
  index: number;
  isLast: boolean;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: "-40px",
  });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: appleEase,
      }}
      className="relative flex flex-col items-center text-center"
    >
      {!isLast && (
        <div
          aria-hidden
          className="absolute top-10 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-violet-500/30 to-transparent lg:block"
        />
      )}
      <GlassCard className="relative w-full max-w-xs">
        <div className="absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-bold text-white shadow-lg">
          {step.step}
        </div>
        <div className="flex flex-col items-center pt-4">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 dark:from-violet-500/20 dark:to-fuchsia-500/20">
            <Icon className="h-7 w-7 text-violet-600 dark:text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <Section
      id="how-it-works"
      badge="How It Works"
      title="Three simple steps"
      subtitle="Download any public Instagram video in under a minute."
      className="bg-muted/30 dark:bg-muted/10"
    >
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
        {howItWorksSteps.map((step, index) => (
          <StepCard
            key={step.step}
            step={step}
            index={index}
            isLast={index === howItWorksSteps.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
