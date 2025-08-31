"use client";

import { User } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils/ui";

import { Avatar, AvatarFallback } from "@/components/ui/primitives/avatar";

import { ChatMessage as ChatMessageType } from "../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  showTimestamp?: boolean;
  className?: string;
}

export function ChatUserMessage({
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
        "ml-auto max-w-[80%] bg-muted/50 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]",
        className
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-start gap-2">
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

          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {showTimestamp && (
          <p className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </p>
        )}
      </div>

      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
