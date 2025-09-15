"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/primitives/alert";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export function AlertsDemo() {
  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Alert Components</CardTitle>
        <CardDescription>Informational and status alerts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="transition-all duration-300 hover:shadow-md">
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This is an informational alert with additional context.
          </AlertDescription>
        </Alert>

        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your action was completed successfully.
          </AlertDescription>
        </Alert>

        <Alert variant="default">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Please review this information carefully.
          </AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occurred. Please try again.
          </AlertDescription>
        </Alert>

        <Alert variant="default">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            This is an informational alert with additional context.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
