"use client";

import { Skill } from "@/components/ui/skill";
import Image, { StaticImageData } from "next/image";
import { cn } from "../lib/utils";

export interface Project {
  category: string;
  title: string;
  description: string;
  skills: string[];
  image: StaticImageData;
}

interface ProjectProps extends Project {
  orientation: "left" | "right";
  onClick?: () => void;
}

export function Project({
  category,
  title,
  description,
  skills,
  image,
  onClick,
}: ProjectProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "relative", // Positioning
        "aspect-3/2 w-full overflow-clip", // Layout & Sizing
        "bg-card rounded-4xl shadow-md", // Background & Effects
        "group fade-in-scroll cursor-pointer transition-all duration-200 hover:shadow-xl", // Animation & Transitions
        "[--foreground:var(--color-popover)]", // Adjust this to change all foreground colors within card
      )}
    >
      {/* Project image container */}
      <div
        className={cn(
          "relative", // Positioning
          "h-full w-full overflow-clip", // Layout & Sizing
          "bg-secondary", // Background & Effects
        )}
      >
        {/* Image container with parallax */}
        <div
          className={cn(
            "absolute inset-0 -translate-y-[10%]", // Positioning
            "h-[122%] w-full", // Layout & Sizing
          )}
        >
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            className={cn(
              "object-cover", // Layout & Sizing
              "paralax transition-all duration-200", // Animation & Transitions
            )}
            priority
          />
        </div>

        {/* Blur overlay - animated on hover */}
        <div
          className={cn(
            "absolute inset-0 z-10", // Positioning
            "pointer-events-none", // Layout & Sizing
            "opacity-0 backdrop-blur-xs", // Background & Effects
            "transition-opacity duration-200 group-hover:opacity-100", // Animation & Transitions
          )}
        />

        {/* Details panel - slides up from bottom on hover */}
        <div
          className={cn(
            "absolute right-0 bottom-0 left-0 z-20", // Positioning
            "p-6 lg:p-8", // Layout & Sizing
            // "via-background/80 to-background/90 bg-linear-to-b from-transparent from-0% via-10% to-100%", // Background & Effects
            "bg-foreground/90",
            "translate-y-full transition-transform duration-200 group-hover:translate-y-0", // Animation & Transitions
          )}
        >
          <div
            className={cn(
              "flex flex-col", // Layout & Sizing
            )}
          >
            <p
              className={cn(
                "mb-3 text-xs", // Layout & Sizing
                "font-medium tracking-[0.2em] text-(--foreground) uppercase", // Typography
              )}
            >
              {category}
            </p>
            <h2
              className={cn(
                "mb-4 text-3xl leading-tight sm:text-4xl lg:text-5xl", // Layout & Sizing
                "font-bold text-(--foreground)", // Typography
              )}
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              {title}
            </h2>
            <p
              className={cn(
                "mb-6 text-base leading-relaxed", // Layout & Sizing
                "text-(--foreground)", // Typography
              )}
            >
              {description}
            </p>
            <div
              className={cn(
                "flex flex-wrap gap-3", // Layout & Sizing
              )}
            >
              {skills.map((skill, index) => (
                <Skill
                  key={`${skill}-${index}`}
                  text={skill}
                  variant="filled"
                  size="sm"
                  className="border-(--foreground)/50 bg-(--foreground)/8 text-(--foreground)"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
