"use client";

import React from "react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/primitives/button";

export interface DashboardSidebarFooterProps {
  appVersion: string;
  onLogout: () => void;
}

export function DashboardSidebarFooter({
  appVersion,
  onLogout,
}: DashboardSidebarFooterProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-center font-semibold text-muted-foreground/70">
          App Version: <span>v{appVersion}</span>
        </p>
      </div>
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
