"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { cn } from "@/lib/utils/ui";

interface SuccessScreenProps {
  brandName: string;
}

export function SuccessScreen({ brandName }: SuccessScreenProps) {
  return (
    <div className="text-center space-y-8">
      {/* Success Animation */}
      <div className="relative">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto relative">
          <div className="absolute inset-0 bg-success/5 rounded-full animate-ping" />
          <CheckCircle className="w-12 h-12 text-success relative z-10" />
        </div>

        {/* Floating particles */}
        <div className="absolute -top-4 -left-4">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </div>
        <div className="absolute -top-2 -right-6">
          <Sparkles className="w-3 h-3 text-secondary animate-pulse delay-300" />
        </div>
        <div className="absolute -bottom-2 -left-6">
          <Sparkles className="w-3 h-3 text-accent animate-pulse delay-700" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Welcome!</h2>
        <div className="space-y-2">
          <p className="text-xl text-foreground">
            <span className="font-semibold text-primary">{brandName}</span>{" "}
            successfully registered
          </p>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Your brand is now under the CounterFake protection system. You can
            track your protection status from your dashboard.
          </p>
        </div>
      </div>

      {/* Features Summary */}
      <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl p-6 border border-border/30">
        <div className="space-y-4">
          <div className="flex items-center gap-3 justify-center">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Active Protection Features
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-muted-foreground">24/7 Automatic Scan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-muted-foreground">Real-Time Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-muted-foreground">
                Legal Support Service
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-muted-foreground">Detailed Reporting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">
          What&apos;s Next?
        </h4>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">1</span>
            </div>
            <p>
              Your account is being approved and the protection system is being
              activated (15-30 minutes)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">2</span>
            </div>
            <p>The first scan results will be sent to you by email</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">3</span>
            </div>
            <p>You can track all activities from your dashboard</p>
          </div>
        </div>
      </div>

      {/* Dashboard Button */}
      <div className="pt-4">
        <Link href="/dashboard">
          <Button
            className={cn(
              "w-full h-12 text-base font-semibold transition-all duration-200",
              "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80",
              "shadow-lg hover:shadow-xl group"
            )}
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground mt-3">
          You can see your brand&apos;s protection status and activities from
          the dashboard
        </p>
      </div>
    </div>
  );
}
