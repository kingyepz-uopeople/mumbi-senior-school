import 'server-only';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Root-relative paths for real photographs expected under `public/`.
 * Each slot checks for its file and switches from a placeholder to
 * `next/image` automatically when the photograph is supplied.
 */
export const PHOTO_SLOTS = {
  /** Homepage hero photograph supplied with the school photo collection. */
  heroCampus: '/images/school/hero-assembly.jpg',
  /** Chief Principal portrait on the homepage (recommended: 800x1000 portrait JPG) */
  principalPortrait: '/images/principal.jpg',
  /** Campus entrance photograph shown on /contact. */
  campusLocation: '/images/school/gallery-04.jpg',
} as const;

const PUBLIC_ROOT = path.join(process.cwd(), 'public');

/**
 * Checks whether a root-relative asset path (e.g. `/images/school/hero-assembly.jpg`)
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
