"use client";

import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

export type AnimationType =
  | "fadeIn"
  | "fadeOut"
  | "slideInLeft"
  | "slideInRight"
  | "slideInUp"
  | "slideInDown"
  | "scaleIn"
  | "scaleOut"
  | "rotateIn"
  | "zoomIn"
  | "custom";

const animationVariants: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeOut: {
    hidden: { opacity: 1 },
    visible: { opacity: 0 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleOut: {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 0, scale: 0.8 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -180 },
    visible: { opacity: 1, rotate: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  },
  custom: {
    hidden: {},
    visible: {},
  },
};

interface AnimateProps {
  children: React.ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  triggerOnView?: boolean;
  once?: boolean;
  threshold?: number;
  className?: string;
  customVariants?: Variants;
  as?: keyof React.JSX.IntrinsicElements;
  [key: string]: any;
}

export default function Animate({
  children,
  type = "fadeIn",
  duration = 0.5,
  delay = 0,
  triggerOnView = false,
  once = true,
  threshold = 0.1,
  className = "",
  customVariants,
  as = "div",
  ...props
}: AnimateProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const variants = customVariants || animationVariants[type];

  const transition = {
    duration,
    delay,
    ease: "easeOut",
  };

  // If triggerOnView is active, animate based on visibility
  const shouldAnimate = triggerOnView ? isInView : true;

  const MotionComponent = motion[as as keyof typeof motion] as any;

  return (
    <MotionComponent
      ref={triggerOnView ? ref : undefined}
      className={className}
      variants={variants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      transition={transition}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
