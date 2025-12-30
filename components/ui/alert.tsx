import {
  AlertCircleIcon,
  Notification02Icon,
  TickDouble03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";

function getDefaultIcon(
  variant: VariantProps<typeof alertVariants>["variant"],
): React.ReactNode {
  switch (variant) {
    case "success":
      return (
        <HugeiconsIcon
          icon={TickDouble03Icon}
          size={24}
          color="currentColor"
          strokeWidth={2}
        />
      );
    case "destructive":
      return (
        <HugeiconsIcon
          icon={AlertCircleIcon}
          size={24}
          color="currentColor"
          strokeWidth={2}
        />
      );
    default:
      return (
        <HugeiconsIcon
          icon={Notification02Icon}
          size={24}
          color="currentColor"
          strokeWidth={2}
        />
      );
  }
}

import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva("", {
  variants: {
    variant: {
      default:
        "bg-secondary text-foreground hover:bg-secondary-hover hover:border-secondary-hover-border",
      success:
        "bg-primary hover:bg-primary-hover text-primary-foreground hover:border-primary-hover-border border border-transparent",
      destructive:
        "bg-destructive hover:bg-destructive-hover text-destructive-foreground hover:border-destructive-hover-border border border-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AlertProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  variant: "default" | "success" | "destructive";
  icon?: React.ReactNode;
  title?: string;
  description?: string | React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, title, description, ...props }, ref) => {
    const IconComponent = icon ?? getDefaultIcon(variant);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant }),
          "fade-in custom-bg-ping-wrapper rounded-lg border",
        )}
      >
        <div
          className={cn(
            "fade-in custom-bg-ping",
            "text-md grid w-full grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-4 rounded-lg border px-4 py-3",
            alertVariants({ variant }),
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "col-start-1 row-span-2 w-min shrink-0 self-start",
              description && "pt-1",
            )}
          >
            {IconComponent}
          </div>
          {title && (
            <div className="col-start-2 row-start-1">
              <h5 className="mb-1 text-lg leading-none font-bold tracking-tight">
                {title}
              </h5>
            </div>
          )}
          {description && (
            <div className="col-start-2 row-start-2 text-sm [&_p]:leading-relaxed">
              {description}
            </div>
          )}
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";

export { Alert };
