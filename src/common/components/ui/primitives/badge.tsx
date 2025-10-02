import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/common/lib/utils/ui";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-medium",
  {
    variants: {
      variant: {
        default: "border-muted-foreground/10 text-muted-foreground bg-muted",
        primarySoft: "border-primary/10 text-primary bg-primary/10",
        secondarySoft:
          "border-secondary bg-secondary/10 text-secondary-foreground",
        destructiveSoft:
          "border-destructive/30 bg-destructive/10 text-destructive [&>svg]:text-destructive",
        successSoft:
          "border-success/50 bg-success/10 text-success [&>svg]:text-success",
        warningSoft:
          "border-warning/50 bg-warning/10 text-warning [&>svg]:text-warning",
        infoSoft: "border-info/50 bg-info/10 text-info [&>svg]:text-info",
        outline: "text-foreground",
      },
      size: {
        sm: "text-xs px-1.5 py-0.3",
        default: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-2.5 py-0.5",
        xl: "text-base px-2.5 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
