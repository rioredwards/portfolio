import { Skill } from "@/components/ui/skill";
import Image from "next/image";

interface ProjectProps {
  category: string;
  title: string;
  description: string;
  skills: string[];
  image: string;
}

export function Project({ category, title, description, skills, image }: ProjectProps) {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-8 py-12 lg:flex-row lg:items-center lg:gap-16 lg:px-14 lg:py-16">
        {/* Left column – text content */}
        <div className="flex-1">
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

          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <Skill key={`${skill}-${index}`} text={skill} variant="outline" size="sm" />
            ))}
          </div>
        </div>

        {/* Right column – Project image */}
        <div className="relative flex-1">
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-tl-4xl rounded-br-4xl">
            <div className="relative h-72 bg-secondary sm:h-80 md:h-96">
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
      </div>
    </section>
  );
}
