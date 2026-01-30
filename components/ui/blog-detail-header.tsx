import { cn } from "@/lib/utils";
import Link from "next/link";

interface BlogDetailHeaderProps {
  title: string;
  slug: string;
}

export function BlogDetailHeader({ title, slug }: BlogDetailHeaderProps) {
  return (
    <div
      className={cn(
        "mt-6 mb-6 flex flex-col justify-between md:flex-row md:items-center",
        "gap-x-12 gap-y-4",
      )}
    >
      <h1 style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
        <Link href={`/blog/${slug}`} className="group flex items-center gap-4">
          <span className="text-3xl font-bold transition-all duration-200 group-hover:brightness-125">
            {title}
          </span>
        </Link>
      </h1>
    </div>
  );
}
