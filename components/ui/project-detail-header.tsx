import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Button } from "./button";

interface ProjectDetailHeaderProps {
  title: string;
  slug: string;
  links?: { text: string; url: string }[];
  icon?: string;
  category: string;
  skills: string[];
}

export function ProjectDetailHeader({ title, slug, links, icon }: ProjectDetailHeaderProps) {
  const Content = (
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
      <span className="text-3xl font-bold transition-all duration-200 group-hover:brightness-125">
        {title}
      </span>
    </header>
  );

  return (
    <div className={cn(
      "mt-6 mb-6 flex flex-col md:flex-row md:items-center justify-between",
      "gap-x-12 gap-y-4",
    )}
    >
      <h1 style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
        <Link
          href={`/work/${slug}`}
          className="flex items-center gap-4 group"
        >
          {Content}
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
                >
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
