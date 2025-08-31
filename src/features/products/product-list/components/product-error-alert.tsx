import React from "react";
import SimpleErrorCard from "@/components/ui/data-display/cards/simple-error-card";

export default function ProductErrorAlert() {
  return (
    <SimpleErrorCard
      title="Failed to load products"
      description="Failed to load products. If the problem persists, contact support."
      layout="vertical"
      className="h-[300px]"
    />
  );
}
