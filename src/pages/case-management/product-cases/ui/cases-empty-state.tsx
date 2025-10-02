import React from "react";
import { Package } from "lucide-react";

export function CasesEmptyState() {
  return (
    <div className="text-center py-12">
      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">No cases found.</p>
    </div>
  );
}
