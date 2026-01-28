import { BlogFrontmatter } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function BlogModalHeader({ title, slug }: BlogFrontmatter) {
  return (
    <div className={cn("px-2 md:px-4 text-foreground")}>
      <h1 style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
        <Link
          href={`/blog/${slug}`}
          className="flex items-center gap-4 group"
        >
          <span className="text-2xl font-bold transition-all duration-200 group-hover:brightness-125">
            {title}
          </span>
        </Link>
      </h1>
    </div>
  );
}
