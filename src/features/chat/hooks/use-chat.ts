import { useState, useCallback, useRef, useEffect } from "react";

import { ChatMessage, MessageType } from "../types/chat";

export function useChat(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback(
    (message: Omit<ChatMessage, "id" | "timestamp">) => {
      const newMessage: ChatMessage = {
        ...message,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    },
    []
  );

  const testSendMessage = useCallback(
    async (content: string, type: MessageType = "text", file?: File) => {
      if (!content.trim() && !file) return;

      // Add the user message
      const userMessage = addMessage({
        content: content || file?.name || "",
        type,
        isUser: true,
        imageUrl:
          file && file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        fileName: file?.name,
        fileSize: file?.size,
      });

      setIsLoading(true);

      // Check if this needs thinking mode (simulate API call scenario)
      const needsThinking =
        content.toLowerCase().includes("api") ||
        content.toLowerCase().includes("analiz") ||
        content.toLowerCase().includes("düşün");

      if (needsThinking) {
        // Start thinking mode
        setIsThinking(true);

        // Simulate thinking period (2-3 seconds)
        setTimeout(() => {
          setIsThinking(false);
          addMessage({
            content: `Düşündükten sonra şu sonuca vardım: "${content}" mesajınız analiz edildi ve detaylı bir yanıt hazırlandı.`,
            type: "text",
            isUser: false,
          });
          setIsLoading(false);
        }, 2500);
      } else {
        // Normal response without thinking
        setTimeout(() => {
          addMessage({
            content: `This is a simulated response: "${content}" message received.`,
            type: "text",
            isUser: false,
          });
          setIsLoading(false);
        }, 1000);
      }

      return userMessage;
    },
    [addMessage]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const removeMessage = useCallback((messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  }, []);

  return {
    messages,
    isLoading,
    isThinking,
    setIsThinking,
    messagesEndRef,
    testSendMessage,
    addMessage,
    clearMessages,
    removeMessage,
    scrollToBottom,
  };
}
