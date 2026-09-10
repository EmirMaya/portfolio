/** Build concentric quarter circles connected by equal vertical segments. */
export function createBandGeometry(layout, index) {
  const {
    width,
    bandWidth,
    gap,
    firstTurnX,
    firstRadius,
    secondRadius,
    verticalLength,
  } = layout;
  const offset = (bandWidth + gap) * index;
  const y = bandWidth / 2 + offset;
  const entryRadius = firstRadius - offset;
  // A reverse bend needs the opposite radius adjustment to stay parallel.
  const exitRadius = secondRadius + offset;
  const verticalX = firstTurnX + entryRadius;
  const firstTurnEndY = bandWidth / 2 + firstRadius;
  const secondTurnStartY = firstTurnEndY + verticalLength;
  const exitX = firstTurnX + firstRadius + secondRadius;
  const exitY = secondTurnStartY + exitRadius;
  const bleed = bandWidth;

  return {
    y,
    path: [
      `M ${-bleed} ${y}`,
      `H ${firstTurnX}`,
      `A ${entryRadius} ${entryRadius} 0 0 1 ${verticalX} ${firstTurnEndY}`,
      `V ${secondTurnStartY}`,
      `A ${exitRadius} ${exitRadius} 0 0 0 ${exitX} ${exitY}`,
      `H ${Math.max(width, exitX) + bleed}`,
    ].join(" "),
  };
}
