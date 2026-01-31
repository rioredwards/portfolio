"use client";

import { DynamicIcon, iconNames } from "lucide-react/dynamic";
import { ExternalLink } from "lucide-react";

/** Converts PascalCase to Lucide's kebab-case icon names (e.g. ExternalLink → external-link). */
function toKebab(name: string): string {
  return name
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

const VALID_NAMES = new Set(iconNames as readonly string[]);

interface LinkIconProps {
  /** Lucide icon name in kebab-case or PascalCase (e.g. "external-link", "ExternalLink", "globe"). */
  name?: string;
  size?: number;
  className?: string;
}

/** Renders a Lucide icon by name from frontmatter. Falls back to ExternalLink when missing or invalid. */
export function LinkIcon({ name, size = 14, className }: LinkIconProps) {
  if (!name?.trim()) {
    return <ExternalLink size={size} className={className} />;
  }
  const kebab = toKebab(name.trim());
  if (!VALID_NAMES.has(kebab)) {
    return <ExternalLink size={size} className={className} />;
  }
  return (
    <DynamicIcon
      name={kebab as (typeof iconNames)[number]}
      size={size}
      className={className}
    />
  );
}
