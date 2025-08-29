import React from "react";
import { AlertCircleIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/primitives/alert";

export default function ProductAnalysisErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Something went wrong.</AlertTitle>
      <AlertDescription>
        <p>
          Failed to load product analysis. If the problem persists, contact
          support.
        </p>
      </AlertDescription>
    </Alert>
  );
}
