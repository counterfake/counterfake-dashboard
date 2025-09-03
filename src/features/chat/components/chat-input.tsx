"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoMdSend } from "react-icons/io";
import { Paperclip, X, Check, ChevronDown } from "lucide-react";

import { cn } from "@/common/lib/utils/ui";

import { Button } from "@/common/components/ui/primitives/button";
import { Textarea } from "@/common/components/ui/primitives/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/primitives/dropdown-menu";

import { MessageType } from "../types/chat";

import AppLogo from "@/common/components/ui/data-display/app-logo";

interface ChatInputProps {
  onSendMessage?: (content: string, type: MessageType, file?: File) => void;
  placeholder?: string;
  allowFiles?: boolean;
  allowModelSelection?: boolean;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

const AI_MODELS = [
  "Counterfake Agent Bot",
  "Counterfake Chat Bot",
  "Counterfake Image Analysis",
];

export function ChatInput({
  onSendMessage,
  placeholder = "Send a message...",
  allowFiles = true,
  allowModelSelection = true,
  disabled = false,
  maxLength = 1000,
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);

  const handleSend = () => {
    if ((!message.trim() && !selectedFile) || disabled) return;

    let messageType: MessageType;

    if (selectedFile)
      messageType = selectedFile.type.startsWith("image/") ? "image" : "file";
    else messageType = "text";

    onSendMessage?.(message.trim(), messageType, selectedFile || undefined);

    setMessage("");
    setSelectedFile(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert("File size must be less than 10MB.");
      return;
    }
    setSelectedFile(file);
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Seçili dosya önizleme */}
      {selectedFile && (
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border">
          {selectedFile.type.startsWith("image/") ? (
            <div className="w-12 h-12 rounded overflow-hidden bg-background">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded bg-accent flex items-center justify-center">
              📄
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={removeSelectedFile}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main input area */}
      <div
        className="w-full relative bg-muted/50 flex flex-col overflow-hidden rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="overflow-y-auto max-h-[400px]">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoFocus
            className={cn(
              "text-lg w-full bg-transparent px-4 py-3 border-none rounded-none placeholder:text-black/70 resize-none focus-visible:ring-0 focus-visible:ring-offset-0",
              "min-h-[32px]"
            )}
          />
        </div>

        <div
          className={cn(
            "h-14 flex items-center transition-all duration-300",
            disabled && "opacity-50"
          )}
        >
          <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between w-[calc(100%-24px)]">
            <div className="flex items-center gap-2">
              {allowModelSelection && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center font-semibold text-muted-foreground rounded-full hover:bg-muted/50 focus-within:ring-0 focus-within:ring-offset-0"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedModel}
                          initial={{
                            opacity: 0,
                            y: -5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 5,
                          }}
                          transition={{
                            duration: 0.15,
                          }}
                          className="flex items-center gap-1"
                        >
                          <AppLogo withoutText className="w-4 h-4 mr-1" />
                          {selectedModel}
                          <ChevronDown className="w-3 h-3" />
                        </motion.div>
                      </AnimatePresence>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className={cn(
                      "min-w-[10rem]",
                      "border-black/10 dark:border-white/10",
                      "bg-gradient-to-b from-white via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800"
                    )}
                  >
                    {AI_MODELS.map((model) => (
                      <DropdownMenuItem
                        key={model}
                        onSelect={() => setSelectedModel(model)}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <AppLogo withoutText className="w-4 h-4" />
                          {/* Use mapped SVG or fallback */}
                          <span>{model}</span>
                        </div>
                        {selectedModel === model && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="flex items-center gap-2">
              {allowFiles && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFileAttach}
                  disabled={disabled}
                  className="text-muted-foreground rounded-full"
                >
                  <Paperclip className="w-4 h-4 mr-1" />
                  Upload File
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full bg-muted-foreground/10 text-muted-foreground hover:bg-muted-foreground/20",
                  "focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-ring"
                )}
                aria-label="Send message"
                disabled={!message.trim()}
                onClick={handleSend}
              >
                <IoMdSend
                  className={cn(
                    "w-4 h-4",
                    message.trim() ? "opacity-100" : "opacity-80"
                  )}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Karakter sayacı */}
      {message.length > maxLength * 0.8 && (
        <div className="text-xs text-muted-foreground text-right">
          {message.length}/{maxLength}
        </div>
      )}

      {/* Drag & drop ipucu */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
          <p className="text-primary font-medium">Dosyayı buraya bırakın</p>
        </div>
      )}
    </div>
  );
}
