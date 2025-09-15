import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/common/lib/utils/ui";

export interface PreventClickProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

/**
 * PreventClick is a utility component that stops click event propagation to parent elements.
 *
 * Useful for preventing parent click handlers (e.g., card selection) when interacting with child elements.
 *
 * @example
 * <PreventClick>
 *   <Button>Click me</Button>
 * </PreventClick>
 */
const PreventClick = React.forwardRef<HTMLDivElement, PreventClickProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when clicking wrapped elements
    };

    return (
      <Comp
        className={cn("cursor-default", className)}
        ref={ref}
        {...props}
        onClick={handleClick}
      />
    );
  }
);
PreventClick.displayName = "PreventClick";

export { PreventClick };
