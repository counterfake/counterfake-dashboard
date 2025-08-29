"use client";

import BeamsBackground from "@/components/ui/layouts/beams-background";

import { ChatContainer } from "../../../components/chat/chat-container";
import { ChatInput } from "../../../components/chat/chat-input";
import { useChat } from "../../../hooks/use-chat";

export function ChatDemoPage() {
  const { messages, isLoading, isThinking, testSendMessage } = useChat([]);

  const handleSendMessage = async (content: string, type: any, file?: File) => {
    await testSendMessage(content, type, file);
  };

  return (
    <BeamsBackground className="flex flex-col h-screen rounded-xl fade-in overflow-hidden">
      {/* Chat Container */}
      <div className="w-full max-w-3xl mx-auto flex-1 min-h-0">
        <ChatContainer
          messages={messages}
          isThinking={isThinking}
          autoScroll
          className="flex-1 h-full"
        />
      </div>

      {/* Input */}
      <div className="relative p-6 w-full max-w-3xl mx-auto">
        <ChatInput
          onSendMessage={handleSendMessage}
          placeholder="Send a message..."
          allowFiles
          allowModelSelection
          disabled={isLoading}
        />
      </div>
    </BeamsBackground>
  );
}
