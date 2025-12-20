"use client";

import { cubicBezier, motion } from "framer-motion";

const slowSlide = {
  initial: {
    x: "20%",
    opacity: 0,
  },
  animate: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
  exit: {
    opacity: 0,
    x: "-10%",
    transition: { duration: 0.5 },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={slowSlide}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-screen w-full bg-background"
    >
      {children}
    </motion.div>
  );
}
