import {
  CodeIcon,
  Database02Icon,
  Globe02Icon,
  ServerStack03Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";

// Map of icon names to their components
const iconMap: Record<string, ReactNode> = {
  ServerStack03Icon: (
    <HugeiconsIcon
      icon={ServerStack03Icon}
      size={44}
      color="currentColor"
      strokeWidth={2}
    />
  ),
  Code02Icon: (
    <HugeiconsIcon
      icon={CodeIcon}
      size={44}
      color="currentColor"
      strokeWidth={2}
    />
  ),
  Database02Icon: (
    <HugeiconsIcon
      icon={Database02Icon}
      size={44}
      color="currentColor"
      strokeWidth={2}
    />
  ),
  Globe02Icon: (
    <HugeiconsIcon
      icon={Globe02Icon}
      size={44}
      color="currentColor"
      strokeWidth={2}
    />
  ),
  Settings02Icon: (
    <HugeiconsIcon
      icon={Settings02Icon}
      size={44}
      color="currentColor"
      strokeWidth={2}
    />
  ),
};

// Default icon if the specified one isn't found
const defaultIcon = (
  <HugeiconsIcon
    icon={CodeIcon}
    size={44}
    color="currentColor"
    strokeWidth={2}
  />
);

export function getBlogIcon(iconName: string): ReactNode {
  return iconMap[iconName] || defaultIcon;
}
