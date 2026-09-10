import { Poppins } from "next/font/google";
import styles from "./retro-hero.module.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const colors = {
  red: "#FF3021",
  yellow: "#F5C964",
  cyan: "#00C7D2",
} as const;

type BandPathProps = {
  color: string;
  d: string;
  width: number;
};

function BandPath({ color, d, width }: BandPathProps) {
  return (
    <path
      className={styles.band}
      d={d}
      fill="none"
      pathLength="1"
      stroke={color}
      strokeDasharray="1"
      strokeDashoffset="1"
      strokeLinecap="butt"
      strokeLinejoin="round"
      strokeWidth={width}
    />
  );
}

function DesktopBands() {
  return (
    <svg
      aria-hidden="true"
      className={`${styles.bands} ${styles.desktopBands}`}
      focusable="false"
      preserveAspectRatio="xMinYMin slice"
      viewBox="0 0 1600 900"
    >
      {/*
        Equal 108-unit strokes on concentric paths.
        Their center lines are 114 units apart, leaving a 6-unit gap.
      */}
      <BandPath
        color={colors.red}
        d="M -60 460 H 1000 A 500 500 0 0 1 1500 960 V 1040"
        width={108}
      />
      <BandPath
        color={colors.yellow}
        d="M -60 574 H 1000 A 386 386 0 0 1 1386 960 V 1040"
        width={108}
      />
      <BandPath
        color={colors.cyan}
        d="M -60 688 H 1000 A 272 272 0 0 1 1272 960 V 1040"
        width={108}
      />

      <g className={styles.svgHeadline}>
        <rect className={styles.headlineCutout} height="108" width="400" x="270" y="406" />
        <text dominantBaseline="middle" x="305" y="460">I BUILD</text>

        <rect className={styles.headlineCutout} height="108" width="635" x="315" y="520" />
        <text dominantBaseline="middle" x="350" y="574">USEFUL WEB</text>

        <rect className={styles.headlineCutout} height="108" width="700" x="395" y="634" />
        <text dominantBaseline="middle" x="430" y="688">EXPERIENCES.</text>
      </g>
    </svg>
  );
}

function MobileBands() {
  return (
    <svg
      aria-hidden="true"
      className={`${styles.bands} ${styles.mobileBands}`}
      focusable="false"
      preserveAspectRatio="xMinYMin slice"
      viewBox="0 0 390 820"
    >
      {/* 68-unit strokes, 72-unit center spacing: a 4-unit mobile gap. */}
      <BandPath
        color={colors.red}
        d="M -30 330 H 220 A 320 320 0 0 1 540 650 V 880"
        width={68}
      />
      <BandPath
        color={colors.yellow}
        d="M -30 402 H 220 A 248 248 0 0 1 468 650 V 880"
        width={68}
      />
      <BandPath
        color={colors.cyan}
        d="M -30 474 H 220 A 176 176 0 0 1 396 650 V 880"
        width={68}
      />

      <g className={`${styles.svgHeadline} ${styles.svgHeadlineMobile}`}>
        <rect className={styles.headlineCutout} height="68" width="170" x="22" y="296" />
        <text dominantBaseline="middle" x="31" y="330">I BUILD</text>

        <rect className={styles.headlineCutout} height="68" width="250" x="52" y="368" />
        <text dominantBaseline="middle" x="61" y="402">USEFUL WEB</text>

        <rect className={styles.headlineCutout} height="68" width="286" x="84" y="440" />
        <text dominantBaseline="middle" x="93" y="474">EXPERIENCES.</text>
      </g>
    </svg>
  );
}

export default function RetroHero() {
  return (
    <section className={`${styles.hero} ${poppins.className}`}>
      <header className={styles.header}>
        <a aria-label="Emir Maya — inicio" className={styles.brand} href="#top">
          <strong>EMIR MAYA</strong>
          <span>FULL-STACK DEVELOPER</span>
        </a>

        <nav aria-label="Navegación principal" className={styles.nav}>
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      <DesktopBands />
      <MobileBands />

      <h1 className={styles.srOnly}>I build useful web experiences.</h1>

      <div className={styles.intro}>
        <p>
          From polished interfaces to robust APIs,
          <br />
          databases and deployment.
        </p>

        <div className={styles.actions}>
          <a className={styles.primaryAction} href="#work">
            VIEW SELECTED WORK <span aria-hidden="true">↗</span>
          </a>
          <a href="/emir-maya-resume.pdf">
            DOWNLOAD RÉSUMÉ <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
