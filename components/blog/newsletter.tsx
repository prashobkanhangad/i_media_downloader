"use client";

import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  className?: string;
  compact?: boolean;
}

export function Newsletter({ className, compact = false }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 500));
      toast.success("Thanks for subscribing!");
      setEmail("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
        <Sparkles className="h-4 w-4" />
        <p className="text-sm font-semibold tracking-[0.15em] uppercase">
          Newsletter
        </p>
      </div>
      <h3
        className={cn(
          "mt-3 font-semibold tracking-tight",
          compact ? "text-lg" : "text-xl",
        )}
      >
        Get download tips in your inbox
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Occasional guides on saving Instagram reels, stories, and photos.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className="rounded-xl"
        />
        <Button type="submit" className="w-full rounded-xl" disabled={loading}>
          <Mail className="h-4 w-4" />
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </GlassCard>
  );
}
