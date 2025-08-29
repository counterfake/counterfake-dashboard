import React from "react";

import { cn } from "@/lib/utils/ui";

import { Card } from "@/components/ui/primitives/card";
import { Checkbox } from "@/components/ui/primitives/checkbox";

interface SelectableCardProps {
  children: React.ReactNode;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  className?: string;
}

export function SelectableCard({
  children,
  selectable = false,
  selected = false,
  onSelectChange,
  className,
}: SelectableCardProps) {
  const handleClick = () => {
    if (selectable && onSelectChange) {
      onSelectChange(!selected);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (onSelectChange) {
      onSelectChange(checked);
    }
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden flex flex-col",
        selectable && "cursor-pointer",
        selectable && selected && "ring-2 ring-primary ring-offset-2",
        selectable && !selected && "hover:ring-1 hover:ring-primary",
        className
      )}
      onClick={handleClick}
    >
      {selectable && (
        <>
          {/* Selection checkbox */}
          <div className="absolute top-3 left-3 z-[2] flex items-center justify-center">
            <Checkbox
              checked={selected}
              onCheckedChange={handleCheckboxChange}
              className={cn(
                "bg-white ring-1 ring-offset-0 border-none",
                selected
                  ? "border-primary bg-primary ring-primary"
                  : "ring-gray-300 hover:ring-primary"
              )}
            />
          </div>

          {/* Selection overlay */}
          <div
            className={cn(
              "pointer-events-none select-none absolute top-0 left-0 z-[1] w-0 h-0 transition-all duration-150",
              selected && "bg-accent-foreground/10 w-full h-full"
            )}
          />
        </>
      )}
      {children}
    </Card>
  );
}
