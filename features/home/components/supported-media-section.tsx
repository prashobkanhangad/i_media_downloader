"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Section, SectionGrid } from "@/components/ui/section";
import { supportedMedia } from "@/features/home/data/landing-content";
import { useInView } from "@/hooks/use-in-view";
import { appleEase } from "@/utils/animation";

function MediaCard({
  media,
  index,
}: {
  media: (typeof supportedMedia)[number];
  index: number;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "-40px",
  });
  const Icon = media.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: appleEase,
      }}
    >
      <GlassCard hover className="group relative h-full overflow-hidden">
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 dark:from-violet-500/20 dark:to-fuchsia-500/20">
              <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <Badge variant="primary">{media.tag}</Badge>
          </div>
          <h3 className="text-lg font-semibold tracking-tight">
            {media.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {media.description}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function SupportedMediaSection() {
  return (
    <Section
      id="supported-media"
      badge="Supported Media"
      title="Download any format"
      subtitle="We support all major Instagram content types in the highest available quality."
    >
      <SectionGrid columns={4}>
        {supportedMedia.map((media, index) => (
          <MediaCard key={media.title} media={media} index={index} />
        ))}
      </SectionGrid>
    </Section>
  );
}
