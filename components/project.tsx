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
}: ProjectProps) {
  return (
    <article
      className={cn(
        "group fade-in bg-card rounded-card relative aspect-3/2 w-full cursor-pointer overflow-clip border shadow-md transition-all duration-200 hover:shadow-xl",
      )}
    >
      {/* Project image container */}
      <div className="bg-secondary relative h-full w-full overflow-clip">
        {/* Image container with parallax */}
        <div className="absolute inset-0 h-[122%] w-full -translate-y-[10%]">
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            className="paralax object-cover transition-all duration-200"
            priority
          />
        </div>

        {/* Gradient overlay - animated on hover */}
        <div className="bg-blur-md pointer-events-none absolute inset-0 z-10 bg-black/10 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100" />

        {/* Details panel - slides up from bottom on hover */}
        <div className="absolute right-0 bottom-0 left-0 z-20 translate-y-full bg-linear-to-b from-black/60 from-80% to-black/80 to-100% p-6 backdrop-blur-sm transition-transform duration-200 group-hover:translate-y-0 lg:p-8">
          <div className="flex flex-col">
            <p className="text-primary-foreground mb-3 text-xs font-medium tracking-[0.2em] uppercase">
              {category}
            </p>
            <h2
              className="text-primary-foreground mb-4 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              {title}
            </h2>
            <p className="text-primary-foreground mb-6 text-base leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <Skill
                  key={`${skill}-${index}`}
                  text={skill}
                  variant="filled"
                  size="sm"
                  className="text-primary-foreground border-primary-foreground bg-primary-foreground/18"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
