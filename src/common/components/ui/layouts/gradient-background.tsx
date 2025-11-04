"use client";

import { cn } from "@/shared/lib/cn";
import React from "react";

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
}

export function GradientBackground({
  children,
  className,
  childrenClassName,
}: GradientBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="ai-conic" />
      </div>

      <div className={cn("p-6 relative z-0", childrenClassName)}>
        {children}
      </div>

      <style jsx>{`
        .ai-conic {
          position: absolute;
          left: -20%;
          top: -20%;
          width: 140%;
          height: 140%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            rgba(59, 130, 246, 0.28) 0deg,
            rgba(168, 85, 247, 0.28) 90deg,
            rgba(16, 185, 129, 0.24) 180deg,
            rgba(99, 102, 241, 0.26) 270deg,
            rgba(59, 130, 246, 0.28) 360deg
          );
          filter: blur(40px);
          opacity: 0.5;
          transform-origin: 50% 50%;
          will-change: transform, opacity;
          animation: ai-spin 60s linear infinite,
            ai-pulse 8s ease-in-out infinite alternate;
        }

        @keyframes ai-spin {
          to {
            transform: rotate(360deg) scale(1.06);
          }
        }

        @keyframes ai-pulse {
          0% {
            opacity: 0.35;
          }
          100% {
            opacity: 0.6;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-conic {
            animation: none;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
