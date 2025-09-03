"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

import { Button } from "@/common/components/ui/primitives/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <html>
      <body>
        <div className="w-full min-h-screen bg-background flex items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-md">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold text-foreground">
                Something went wrong
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                An unexpected error occurred. Please try again or contact
                support if the problem persists.
              </p>
              {/* Development error details */}
              {process.env.NODE_ENV === "development" && error.message && (
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

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <Button onClick={reset} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
