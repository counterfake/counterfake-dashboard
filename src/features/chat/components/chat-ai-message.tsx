"use client";

import { cn } from "@/common/lib/utils/ui";
import { m, LazyMotion, domAnimation } from "framer-motion";

import AppLogo from "@/common/components/ui/data-display/app-logo";
import { MarkdownContent } from "@/common/components/ui/data-display/markdown-content";

import { ChatMessage as ChatMessageType } from "../types/chat";

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
        <div className="flex items-start gap-2 w-full">
          {message.type === "jsx" && message.content && (
            <div className="mb-2">{message.content}</div>
          )}

          {message.type === "text" && message.content && (
            <LazyMotion features={domAnimation} strict>
              <m.div
                initial={
                  message.shouldAnimate !== false
                    ? { opacity: 0, y: 10 }
                    : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: message.shouldAnimate !== false ? 0.5 : 0,
                  ease: "easeOut",
                }}
                className="w-full"
              >
                <MarkdownContent
                  content={message.content as string}
                  className="text-base leading-relaxed"
                />
              </m.div>
            </LazyMotion>
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
