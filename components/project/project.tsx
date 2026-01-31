import { cn } from "@/lib/utils";
import Image from "next/image";
import "./project.css";

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
  // const mobileClassesContainer = cn("pointer-coarse:aspect-square");
  // const desktopClassesContainer = cn(
  //   "pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:shadow-card-hover",
  // );
  // const desktopClassesImageContainer = cn("pointer-fine:rounded-t-4xl");
  // const mobileClassesImage = cn("pointer-coarse:size-full");
  // const desktopClassesImage = cn(
  //   "pointer-fine:top-[16%] pointer-fine:left-[8%] pointer-fine:rounded-t-4xl pointer-fine:group-hover:-translate-y-4 pointer-fine:group-hover:scale-105 pointer-fine:group-active:translate-y-0",
  // );

  return (
    <article
      onClick={onClick}
      className={cn(
        cn(
          "group mx-auto w-full max-w-4xl cursor-pointer rounded-4xl bg-card text-left outline-none focus:ring-2 focus:ring-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // Animation/interactivity classes
          "transition-all duration-300 ease-out active:translate-y-0 active:scale-100 active:scale-[0.985]",
          // desktop classes
          "pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:shadow-card-hover",
        ),
      )}
    >
      {/* Image container with parallax */}
      <div
        className={cn(
          "relative w-full overflow-clip rounded-tl-4xl pointer-coarse:aspect-video pointer-fine:aspect-2/1",
        )}
        style={{ backgroundColor: brandColor }}
      >
        <Image
          src={image}
          alt={`${title} preview`}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className={cn(
            "parallax-image",
            // Base styles
            "absolute focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none",
            // Animation logic
            "transition-transform duration-600 ease-out group-active:scale-100",
            // mobile classes
            "pointer-coarse:object-cover",
            // desktop classes
            "pointer-fine:top-[16%] pointer-fine:left-[8%] pointer-fine:rounded-tl-xl pointer-fine:group-hover:-translate-y-4 pointer-fine:group-hover:scale-105 pointer-fine:group-active:translate-y-0",
          )}
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
