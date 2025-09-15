"use client";

import { FC, ElementType } from "react";
import { motion, MotionProps, useInView } from "motion/react";
import { useRef } from "react";
import { PiStarFourFill } from "react-icons/pi";

interface Props extends MotionProps {
  text: string;
  as?: ElementType;
  delay?: number;
  duration?: number;
  className?: string;
  /**
   * Animation should start when element enters the viewport
   */
  triggerOnView?: boolean;
  /**
   * Viewport threshold for animation trigger
   */
  viewThreshold?: number;
  /**
   * Animation should only run once
   */
  once?: boolean;
  /**
   * Convert normal spaces to non-breaking spaces. This prevents line wrapping.
   * Keep it false to allow natural wrapping behavior.
   */
  convertSpacesToNbsp?: boolean;
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
}

export const TextReveal: FC<Props> = ({
  text,
  as = "h2",
  delay = 0.3,
  duration = 0.02,
  className = "flex overflow-hidden text-4xl font-black text-black",
  triggerOnView = false,
  viewThreshold = 0.1,
  once = true,
  convertSpacesToNbsp = false,
  beforeContent,
  afterContent,
  ...props
}: Props) => {
  const letters = Array.from(text);
  const MotionComponent = motion[as as keyof typeof motion] as any;
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: viewThreshold,
    once: once,
  });

  const animationState = triggerOnView
    ? isInView
      ? "visible"
      : "hidden"
    : "visible";

  return (
    <MotionComponent
      ref={ref}
      role="heading"
      variants={{
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
          opacity: 1,
          transition: {
            staggerChildren: duration,
            delayChildren: i * delay,
          },
        }),
      }}
      initial="hidden"
      animate={animationState}
      className={className}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
              },
            },
            hidden: { opacity: 0, y: 10 },
          }}
        >
          {index === 0 && beforeContent}
          {letter === " " ? (convertSpacesToNbsp ? "\u00A0" : " ") : letter}
          {index === letters.length - 1 && afterContent}
        </motion.span>
      ))}
    </MotionComponent>
  );
};
