import React from "react";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { isDev } from "@/shared/utils/is-dev";
import { Button } from "@/shared/ui/primitives/button";
import { AppError } from "@/shared/lib/error-handler";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: AppError | Error;
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
  error: AppError | Error;
  resetErrorBoundary?: (...args: any[]) => void;
};

export function DefaultErrorFallback({
  error,
  resetErrorBoundary,
}: DefaultErrorFallbackProps) {
  const DeveloperErrorDetail = (
    <>
      <details className="mt-4 text-xs text-muted-foreground bg-muted/50 p-3 rounded border text-left">
        <summary className="cursor-pointer font-medium">Error Details</summary>
        <pre className="mt-2 whitespace-pre-wrap break-words">
          {error.message}
        </pre>
      </details>
      <details className="mt-4 text-xs text-muted-foreground bg-muted/50 p-3 rounded border text-left">
        <summary className="cursor-pointer font-medium">Error Payload</summary>
        <pre className="mt-2 whitespace-pre-wrap break-words">
          {JSON.stringify(error, null, 2)}
        </pre>
      </details>
    </>
  );

  if (error instanceof AppError && error.response?.status === 404) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-foreground">404 Not found</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The resource you are looking for does not exist or has been deleted.
        </p>
        {isDev && error.message && DeveloperErrorDetail}
      </div>
    );
  }

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
      {isDev && error.message && DeveloperErrorDetail}
      <Button size="sm" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}
