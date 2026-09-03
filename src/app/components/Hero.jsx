import React from "react";

const bandColors = {
  red: "#FF3021",
  yellow: "#F5C964",
  cyan: "#00C7D2",
};

const desktopRows = [
  {
    text: "Building",
    y: 70,
    rectX: 154,
    rectY: 16,
    rectWidth: 470,
    textX: 158,
  },
  {
    text: "Modern Web",
    y: 184,
    rectX: 209,
    rectY: 130,
    rectWidth: 680,
    textX: 213,
  },
  {
    text: "Products",
    y: 298,
    rectX: 296,
    rectY: 244,
    rectWidth: 540,
    textX: 300,
  },
];

const mobileRows = [
  {
    text: "Building",
    y: 220,
    rectX: 22,
    rectY: 192,
    rectWidth: 240,
    textX: 26,
  },
  {
    text: "Modern Web",
    y: 280,
    rectX: 52,
    rectY: 252,
    rectWidth: 292,
    textX: 56,
  },
  {
    text: "Products",
    y: 340,
    rectX: 84,
    rectY: 312,
    rectWidth: 210,
    textX: 88,
  },
];

const DesktopHeroArt = () => (
  <svg
    aria-hidden="true"
    className="hero-art hero-art--desktop absolute inset-0 z-0 hidden h-full w-full md:block"
    focusable="false"
    preserveAspectRatio="xMinYMin slice"
    viewBox="0 0 1920 1080"
  >
    <mask id="desktop-band-cutouts">
      <rect fill="white" height="1080" width="1920" />
      {desktopRows.map((row) => (
        <rect
          key={row.text}
          fill="black"
          height="108"
          width={row.rectWidth}
          x={row.rectX}
          y={row.rectY}
        />
      ))}
    </mask>

    <g mask="url(#desktop-band-cutouts)">
      <path
        className="hero-band"
        pathLength="1"
        stroke={bandColors.red}
        d="M -80 70 H 1200 A 414 414 0 0 1 1614 484 A 186 186 0 0 0 1800 670 H 2020"
      />
      <path
        className="hero-band"
        pathLength="1"
        stroke={bandColors.yellow}
        d="M -80 184 H 1200 A 300 300 0 0 1 1500 484 A 300 300 0 0 0 1800 784 H 2020"
      />
      <path
        className="hero-band"
        pathLength="1"
        stroke={bandColors.cyan}
        d="M -80 298 H 1200 A 186 186 0 0 1 1386 484 A 414 414 0 0 0 1800 898 H 2020"
      />
    </g>

    {desktopRows.map((row) => (
      <g key={row.text} className="hero-art-headline">
        <rect
          fill="#050505"
          height="108"
          width={row.rectWidth}
          x={row.rectX}
          y={row.rectY}
        />
        <text
          dominantBaseline="middle"
          x={row.textX}
          y={row.y}
        >
          {row.text}
        </text>
      </g>
    ))}
  </svg>
);

const MobileHeroArt = () => (
  <svg
    aria-hidden="true"
    className="hero-art hero-art--mobile absolute inset-0 z-0 h-full w-full md:hidden"
    focusable="false"
    preserveAspectRatio="xMinYMin slice"
    viewBox="0 0 390 820"
  >
    <mask id="mobile-band-cutouts">
      <rect fill="white" height="820" width="390" />
      {mobileRows.map((row) => (
        <rect
          key={row.text}
          fill="black"
          height="56"
          width={row.rectWidth}
          x={row.rectX}
          y={row.rectY}
        />
      ))}
    </mask>

    <g mask="url(#mobile-band-cutouts)">
      <path
        className="hero-band hero-band--mobile"
        pathLength="1"
        stroke={bandColors.red}
        d="M -30 220 H 180 A 175 175 0 0 1 355 395 A 55 55 0 0 0 410 450 H 440"
      />
      <path
        className="hero-band hero-band--mobile"
        pathLength="1"
        stroke={bandColors.yellow}
        d="M -30 280 H 180 A 115 115 0 0 1 295 395 A 115 115 0 0 0 410 510 H 440"
      />
      <path
        className="hero-band hero-band--mobile"
        pathLength="1"
        stroke={bandColors.cyan}
        d="M -30 340 H 180 A 55 55 0 0 1 235 395 A 175 175 0 0 0 410 570 H 440"
      />
    </g>

    {mobileRows.map((row) => (
      <g key={row.text} className="hero-art-headline hero-art-headline--mobile">
        <rect
          fill="#050505"
          height="56"
          width={row.rectWidth}
          x={row.rectX}
          y={row.rectY}
        />
        <text
          dominantBaseline="middle"
          x={row.textX}
          y={row.y}
        >
          {row.text}
        </text>
      </g>
    ))}
  </svg>
);

const Hero = () => {
  return (
    <section
      id="top"
      className="hero-section relative isolate min-h-[720px] overflow-hidden text-[#f7f3ea] sm:min-h-[760px] lg:min-h-screen"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_180_180%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.9%22_numOctaves=%222%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%22.2%22/%3E%3C/svg%3E')]" />
      <DesktopHeroArt />
      <MobileHeroArt />
      <h1 className="sr-only">Building modern web products</h1>
    </section>
  );
};

export default Hero;
