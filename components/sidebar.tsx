"use client";

import { FileText, Mail } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiYoutube } from "react-icons/si";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: <Mail className="size-5" />, href: "mailto:your@email.com", label: "Email" },
  { icon: <SiGithub className="size-5" />, href: "https://github.com", label: "GitHub" },
  { icon: <SiLinkedin className="size-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <SiYoutube className="size-5" />, href: "https://youtube.com", label: "YouTube" },
  { icon: <FileText className="size-5" />, href: "#", label: "Resume" },
];

export function Sidebar() {
  return (
    <aside className="group fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <nav className="flex flex-col gap-2 rounded-4xl bg-secondary p-3 transition-all duration-300">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group/item flex items-center gap-0 group-hover:gap-3 rounded-3xl px-2 py-2 group-hover:px-3 text-foreground transition-all duration-300 hover:bg-accent"
            aria-label={link.label}>
            <span className="shrink-0 flex items-center justify-center">{link.icon}</span>
            <span
              className="text-sm font-bold whitespace-nowrap max-w-0 group-hover:max-w-none overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 inline-block"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
