import React from "react";

import { cn } from "@/common/lib/utils/ui";

import LoadingPage from "@/common/components/pages/loading-page";

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function LoadingWrapper({
  isLoading,
  children,
}: LoadingWrapperProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center will-change-[opacity] transition-opacity duration-300 ease-in-out",
          isLoading ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <LoadingPage />
      </div>
      {children}
    </>
  );
}
