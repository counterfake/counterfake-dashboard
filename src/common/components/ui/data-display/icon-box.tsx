import React from "react";

import { cva, VariantProps } from "class-variance-authority";

const iconBoxVariants = cva(
  " bg-muted text-accent-foreground rounded-xl flex items-center justify-center",
  {
    variants: {
      size: {
        default: "w-12 h-12",
        sm: "w-10 h-10",
        lg: "w-16 h-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const iconBoxIconVariants = cva("", {
  variants: {
    size: {
      default: "w-5 h-5",
      sm: "w-4 h-4",
      lg: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface IconBoxProps
  extends VariantProps<typeof iconBoxVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  icon: React.JSX.ElementType;
}

export default function IconBox({
  icon: Icon,
  size = "default",
  className,
  ...props
}: IconBoxProps) {
  return (
    <div className={iconBoxVariants({ size, className })} {...props}>
      <Icon className={iconBoxIconVariants({ size })} />
    </div>
  );
}
