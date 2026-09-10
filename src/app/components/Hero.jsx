import HeroArtwork from "./hero/HeroArtwork";
import { heroLayouts, heroRows } from "./hero/hero-art.config";
import styles from "./hero/hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <h1 className="sr-only">Building modern web products</h1>
      {heroLayouts.map((layout) => (
        <HeroArtwork key={layout.name} layout={layout} rows={heroRows} />
      ))}
    </section>
  );
}
