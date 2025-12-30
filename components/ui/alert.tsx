import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  type LucideIcon,
} from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva("", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      success:
        "bg-primary/80 hover:bg-primary-hover/80 text-primary-foreground hover:border-primary-hover-border border border-transparent",
      destructive:
        "bg-destructive/80 hover:bg-destructive-hover/80 text-destructive-foreground hover:border-destructive-hover-border border border-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function getDefaultIcon(
  variant: VariantProps<typeof alertVariants>["variant"],
): LucideIcon {
  switch (variant) {
    case "success":
      return CheckCircle2Icon;
    case "destructive":
      return AlertCircleIcon;
    default:
      return InfoIcon;
  }
}

interface AlertProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  variant: "default" | "success" | "destructive";
  icon?: LucideIcon;
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
          {React.createElement(IconComponent, {
            className: "size-8",
          })}
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
    );
  },
);
Alert.displayName = "Alert";

export { Alert };
