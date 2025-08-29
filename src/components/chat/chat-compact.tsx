"use client";

import { cn } from "@/lib/utils/ui";
import { ChatContainer } from "./chat-container";
import { ChatInput } from "./chat-input";

import BeamsBackground from "@/components/ui/layouts/beams-background";
import AppLogo from "@/components/ui/data-display/app-logo";

import { useChat } from "@/hooks/use-chat";

import { ChatProps } from "@/types/chat";

export function ChatCompact({
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
  const { messages, isLoading, sendMessage, clearMessages } =
    useChat(initialMessages);

  const handleSendMessage = async (content: string, type: any, file?: File) => {
    // Önce kendi hook'umuza gönder
    const userMessage = await sendMessage(content, type, file);

    // Sonra parent component'e bildir
    if (onSendMessage) {
      onSendMessage(content, type, file);
    }

    // Mesaj limitini kontrol et
    if (maxMessages && messages.length >= maxMessages) {
      // En eski mesajları sil
      const messagesToRemove = messages.length - maxMessages + 1;
      // Bu implementasyon hook'ta yapılabilir
    }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    // Toast bildirimi eklenebilir
  };

  const handleDownloadMessage = (message: any) => {
    if (message.type === "image" && message.imageUrl) {
      const link = document.createElement("a");
      link.href = message.imageUrl;
      link.download = message.fileName || "image.png";
      link.click();
    }
  };

  return (
    <BeamsBackground
      className={cn(
        "flex flex-col h-[800px] rounded-xl fade-in overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/30 border border-border shadow-xl",
        className
      )}
      intensity="medium"
    >
      {/* Header */}
      <header className="flex items-center justify-center gap-2 p-4 flex-shrink-0">
        <AppLogo withoutText className="w-12 h-12" />
        <h3 className="font-semibold text-xl">Counterfake AI</h3>
      </header>

      {/* Chat Container */}
      <div className="flex-1 min-h-0">
        <ChatContainer
          messages={messages}
          showTimestamps={showTimestamps}
          autoScroll={autoScroll}
          onClearMessages={clearMessages}
          onCopyMessage={handleCopyMessage}
          onDownloadMessage={handleDownloadMessage}
          className="flex-1 h-full"
        />
      </div>

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
    </BeamsBackground>
  );
}
