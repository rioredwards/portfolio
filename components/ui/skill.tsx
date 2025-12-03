import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skillVariants = cva(
  "inline-flex items-center justify-center font-medium font-serif tracking-wide",
  {
    variants: {
      variant: {
        filled: "bg-foreground text-secondary",
        outline: "border border-foreground text-foreground",
      },
      size: {
        sm: "min-w-16 h-9 angled-border-md px-4",
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
