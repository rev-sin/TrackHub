"use client";

import { motion } from "framer-motion";

// --- THE LUXURY SLIDE ---
const slowSlide = {
  initial: {
    x: "20%", // Start slightly to the right
    opacity: 0, // Start transparent
  },
  animate: {
    x: "0%", // Slide to center
    opacity: 1, // Fade in
    transition: {
      duration: 1.5, // 1.5 seconds (Slow)
      ease: [0.22, 1, 0.36, 1], // Custom "Ease Out Quart" curve (starts fast, lands soft)
    },
  },
  exit: {
    opacity: 0,
    x: "-10%", // Slide slightly left on exit
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
