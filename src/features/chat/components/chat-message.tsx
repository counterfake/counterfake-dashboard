"use client";

import { User } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils/ui";

import { Avatar, AvatarFallback } from "@/components/ui/primitives/avatar";
import AppLogo from "@/components/ui/data-display/app-logo";

import { ChatMessage as ChatMessageType } from "../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  showTimestamp?: boolean;
  className?: string;
}

export function ChatMessage({
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
        message.isUser
          ? "ml-auto max-w-[80%] bg-muted/50 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
          : "mr-auto max-w-[80%]",
        className
      )}
    >
      {!message.isUser && (
        <div className="w-8 h-8">
          <AppLogo withoutText className="w-full h-full object-contain" />
        </div>
      )}

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            {message.type === "image" && message.imageUrl && (
              <div className="mb-2">
                <Image
                  src={message.imageUrl}
                  alt="Uploaded image"
                  className="max-w-full min-w-[200px] h-auto rounded-md border"
                  width={200}
                  height={200}
                />
              </div>
            )}

            {message.type === "file" && message.fileName && (
              <div className="mb-2 p-2 bg-background/50 rounded border flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {message.fileName}
                  </p>
                  {message.fileSize && (
                    <p className="text-xs text-muted-foreground">
                      {(message.fileSize / 1024).toFixed(1)} KB
                    </p>
                  )}
                </div>
              </div>
            )}

            {message.type === "jsx" && message.content && (
              <div className="mb-2">{message.content}</div>
            )}

            {message.type === "text" && message.content && (
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            )}
          </div>
        </div>

        {showTimestamp && (
          <p className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </p>
        )}
      </div>

      {message.isUser && (
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
