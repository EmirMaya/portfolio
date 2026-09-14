"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SectionTitle({ id, className = "", children }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.h2
      id={id}
      className={`${className} motion-reduce:opacity-100!`}
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.h2>
  );
}
