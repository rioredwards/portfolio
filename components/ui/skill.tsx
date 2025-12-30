import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skillVariants = cva(
  "min-w-16 h-auto font-mazaeni inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        filled: "bg-foreground text-secondary",
        outline: "border border-foreground text-foreground",
      },
      size: {
        sm: [
          "angled-border-sm",
          "border border-primary",
          "bg-primary/18 text-primary",
          "px-3 py-2",
          "text-sm leading-none",
        ],
        md: "min-w-24 h-10 angled-border-lg px-6",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  },
);

interface SkillProps extends VariantProps<typeof skillVariants> {
  text: string;
  className?: string;
}

export function Skill({ text, variant, size, className }: SkillProps) {
  return (
    <span className={cn(skillVariants({ variant, size }), className)}>
      {text}
    </span>
  );
}
