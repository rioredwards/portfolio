"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "RioBot", href: "/riobot", hardNav: true },
];

export function Navbar() {
  const pathname = usePathname();

  function isActiveLink(href: string): boolean {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      id="navbar"
      className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex justify-center pt-4"
    >
      <NavigationMenu viewport={false}>
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-sidebar/80 px-4 py-2 text-sidebar-foreground backdrop-blur-sm">
          <NavigationMenuList className="flex-wrap">
            {navItems.map((item) => {
              const isActive = isActiveLink(item.href);
              const linkClasses = cn(
                // Override NavigationMenuLink defaults
                "flex! flex-row! items-center gap-0! rounded-full!",
                // Custom styling with proper padding
                "cursor-pointer px-4! py-1.5! text-sm font-medium transition-colors",
                // Hover/active states
                "hover:bg-background/50 hover:text-primary-hover",
                "focus:bg-transparent focus:text-primary-hover",
                "data-[active=true]:bg-background/50 data-[active=true]:text-primary-hover",
                // Focus visible for accessibility
                "focus-visible:text-primary-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
              );

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    data-active={isActive ? "true" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.hardNav ? (
                      <a href={item.href} className={linkClasses}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={linkClasses}>
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </header>
  );
}
