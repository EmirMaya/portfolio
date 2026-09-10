export const heroRows = [
  { text: "Building", color: "var(--color-violet-twilight)" },
  { text: "Modern Web", color: "var(--color-bright-ocean)" },
  { text: "Products", color: "var(--color-strong-cyan)" },
];

// All measurements, including typography, use the artwork's coordinate system.
export const heroLayouts = [
  {
    name: "desktop",
    width: 1920,
    height: 912,
    bandWidth: 88,
    gap: 12,
    firstTurnX: 1260,
    firstRadius: 400,
    secondRadius: 160,
    verticalLength: 32,
    fontSize: 104,
    labelOffsets: [154, 210, 296],
  },
  {
    name: "compact",
    width: 600,
    height: 560,
    bandWidth: 48,
    gap: 8,
    firstTurnX: 426,
    firstRadius: 144,
    secondRadius: 28,
    verticalLength: 200,
    fontSize: 56,
    labelOffsets: [24, 44, 80],
  },
];
