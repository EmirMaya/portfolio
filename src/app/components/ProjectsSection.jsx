import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";
import AnimatedStripes from "./AnimatedStripes";
import { projects } from "../data/projects";
import styles from "./projects.module.css";

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Selected work / Portfolio</p>
        <div className={styles.titleBand}>
          <SectionTitle id="projects-title" className={styles.title}>
            My projects<span>.</span>
          </SectionTitle>
          <AnimatedStripes className={styles.stripes} />
        </div>
        <div className={styles.intro}>
          <p>A selection of things I&apos;ve built for the web.</p>
          <span className={styles.count}>
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
      </header>

      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <li key={project.id} className={styles.item}>
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              number={index + 1}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
