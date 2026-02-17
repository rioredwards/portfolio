import { BlogFrontmatter } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function BlogModalHeader({ title, slug }: BlogFrontmatter) {
  return (
    <div className={cn("px-2 text-foreground md:px-4")}>
      <h1 style={{ fontFamily: "var(--font-mazaeni), serif" }}>
        <Link href={`/blog/${slug}`} className="group flex items-center gap-4">
          <span className="text-2xl font-bold text-foreground transition-all duration-200 group-hover:brightness-125">
            {title}
          </span>
        </Link>
      </h1>
    </div>
  );
}
