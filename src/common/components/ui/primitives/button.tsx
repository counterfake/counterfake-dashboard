import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/common/lib/utils/ui";

const buttonVariants = cva(
  "inline-flex items-center rounded-md justify-center font-medium transition-all focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 focus-within:ring-offset-1 focus-within:ring-1 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 focus-within:ring-ring",
        destructive:
          "border border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-within:ring-destructive",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-within:ring-ring",
        secondary:
          "border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-within:ring-secondary",
        ghost:
          "border border-transparent hover:bg-accent text-foreground hover:text-accent-foreground focus-within:ring-ring",
        soft: "border border-transparent text-accent-foreground bg-accent hover:bg-accent/50 focus-within:ring-primary",
        link: "border border-transparent text-primary underline-offset-4 hover:underline focus-within:ring-transparent",
      },
      size: {
        default: "h-9 px-4 text-base",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-8 text-base",
        icon: "h-9 w-9 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "")}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
