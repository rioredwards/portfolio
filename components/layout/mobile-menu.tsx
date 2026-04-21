"use client";

import { Button } from "@/components/ui/button";
import { getSocialLinks } from "@/lib/social-links";
import profileImage from "@/public/profile.webp";
import {
  Cancel01Icon,
  Link04Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const socialLinks = getSocialLinks();

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isOnRiobotPage = pathname === "/riobot";
  const [copiedEmail, setCopiedEmail] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

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

  useEffect(() => {
    function handleInterviewBotState(event: Event) {
      const customEvent = event as CustomEvent<{ open: boolean }>;
      const nextOpen = Boolean(customEvent.detail?.open);
      setIsChatOpen(nextOpen);
      if (nextOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener(
      "interview-bot:open-change",
      handleInterviewBotState,
    );

    return () => {
      window.removeEventListener(
        "interview-bot:open-change",
        handleInterviewBotState,
      );
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("mobile-menu:open-change", {
        detail: { open: isOpen },
      }),
    );
  }, [isOpen]);

  return (
    <>
      {/* Floating button - bottom left */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 left-6 z-50 md:hidden ${isChatOpen || isOnRiobotPage ? "hidden" : "block"}`}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="icon-xl"
          className="rounded-2xl bg-primary shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_6px_28px_-4px_rgba(0,0,0,0.25)]"
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          id="mobile-menu-button"
        >
          <HugeiconsIcon
            icon={Link04Icon}
            size={24}
            className="size-5"
            color="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </motion.div>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mobile-menu-open fixed inset-0 z-50 bg-secondary md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Close button - top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              className="absolute top-6 right-6 z-10"
            >
              <Button
                ref={closeButtonRef}
                onClick={closeMenu}
                variant="ghost"
                size="icon"
                className="text-foreground/60 hover:bg-foreground/10 hover:text-foreground"
                aria-label="Close menu"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={24}
                  color="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            </motion.div>

            {/* Content - centered, scrollable on overflow */}
            <div className="mm-py flex h-full flex-col overflow-y-auto px-6">
              <div className="my-auto flex w-full flex-col items-center">
                {/* Profile picture */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
                  className="mm-mb-small shrink-0"
                >
                  <div className="profile-ring mm-img relative overflow-hidden rounded-full">
                    <Image
                      src={profileImage}
                      alt="Rio Edwards"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Name */}
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.3 }}
                  className="mm-mb-small text-2xl font-bold text-foreground sm:text-3xl"
                  style={{ fontFamily: "var(--font-mazaeni), serif" }}
                >
                  Rio Edwards
                </motion.h2>

                {/* Title */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.3 }}
                  className="mm-mb-medium text-lg text-secondary-foreground sm:text-xl"
                >
                  Developer / Designer / Creator
                </motion.p>

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
                          setTimeout(() => {
                            closeMenu();
                          }, 1500);
                        } catch {
                          toast.error("Failed to copy to clipboard");
                        }
                      } else {
                        closeMenu();
                      }
                    };

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.22 + index * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          onClick={handleClick}
                          className="mm-link grid grid-cols-[2rem_1fr_2rem] items-center rounded-2xl border border-border/50 bg-background px-4 text-foreground shadow-sm transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
                          aria-label={ariaLabel}
                        >
                          <span
                            className="flex size-8 items-center justify-center rounded-lg bg-primary/8"
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
                            className="text-center text-base font-bold"
                            style={{ fontFamily: "var(--font-mazaeni), serif" }}
                          >
                            {isEmail && copiedEmail ? "Copied" : link.label}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
