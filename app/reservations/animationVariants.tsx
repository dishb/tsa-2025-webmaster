import { Variants } from "framer-motion";

export const slideInVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      bounce: 0.25,
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.98,
    transition: { duration: 0.4, type: "tween" },
  },
};

const floatingVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.06, 1],
    opacity: [1, 0.92, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      type: "tween",
    },
  },
};

export const shakeVariants: Variants = {
  shake: {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: {
      duration: 0.5,
      ease: [0.36, 0.07, 0.19, 0.97],
      type: "tween",
    },
  },
};

export { floatingVariants };
