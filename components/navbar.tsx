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
  { label: "Skills", href: "#skills" },
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
      <NavigationMenu viewport={false}>
        <div className="bg-sidebar/80 text-sidebar-foreground pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm">
          <NavigationMenuList>
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
                        "cursor-pointer rounded-full! px-4 py-1.5 text-sm font-medium transition-colors",
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
        </div>
      </NavigationMenu>
    </header>
  );
}
