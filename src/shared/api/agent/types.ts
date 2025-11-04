export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

export interface ChatRequest {
  message: string;
  conversation_history: Message[];
}

export interface ChatResponse {
  response: string;
}
