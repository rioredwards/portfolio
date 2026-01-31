"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-content-px">
      <h1
        className="text-5xl font-semibold md:text-7xl"
        style={{ fontFamily: "var(--font-mazaeni), serif" }}
      >
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset} size="lg">
          Try Again
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </main>
  );
}
