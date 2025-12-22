"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash);
    };

    // Set initial active section
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
      setActiveSection(href);
    }
  };

  return (
    <header className="pointer-events-none fixed top-2 z-40 mx-auto flex w-full items-center justify-center">
      <NavigationMenu viewport={false} className="w-full max-w-xs flex-1 px-1">
        <NavigationMenuList className="bg-color-navbar-bg pointer-events-auto w-full rounded-full px-4 py-2.5 backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive =
              activeSection === item.href ||
              (item.href === "#home" && activeSection === "");
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={cn(
                      "hover:text-color-link-hover cursor-pointer rounded-full! px-4 py-1.5 text-center text-sm transition-colors",
                      isActive && "bg-color-surface-1",
                    )}
                    data-active={isActive}
                  >
                    {item.label}
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
