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
    <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <nav className="flex flex-col gap-2 rounded-full bg-secondary p-3">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-accent"
            aria-label={link.label}>
            {link.icon}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
