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
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative">
      <NavigationMenu viewport={false}>
        <div className="flex items-center gap-2 rounded-lg bg-[#f5f1e8] px-4 py-2">
          <NavigationMenuList>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors",
                        isActive && "rounded-full bg-white text-gray-800 shadow-sm"
                      )}
                      data-active={isActive}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
      <div className="mt-2 h-px border-t-2 border-dotted border-blue-500" />
    </nav>
  );
}
