"use client";

import { cn } from "@/common/lib/utils/ui";
import { motion } from "motion/react";

interface ShimmerTextProps {
  text: string;
  className?: string;
  showContainer?: boolean;
}

export default function ShimmerText({
  text = "Text Shimmer",
  className,
  showContainer = true,
}: ShimmerTextProps) {
  const shimmerElement = (
    <motion.div
      className="relative overflow-hidden"
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className={cn(
          "bg-gradient-to-r from-neutral-950 via-neutral-400 to-neutral-950 dark:from-white dark:via-neutral-600 dark:to-white bg-[length:200%_100%] bg-clip-text text-transparent",
          className
        )}
        animate={{
          backgroundPosition: ["200% center", "-200% center"],
        }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );

  if (showContainer) {
    return (
      <div className="flex items-center justify-center">{shimmerElement}</div>
    );
  }

  return shimmerElement;
}
