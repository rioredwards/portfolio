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
        "w-full max-w-4xl mx-auto bg-card rounded-4xl outline-none group hover:shadow-card-hover duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.985] cursor-pointer text-left focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background fade-in-scroll transition-all ",
      )}
    >
      {/* Image container with parallax */}
      <div
        className="w-full aspect-5/4 sm:aspect-2/1 relative overflow-clip rounded-t-4xl"
        style={{ backgroundColor: brandColor }}
      >
        <Image
          src={image}
          alt={`${title} preview`}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className={cn(
            "object-cover rounded-tl-xl absolute transition-transform ease-out duration-600",
            "group-hover:scale-105 group-hover:-translate-y-4",
            brandColor
              ? "w-[92%] h-[115%] top-[16%] left-[8%]"
              : "size-full rounded-t-4xl"
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
      <article className="flex flex-col gap-4 p-6 sm:p-8 ">
        <header className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {category}
          </span>
          <h3 className="font-mazaeni text-3xl font-semibold leading-tight text-foreground group-hover:brightness-125 group-active:brightness-150 transition-brightness duration-300 ease-out">
            {title}
          </h3>
        </header>
        <p className="max-w-prose leading-relaxed text-secondary-foreground">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill) => (
            <span key={skill} className="rounded-full bg-tertiary px-4 py-1.5 text-sm font-medium text-tertiary-foreground transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </article>

    </article>
  );
}
