"use client";

import { getSocialLinks } from "@/lib/social-links";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const socialLinks = getSocialLinks();

export function Sidebar() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (copiedEmail) {
      const timer = setTimeout(() => {
        setCopiedEmail(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedEmail]);

  return (
    <aside
      className="group text-sidebar fixed top-1/2 left-2 z-50 hidden -translate-y-1/2 md:block"
      aria-label="Social links"
    >
      <nav
        className="bg-sidebar/80 flex flex-col gap-1 rounded-3xl p-2 backdrop-blur-sm transition-all duration-300"
        aria-label="Social media and contact links"
      >
        {socialLinks.map((link, index) => {
          const isExternal = link.href.startsWith("http");
          const isEmail = link.copyToClipboard && link.copyValue;
          const ariaLabel = isExternal
            ? `${link.label}, opens in a new tab`
            : link.label;

          const handleClick = async (e: React.MouseEvent) => {
            if (isEmail) {
              e.preventDefault();
              try {
                await navigator.clipboard.writeText(link.copyValue!);
                setCopiedEmail(true);
                toast.success(`${link.label} copied to clipboard!`);
              } catch {
                toast.error("Failed to copy to clipboard");
              }
            }
          };

          return (
            <Link
              key={index}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={handleClick}
              className="group/item text-primary ring-ring/50 hover:bg-background/50 hover:text-sidebar-primary focus-visible:ring-ring flex items-center gap-0 rounded-3xl px-2 py-3 transition-all duration-300 group-hover:gap-3 group-hover:px-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label={ariaLabel}
            >
              <span className="flex shrink-0 items-center justify-center">
                {isEmail && copiedEmail ? (
                  <Check className="size-5" />
                ) : (
                  link.icon
                )}
              </span>
              <span
                className="inline-block max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-none group-hover:opacity-100"
                style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
                aria-hidden="true"
              >
                {isEmail && copiedEmail ? "Copied" : link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
