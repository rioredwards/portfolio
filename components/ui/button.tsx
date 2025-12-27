import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-color-border-light focus-visible:ring-color-ring-light/50 focus-visible:ring-[3px] aria-invalid:ring-color-error-fg/20 dark:aria-invalid:ring-color-error-fg/40 aria-invalid:border-color-error-fg",
  {
    variants: {
      variant: {
        default:
          "bg-color-fill-primary-bg text-color-fill-primary-fg hover:bg-color-fill-primary-bg/90",
        destructive:
          "bg-color-error-bg text-white hover:bg-color-error-bg/90 focus-visible:ring-color-error-bg/20 dark:focus-visible:ring-color-error-bg/40 dark:bg-color-error-bg/60",
        outline:
          "border bg-color-surface-1 shadow-xs hover:bg-color-fill-secondary-bg hover:text-color-fill-secondary-fg dark:bg-color-surface-1/30 dark:border-color-border-dark dark:hover:bg-color-surface-1/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-color-secondary-bg hover:text-color-fill-secondary-fg dark:hover:bg-color-secondary-bg/50",
        link: "text-color-fill-primary-fg underline-offset-4 hover:underline",
      },
      size: {
        default: "min-w-24 h-12 rounded-full px-8",
        sm: "text-sm min-w-16 h-10 rounded-full px-6",
        lg: "text-lg min-w-28 h-14 rounded-full px-10",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
