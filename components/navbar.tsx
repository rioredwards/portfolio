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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    <div className="sticky top-4 w-full z-50 mx-auto flex items-center justify-center pointer-events-none">
      <NavigationMenu viewport={false}>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 pointer-events-auto">
          <NavigationMenuList>
            {navItems.map((item) => {
              const isActive =
                activeSection === item.href || (item.href === "#home" && activeSection === "");
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={cn(
                        "px-4 py-1.5 text-sm font-medium text-foreground transition-colors cursor-pointer rounded-full! hover:bg-tertiary"
                      )}
                      data-active={isActive}>
                      {item.label}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </div>
  );
}
