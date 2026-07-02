"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/loading/spinner";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export function LoadingButton({
  loading = false,
  loadingText,
  children,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(className)}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" className="text-current" />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
