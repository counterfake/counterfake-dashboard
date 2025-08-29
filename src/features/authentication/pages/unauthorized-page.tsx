"use client";

import React from "react";
import Link from "next/link";
import { ShieldX, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/primitives/button";
import { ROUTES } from "@/lib/config/routes";

export default function UnauthorizedPage() {
  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldX className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-foreground">
            Access Denied
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You don&apos;t have permission to access this page. Please sign in
            with the appropriate credentials.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button asChild className="w-full">
            <Link href={ROUTES.USER_DASHBOARD_SIGN_IN}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
