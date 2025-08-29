"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/primitives/button";

import { SidebarConfig } from "../../config/sidebar";
import { cn } from "@/lib/utils/ui";

interface DashboardSidebarNavigationProps {
  currentPage: string;
  // navigations: SidebarConfig["NAVIGATIONS"];
  navigations: SidebarConfig["NAVIGATIONS"];
}

export function DashboardSidebarNavigation({
  currentPage,
  navigations,
}: DashboardSidebarNavigationProps) {
  return (
    <nav className="flex-1 p-4 space-y-1">
      {navigations.map((item) => {
        const Icon = item.icon;

        const isActive = currentPage === item.href;

        return (
          <Link href={item.href} key={item.id} className="inline-block w-full">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start focus-within:ring-transparent hover:bg-muted",
                isActive && "bg-muted text-accent-foreground"
              )}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
