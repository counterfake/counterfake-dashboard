"use client";

import React from "react";
import {
  LogOut,
  CheckCircle,
  AlertCircle,
  RefreshCcw,
  Home,
  IterationCcw,
} from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { useRouter } from "next/navigation";

interface LogoutVerificationPageProps {
  showSuccess?: boolean;
  showError?: boolean;
  errorMessage?: string;
}

export default function LogoutVerificationPage({
  showSuccess = false,
  showError = false,
  errorMessage = "An error occurred during logout. Please try again.",
}: LogoutVerificationPageProps) {
  const router = useRouter();

  const handleReloadPage = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderSuccess = () => {
    return (
      <div className="animate-fadeIn space-y-6">
        <div className="flex justify-center">
          <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary animate-pulse" />
            {/* Success ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-foreground font-inter">
            Successfully Logged Out
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed font-albert-sans">
            You have been securely signed out of your account. You will be
            redirected to the sign-in page right away.
          </p>
        </div>
      </div>
    );
  };

  const renderError = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="flex justify-center">
        <div className="relative w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-destructive animate-pulse" />
          {/* Error ring */}
          <div className="absolute inset-0 rounded-full border-2 border-destructive/30" />
        </div>
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-foreground font-inter">
          Logout Error
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed font-albert-sans">
          {errorMessage}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={handleGoBack}>
          <IterationCcw className="w-4 h-4 mr-2" />
          Go Back
        </Button>
        <Button onClick={handleReloadPage}>
          <RefreshCcw className="w-4 h-4 mr-2" />
          Reload the Page
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        {/* Success State */}
        {showSuccess && renderSuccess()}

        {/* Error State */}
        {showError && renderError()}

        {/* Loading State (default) */}
        {!showSuccess && !showError && (
          <div className="animate-fadeIn space-y-6">
            <div className="flex justify-center">
              <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <LogOut className="w-8 h-8 text-primary" />
                {/* Spinning border */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary/30 animate-spin" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold text-foreground font-inter">
                Logging You Out
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed font-albert-sans">
                Please wait while we securely sign you out of your account...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
