import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary-hover text-primary-foreground hover:border-primary-hover-border border border-transparent",
        destructive:
          "bg-destructive hover:bg-destructive-hover border border-destructive text-destructive! text-white hover:text-destructive-foreground! focus-visible:ring-ring",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-accent-hover-border border border-transparent",
        secondary:
          "bg-secondary hover:bg-secondary-hover text-secondary-foreground hover:text-secondary-foreground-hover",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:border-accent-hover-border border border-transparent",
        link: "text-primary hover:text-primary-hover underline-offset-4 hover:underline",
      },
      size: {
        default: "text-base py-2 px-6 has-[>svg]:px-3",
        sm: "py-2 px-5 has-[>svg]:px-2.5",
        lg: "text-lg py-3 px-8 has-[>svg]:px-3",
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
  variant = "default",
  size = "default",
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
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
