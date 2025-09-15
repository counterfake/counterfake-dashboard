"use client";

import {
  ListBox as ListBoxComponent,
  ListBoxItem as ListBoxItemComponent,
  type ListBoxProps,
  type ListBoxItemProps as ListBoxItemComponentProps,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/common/lib/utils/ui";

// Variants for container styling
const listBoxVariants = cva("border-input overflow-hidden rounded-md border", {
  variants: {
    variant: {
      default: "bg-background",
      ghost: "border-transparent bg-transparent",
      outline: "border-2 bg-transparent",
    },
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// Variants for list content styling
const listBoxContentVariants = cva(
  "space-y-1 overflow-auto p-1 shadow-xs transition-[color,box-shadow]",
  {
    variants: {
      size: {
        sm: "min-h-16 max-h-60 p-0.5",
        default: "min-h-20 max-h-72 p-1",
        lg: "min-h-24 max-h-80 p-1.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// Variants for list item styling
const listBoxItemVariants = cva(
  "relative rounded outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50",
        secondary:
          "data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground data-focus-visible:border-secondary data-focus-visible:ring-secondary/50",
        destructive:
          "data-[selected=true]:bg-destructive data-[selected=true]:text-destructive-foreground data-focus-visible:border-destructive data-focus-visible:ring-destructive/50",
      },
      size: {
        sm: "px-1.5 py-1 text-xs",
        default: "px-2 py-1.5 text-sm",
        lg: "px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Generic interface for more flexible data types
interface ListBoxMultipleProps<T extends object = Record<string, any>>
  extends Omit<ListBoxProps<T>, "selectionMode">,
    VariantProps<typeof listBoxVariants> {
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
  contentClassName?: string;
  selectionMode?: "single" | "multiple" | "none";
  placeholder?: string;
  emptyState?: React.ReactNode;
}

export function ListBox<T extends object = Record<string, any>>({
  children,
  className,
  contentClassName,
  variant,
  size,
  placeholder,
  emptyState,
  items,
  ...props
}: ListBoxMultipleProps<T>) {
  const hasItems = items && Array.from(items).length > 0;
  const hasChildren = Boolean(children);

  return (
    <div className={cn(listBoxVariants({ variant, size }), className)}>
      <ListBoxComponent
        className={cn(
          listBoxContentVariants({ size }),
          "bg-background",
          contentClassName
        )}
        items={items}
        {...props}
      >
        {children as any}
        {!hasItems && !hasChildren && emptyState && (
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            {emptyState}
          </div>
        )}
        {!hasItems && !hasChildren && !emptyState && placeholder && (
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            {placeholder}
          </div>
        )}
      </ListBoxComponent>
    </div>
  );
}

// Generic interface for ListBox items
interface ListBoxItemProps<T extends object = Record<string, any>>
  extends ListBoxItemComponentProps<T>,
    VariantProps<typeof listBoxItemVariants> {
  children: React.ReactNode;
  className?: string;
}

export function ListBoxItem<T extends object = Record<string, any>>({
  children,
  className,
  variant,
  size,
  ...props
}: ListBoxItemProps<T>) {
  return (
    <ListBoxItemComponent
      className={cn(listBoxItemVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </ListBoxItemComponent>
  );
}

// Export types for external usage
export type { ListBoxMultipleProps, ListBoxItemProps };
export { listBoxVariants, listBoxContentVariants, listBoxItemVariants };
