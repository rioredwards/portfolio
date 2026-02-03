import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-background px-content-px">
      <h1
        className="text-5xl font-semibold md:text-7xl"
        style={{ fontFamily: "var(--font-mazaeni), serif" }}
      >
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/">Back Home</Link>
      </Button>
    </main>
  );
}
