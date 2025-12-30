"use client";

import {
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  OctagonIcon,
  Rotate01Icon,
  TriangleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: (
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            size={16}
            color="currentColor"
            strokeWidth={2}
          />
        ),
        info: (
          <HugeiconsIcon
            icon={InformationCircleIcon}
            size={16}
            color="currentColor"
            strokeWidth={2}
          />
        ),
        warning: (
          <HugeiconsIcon
            icon={TriangleIcon}
            size={16}
            color="currentColor"
            strokeWidth={2}
          />
        ),
        error: (
          <HugeiconsIcon
            icon={OctagonIcon}
            size={16}
            color="currentColor"
            strokeWidth={2}
          />
        ),
        loading: (
          <HugeiconsIcon
            icon={Rotate01Icon}
            size={16}
            color="currentColor"
            strokeWidth={2}
            className="animate-spin"
          />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--color-popover)",
          "--normal-text": "var(--color-popover-foreground)",
          "--normal-border": "var(--color-border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
