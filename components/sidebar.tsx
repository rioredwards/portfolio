import { getSocialLinks } from "@/lib/social-links";
import Link from "next/link";

const socialLinks = getSocialLinks();

export function Sidebar() {
  return (
    <aside className="group text-sidebar fixed top-1/2 left-2 z-50 hidden -translate-y-1/2 md:block">
      <nav className="bg-sidebar/80 flex flex-col gap-1 rounded-(--border-radius) p-(--padding) backdrop-blur-sm transition-all duration-300 [--border-radius:var(--radius-3xl)] [--padding:calc(var(--spacing)*2)]">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="group/item text-primary ring-ring/50 hover:bg-background/50 hover:text-sidebar-primary flex items-center gap-0 rounded-[calc(var(--border-radius)-var(--padding))] px-2 py-2 transition-all duration-300 group-hover:gap-3 group-hover:px-3"
            aria-label={link.label}
          >
            <span className="flex shrink-0 items-center justify-center">
              {link.icon}
            </span>
            <span className="text-nav inline-block max-w-0 overflow-hidden font-bold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-none group-hover:opacity-100">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
