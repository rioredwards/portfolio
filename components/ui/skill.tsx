import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skillVariants = cva("inline-flex items-center justify-center font-medium tracking-wide", {
  variants: {
    variant: {
      filled: "bg-primary text-secondary",
      outline: "border border-primary text-primary",
    },
    size: {
      sm: "min-w-16 h-8 angled-border-lg px-3",
      md: "min-w-24 h-9 angled-border-xl px-4",
      lg: "min-w-28 h-10 angled-border-2xl px-6",
    },
  },
  defaultVariants: {
    variant: "filled",
    size: "md",
  },
});

interface SkillProps extends VariantProps<typeof skillVariants> {
  text: string;
  className?: string;
}

export function Skill({ text, variant, size, className }: SkillProps) {
  return <span className={cn(skillVariants({ variant, size }), className)}>{text}</span>;
}
