import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { LinkIcon } from "./link-icon";

export interface DetailHeaderLink {
  text: string;
  url: string;
  icon?: string;
}

interface DetailHeaderProps {
  title: string;
  slug: string;
  basePath: "/work" | "/blog";
  links?: DetailHeaderLink[];
  icon?: string;
}

/** Shared header for project and blog detail pages: title, optional icon, link buttons. */
export function DetailHeader({
  title,
  slug,
  basePath,
  links,
  icon,
}: DetailHeaderProps) {
  const titleContent = (
    <header className="flex items-center gap-4">
      {icon && (
        <Image
          src={icon}
          alt={title}
          width={42}
          height={42}
          className="h-10 w-10"
        />
      )}
      <span className="text-3xl font-bold text-foreground transition-all duration-200 group-hover:brightness-125">
        {title}
      </span>
    </header>
  );

  return (
    <div
      className={cn(
        "mt-6 mb-6 flex flex-col justify-between md:flex-row md:items-center",
        "gap-x-12 gap-y-4",
      )}
    >
      <h1 style={{ fontFamily: "var(--font-mazaeni), serif" }}>
        <Link
          href={`${basePath}/${slug}`}
          className="group flex items-center gap-4"
        >
          {titleContent}
        </Link>
      </h1>
      {links && links.length > 0 && (
        <ul className={cn("flex items-center gap-4")}>
          {links.map((link, idx) => (
            <li key={idx}>
              <Button
                asChild
                variant={idx === 0 ? "default" : "outline"}
                size="sm"
                className="text-sm"
              >
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <LinkIcon name={link.icon} size={14} />
                  {link.text}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
