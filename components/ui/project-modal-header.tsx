import { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ProjectModalHeader({ title, slug, icon }: ProjectFrontmatter) {
  const Content = (
    <>
      {icon && (
        <Image
          src={icon}
          alt={title}
          width={42}
          height={42}
          className="h-10 w-10"
        />
      )}
      <span className="text-2xl font-bold transition-all duration-200 group-hover:brightness-125">
        {title}
      </span>
    </>
  );

  return (
    <div className={cn("px-2 text-foreground md:px-4")}>
      <h1 style={{ fontFamily: "var(--font-mazaeni), serif" }}>
        <Link href={`/work/${slug}`} className="group flex items-center gap-4">
          {Content}
        </Link>
      </h1>
    </div>
  );
}
