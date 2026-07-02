"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { InstagramUrlInput } from "@/components/ui/instagram-url-input";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { urlSchema, type UrlFormValues } from "@/lib/validators/instagram-url";
import { cn } from "@/lib/utils";

interface UrlDownloadFormProps {
  className?: string;
  variant?: "default" | "hero";
  loading?: boolean;
  disabled?: boolean;
  onSubmit?: (data: UrlFormValues) => void;
}

export function UrlDownloadForm({
  className,
  variant = "default",
  loading = false,
  disabled = false,
  onSubmit,
}: UrlDownloadFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UrlFormValues>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "" },
    mode: "onSubmit",
  });

  const handleFormSubmit = (data: UrlFormValues) => {
    onSubmit?.(data);
  };

  const isHero = variant === "hero";
  const isLoading = loading || isSubmitting;
  const isDisabled = disabled || isLoading;

  return (
    <GlassCard className={cn("p-2", isHero && "p-2 sm:p-3", className)}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn(
          "flex flex-col gap-3",
          isHero && "sm:flex-row sm:items-start",
        )}
      >
        <div className="flex-1">
          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <InstagramUrlInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.url?.message}
                loading={isLoading}
                disabled={isDisabled}
                validateOnChange={false}
              />
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isDisabled}
          size="lg"
          className={cn(
            "h-12 rounded-2xl px-8 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/25 sm:h-[3.25rem]",
            isHero && "w-full sm:w-auto sm:shrink-0",
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Processing...
            </span>
          ) : (
            <>
              <Download className="h-5 w-5" />
              Download
            </>
          )}
        </Button>
      </form>
    </GlassCard>
  );
}
