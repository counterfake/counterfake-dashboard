import { ExternalLink } from "lucide-react";

import { Badge } from "@/common/components/ui/primitives/badge";
import { Button } from "@/common/components/ui/primitives/button";

interface InfoBarProps {
  onFeedbackClick: () => void;
  showFeedbackButton: boolean;
}

export default function InfoBar({
  onFeedbackClick,
  showFeedbackButton,
}: InfoBarProps) {
  return (
    <div className="w-full bg-accent border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {/* Beta Badge */}
          <Badge variant="outline">BETA</Badge>

          {/* Message */}
          <p className="text-sm text-foreground/80 font-medium text-center">
            Our app is currently in beta version. Some errors may occur until
            the final version is released.
          </p>

          {/* Feedback Link */}
          {showFeedbackButton && (
            <Button
              variant="default"
              size="sm"
              className="rounded-full text-sm whitespace-nowrap"
              onClick={onFeedbackClick}
            >
              Give Feedback
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
