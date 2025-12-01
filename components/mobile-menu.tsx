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
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all hover:scale-110 md:hidden"
        aria-label="Open menu">
        <LinkIcon className="size-6" />
      </button>

      {/* Fullscreen menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-100 bg-background md:hidden">
          {/* Close button - top right */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:opacity-70"
            aria-label="Close menu">
            <X className="size-6" />
          </button>

          {/* Content - centered */}
          <div className="flex h-full flex-col items-center justify-center px-6 py-20">
            {/* Profile picture */}
            <div className="mb-6 shrink-0">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-accent/60 sm:h-40 sm:w-40">
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
              className="mb-2 text-2xl font-bold text-foreground sm:text-3xl"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
              Rio Edwards
            </h2>

            {/* Title */}
            <p className="mb-8 text-lg text-secondary-foreground sm:text-xl">
              Developer / Designer / Creator
            </p>

            {/* Social links */}
            <nav className="flex w-full max-w-sm flex-col gap-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background px-4 py-3 text-foreground shadow-sm transition-all hover:shadow-md hover:bg-secondary/30"
                  aria-label={link.label}>
                  <span className="shrink-0 flex items-center justify-center">{link.icon}</span>
                  <span
                    className="text-base font-bold"
                    style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
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
