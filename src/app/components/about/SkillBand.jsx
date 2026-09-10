"use client";

import { motion } from "framer-motion";

const accentClasses = {
  frontend: "bg-violet-twilight",
  backend: "bg-bright-ocean",
  workflow: "bg-strong-cyan",
};

const titleOffsetClasses = {
  frontend: "ml-0",
  backend: "ml-[clamp(1.5rem,4vw,3rem)]",
  workflow: "ml-[clamp(3rem,8vw,6rem)]",
};

const slideVariants = {
  hidden: { x: "-100vw" },
  visible: { x: 0 },
};

export default function SkillBand({ label, tone, delay, reducedMotion }) {
  return (
    <summary className="relative isolate flex h-[34px] cursor-pointer list-none items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-site-cream [&::-webkit-details-marker]:hidden">
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 left-[calc(-1*var(--intro-inset,0px))] ${accentClasses[tone]}`}
        variants={slideVariants}
        transition={{
          duration: reducedMotion ? 0 : 0.8,
          delay: reducedMotion ? 0 : delay,
          ease: [0.55, 0, 0.25, 1],
        }}
      />
      <span
        className={`relative inline-flex h-full items-center gap-2 bg-site-ink px-2 text-lg font-black uppercase leading-none tracking-tight text-site-cream sm:text-xl ${titleOffsetClasses[tone]}`}
      >
        {label}
        <span
          aria-hidden="true"
          className="text-xl leading-none text-strong-cyan transition-transform duration-200 group-open/skill:rotate-45 motion-reduce:transition-none"
        >
          +
        </span>
      </span>
    </summary>
  );
}
