import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import styles from "./projects.module.css";

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Selected work / Portfolio</p>
        <div className={styles.titleBand}>
          <h2 id="projects-title" className={styles.title}>
            My projects<span>.</span>
          </h2>
          <div className={styles.stripes} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
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
