import { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ProjectModalHeader({ title, links, icon }: ProjectFrontmatter) {
  const firstLink = links?.[0];

  const Content = (
    <>
      {icon && (
        <Image
          src={icon}
          alt={title}
          width={48}
          height={48}
          className="h-12 w-12"
        />
      )}
      <span className="text-2xl font-bold transition-all duration-200 group-hover:brightness-125">
        {title}
      </span>
    </>
  );

  return (
    <div className={cn("px-2 md:px-4 text-foreground")}>
      <h1 style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
        {
          firstLink ? (
            <Link
              href={firstLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              {Content}
            </Link>
          ) : (
            <span className="flex items-center gap-4">{Content}</span>
          )
        }
      </h1>
    </div>
  );
}
