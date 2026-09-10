"use client";

import { motion, useReducedMotion } from "framer-motion";
import SkillBand from "./SkillBand";

function SkillRow({ group, index, reducedMotion }) {
  return (
    <motion.details
      className="group/skill relative"
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <SkillBand
        label={group.label}
        tone={group.id}
        delay={index * 0.1}
        reducedMotion={reducedMotion}
      />
      <div className="min-w-0 px-2 py-4">
        <ul aria-label={`${group.label} skills`} className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-6 text-site-cream/85">
          {group.items.map((skill) => (
            <li key={skill} className="transition-colors hover:text-strong-cyan motion-reduce:transition-none">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.details>
  );
}

export default function SkillsList({ groups }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-8">
      <h3 className="sr-only">Skills</h3>
      <div className="space-y-1">
        {groups.map((group, index) => (
          <SkillRow
            key={group.id}
            group={group}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </div>
  );
}
