"use client";

import { useEffect } from "react";

import { ErrorPage } from "@/components/error/error-page";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <ErrorPage
          variant="500"
          title="Application error"
          description="A critical error occurred. Please refresh the page or try again later."
          errorMessage={error.message}
          onRetry={reset}
        />
      </body>
    </html>
  );
}
