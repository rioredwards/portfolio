"use client";

import { GithubIcon, GlobeIcon, Link01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const ICON_MAP: Record<string, typeof GlobeIcon> = {
  globe: GlobeIcon,
  github: GithubIcon,
};

interface LinkIconProps {
  /** Icon name from frontmatter (e.g. "globe", "github"). Falls back to Link01Icon when missing or invalid. */
  name?: string;
  size?: number;
  className?: string;
}

/** Renders a Hugeicons icon by name from frontmatter. Falls back to Link01Icon when missing or invalid. */
export function LinkIcon({ name, size = 14, className }: LinkIconProps) {
  const key = name?.trim().toLowerCase();
  const Icon = key && ICON_MAP[key] ? ICON_MAP[key] : Link01Icon;
  return (
    <HugeiconsIcon
      icon={Icon}
      size={size}
      color="currentColor"
      strokeWidth={2}
      className={className}
    />
  );
}
