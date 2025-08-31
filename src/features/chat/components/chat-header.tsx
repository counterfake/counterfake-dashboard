"use client";

import { Button } from "@/components/ui/primitives/button";
import AppLogo from "@/components/ui/data-display/app-logo";
import { MessageCircle, Minimize2, Maximize2, X } from "lucide-react";

interface ChatHeaderProps {
  title?: string;
  isLoading?: boolean;
  showMinimize?: boolean;
  showFullscreen?: boolean;
  showClose?: boolean;
  onMinimize?: () => void;
  onFullscreen?: () => void;
  onClose?: () => void;
}

export function ChatHeader({
  title = "Counterfake AI",
  isLoading = false,
  showMinimize = false,
  showFullscreen = false,
  showClose = false,
  onMinimize,
  onFullscreen,
  onClose,
}: ChatHeaderProps) {
  return (
    <header className="w-full max-w-5xl mx-auto sticky top-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border/20">
      <div className="flex items-center gap-2">
        <AppLogo withoutText className="w-8 h-8" />
        <h3 className="font-semibold text-xl">{title}</h3>
        {isLoading && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {showMinimize && onMinimize && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="h-8 w-8 p-0 hover:bg-muted/50"
            title="Küçült"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
        )}

        {showFullscreen && onFullscreen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onFullscreen}
            className="h-8 w-8 p-0 hover:bg-muted/50"
            title="Tam Ekran"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        )}

        {showClose && onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
            title="Kapat"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </header>
  );
}

// Minimize edilmiş durumdaki floating button
export function ChatFloatingButton({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <Button
        onClick={onClick}
        className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        title="Chat'i Aç"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
}
