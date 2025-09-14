import React from "react";
import { Button, ButtonProps } from "../primitives/button";

export interface ToastActionButtonProps {
  label: string;
  className?: string;
  onClick: (toastId: string | number) => void;
  variant?: ButtonProps["variant"];
  toastId: string | number;
}

export function ToastActionButton({
  label,
  className,
  onClick,
  variant,
  toastId,
}: ToastActionButtonProps) {
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
