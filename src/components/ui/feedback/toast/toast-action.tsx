import React from "react";
import { Button, ButtonProps } from "../../primitives/button";

export interface ToastActionProps {
  label: string;
  className?: string;
  onClick: (toastId: string | number) => void;
  variant?: ButtonProps["variant"];
  toastId: string | number;
}

export function ToastAction({
  label,
  className,
  onClick,
  variant,
  toastId,
}: ToastActionProps) {
  return (
    <Button
      className={className}
      size="sm"
      onClick={() => onClick(toastId)}
      variant={variant}
    >
      {label}
    </Button>
  );
}
