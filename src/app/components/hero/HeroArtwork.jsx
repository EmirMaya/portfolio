import { createBandGeometry } from "./hero-geometry";
import styles from "./hero.module.css";

export default function HeroArtwork({ layout, rows }) {
  const bands = rows.map((row, index) => ({
    ...row,
    ...createBandGeometry(layout, index),
    labelX: layout.labelOffsets[index],
    delay: `${0.12 + index * 0.1}s`,
  }));

  return (
    <div
      aria-hidden="true"
      className={`${styles.artwork} ${styles[layout.name]}`}
      style={{
        aspectRatio: `${layout.width} / ${layout.height}`,
        "--hero-font-size": `${(layout.fontSize / layout.width) * 100}cqw`,
        "--hero-label-height": `${((layout.bandWidth + 2) / layout.height) * 100}%`,
      }}
    >
      <svg
        className={styles.bands}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        focusable="false"
        fill="none"
        strokeWidth={layout.bandWidth}
      >
        {bands.map((band) => (
          <path
            key={band.text}
            className={styles.band}
            d={band.path}
            pathLength="1"
            stroke={band.color}
            style={{ "--hero-delay": band.delay }}
          />
        ))}
      </svg>
      {bands.map((band) => (
        <span
          key={band.text}
          className={styles.label}
          style={{
            left: `${(band.labelX / layout.width) * 100}%`,
            top: `${(band.y / layout.height) * 100}%`,
            "--hero-delay": band.delay,
          }}
        >
          {band.text}
        </span>
      ))}
    </div>
  );
}
