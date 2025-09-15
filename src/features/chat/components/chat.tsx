"use client";

import { cn } from "@/common/lib/utils/ui";

import BeamsBackground from "@/common/components/ui/layouts/beams-background";

import { ChatContainer } from "./chat-container";
import { ChatInput } from "./chat-input";

import { useChat } from "../hooks/use-chat";
import { ChatProps } from "../types/chat";

export function Chat({
  placeholder,
  allowModelSelection = true,
  allowFiles = true,
  maxMessages = 100,
  onSendMessage,
  messages: initialMessages = [],
  className,
  disabled = false,
  showTimestamps = false,
  autoScroll = true,
}: ChatProps) {
  const { messages, isLoading, testSendMessage, clearMessages } =
    useChat(initialMessages);

  const handleSendMessage = async (content: string, type: any, file?: File) => {
    // Send to hook
    await testSendMessage(content, type, file);

    // After sending to hook, send to parent component
    if (onSendMessage) {
      onSendMessage(content, type, file);
    }

    // Check message limit
    if (maxMessages && messages.length >= maxMessages) {
      // Remove old messages
      const messagesToRemove = messages.length - maxMessages + 1;
      // This implementation can be done in the hook
    }
  };

  return (
    <BeamsBackground
      className={cn(
        "h-full flex flex-col rounded-xl fade-in overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/30 border border-border/50 shadow-xl backdrop-blur-sm",
        className
      )}
      intensity="medium"
    >
      {/* Chat Container */}
      <div className="w-full max-w-5xl mx-auto relative flex-1 flex flex-col min-h-0 z-1">
        <ChatContainer
          messages={messages}
          showTimestamps={showTimestamps}
          autoScroll={autoScroll}
          onClearMessages={clearMessages}
          className="flex-1"
        />

        {/* Input */}
        <div className="relative p-6">
          <ChatInput
            onSendMessage={handleSendMessage}
            placeholder={placeholder}
            allowFiles={allowFiles}
            allowModelSelection={allowModelSelection}
            disabled={disabled || isLoading}
          />
        </div>
      </div>
    </BeamsBackground>
  );
}
