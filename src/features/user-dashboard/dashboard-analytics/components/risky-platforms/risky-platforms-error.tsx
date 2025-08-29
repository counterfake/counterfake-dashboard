import React from "react";

import SimpleErrorCard from "@/components/ui/data-display/cards/simple-error-card";

export default function RiskyPlatformsError() {
  return (
    <SimpleErrorCard
      title="Failed to load risky platforms."
      description="Failed to load risky platforms. If the problem persists, contact support."
      layout="vertical"
      className="h-[500px]"
    />
  );
}
