import 'server-only';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Real photograph file paths expected under `/public`.
 *
 * To add or replace a school photograph, place the image file at the exact
 * path under `public/` (for example, `public/images/hero/campus.jpg`) and
 * redeploy. No code changes are required — each component checks whether the
 * file exists and switches automatically from its placeholder state to
 * rendering the real photograph via `next/image`.
 */
export const PHOTO_SLOTS = {
  /** Homepage hero photograph (recommended: 1600x1067 or 1920x1280 landscape JPG) */
  heroCampus: '/images/hero/campus.jpg',
  /** Chief Principal portrait on the homepage (recommended: 800x1000 portrait JPG) */
  principalPortrait: '/images/principal.jpg',
  /** Campus gate or administration block on /contact (recommended: 1200x675 landscape JPG) */
  campusLocation: '/images/campus-location.jpg',
} as const;

const PUBLIC_ROOT = path.join(process.cwd(), 'public');

/**
 * Checks whether a root-relative asset path (e.g. `/images/hero/campus.jpg`)
 * exists inside `public/` at build/render time.
 */
export function publicAssetExists(publicSrc: string): boolean {
  if (!publicSrc.startsWith('/')) return false;
  const normalized = path.normalize(publicSrc).replace(/^(\.\.(\/|\\|$))+/, '');
  const fullPath = path.join(PUBLIC_ROOT, normalized);
  if (!fullPath.startsWith(PUBLIC_ROOT + path.sep)) return false;
  return existsSync(fullPath);
}

/**
 * Filters a list of root-relative `/images/...` paths down to those currently
 * present in `public/`.
 */
export function getAvailablePublicAssets(publicSrcs: string[]): string[] {
  return publicSrcs.filter(publicAssetExists);
}
