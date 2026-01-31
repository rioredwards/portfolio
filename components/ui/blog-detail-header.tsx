import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./button";
import { LinkIcon } from "./link-icon";

interface BlogDetailHeaderProps {
  title: string;
  slug: string;
  links?: { text: string; url: string; icon?: string }[];
}

export function BlogDetailHeader({
  title,
  slug,
  links,
}: BlogDetailHeaderProps) {
  return (
    <div
      className={cn(
        "mt-6 mb-6 flex flex-col justify-between md:flex-row md:items-center",
        "gap-x-12 gap-y-4",
      )}
    >
      <h1 style={{ fontFamily: "var(--font-mazaeni), serif" }}>
        <Link href={`/blog/${slug}`} className="group flex items-center gap-4">
          <span className="text-3xl font-bold transition-all duration-200 group-hover:brightness-125">
            {title}
          </span>
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
