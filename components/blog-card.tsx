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
      onClick={handleClick}
      className={cn(
        "fade-in-scroll flex w-full items-center justify-between gap-8 rounded-4xl bg-secondary px-8 py-10 lg:px-14 lg:py-12",
        "text-left transition-all duration-200",
        "hover:scale-[1.02] hover:shadow-lg",
        "focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none",
        "cursor-pointer",
      )}
    >
      {/* Text content */}
      <div>
        <h2
          className="mb-3 text-3xl leading-tight font-bold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
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
