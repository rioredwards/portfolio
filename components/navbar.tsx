"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from '@hugeicons/react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const homeNavItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const notHomeNavItems = [
  { label: "Back Home", href: "/" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const router = useRouter()
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const navItems = isHomePage ? homeNavItems : notHomeNavItems;

  useEffect(() => {
    if (!isHomePage) return;

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
  }, [isHomePage]);

  // Intersection Observer to detect when sections cross the middle of viewport
  useEffect(() => {
    if (!isHomePage) return;
    const sections = navItems
      .map((item) => {
        const id = item.href.replace("#", "");
        return { id, href: item.href, element: document.getElementById(id) };
      })
      .filter((section) => section.element !== null);

    if (sections.length === 0) return;

    const viewportMiddle = window.innerHeight / 2;

    // Function to determine which section should be active based on scroll position
    const updateActiveSection = () => {
      // Find the section whose top is at or just above the middle of viewport
      // Sort sections by their DOM order (using offsetTop which is relative to document)
      const sortedSections = [...sections].sort((a, b) => {
        if (!a.element || !b.element) return 0;
        return a.element.offsetTop - b.element.offsetTop;
      });

      // Find the section whose top is closest to but not below the middle of viewport
      let activeSection = sortedSections[0]?.href || "#home";

      for (const section of sortedSections) {
        if (!section.element) continue;
        const rect = section.element.getBoundingClientRect();
        // If section's top is at or above the middle of viewport, it's a candidate
        if (rect.top <= viewportMiddle) {
          activeSection = section.href;
        } else {
          // Once we find a section below the middle, stop (use the previous one)
          break;
        }
      }

      setActiveSection((prev) => {
        if (prev !== activeSection) {
          // Only update URL if current hash is a known section hash or empty
          // This prevents overwriting hashes from modal content (e.g., #features)
          const currentHash = window.location.hash;
          const knownHashes = navItems.map((item) => item.href);
          const shouldUpdateUrl =
            currentHash === "" || knownHashes.includes(currentHash);

          if (shouldUpdateUrl) {
            // Update URL without triggering scroll - defer to avoid React render warning
            requestAnimationFrame(() => {
              window.history.replaceState(null, "", activeSection);
            });
          }
          return activeSection;
        }
        return prev;
      });
    };

    // Create intersection observer that triggers when sections enter/exit viewport
    // We use a small rootMargin to create a trigger zone around the middle of viewport
    const observer = new IntersectionObserver(
      () => {
        updateActiveSection();
      },
      {
        // rootMargin creates a trigger zone - when sections cross this zone, we update
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    // Observe all sections
    sections.forEach((section) => {
      if (section.element) {
        observer.observe(section.element);
      }
    });

    // Also update on scroll for more responsive updates
    const handleScroll = () => {
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial update - defer to avoid React render warning
    requestAnimationFrame(() => {
      updateActiveSection();
    });

    return () => {
      sections.forEach((section) => {
        if (section.element) {
          observer.unobserve(section.element);
        }
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage, navItems]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
  ) => {
    if (!isHomePage) {
      router.push(href, { scroll: false });
      return;
    }
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
          <NavigationMenuList className="flex-wrap">
            {navItems.map((item) => {
              const isActive =
                activeSection === item.href ||
                (item.href === "#home" && activeSection === "");
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={cn(
                        // Override NavigationMenuLink defaults
                        "flex! flex-row! gap-0! rounded-full! items-center",
                        // Custom styling with proper padding
                        "cursor-pointer px-4! py-1.5! text-sm font-medium transition-colors",
                        // Hover/active states
                        "hover:bg-background/50 hover:text-primary-hover",
                        "focus:text-primary-hover focus:bg-transparent",
                        "data-[active=true]:bg-background/50 data-[active=true]:text-primary-hover",
                        // Focus visible for accessibility
                        "focus-visible:ring-ring focus-visible:text-primary-hover focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                      )}
                      data-active={isActive ? "true" : undefined}
                    >
                      {!isHomePage && <HugeiconsIcon icon={ArrowRight02Icon} size={16} color="currentColor" strokeWidth={2} className="mr-2 rotate-180" />}
                      {item.label}
                    </Link>
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
