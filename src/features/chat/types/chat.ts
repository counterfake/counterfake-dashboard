export type MessageType = "text" | "image" | "file" | "jsx";

export interface ChatMessage {
  id: string;
  content: string | React.ReactNode;
  type: MessageType;
  timestamp: Date;
  isUser: boolean;
  imageUrl?: string;
  fileName?: string;
  fileSize?: number;
}

export interface ChatProps {
  placeholder?: string;
  allowModelSelection?: boolean;
  allowFiles?: boolean;
  maxMessages?: number;
  onSendMessage?: (message: string, type: MessageType, file?: File) => void;
  onReceiveMessage?: (message: ChatMessage) => void;
  messages?: ChatMessage[];
  className?: string;
  disabled?: boolean;
  showTimestamps?: boolean;
  autoScroll?: boolean;
}
