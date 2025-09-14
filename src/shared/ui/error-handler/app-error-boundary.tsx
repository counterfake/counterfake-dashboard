import React from "react";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { isDev } from "@/shared/utils/is-dev";
import { Button } from "@/shared/ui/primitives/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
  onError?: (error: Error, info: { componentStack: string }) => void;
}

export function AppErrorBoundary({
  children,
  fallback = DefaultErrorFallback,
  onError,
}: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={fallback} onError={onError}>
      {children}
    </ReactErrorBoundary>
  );
}

type DefaultErrorFallbackProps = {
  error: Error;
  resetErrorBoundary?: (...args: any[]) => void;
};

export function DefaultErrorFallback({
  error,
  resetErrorBoundary,
}: DefaultErrorFallbackProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        An unexpected error occurred. Please try again or contact support if the
        problem persists.
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
      <Button size="sm" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}
