"use client";

import { useEffect } from "react";

import { ErrorPage } from "@/components/error/error-page";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPage variant="500" errorMessage={error.message} onRetry={reset} />
  );
}
