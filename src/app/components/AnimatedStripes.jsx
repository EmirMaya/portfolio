"use client";

import { motion, useReducedMotion } from "framer-motion";

const stripeVariants = {
  hidden: { x: "-150%" },
  visible: { x: 0 },
};

export default function AnimatedStripes({ className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`${className} overflow-hidden`}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="motion-reduce:transform-none!"
          variants={stripeVariants}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            delay: reducedMotion ? 0 : index * 0.1,
            ease: [0.55, 0, 0.25, 1],
          }}
        />
      ))}
    </motion.div>
  );
}
