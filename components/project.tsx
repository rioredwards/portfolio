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
        "fade-in flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16",
        orientation === "left" ? "lg:flex-row" : "lg:flex-row-reverse",
      )}
    >
      {/* Left column – text content */}
      <div
        className={cn(
          "flex flex-1 flex-col lg:block",
          orientation === "left"
            ? "items-start text-left lg:text-right"
            : "items-end text-right lg:text-left",
        )}
      >
        <p className="callout-text mb-2">{category}</p>
        <h3 className="title-2-text">{title}</h3>

        <p className="mb-8 max-w-xl">{description}</p>

        <div
          className={cn(
            "flex flex-wrap gap-4",
            orientation === "left"
              ? "justify-start lg:justify-end"
              : "justify-end lg:justify-start",
          )}
        >
          {skills.map((skill, index) => (
            <Skill
              key={`${skill}-${index}`}
              text={skill}
              variant="filled"
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Right column – Project image */}
      <div className="flex-1 max-lg:order-first">
        <div
          className={cn(
            "relative mx-auto aspect-3/2 w-[calc(100%+var(--content-padding-x-mobile)*2)] -translate-x-(--content-padding-x-mobile) overflow-hidden md:w-full lg:max-h-80",
            orientation === "left"
              ? "rounded-tl-(--radius-section) rounded-br-(--radius-section)"
              : "rounded-tr-(--radius-section) rounded-bl-(--radius-section)",
          )}
        >
          <div
            className={cn(
              "bg-secondary relative h-full w-full",
              orientation === "left"
                ? "rounded-tl-(--radius-section) rounded-br-(--radius-section)"
                : "rounded-tr-(--radius-section) rounded-bl-(--radius-section)",
            )}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent from-80% to-black/30 to-100%" />
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
