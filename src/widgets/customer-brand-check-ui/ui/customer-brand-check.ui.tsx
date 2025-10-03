import { useAuthStore } from "@/common/lib/stores/auth-store";
import React from "react";

export default function CustomerBrandCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  if (!user?.brand?.ownedBrands?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <h3 className="text-xl font-semibold">Brand not found</h3>
        <p className="text-base text-muted-foreground">
          Please select a brand on the sidebar.
        </p>
      </div>
    );
  }

  return children;
}
