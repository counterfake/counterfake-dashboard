"use client";

import { Trash2 } from "lucide-react";

import { ChatContainer } from "@/features/chat/components/chat-container";
import { ChatInput } from "@/features/chat/components/chat-input";
import { Button } from "@/common/components/ui/primitives/button";
import { AICard } from "@/shared/ui/ai/ai-card";
import { useSendMessage } from "../model/use-send-message";

export function ChatPage() {
  const { sendUserMessage, clearChat, messages, isThinking, isLoading } =
    useSendMessage();

  const handleSendMessage = async (content: string) => {
    await sendUserMessage(content);
  };

  return (
    <AICard
      className="h-screen max-h-screen fade-in"
      childrenClassName="flex flex-col justify-between h-full"
    >
      {/* Header */}
      <div className="w-full max-w-3xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between border-b border-border shrink-0">
        <div>
          <h1 className="text-2xl font-semibold">Chat</h1>
          <p className="text-sm text-muted-foreground">
            Chat with Our AI (Beta)
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearChat}
          disabled={messages.length === 0}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear Chat
        </Button>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-3xl mx-auto min-h-0 flex-1">
        <ChatContainer
          messages={messages}
          isThinking={isThinking}
          autoScroll
          className="flex-1 h-full"
        />
      </div>

      {/* Input */}
      <div className="relative p-6 w-full max-w-3xl mx-auto shrink-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          placeholder="Send a message..."
          allowFiles={false}
          allowModelSelection
          disabled={isLoading}
        />
      </div>
    </AICard>
  );
}
