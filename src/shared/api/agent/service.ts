import { agentApi } from "./instance";
import { ChatRequest, ChatResponse } from "./types";

// --------------------------
// Auth Services => /auth
// --------------------------
export const sendMessage = (data: ChatRequest) => {
  return agentApi.post<ChatResponse>("/chat", data);
};
