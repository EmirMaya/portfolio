# Retro SVG Hero

Responsive animated hero for a Next.js portfolio, inspired by the structural rhythm of KXD Studio without copying its branding.

## Files

- `RetroHero.tsx`: reusable Next.js component.
- `retro-hero.module.css`: layout, animation and responsive styles.
- `retro-bands.svg`: standalone desktop band animation.
- `demo.html`: dependency-free visual preview.

## Install in Next.js

1. Copy `RetroHero.tsx` and `retro-hero.module.css` into the same component directory.
2. Render `<RetroHero />` in the desired page.
3. Update the navigation anchors and résumé path.

Poppins is loaded through `next/font/google` with weights 400, 500, 600 and 700. The headline uses weight 700.

## Geometry

Desktop bands use a `108` unit stroke width. Their concentric center lines are `114` units apart, leaving a mathematically constant `6` unit gap through both the straight sections and the curves.

Mobile switches to its own `390 × 820` viewBox. The strokes are `68` units wide and their center lines are `72` units apart, leaving a `4` unit gap. This separate geometry avoids stretching or flattening the curves.

The visible Poppins 700 headline is rendered inside each responsive SVG, so its black cutouts always stay locked to the colored paths while scaling. A visually hidden semantic `h1` preserves accessible document structure.

## Animation

Each path has `pathLength="1"`, `stroke-dasharray="1"` and animates `stroke-dashoffset` from `1` to `0`. All three bands share the same duration and delay, so they reveal together instead of visually separating.

The component respects `prefers-reduced-motion` and renders the completed bands without animation when reduced motion is requested.
