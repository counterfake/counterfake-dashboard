import { useAgentStore } from "@/entities/agent";

import { useChat } from "@/features/chat/hooks/use-chat";

import * as agentApi from "@/shared/api/agent";
import { useEffect, useRef } from "react";

export const useSendMessage = () => {
  const {
    messages,
    isThinking,
    isLoading,
    clearMessages,
    addMessage,
    setIsThinking,
    setIsLoading,
  } = useChat();

  const messageHistory = useAgentStore((state) => state.conversationHistory);
  const setMessageHistory = useAgentStore(
    (state) => state.setConversationHistory
  );
  
  const isInitialized = useRef(false);

  const sendUserMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add the user message
    const userMessage = addMessage({
      content: content,
      type: "text",
      isUser: true,
    });

    // User mesajını history'ye ekle
    const updatedHistoryWithUser = [...messageHistory, { role: "user" as const, content }];
    setMessageHistory(updatedHistoryWithUser);

    setIsLoading(true);
    setIsThinking(true);

    try {
      const response = await agentApi.sendMessage({
        message: content,
        conversation_history: messageHistory,
      });

      addMessage({
        content: response.data.response,
        type: "text",
        isUser: false,
      });

      // Assistant mesajını da history'ye ekle
      setMessageHistory([
        ...updatedHistoryWithUser,
        { role: "assistant" as const, content: response.data.response },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }

    return userMessage;
  };

  const clearChat = () => {
    clearMessages();
    setMessageHistory([]);
  };

  // Store'dan mesajları yalnızca ilk yüklemede yükle
  useEffect(() => {
    if (!isInitialized.current && messageHistory.length > 0) {
      messageHistory.forEach((msg) => {
        addMessage({
          content: msg.content,
          type: "text",
          isUser: msg.role === "user",
          shouldAnimate: false, // Store'dan yüklenen mesajlar animasyonsuz
        });
      });
      isInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendUserMessage, messages, clearChat, isThinking, isLoading };
};
