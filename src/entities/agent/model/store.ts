import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Message } from "@/shared/api/agent";

interface AgentStore {
  conversationHistory: Message[];
  setConversationHistory: (conversationHistory: Message[]) => void;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      conversationHistory: [],
      setConversationHistory: (conversationHistory) =>
        set({ conversationHistory }),
    }),
    {
      name: "agent",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
