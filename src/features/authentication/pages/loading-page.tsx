"use client";

import React from "react";

import Spinner from "@/components/ui/primitives/spinner";

export default function LoadingPage() {
  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center space-y-6 animate-pulse">
        {/* Simple Loading Spinner */}
        <Spinner size="lg" />

        {/* Simple Text */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-foreground">
            Loading Our System...
          </h2>
          <p className="text-sm text-muted-foreground">Please wait...</p>
        </div>
      </div>
    </div>
  );
}
