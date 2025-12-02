import { getSocialLinks } from "@/lib/social-links";
import Link from "next/link";

const socialLinks = getSocialLinks();

export function Sidebar() {
  return (
    <aside className="group fixed left-2 top-1/2 -translate-y-1/2 z-50 hidden md:block text-sidebar">
      <nav className="flex flex-col gap-1 [--border-radius:var(--radius-3xl)] [--padding:calc(var(--spacing)*2)] rounded-(--border-radius) bg-sidebar/80 backdrop-blur-sm p-(--padding) transition-all duration-300">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group/item flex items-center gap-0 group-hover:gap-3 rounded-[calc(var(--border-radius)-var(--padding))] px-2 py-2 group-hover:px-3 text-sidebar-foreground transition-all duration-300 ring-ring/50 hover:bg-background/50 hover:text-sidebar-primary"
            aria-label={link.label}>
            <span className="shrink-0 flex items-center justify-center">{link.icon}</span>
            <span
              className="text-sm font-bold whitespace-nowrap max-w-0 group-hover:max-w-none overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 inline-block"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
