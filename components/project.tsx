"use client";

import Image from "next/image";
import { cn } from "../lib/utils";

export interface Project {
  category: string;
  title: string;
  slug: string;
  description: string;
  skills: string[];
  image: string;
  brandColor?: string;
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
  brandColor,
  onClick,
}: ProjectProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group fade-in-scroll mx-auto w-full max-w-4xl cursor-pointer rounded-4xl bg-card text-left transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:shadow-card-hover focus:ring-2 focus:ring-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-100 active:scale-[0.985]",
      )}
    >
      {/* Image container with parallax */}
      <div
        className="relative aspect-2/1 w-full overflow-clip rounded-t-4xl"
        style={{ backgroundColor: brandColor }}
      >
        <Image
          src={image}
          alt={`${title} preview`}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className={cn(
            "absolute rounded-tl-xl object-contain transition-transform duration-600 ease-out",
            "group-hover:-translate-y-4 group-hover:scale-105 group-active:translate-y-0 group-active:scale-100",
            "focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none",
            brandColor ? "top-[16%] left-[8%]" : "size-full rounded-t-4xl",
          )}
          style={
            brandColor
              ? undefined
              : {
                  viewTimelineName: "--parallax-image",
                  viewTimelineAxis: "block",
                  animation: "linear parallaxMove both",
                  animationTimeline: "--parallax-image",
                  animationRange: "entry 0% exit 100%",
                  height: "125%",
                }
          }
          priority
        />
      </div>
      <article className="flex flex-col gap-4 p-6 sm:p-8">
        <header className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {category}
          </span>
          <h3 className="transition-brightness font-mazaeni text-3xl leading-tight font-semibold text-foreground duration-300 ease-out group-hover:brightness-125 group-active:brightness-150">
            {title}
          </h3>
        </header>
        <p className="max-w-prose leading-relaxed text-secondary-foreground">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-tertiary px-4 py-1.5 text-sm font-medium text-tertiary-foreground transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </article>
    </article>
  );
}
