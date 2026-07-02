"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { UrlDownloadSection } from "@/components/download/url-download-section";
import { appleEase } from "@/utils/animation";

const ease = appleEase;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-start px-4 pt-6 pb-16 sm:px-6 md:pt-10 md:pb-20">
      <motion.div
        className="container mx-auto max-w-4xl text-center"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div variants={item}>
          <Badge variant="glass" className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Free &amp; No Login Required
          </Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Download Instagram
          <span className="mt-1 block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-rose-400">
            Videos Instantly
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
        >
          Paste any Instagram reel, post, or story link and download in HD
          quality. Fast, secure, and works on every device.
        </motion.p>

        <motion.div variants={item} className="mx-auto mt-10 w-full max-w-2xl">
          <UrlDownloadSection variant="hero" showIdleResult />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 text-sm text-muted-foreground"
        >
          Supports Reels, IGTV, Posts &amp; Stories
        </motion.p>
      </motion.div>
    </section>
  );
}
