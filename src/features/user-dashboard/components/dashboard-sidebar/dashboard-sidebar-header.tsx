import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import AppLogo from "@/common/components/ui/data-display/app-logo";

interface DashboardSidebarHeaderProps {
  appName: string;
  brandName: string;
}

export function DashboardSidebarHeader({
  brandName,
  appName,
}: DashboardSidebarHeaderProps) {
  return (
    <Link
      href="/dashboard"
      className="relative w-full p-6 border-b border-border flex items-center justify-center group/header hover:bg-muted overflow-hidden"
    >
      <AppLogo className="w-20 transition-all duration-300" />
      <X className="w-4 h-4 mx-3" />

      <div className="relative overflow-hidden flex-1 h-20 transition-all duration-300">
        {/* Brand Section */}
        <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out translate-x-0 opacity-100 group-hover/header:-translate-x-full group-hover/header:opacity-0">
          <h2 className="font-semibold text-lg capitalize">{brandName}</h2>
          <p className="text-sm text-muted-foreground">Brand Protection</p>
        </div>

        {/* Slogan Section */}
        <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out -translate-x-full opacity-0 group-hover/header:translate-x-0 group-hover/header:opacity-100">
          <h2 className="font-semibold text-lg">{appName}</h2>
          <p className="whitespace-nowrap text-xs text-muted-foreground flex items-center gap-2">
            Go to Dashboard <ArrowRight className="w-2 h-2" />
          </p>
        </div>
      </div>
    </Link>
  );
}
