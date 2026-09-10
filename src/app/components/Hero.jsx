import HeroArtwork from "./hero/HeroArtwork";
import { heroLayouts, heroRows } from "./hero/hero-art.config";
import styles from "./hero/hero.module.css";

export default function Hero({ children }) {
  return (
    <section id="top" className={styles.hero}>
      <h1 className="sr-only">Building modern web products</h1>
      <div className="grid grid-cols-1 items-start">
        {heroLayouts.map((layout) => (
          <HeroArtwork key={layout.name} layout={layout} rows={heroRows} />
        ))}
        {children && (
          <div className="relative z-10 mx-6 mt-8 min-w-0 [--intro-inset:1.5rem] sm:mx-12 sm:mt-12 sm:[--intro-inset:3rem] lg:col-start-1 lg:row-start-1 lg:ml-[8%] lg:mr-0 lg:mt-[calc(21vw+clamp(6rem,9vw,10rem))] lg:w-[58%] lg:max-w-3xl lg:self-start lg:[--intro-inset:8vw]">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
