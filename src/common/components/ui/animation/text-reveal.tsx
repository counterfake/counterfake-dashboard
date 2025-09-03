"use client";

import { FC, ElementType } from "react";
import { motion, MotionProps } from "motion/react";

interface Props extends MotionProps {
  text: string;
  as?: ElementType;
  delay?: number;
  duration?: number;
  className?: string;
}

export const TextReveal: FC<Props> = ({
  text,
  as = "h2",
  delay = 0.3,
  duration = 0.02,
  className = "flex overflow-hidden mt-10 text-4xl font-black text-black",
  ...props
}: Props) => {
  const letters = Array.from(text);
  const MotionComponent = motion[as as keyof typeof motion] as any;

  return (
    <MotionComponent
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
      animate="visible"
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
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </MotionComponent>
  );
};
