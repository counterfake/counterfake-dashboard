"use client";

import { useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/primitives/scroll-area";

import { ThinkingMessage } from "./thinking-message";
import { ChatMessage as ChatMessageType } from "../types/chat";
import { ChatUserMessage } from "./chat-user-message";
import { ChatAiMessage } from "./chat-ai-message";

interface ChatContainerProps {
  messages: ChatMessageType[];
  showTimestamps?: boolean;
  autoScroll?: boolean;
  isThinking?: boolean;
  onClearMessages?: () => void;
  className?: string;
}

export function ChatContainer({
  messages,
  showTimestamps = false,
  autoScroll = true,
  isThinking = false,
  className,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, autoScroll]);

  return (
    <ScrollArea ref={scrollAreaRef} className={className}>
      <div className="p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">No message yet.</p>
            </div>
          </div>
        ) : (
          messages.map((message) =>
            message.isUser ? (
              <ChatUserMessage
                key={message.id}
                message={message}
                showTimestamp={showTimestamps}
              />
            ) : (
              <ChatAiMessage
                key={message.id}
                message={message}
                showTimestamp={showTimestamps}
              />
            )
          )
        )}

        {/* Show thinking message when bot is thinking */}
        {isThinking && <ThinkingMessage />}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
