import React from "react";

import { Search } from "lucide-react";

export default function ProductGridEmpty() {
  return (
    <div className="text-center space-y-6 max-w-md mx-auto py-10">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
          <Search className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-foreground">
          No Data Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          No data found for the selected filters.
        </p>
      </div>
    </div>
  );
}
