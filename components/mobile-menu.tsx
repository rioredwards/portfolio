"use client";

import { getSocialLinks } from "@/lib/social-links";
import { Link as LinkIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const socialLinks = getSocialLinks();

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button - bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-foreground text-background fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 md:hidden"
        aria-label="Open menu"
      >
        <LinkIcon className="size-6" />
      </button>

      {/* Fullscreen menu overlay */}
      {isOpen && (
        <div className="bg-background fixed inset-0 z-50 md:hidden">
          {/* Close button - top right */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-foreground absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center transition-colors hover:opacity-70"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>

          {/* Content - centered */}
          <div className="flex h-full flex-col items-center justify-center px-6 py-20">
            {/* Profile picture */}
            <div className="mb-6 shrink-0">
              <div className="border-accent/60 relative h-32 w-32 overflow-hidden rounded-full border-2 sm:h-40 sm:w-40">
                <Image
                  src="/profile.jpg"
                  alt="Rio Edwards"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Name */}
            <h2
              className="text-foreground mb-2 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              Rio Edwards
            </h2>

            {/* Title */}
            <p className="text-secondary-foreground mb-8 text-lg sm:text-xl">
              Developer / Designer / Creator
            </p>

            {/* Social links */}
            <nav className="flex w-full max-w-sm flex-col gap-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  onClick={() => setIsOpen(false)}
                  className="border-border/50 bg-background text-foreground hover:bg-secondary/30 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition-all hover:shadow-md"
                  aria-label={link.label}
                >
                  <span className="flex shrink-0 items-center justify-center">
                    {link.icon}
                  </span>
                  <span
                    className="text-base font-bold"
                    style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
