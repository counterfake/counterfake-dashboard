"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/ui";
import AppLogo from "@/components/ui/data-display/app-logo";

interface ThinkingMessageProps {
  className?: string;
}

export function ThinkingMessage({ className }: ThinkingMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 p-4 rounded-lg mr-auto max-w-[80%] fade-in",
        className
      )}
    >
      <div className="w-8 h-8">
        <AppLogo withoutText className="w-full h-full object-contain" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          {/* Thinking text */}
          <motion.span
            className="text-base text-muted-foreground font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Thinking...
          </motion.span>

          {/* Animated dots */}
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/60"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
