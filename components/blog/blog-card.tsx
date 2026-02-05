"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export interface BlogCardProps {
  title: string;
  slug: string;
  description: string;
  icon: ReactNode;
}

export function BlogCard({ title, slug, description, icon }: BlogCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`?blog=${slug}`, { scroll: false });
  };

  return (
    <button
      data-testid="blog-card"
      onClick={handleClick}
      className={cn(
        "fade-in-scroll focus:-ring-offset-2 flex w-full cursor-pointer items-center justify-between gap-8 rounded-4xl bg-secondary px-8 py-10 text-left transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:scale-103 hover:shadow-card-hover focus:ring-2 focus:ring-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-100 lg:px-14 lg:py-12",
      )}
    >
      {/* Text content */}
      <div>
        <h2
          className="mb-3 text-3xl leading-tight font-bold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-mazaeni), serif" }}
        >
          {title}
        </h2>
        <p className="text-lg font-medium text-secondary-foreground">
          {description}
        </p>
      </div>

      {/* Icon bubble */}
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-background">
        <div className="text-foreground">{icon}</div>
      </div>
    </button>
  );
}
