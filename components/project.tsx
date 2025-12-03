import { Skill } from "@/components/ui/skill";
import Image from "next/image";
import { cn } from "../lib/utils";

interface ProjectProps {
  category: string;
  title: string;
  description: string;
  skills: string[];
  image: string;
  orientation: "left" | "right";
}

export function Project({
  category,
  title,
  description,
  skills,
  image,
  orientation,
}: ProjectProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16",
        orientation === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
      )}>
      {/* Left column – text content */}
      <div
        className={cn(
          "flex-1 flex flex-col lg:block",
          orientation === "left"
            ? "text-left items-start lg:text-right"
            : "text-right items-end lg:text-left"
        )}>
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {category}
        </p>
        <h2
          className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
          {title}
        </h2>

        <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div
          className={cn(
            "flex flex-wrap gap-4",
            orientation === "left" ? "justify-start lg:justify-end" : "justify-end lg:justify-start"
          )}>
          {skills.map((skill, index) => (
            <Skill key={`${skill}-${index}`} text={skill} variant="outline" size="sm" />
          ))}
        </div>
      </div>

      {/* Right column – Project image */}
      <div className="flex-1 max-lg:order-first">
        <div
          className={cn(
            "mx-auto w-screen -ml-4 md:w-full lg:max-h-80 overflow-hidden aspect-3/2",
            orientation === "left"
              ? "rounded-tl-4xl rounded-br-4xl"
              : "rounded-tr-4xl rounded-bl-4xl"
          )}>
          <div
            className={cn(
              "relative bg-secondary h-full w-full",
              orientation === "left"
                ? "rounded-tl-4xl rounded-br-4xl"
                : "rounded-tr-4xl rounded-bl-4xl"
            )}>
            {/* Gradient overlay */}
            <div className="z-10 absolute inset-0 bg-linear-to-b from-transparent from-80% to-black/30 to-100%" />
            {/* Window frame (image should overflow the bottom right corner) */}
            <div className="absolute inset-10 h-full w-full">
              <Image
                src={image}
                alt={`${title} preview`}
                fill
                className="object-cover object-top-left"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
