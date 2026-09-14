import { ArrowUpRightIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import styles from "./projects.module.css";

export default function ProjectCard({ imgUrl, title, description, gitUrl, previewUrl, number }) {
  const hasSource = gitUrl && gitUrl !== "/";

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span>Web project</span>
        {number != null && (
          <span aria-hidden="true">No. {String(number).padStart(2, "0")}</span>
        )}
      </div>
      <div className={styles.preview}>
        <Image
          src={imgUrl}
          alt={`${title} website preview`}
          fill
          sizes="(min-width: 1536px) 432px, (min-width: 1280px) 347px, (min-width: 1024px) 448px, (min-width: 768px) 320px, (min-width: 640px) 544px, calc(100vw - 48px)"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} live site (opens in a new tab)`}
              className={styles.primaryLink}
            >
              Live site
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
          )}
          {hasSource && (
            <a
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} source code (opens in a new tab)`}
              className={styles.sourceLink}
            >
              <CodeBracketIcon aria-hidden="true" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
