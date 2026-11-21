import type { CSSProperties } from 'react';
import { imageSizes } from './image-sizes';

/**
 * Focal points for works whose image is cropped with object-fit: cover (home hero, featured panorama,
 * gallery cover tiles, artist portrait). x/y are percentages of the image (0 = left/top, 100 = right/bottom),
 * placed by eye on the subject. The `.focal-img` CSS centres this point in its frame at every screen size,
 * clamped so the image never leaves the frame. `portrait` overrides the point on portrait screens, for
 * subjects too wide to fit a tall phone crop. Works without an entry are centred (50/50).
 */
export interface FocalPoint {
  x: number;
  y: number;
  portrait?: { x: number; y: number };
}

export const focalPoints: Record<string, FocalPoint> = {
  // The two lead images: keep the dolphin's whole arc and the leopard's face in frame.
  'leap-of-faith': { x: 44, y: 42, portrait: { x: 54, y: 42 } }, // dolphin body, fin to beak; phones centre fin-to-beak so the Ken Burns zoom never clips the beak
  'the-watcher': { x: 40, y: 44, portrait: { x: 30, y: 42 } }, // leopard on the limb; phones centre the face with the shoulders leading off right
  // Rest of the home hero
  'cloud-lake': { x: 60, y: 55 }, // peak and lake shore
  'canyon-song': { x: 48, y: 58 }, // cascades below the canyon walls
  pride: { x: 45, y: 52 }, // the two lions' faces
  'heart-of-the-mountains': { x: 52, y: 62 }, // turquoise tarn and the ridge above it
  'sandstone-wave': { x: 56, y: 48 }, // glowing fold of rock
  'living-sculpture': { x: 40, y: 52 }, // maple trunk and main limbs
  // Featured panorama, gallery covers and artist image
  'above-the-clouds': { x: 58, y: 45 }, // twin summits
  'ice-spires': { x: 58, y: 48 }, // peaks framed by the ice
  'sea-monolith': { x: 50, y: 45 }, // sea stack
  'molten-lake': { x: 50, y: 50 }, // sunset lake, Sky gallery cover
  sentinel: { x: 62, y: 58 }, // summit
  'golden-stride': { x: 38, y: 58 }, // gemsbok walking right, left of centre
  'canyon-mirror': { x: 50, y: 52 }, // central butte and the river below
};

export function getFocal(slug: string): FocalPoint {
  return focalPoints[slug] ?? { x: 50, y: 50 };
}

/**
 * Inline CSS variables for an <Image className="focal-img"> inside a `.focal-box` frame: the focal point
 * (landscape and portrait) and the image's pixel size, which the CSS needs to centre the point exactly.
 */
export function focalStyle(slug: string): CSSProperties {
  const f = getFocal(slug);
  const p = f.portrait ?? f;
  const size = imageSizes[slug] ?? { width: 2560, height: 1707 };
  return {
    '--fx-l': f.x,
    '--fy-l': f.y,
    '--fx-p': p.x,
    '--fy-p': p.y,
    '--iw': size.width,
    '--ih': size.height,
  } as CSSProperties;
}
