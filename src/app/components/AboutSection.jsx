import SkillsList from "./about/SkillsList";
import SectionTitle from "./SectionTitle";
import { certifications, education, skillGroups } from "../data/profile";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="max-w-3xl scroll-mt-28 text-site-cream">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-site-cream/55">
        About me
      </p>
      <SectionTitle id="about-title" className="text-[clamp(2.5rem,6.5vw,5.75rem)] font-black uppercase leading-none tracking-[-0.055em] break-words">
        I&apos;m Emir<span className="text-strong-cyan">.</span>
      </SectionTitle>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-site-cream/70 sm:text-base">
        Full-stack developer. Clean interfaces, reliable backends.
      </p>

      <SkillsList groups={skillGroups} />

      <details className="group mt-5 text-sm">
        <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-3 rounded-sm text-site-cream/60 transition-colors hover:text-site-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-strong-cyan motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
          Education & certifications
          <span aria-hidden="true" className="text-lg text-strong-cyan transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
        </summary>
        <div className="mt-3 border-l border-strong-cyan/40 pl-4 text-xs leading-relaxed text-site-cream/65 sm:text-sm">
          <h3 className="font-medium text-site-cream">{education.title}</h3>
          <p className="mt-1">{education.institution}</p>
          <p>{education.location}</p>
          <h3 className="mb-2 mt-4 font-medium text-site-cream">Certifications</h3>
          <ul className="space-y-1">
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
