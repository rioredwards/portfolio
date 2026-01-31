import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        // custom
        "border-border bg-input dark:bg-input",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        // custom
        "w-full rounded-lg px-5 py-6 text-base text-secondary-foreground md:text-base",
        "inset-shadow-sm inset-shadow-shadow/10",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

// file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 min-w-0 rounded-md border shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border-border bg-transparent dark:bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-secondary-foreground rounded-lg w-full px-5 py-6 text-base md:text-base inset-shadow-shadow/10 inset-shadow-sm
