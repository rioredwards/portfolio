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
        "group fade-in flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-4 xl:gap-16",
        orientation === "left" ? "lg:flex-row" : "lg:flex-row-reverse",
      )}
    >
      {/* text content */}
      <div
        className={cn(
          "flex flex-1 flex-col px-4 lg:block",
          orientation === "left"
            ? "items-start text-left lg:text-right"
            : "items-end text-right lg:text-left",
        )}
      >
        <p className="text-muted-foreground mb-4 text-sm font-medium tracking-[0.2em] uppercase">
          {category}
        </p>
        <h2
          className="text-foreground mb-6 text-4xl leading-tight font-bold sm:text-5xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          {title}
        </h2>

        <p className="text-muted-foreground mb-8 max-w-xl text-base leading-relaxed">
          {description}
        </p>

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

      {/* Project image */}
      <div className="flex-1 max-lg:order-first">
        <div
          className={cn(
            "relative mx-auto aspect-3/2 w-[calc(100%+var(--spacing-content-px)*2)] -translate-x-(--spacing-content-px) overflow-clip md:w-full md:translate-x-0 lg:max-h-80",
            orientation === "left"
              ? "rounded-tl-card rounded-br-card"
              : "rounded-tr-card rounded-bl-card",
          )}
        >
          <div
            className={cn(
              "bg-secondary relative h-full w-full",
              orientation === "left"
                ? "rounded-tl-card rounded-br-card"
                : "rounded-tr-card rounded-bl-card",
            )}
          >
            {/* Gradient overlay */}
            <div className="pointer-none: absolute inset-0 z-10 bg-linear-to-b from-transparent from-80% to-black/30 to-100%" />
            {/* Window frame (image should overflow the bottom right corner) */}
            <div className="absolute inset-0 h-[122%] w-full -translate-y-[10%]">
              <Image
                src={image}
                alt={`${title} preview`}
                fill
                className="paralax overflow-clip object-cover transition-all duration-300 group-hover:scale-110!"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

{
  /* <div className="inset-0 overflow-clip">
        <Image
          src={image}
          alt={`${title} preview`}
          width={2060}
          height={2060}
          className="paralax overflow-clip object-cover"
          priority
        />
      </div> */
}
