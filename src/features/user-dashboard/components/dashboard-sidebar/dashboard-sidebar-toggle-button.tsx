"use client";

import { AlignJustify, ChevronLeft, ChevronRight } from "lucide-react";

import { useSidebar } from "@/common/components/ui/primitives/sidebar";
import { Button } from "@/common/components/ui/primitives/button";

export function DashboardSidebarToggleButton() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full text-primary h-auto py-2"
      onClick={toggleSidebar}
      title="Toggle Sidebar"
    >
      {open ? (
        <>
          <AlignJustify className="ml-1 w-4 h-4" />
          <ChevronLeft className="w-3 h-3" />
        </>
      ) : (
        <>
          <AlignJustify className="ml-1 w-4 h-4" />
          <ChevronRight className="w-3 h-3" />
        </>
      )}
    </Button>
  );
}
