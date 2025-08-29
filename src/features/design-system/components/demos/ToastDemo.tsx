"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import useToast from "@/hooks/use-toast";

export function ToastDemo() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success(
      "This is a Success Toast",
      "This is a success toast",
      [
        {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
          variant: "default",
        },
      ],
      {
        duration: Infinity,
      }
    );
  };

  const handleInfo = () => {
    toast.info(
      "This is an Info Toast",
      "This is an info toast",
      [
        {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
          variant: "default",
        },
      ],
      {
        duration: Infinity,
      }
    );
  };

  const handleWarning = () => {
    toast.warning(
      "This is a Warning Toast",
      "This is a warning toast",
      [
        {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
          variant: "default",
        },
      ],
      {
        duration: Infinity,
      }
    );
  };

  const handleError = () => {
    toast.error(
      "This is an Error Toast",
      "This is an error toast",
      [
        {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
          variant: "default",
        },
      ],
      {
        duration: Infinity,
      }
    );
  };

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Toast Library</CardTitle>
        <CardDescription>Toast used throughout the application</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button onClick={handleSuccess}>Success</Button>
        <Button onClick={handleInfo}>Info</Button>
        <Button onClick={handleWarning}>Warning</Button>
        <Button onClick={handleError}>Error</Button>
      </CardContent>
    </Card>
  );
}
