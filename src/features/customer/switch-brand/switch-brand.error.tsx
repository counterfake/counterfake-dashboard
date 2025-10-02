import React from "react";

import { isDev } from "@/shared/utils/is-dev";
import { AppError } from "@/shared/lib/error-handler";

type SwitchBrandErrorProps = {
  error: Error | AppError;
};

export function SwitchBrandError({ error }: SwitchBrandErrorProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-lg font-semibold text-foreground">
        Brand Switch Not Loaded
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Brand Switch feature is not loaded.
      </p>
      {/* Development error details */}
      {isDev && error.message && (
        <details className="mt-4 text-xs text-muted-foreground bg-muted/50 p-3 rounded border text-left">
          <summary className="cursor-pointer font-medium">
            Error Details
          </summary>
          <pre className="mt-2 whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        </details>
      )}
    </div>
  );
}
