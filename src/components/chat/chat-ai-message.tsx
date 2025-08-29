"use client";

import { cn } from "@/lib/utils/ui";

import AppLogo from "@/components/ui/data-display/app-logo";

import { ChatMessage as ChatMessageType } from "../../types/chat";
import { TextReveal } from "../ui/animation/text-reveal";

interface ChatMessageProps {
  message: ChatMessageType;
  showTimestamp?: boolean;
  className?: string;
}

export function ChatAiMessage({
  message,
  showTimestamp = false,
  className,
}: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg transition-all duration-200 fade-in",
        "mr-auto max-w-[80%]",
        className
      )}
    >
      <div className="w-8 h-8 shrink-0">
        <AppLogo
          withoutText
          className="w-full h-full object-contain select-none"
          draggable={false}
        />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-start gap-2">
          {message.type === "jsx" && message.content && (
            <div className="mb-2">{message.content}</div>
          )}

          {message.type === "text" && message.content && (
            <TextReveal
              text={message.content as string}
              className="text-base leading-relaxed whitespace-pre-wrap"
              duration={0.02}
              as="p"
            />
          )}
        </div>

        {showTimestamp && (
          <p className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}
