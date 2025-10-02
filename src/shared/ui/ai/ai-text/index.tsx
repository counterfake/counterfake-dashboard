import React from "react";

import { TextReveal } from "@/common/components/ui/animation/text-reveal";
import { cn } from "@/common/lib/utils/ui";

interface AITextProps {
  text: string;
  className?: string;
}

export default function AIText({ text, className }: AITextProps) {
  return (
    <TextReveal
      text={text}
      duration={0.01}
      delay={0.4}
      as="p"
      className={cn(
        "text-base font-medium whitespace-pre-wrap break-words",
        className
      )}
      convertSpacesToNbsp={false}
      triggerOnView
    />
  );
}
