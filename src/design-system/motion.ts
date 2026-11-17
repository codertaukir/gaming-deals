import type { Transition, Variants } from 'motion/react';

export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export const TRANSITION_FAST: Transition = {
  duration: 0.16,
  ease: MOTION_EASE,
};

export const TRANSITION_STANDARD: Transition = {
  duration: 0.22,
  ease: MOTION_EASE,
};

export const TRANSITION_REVEAL: Transition = {
  duration: 0.34,
  ease: MOTION_EASE,
};

export const pageEnterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: MOTION_EASE,
    },
  },
};

export const fadeSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_REVEAL,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
    },
  },
};

export const modalPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    y: 6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: TRANSITION_STANDARD,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 4,
    transition: TRANSITION_FAST,
  },
};

export const dropdownMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -4,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: TRANSITION_FAST,
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.12, ease: MOTION_EASE },
  },
};
