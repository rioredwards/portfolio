"use client";

import { getSocialLinks } from "@/lib/social-links";
import profileImage from "@/public/profile.webp";
import {
  Cancel01Icon,
  Link04Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const socialLinks = getSocialLinks();

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Focus the close button when menu opens
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Trap focus within menu when open
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    menu.addEventListener("keydown", handleTabKey);
    return () => menu.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  // Reset copied state after timeout
  useEffect(() => {
    if (copiedEmail) {
      const timer = setTimeout(() => {
        setCopiedEmail(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedEmail]);

  return (
    <>
      {/* Floating button - bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-foreground text-background mm-btn focus-visible:ring-ring fixed right-6 bottom-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <HugeiconsIcon
          icon={Link04Icon}
          size={24}
          color="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {/* Fullscreen menu overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="bg-secondary mobile-menu-open fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Close button - top right */}
          <button
            ref={closeButtonRef}
            onClick={() => setIsOpen(false)}
            className="text-foreground focus-visible:ring-ring absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:opacity-70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="Close menu"
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={24}
              color="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>

          {/* Content - centered */}
          <div className="mm-py flex h-full flex-col items-center justify-center px-6">
            {/* Profile picture */}
            <div className="mm-mb-small shrink-0">
              <div className="border-border/50 mm-img relative overflow-hidden rounded-full border-2">
                <Image
                  src={profileImage}
                  alt="Rio Edwards"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Name */}
            <h2
              className="text-foreground mm-mb-small text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              Rio Edwards
            </h2>

            {/* Title */}
            <p className="text-secondary-foreground mm-mb-medium text-lg sm:text-xl">
              Developer / Designer / Creator
            </p>

            {/* Social links */}
            <nav
              className="mm-gap flex w-full max-w-sm flex-col"
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
                      // Don't close menu immediately, let user see the "copied" state
                      setTimeout(() => {
                        setIsOpen(false);
                      }, 1500);
                    } catch {
                      toast.error("Failed to copy to clipboard");
                    }
                  } else {
                    setIsOpen(false);
                  }
                };

                return (
                  <Link
                    key={index}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={handleClick}
                    className="border-border/50 bg-background text-foreground hover:bg-secondary/30 mm-link focus-visible:ring-ring flex items-center gap-3 rounded-2xl border px-4 shadow-sm transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    aria-label={ariaLabel}
                  >
                    <span
                      className="flex shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      {isEmail && copiedEmail ? (
                        <HugeiconsIcon
                          icon={Tick01Icon}
                          size={20}
                          color="currentColor"
                          strokeWidth={2}
                        />
                      ) : (
                        link.icon
                      )}
                    </span>
                    <span
                      className="text-base font-bold"
                      style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
                    >
                      {isEmail && copiedEmail ? "Copied" : link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
