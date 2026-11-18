'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export type HeroBackdropVariant =
  | 'home'
  | 'about'
  | 'academics'
  | 'student-life'
  | 'downloads'
  | 'gallery'
  | 'contact'
  | 'portal'
  | 'news';

type DriftVariant = 'a' | 'b' | 'c' | 'd';

type MotifKey =
  | 'protractor'
  | 'compass'
  | 'setSquare'
  | 'ruler'
  | 'pencil'
  | 'conicalFlask'
  | 'beaker'
  | 'atom'
  | 'microscope'
  | 'dnaHelix'
  | 'openBook'
  | 'graduationCap'
  | 'fountainNib'
  | 'documentSheet'
  | 'envelope'
  | 'globe'
  | 'musicNotes'
  | 'trophyCup'
  | 'sportsBall'
  | 'palette'
  | 'clockFace'
  | 'cameraFrame'
  | 'pi'
  | 'sqrt'
  | 'sigma'
  | 'angle'
  | 'eqPythagoras'
  | 'eqEmc2'
  | 'sinePlot';

interface MotifPlacement {
  motif: MotifKey;
  /** Desktop horizontal anchor (%) */
  left: string;
  /** Desktop vertical anchor (%) */
  top: string;
  /** Rendered width in px on desktop */
  width: number;
  /** Resting drafting-table rotation (deg) */
  tilt: number;
  /** Low stroke opacity keeping full WCAG AA/AAA text contrast */
  opacity: number;
  /** Palette-faithful stroke tone (white or soft crest blue-100) */
  tone: 'white' | 'blue';
  /** Transform-only drift/rotation trajectory */
  drift: DriftVariant;
  /** Loop duration in seconds (22–40s, staggered so items never sync) */
  duration: number;
  /** Negative start offset in seconds so items begin mid-phase */
  delay: number;
  /** Subtle desktop pointer-parallax depth plane */
  layer: 'near' | 'far';
  /** Render on mobile (<640px) with optional edge position & scale */
  mobilePos?: { left: string; top: string; scale: number };
}

const STROKE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * Shared library of pure inline stroke-only school, STEM, arts, sports, and
 * editorial drawings (zero image files, zero external icon packs).
 */
const STEM_ART: Record<MotifKey, ReactNode> = {
  protractor: (
    <svg viewBox="0 0 120 68" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M8 58 A52 52 0 0 1 112 58 L112 63 L8 63 Z" />
      <path d="M28 54 A32 32 0 0 1 92 54 Z" />
      <circle cx="60" cy="58" r="2" />
      <path d="M55 58 H65 M60 53 V61" />
      <path d="M60 6 V13 M86 13 L82.5 19 M34 13 L37.5 19 M105 32 L99 35.5 M15 32 L21 35.5" />
      <path d="M73.5 7.8 L72.4 11.8 M46.5 7.8 L47.6 11.8 M96.8 21.2 L93.9 24.1 M23.2 21.2 L26.1 24.1 M110.2 44.5 L106.2 45.6 M9.8 44.5 L13.8 45.6" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 92 112" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M43.5 6 H48.5 M46 6 V17" />
      <circle cx="46" cy="23" r="6" />
      <circle cx="46" cy="23" r="1.8" />
      <path d="M42 28 L22 86 L25.5 86 L45 29 M23.6 86 L19.8 99" />
      <path d="M50 28 L65.5 73 L62 74 L47 29" />
      <path d="M61.5 72 L73 68.5 M67 61 L71.5 59.8 L77 88 L75.5 98 L72.2 89.2 Z" />
      <path d="M27 56 H64 M46 51 V61 M43.5 52.8 V59.2 M48.5 52.8 V59.2" />
      <path d="M44 105 A54 22 0 0 0 84 96" strokeDasharray="3 3.5" />
    </svg>
  ),
  setSquare: (
    <svg viewBox="0 0 96 96" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M10 10 V86 H86 Z" />
      <path d="M23 40 V73 H56 Z" />
      <path d="M23 66 H30 V73" />
      <path d="M10 24 H15 M10 32 H13.5 M10 40 H15 M10 48 H13.5 M10 56 H15 M10 64 H13.5 M10 72 H15" />
      <path d="M24 86 V81 M32 86 V82.5 M40 86 V81 M48 86 V82.5 M56 86 V81 M64 86 V82.5 M72 86 V81" />
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 140 38" className="w-full h-auto" {...STROKE_PROPS}>
      <rect x="4" y="7" width="132" height="24" rx="2" />
      <circle cx="125" cy="19" r="3.2" />
      <path d="M14 7 V16 M20 7 V12 M26 7 V16 M32 7 V12 M38 7 V16 M44 7 V12 M50 7 V16 M56 7 V12 M62 7 V16 M68 7 V12 M74 7 V16 M80 7 V12 M86 7 V16 M92 7 V12 M98 7 V16 M104 7 V12 M110 7 V16" />
      <path d="M12 25.5 H112" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 112 28" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M12 8 H8 A3 3 0 0 0 8 20 H12" />
      <rect x="12" y="8" width="10" height="12" />
      <path d="M15.5 8 V20 M18.5 8 V20" />
      <path d="M22 8 H84 M22 20 H84 M22 12 H83 M22 16 H83" />
      <path d="M84 8 Q81 10 84 12 Q81 14 84 16 Q81 18 84 20" />
      <path d="M84 8 L106 14 L84 20 M99 12.1 V15.9" />
    </svg>
  ),
  conicalFlask: (
    <svg viewBox="0 0 84 100" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M29 10 H55 M31 10 V14 H53 V10" />
      <path d="M33 14 V34 L13 82 A6 6 0 0 0 18.5 90 H65.5 A6 6 0 0 0 71 82 L51 34 V14" />
      <path d="M20.5 65 Q31.5 61.5 42 65 T63.5 65" />
      <path d="M47 51 H53 M51 59 H56 M55 70 H62 M58 78 H64" />
      <circle cx="35" cy="76" r="2.2" />
      <circle cx="44" cy="72" r="1.6" />
      <circle cx="39" cy="54" r="1.5" />
    </svg>
  ),
  beaker: (
    <svg viewBox="0 0 80 90" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M12 14 L18 20 V76 A6 6 0 0 0 24 82 H60 A6 6 0 0 0 66 76 V16 L69 14 Z" />
      <path d="M18 54 Q30 51 42 54 T66 54" />
      <path d="M48 30 H58 M51 38 H58 M48 46 H58 M51 62 H58 M48 70 H58" />
    </svg>
  ),
  atom: (
    <svg viewBox="0 0 104 104" className="w-full h-auto" {...STROKE_PROPS}>
      <circle cx="52" cy="52" r="4.2" />
      <ellipse cx="52" cy="52" rx="44" ry="17" />
      <ellipse
        cx="52"
        cy="52"
        rx="44"
        ry="17"
        transform="rotate(60 52 52)"
      />
      <ellipse
        cx="52"
        cy="52"
        rx="44"
        ry="17"
        transform="rotate(120 52 52)"
      />
      <circle cx="96" cy="52" r="2.4" />
      <circle cx="30" cy="13.9" r="2.4" />
      <circle cx="30" cy="90.1" r="2.4" />
    </svg>
  ),
  microscope: (
    <svg viewBox="0 0 88 108" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M49 8 L59 12 L56.5 18 L46.5 14 Z" />
      <path d="M47.5 14.5 L38 38 L47 41.5 L56 18" />
      <path d="M36 37.5 L49 42.8 M38.5 40 L35 49 L39.5 50.8 L43 41.8 M44.5 42.2 L45.5 48.5" />
      <path d="M18 58 H52 M24 55.5 H44" />
      <path d="M51.5 30 C68 35 72 56 60 74 C55 81 47 84 40 84" />
      <circle cx="57" cy="44" r="5" />
      <circle cx="57" cy="44" r="1.8" />
      <path d="M34 58 V64 M27 73 L41 69 M34 71 V84 M54 79 V92" />
      <path d="M16 92 H72 A3 3 0 0 1 75 95 V98 H13 V95 A3 3 0 0 1 16 92 Z" />
    </svg>
  ),
  dnaHelix: (
    <svg viewBox="0 0 64 108" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M16 8 C48 22 48 42 32 54 C16 66 16 86 48 100" />
      <path d="M48 8 C16 22 16 42 32 54 C48 66 48 86 16 100" />
      <path d="M23 15 H41 M21 25 H43 M23 35 H41 M26 44 H38" />
      <path d="M26 64 H38 M23 73 H41 M21 83 H43 M23 93 H41" />
    </svg>
  ),
  openBook: (
    <svg viewBox="0 0 112 80" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M56 20 C44 13 24 12 12 16 V62 C24 58 44 59 56 66" />
      <path d="M56 20 C68 13 88 12 100 16 V62 C88 58 68 59 56 66" />
      <path d="M56 20 V66" />
      <path d="M8 20 V66 C22 62 43 63 56 70 C69 63 90 62 104 66 V20" />
      <path d="M20 27 C30 25 40 26 48 29 M20 35 C30 33 40 34 48 37 M20 43 C30 41 40 42 48 45 M20 51 C30 49 40 50 48 53" />
      <path d="M92 27 C82 25 72 26 64 29 M92 35 C82 33 72 34 64 37 M92 43 C82 41 72 42 64 45 M92 51 C82 49 72 50 64 53" />
    </svg>
  ),
  graduationCap: (
    <svg viewBox="0 0 112 76" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M56 12 L102 31 L56 50 L10 31 Z" />
      <path d="M10 31 V34.5 L56 53.5 L102 34.5 V31" />
      <path d="M30 42 V56 C40 64 72 64 82 56 V42" />
      <circle cx="56" cy="31" r="2.2" />
      <path d="M56 31 L92 38.5 V54.5" />
      <circle cx="92" cy="56.5" r="1.8" />
      <path d="M89 65 L92 58.3 L95 65 M92 58.3 V66" />
    </svg>
  ),
  fountainNib: (
    <svg viewBox="0 0 68 96" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M34 8 L53 47 L46.5 69 H21.5 L15 47 Z" />
      <path d="M34 8 V40.5" />
      <circle cx="34" cy="44.8" r="4" />
      <rect x="19" y="69" width="30" height="7" rx="1.5" />
      <path d="M22 76 V87 M46 76 V87" />
    </svg>
  ),
  documentSheet: (
    <svg viewBox="0 0 78 96" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M12 8 H52 L66 22 V88 H12 Z" />
      <path d="M52 8 V22 H66" />
      <circle cx="24" cy="22" r="4.2" />
      <path d="M33 20 H46 M33 25 H43" />
      <path d="M20 38 H58 M20 47 H58 M20 56 H58 M20 65 H51 M20 76 H37" />
      <path d="M44 77 Q48 73 51 77 T58 76" />
    </svg>
  ),
  envelope: (
    <svg viewBox="0 0 104 72" className="w-full h-auto" {...STROKE_PROPS}>
      <rect x="8" y="12" width="88" height="50" rx="2.5" />
      <path d="M9.5 13.5 L52 43 L94.5 13.5" />
      <path d="M9.5 60.5 L36 36 M94.5 60.5 L68 36" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 84 104" className="w-full h-auto" {...STROKE_PROPS}>
      <circle cx="42" cy="42" r="25" />
      <ellipse
        cx="42"
        cy="42"
        rx="11.5"
        ry="25"
        transform="rotate(-15 42 42)"
      />
      <path d="M18 48.5 Q42 43.5 66 35.5" />
      <path d="M21 35 Q41 31 60 25 M24 59.5 Q43 55.5 63 49" />
      <path d="M35 12 L36 17.5 M48.5 66.5 L50 72" />
      <path d="M34 11.5 A31 31 0 0 1 51 72.5" />
      <path d="M42 73.5 V90 M25 90 H59 M30 86 H54" />
    </svg>
  ),
  musicNotes: (
    <svg viewBox="0 0 78 78" className="w-full h-auto" {...STROKE_PROPS}>
      <ellipse
        cx="20"
        cy="58"
        rx="7.8"
        ry="5.6"
        transform="rotate(-18 20 58)"
      />
      <ellipse
        cx="56"
        cy="51"
        rx="7.8"
        ry="5.6"
        transform="rotate(-18 56 51)"
      />
      <path d="M27.4 56 V18 L63.4 11 V49 M27.4 26 L63.4 19" />
    </svg>
  ),
  trophyCup: (
    <svg viewBox="0 0 88 96" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M22 14 H66 V34 A22 22 0 0 1 22 34 Z" />
      <path d="M22 20 H66" />
      <path d="M22 19 H12 C11 32 16 40 25 41" />
      <path d="M66 19 H76 C77 32 72 40 63 41" />
      <path d="M44 56 V74 M38 64 H50" />
      <path d="M30 74 H58 V80 H30 Z M23 80 H65 V86 H23 Z" />
    </svg>
  ),
  sportsBall: (
    <svg viewBox="0 0 84 84" className="w-full h-auto" {...STROKE_PROPS}>
      <circle cx="42" cy="42" r="31" />
      <path d="M11 42 Q42 36 73 42" />
      <path d="M42 11 Q36 42 42 73" />
      <path d="M20 20.5 C33 32 33 52 20 63.5" />
      <path d="M64 20.5 C51 32 51 52 64 63.5" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 100 84" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M49 13 C73 13 88 27 86 45 C84 57 74 61 65 57 C58 54 53 59 54 66 C55 72 47 74 39 72 C19 68 10 53 12 37 C14 21 29 13 49 13 Z" />
      <ellipse
        cx="43"
        cy="60"
        rx="5.2"
        ry="3.8"
        transform="rotate(-12 43 60)"
      />
      <circle cx="25" cy="42" r="3.8" />
      <circle cx="31" cy="27" r="3.8" />
      <circle cx="48" cy="22" r="3.8" />
      <circle cx="64" cy="27" r="3.8" />
      <path d="M63 72 L87 19 M87 19 C91 16 92 12 90 9 C87 11 84 14 84 18 Z" />
    </svg>
  ),
  clockFace: (
    <svg viewBox="0 0 84 84" className="w-full h-auto" {...STROKE_PROPS}>
      <circle cx="42" cy="42" r="32" />
      <path d="M42 13 V19 M71 42 H65 M42 71 V65 M13 42 H19" />
      <path d="M56.5 16.9 L54.5 20.3 M67.1 27.5 L63.7 29.5 M67.1 56.5 L63.7 54.5 M56.5 67.1 L54.5 63.7 M27.5 67.1 L29.5 63.7 M16.9 56.5 L20.3 54.5 M16.9 27.5 L20.3 29.5 M27.5 16.9 L29.5 20.3" />
      <circle cx="42" cy="42" r="2.2" />
      <path d="M42 39.8 V22 M40.1 43.1 L27.5 50.5" />
    </svg>
  ),
  cameraFrame: (
    <svg viewBox="0 0 100 76" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M34 18 L39 11 H61 L66 18 H84 A6 6 0 0 1 90 24 V60 A6 6 0 0 1 84 66 H16 A6 6 0 0 1 10 60 V24 A6 6 0 0 1 16 18 Z" />
      <path d="M20 18 V14 H28 V18" />
      <circle cx="50" cy="43" r="15.5" />
      <circle cx="50" cy="43" r="10" />
      <path d="M44.5 37.5 A8 8 0 0 1 53 35.5" />
      <rect x="73" y="25" width="9" height="6" rx="1" />
    </svg>
  ),
  pi: (
    <svg viewBox="0 0 56 52" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M10 16.5 C14 13 18 13 23 13 H46" />
      <path d="M22 13 C21 25 19 35 15 42" />
      <path d="M36 13 V35 C36 40 38.5 42 42 42 C44.5 42 46.2 40.5 47 38.5" />
    </svg>
  ),
  sqrt: (
    <svg viewBox="0 0 76 52" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M7 29 L12.5 26 L22 43 L35 10 H68" />
      <path d="M45 24 C48 24 50 28 53 35 C55 39 57 40 59 38 M59 24 L44 39" />
    </svg>
  ),
  sigma: (
    <svg viewBox="0 0 54 60" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M43 16 V10 H12 L30 30 L12 50 H43 V43" />
    </svg>
  ),
  angle: (
    <svg viewBox="0 0 64 56" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M48 11 L10 46 H56" />
      <path d="M31 46 A21 21 0 0 0 25.4 31.8" />
      <ellipse
        cx="40"
        cy="33"
        rx="4"
        ry="6"
        transform="rotate(10 40 33)"
      />
      <path d="M36 33 H44" />
    </svg>
  ),
  eqPythagoras: (
    <svg viewBox="0 0 146 40" className="w-full h-auto" {...STROKE_PROPS}>
      <ellipse cx="13" cy="25" rx="5.5" ry="6.5" />
      <path d="M18.5 18.5 V31.5" />
      <path d="M23 11.5 C23 9 28.5 9 28.5 12 C28.5 14.5 23 17 23 18.5 H29" />
      <path d="M43 19 V30 M37.5 24.5 H48.5" />
      <path d="M59 11 V31.5" />
      <ellipse cx="64.5" cy="25" rx="5.5" ry="6.5" />
      <path d="M74 11.5 C74 9 79.5 9 79.5 12 C79.5 14.5 74 17 74 18.5 H80" />
      <path d="M91 22 H103 M91 27.5 H103" />
      <path d="M124 20.5 A6.5 6.5 0 1 0 124 29.5" />
      <path d="M129 11.5 C129 9 134.5 9 134.5 12 C134.5 14.5 129 17 129 18.5 H135" />
    </svg>
  ),
  eqEmc2: (
    <svg viewBox="0 0 116 40" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M21 13 H10 V31 H21 M10 22 H19" />
      <path d="M32 20 H44 M32 25.5 H44" />
      <path d="M56 19.5 V31 M56 23 A4.5 4 0 0 1 65 23 V31 M65 23 A4.5 4 0 0 1 74 23 V31" />
      <path d="M93 20.5 A6 6 0 1 0 93 29.5" />
      <path d="M99 11.5 C99 9 104.5 9 104.5 12 C104.5 14.5 99 17 99 18.5 H105" />
    </svg>
  ),
  sinePlot: (
    <svg viewBox="0 0 116 56" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M8 28 H108 M104 24.5 L108.5 28 L104 31.5" />
      <path d="M18 48 V8 M14.5 12 L18 7.5 L21.5 12" />
      <path d="M18 28 C26 8 38 8 46 28 S66 48 74 28 S94 8 102 28" />
      <path d="M15 13 H21 M15 43 H21" />
    </svg>
  ),
};

/**
 * Curated per-page compositions.
 * - `home`: full 17-item school/STEM spread (7 on mobile), 6.5%–11% opacity.
 * - Inner variants: calmer 8–9 themed items (4 on mobile), 5.5%–8.5% opacity,
 *   concentrated across the open right field and outer margins so headings and
 *   subtitles stay crisp and uncrowded on every screen size.
 */
const VARIANT_MOTIFS: Record<HeroBackdropVariant, MotifPlacement[]> = {
  home: [
    {
      motif: 'protractor',
      left: '83%',
      top: '5%',
      width: 118,
      tilt: -10,
      opacity: 0.11,
      tone: 'blue',
      drift: 'a',
      duration: 34,
      delay: -5,
      layer: 'near',
      mobilePos: { left: '66%', top: '2%', scale: 0.74 },
    },
    {
      motif: 'atom',
      left: '56.5%',
      top: '8%',
      width: 96,
      tilt: 12,
      opacity: 0.105,
      tone: 'white',
      drift: 'b',
      duration: 38,
      delay: -13,
      layer: 'near',
      mobilePos: { left: '73%', top: '37%', scale: 0.74 },
    },
    {
      motif: 'compass',
      left: '58.5%',
      top: '61%',
      width: 96,
      tilt: 8,
      opacity: 0.11,
      tone: 'blue',
      drift: 'c',
      duration: 32,
      delay: -21,
      layer: 'near',
      mobilePos: { left: '74%', top: '62%', scale: 0.72 },
    },
    {
      motif: 'setSquare',
      left: '1.2%',
      top: '5%',
      width: 86,
      tilt: 11,
      opacity: 0.095,
      tone: 'blue',
      drift: 'c',
      duration: 35,
      delay: -24,
      layer: 'far',
    },
    {
      motif: 'ruler',
      left: '33%',
      top: '86%',
      width: 126,
      tilt: -12,
      opacity: 0.09,
      tone: 'white',
      drift: 'd',
      duration: 40,
      delay: -11,
      layer: 'far',
    },
    {
      motif: 'pencil',
      left: '91%',
      top: '39%',
      width: 96,
      tilt: -32,
      opacity: 0.1,
      tone: 'white',
      drift: 'a',
      duration: 27,
      delay: -19,
      layer: 'near',
    },
    {
      motif: 'conicalFlask',
      left: '89.5%',
      top: '69%',
      width: 84,
      tilt: -7,
      opacity: 0.105,
      tone: 'blue',
      drift: 'd',
      duration: 29,
      delay: -8,
      layer: 'near',
      mobilePos: { left: '75%', top: '82%', scale: 0.76 },
    },
    {
      motif: 'beaker',
      left: '73%',
      top: '78%',
      width: 70,
      tilt: 6,
      opacity: 0.085,
      tone: 'white',
      drift: 'b',
      duration: 33,
      delay: -28,
      layer: 'far',
    },
    {
      motif: 'openBook',
      left: '1.5%',
      top: '77%',
      width: 100,
      tilt: -6,
      opacity: 0.095,
      tone: 'blue',
      drift: 'b',
      duration: 36,
      delay: -17,
      layer: 'near',
      mobilePos: { left: '2%', top: '85%', scale: 0.74 },
    },
    {
      motif: 'graduationCap',
      left: '38%',
      top: '4%',
      width: 94,
      tilt: -7,
      opacity: 0.09,
      tone: 'white',
      drift: 'a',
      duration: 31,
      delay: -3,
      layer: 'far',
      mobilePos: { left: '42%', top: '11%', scale: 0.7 },
    },
    {
      motif: 'pi',
      left: '71%',
      top: '7%',
      width: 44,
      tilt: -7,
      opacity: 0.1,
      tone: 'white',
      drift: 'd',
      duration: 24,
      delay: -6,
      layer: 'far',
      mobilePos: { left: '82%', top: '19%', scale: 0.8 },
    },
    {
      motif: 'sqrt',
      left: '18%',
      top: '87%',
      width: 60,
      tilt: -4,
      opacity: 0.09,
      tone: 'blue',
      drift: 'c',
      duration: 28,
      delay: -9,
      layer: 'far',
    },
    {
      motif: 'sigma',
      left: '1.2%',
      top: '45%',
      width: 44,
      tilt: 5,
      opacity: 0.085,
      tone: 'white',
      drift: 'a',
      duration: 26,
      delay: -15,
      layer: 'far',
    },
    {
      motif: 'angle',
      left: '51%',
      top: '42%',
      width: 52,
      tilt: -5,
      opacity: 0.08,
      tone: 'blue',
      drift: 'b',
      duration: 25,
      delay: -22,
      layer: 'near',
    },
    {
      motif: 'eqPythagoras',
      left: '15%',
      top: '5.5%',
      width: 118,
      tilt: -3,
      opacity: 0.08,
      tone: 'blue',
      drift: 'c',
      duration: 37,
      delay: -14,
      layer: 'far',
    },
    {
      motif: 'eqEmc2',
      left: '77%',
      top: '48%',
      width: 88,
      tilt: 4,
      opacity: 0.065,
      tone: 'white',
      drift: 'd',
      duration: 30,
      delay: -26,
      layer: 'far',
    },
    {
      motif: 'sinePlot',
      left: '49%',
      top: '83%',
      width: 92,
      tilt: -3,
      opacity: 0.085,
      tone: 'white',
      drift: 'a',
      duration: 39,
      delay: -31,
      layer: 'far',
    },
  ],

  /* About: scholarship, heritage since 1960, school anthems & leadership */
  about: [
    {
      motif: 'openBook',
      left: '84%',
      top: '12%',
      width: 92,
      tilt: -7,
      opacity: 0.085,
      tone: 'blue',
      drift: 'b',
      duration: 36,
      delay: -6,
      layer: 'near',
      mobilePos: { left: '72%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'fountainNib',
      left: '69%',
      top: '16%',
      width: 56,
      tilt: 18,
      opacity: 0.08,
      tone: 'white',
      drift: 'a',
      duration: 31,
      delay: -18,
      layer: 'near',
      mobilePos: { left: '80%', top: '44%', scale: 0.72 },
    },
    {
      motif: 'graduationCap',
      left: '56%',
      top: '10%',
      width: 82,
      tilt: -6,
      opacity: 0.07,
      tone: 'white',
      drift: 'c',
      duration: 34,
      delay: -11,
      layer: 'far',
      mobilePos: { left: '71%', top: '74%', scale: 0.68 },
    },
    {
      motif: 'pencil',
      left: '76%',
      top: '68%',
      width: 88,
      tilt: -18,
      opacity: 0.08,
      tone: 'blue',
      drift: 'd',
      duration: 28,
      delay: -23,
      layer: 'near',
    },
    {
      motif: 'globe',
      left: '91%',
      top: '54%',
      width: 66,
      tilt: 5,
      opacity: 0.08,
      tone: 'white',
      drift: 'a',
      duration: 39,
      delay: -14,
      layer: 'far',
    },
    {
      motif: 'musicNotes',
      left: '62%',
      top: '60%',
      width: 52,
      tilt: -8,
      opacity: 0.07,
      tone: 'blue',
      drift: 'b',
      duration: 27,
      delay: -4,
      layer: 'far',
      mobilePos: { left: '6%', top: '79%', scale: 0.7 },
    },
    {
      motif: 'ruler',
      left: '36%',
      top: '7%',
      width: 102,
      tilt: -9,
      opacity: 0.055,
      tone: 'white',
      drift: 'c',
      duration: 38,
      delay: -29,
      layer: 'far',
    },
    {
      motif: 'compass',
      left: '1.2%',
      top: '56%',
      width: 68,
      tilt: 10,
      opacity: 0.06,
      tone: 'blue',
      drift: 'd',
      duration: 33,
      delay: -9,
      layer: 'far',
    },
  ],

  /* Academics: laboratory sciences, mathematics & CBC pathways */
  academics: [
    {
      motif: 'microscope',
      left: '86%',
      top: '12%',
      width: 72,
      tilt: -4,
      opacity: 0.085,
      tone: 'blue',
      drift: 'a',
      duration: 35,
      delay: -7,
      layer: 'near',
      mobilePos: { left: '76%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'atom',
      left: '68%',
      top: '10%',
      width: 82,
      tilt: 14,
      opacity: 0.085,
      tone: 'white',
      drift: 'b',
      duration: 38,
      delay: -19,
      layer: 'near',
      mobilePos: { left: '74%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'conicalFlask',
      left: '76%',
      top: '56%',
      width: 68,
      tilt: -7,
      opacity: 0.08,
      tone: 'blue',
      drift: 'd',
      duration: 29,
      delay: -12,
      layer: 'near',
      mobilePos: { left: '76%', top: '75%', scale: 0.68 },
    },
    {
      motif: 'dnaHelix',
      left: '93%',
      top: '52%',
      width: 48,
      tilt: 16,
      opacity: 0.075,
      tone: 'white',
      drift: 'c',
      duration: 37,
      delay: -25,
      layer: 'far',
    },
    {
      motif: 'beaker',
      left: '55%',
      top: '54%',
      width: 60,
      tilt: 6,
      opacity: 0.075,
      tone: 'white',
      drift: 'a',
      duration: 32,
      delay: -4,
      layer: 'far',
    },
    {
      motif: 'eqPythagoras',
      left: '54%',
      top: '12%',
      width: 102,
      tilt: -3,
      opacity: 0.065,
      tone: 'blue',
      drift: 'c',
      duration: 40,
      delay: -16,
      layer: 'far',
    },
    {
      motif: 'sinePlot',
      left: '65%',
      top: '70%',
      width: 82,
      tilt: -4,
      opacity: 0.07,
      tone: 'white',
      drift: 'b',
      duration: 34,
      delay: -28,
      layer: 'far',
    },
    {
      motif: 'sigma',
      left: '40%',
      top: '8%',
      width: 38,
      tilt: 6,
      opacity: 0.06,
      tone: 'white',
      drift: 'd',
      duration: 26,
      delay: -9,
      layer: 'far',
      mobilePos: { left: '6%', top: '80%', scale: 0.76 },
    },
    {
      motif: 'sqrt',
      left: '1.2%',
      top: '66%',
      width: 52,
      tilt: -5,
      opacity: 0.06,
      tone: 'blue',
      drift: 'a',
      duration: 30,
      delay: -21,
      layer: 'far',
    },
  ],

  /* Student Life: KSSSA games, clubs, arts, choir & boarding timetable */
  'student-life': [
    {
      motif: 'trophyCup',
      left: '85%',
      top: '12%',
      width: 72,
      tilt: -6,
      opacity: 0.085,
      tone: 'blue',
      drift: 'b',
      duration: 33,
      delay: -8,
      layer: 'near',
      mobilePos: { left: '76%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'palette',
      left: '67%',
      top: '14%',
      width: 82,
      tilt: 8,
      opacity: 0.08,
      tone: 'white',
      drift: 'a',
      duration: 36,
      delay: -20,
      layer: 'near',
      mobilePos: { left: '73%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'sportsBall',
      left: '77%',
      top: '58%',
      width: 64,
      tilt: 12,
      opacity: 0.08,
      tone: 'white',
      drift: 'c',
      duration: 31,
      delay: -5,
      layer: 'near',
      mobilePos: { left: '76%', top: '75%', scale: 0.7 },
    },
    {
      motif: 'musicNotes',
      left: '57%',
      top: '12%',
      width: 56,
      tilt: -9,
      opacity: 0.075,
      tone: 'blue',
      drift: 'd',
      duration: 27,
      delay: -14,
      layer: 'far',
      mobilePos: { left: '5%', top: '79%', scale: 0.72 },
    },
    {
      motif: 'clockFace',
      left: '91%',
      top: '56%',
      width: 62,
      tilt: -5,
      opacity: 0.075,
      tone: 'blue',
      drift: 'a',
      duration: 39,
      delay: -27,
      layer: 'far',
    },
    {
      motif: 'globe',
      left: '61%',
      top: '55%',
      width: 64,
      tilt: 6,
      opacity: 0.07,
      tone: 'white',
      drift: 'b',
      duration: 35,
      delay: -11,
      layer: 'far',
    },
    {
      motif: 'openBook',
      left: '37%',
      top: '6%',
      width: 78,
      tilt: -6,
      opacity: 0.055,
      tone: 'blue',
      drift: 'c',
      duration: 37,
      delay: -23,
      layer: 'far',
    },
    {
      motif: 'setSquare',
      left: '1.2%',
      top: '60%',
      width: 66,
      tilt: 12,
      opacity: 0.055,
      tone: 'white',
      drift: 'd',
      duration: 30,
      delay: -16,
      layer: 'far',
    },
  ],

  /* Downloads & Circulars: joining papers, exam geometry & holiday work */
  downloads: [
    {
      motif: 'documentSheet',
      left: '85%',
      top: '12%',
      width: 68,
      tilt: 6,
      opacity: 0.085,
      tone: 'white',
      drift: 'a',
      duration: 34,
      delay: -9,
      layer: 'near',
      mobilePos: { left: '77%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'protractor',
      left: '66%',
      top: '12%',
      width: 96,
      tilt: -9,
      opacity: 0.08,
      tone: 'blue',
      drift: 'c',
      duration: 37,
      delay: -21,
      layer: 'near',
      mobilePos: { left: '70%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'setSquare',
      left: '76%',
      top: '55%',
      width: 68,
      tilt: 14,
      opacity: 0.08,
      tone: 'blue',
      drift: 'b',
      duration: 32,
      delay: -5,
      layer: 'near',
      mobilePos: { left: '76%', top: '75%', scale: 0.68 },
    },
    {
      motif: 'pencil',
      left: '58%',
      top: '66%',
      width: 86,
      tilt: -22,
      opacity: 0.075,
      tone: 'white',
      drift: 'd',
      duration: 28,
      delay: -15,
      layer: 'far',
    },
    {
      motif: 'clockFace',
      left: '91%',
      top: '58%',
      width: 60,
      tilt: -4,
      opacity: 0.075,
      tone: 'white',
      drift: 'a',
      duration: 39,
      delay: -30,
      layer: 'far',
    },
    {
      motif: 'pi',
      left: '56%',
      top: '14%',
      width: 40,
      tilt: -7,
      opacity: 0.07,
      tone: 'white',
      drift: 'b',
      duration: 25,
      delay: -12,
      layer: 'far',
      mobilePos: { left: '6%', top: '80%', scale: 0.76 },
    },
    {
      motif: 'ruler',
      left: '35%',
      top: '7%',
      width: 104,
      tilt: 8,
      opacity: 0.055,
      tone: 'blue',
      drift: 'c',
      duration: 40,
      delay: -18,
      layer: 'far',
    },
    {
      motif: 'openBook',
      left: '1%',
      top: '62%',
      width: 78,
      tilt: -6,
      opacity: 0.055,
      tone: 'blue',
      drift: 'd',
      duration: 35,
      delay: -26,
      layer: 'far',
    },
  ],

  /* Gallery: photography, prize giving, STEM fair & KSSSA albums */
  gallery: [
    {
      motif: 'cameraFrame',
      left: '84%',
      top: '14%',
      width: 84,
      tilt: -7,
      opacity: 0.085,
      tone: 'blue',
      drift: 'a',
      duration: 35,
      delay: -6,
      layer: 'near',
      mobilePos: { left: '73%', top: '7%', scale: 0.72 },
    },
    {
      motif: 'graduationCap',
      left: '65%',
      top: '10%',
      width: 84,
      tilt: 7,
      opacity: 0.08,
      tone: 'white',
      drift: 'b',
      duration: 32,
      delay: -17,
      layer: 'near',
      mobilePos: { left: '72%', top: '45%', scale: 0.7 },
    },
    {
      motif: 'atom',
      left: '74%',
      top: '56%',
      width: 72,
      tilt: -11,
      opacity: 0.08,
      tone: 'white',
      drift: 'c',
      duration: 38,
      delay: -24,
      layer: 'near',
      mobilePos: { left: '75%', top: '75%', scale: 0.68 },
    },
    {
      motif: 'trophyCup',
      left: '91%',
      top: '55%',
      width: 62,
      tilt: 6,
      opacity: 0.075,
      tone: 'blue',
      drift: 'd',
      duration: 30,
      delay: -10,
      layer: 'far',
    },
    {
      motif: 'conicalFlask',
      left: '57%',
      top: '54%',
      width: 60,
      tilt: -6,
      opacity: 0.07,
      tone: 'blue',
      drift: 'a',
      duration: 29,
      delay: -29,
      layer: 'far',
    },
    {
      motif: 'musicNotes',
      left: '53%',
      top: '14%',
      width: 50,
      tilt: -8,
      opacity: 0.065,
      tone: 'white',
      drift: 'b',
      duration: 26,
      delay: -3,
      layer: 'far',
      mobilePos: { left: '6%', top: '79%', scale: 0.72 },
    },
    {
      motif: 'protractor',
      left: '33%',
      top: '6%',
      width: 86,
      tilt: 9,
      opacity: 0.055,
      tone: 'blue',
      drift: 'd',
      duration: 36,
      delay: -15,
      layer: 'far',
    },
    {
      motif: 'angle',
      left: '1.2%',
      top: '64%',
      width: 48,
      tilt: -5,
      opacity: 0.055,
      tone: 'white',
      drift: 'c',
      duration: 27,
      delay: -21,
      layer: 'far',
    },
  ],

  /* Contact & Admissions: postal correspondence, Grade 10 entry & campus office */
  contact: [
    {
      motif: 'envelope',
      left: '84%',
      top: '14%',
      width: 84,
      tilt: -8,
      opacity: 0.085,
      tone: 'white',
      drift: 'b',
      duration: 34,
      delay: -8,
      layer: 'near',
      mobilePos: { left: '73%', top: '7%', scale: 0.72 },
    },
    {
      motif: 'graduationCap',
      left: '66%',
      top: '12%',
      width: 84,
      tilt: 6,
      opacity: 0.08,
      tone: 'blue',
      drift: 'a',
      duration: 31,
      delay: -19,
      layer: 'near',
      mobilePos: { left: '72%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'globe',
      left: '76%',
      top: '54%',
      width: 66,
      tilt: -5,
      opacity: 0.08,
      tone: 'blue',
      drift: 'c',
      duration: 38,
      delay: -12,
      layer: 'near',
      mobilePos: { left: '76%', top: '74%', scale: 0.68 },
    },
    {
      motif: 'clockFace',
      left: '91%',
      top: '56%',
      width: 60,
      tilt: 5,
      opacity: 0.075,
      tone: 'white',
      drift: 'd',
      duration: 36,
      delay: -26,
      layer: 'far',
    },
    {
      motif: 'fountainNib',
      left: '58%',
      top: '54%',
      width: 52,
      tilt: 20,
      opacity: 0.075,
      tone: 'white',
      drift: 'a',
      duration: 29,
      delay: -4,
      layer: 'far',
      mobilePos: { left: '6%', top: '78%', scale: 0.7 },
    },
    {
      motif: 'compass',
      left: '55%',
      top: '8%',
      width: 66,
      tilt: -9,
      opacity: 0.065,
      tone: 'blue',
      drift: 'b',
      duration: 33,
      delay: -16,
      layer: 'far',
    },
    {
      motif: 'openBook',
      left: '36%',
      top: '6%',
      width: 78,
      tilt: -6,
      opacity: 0.055,
      tone: 'white',
      drift: 'd',
      duration: 39,
      delay: -23,
      layer: 'far',
    },
    {
      motif: 'ruler',
      left: '1%',
      top: '68%',
      width: 96,
      tilt: -14,
      opacity: 0.055,
      tone: 'blue',
      drift: 'c',
      duration: 35,
      delay: -31,
      layer: 'far',
    },
  ],

  /* Portal: student & staff academic records, reports & circulars */
  portal: [
    {
      motif: 'graduationCap',
      left: '83%',
      top: '12%',
      width: 86,
      tilt: -7,
      opacity: 0.085,
      tone: 'blue',
      drift: 'a',
      duration: 33,
      delay: -5,
      layer: 'near',
      mobilePos: { left: '72%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'documentSheet',
      left: '67%',
      top: '14%',
      width: 66,
      tilt: 7,
      opacity: 0.08,
      tone: 'white',
      drift: 'c',
      duration: 36,
      delay: -17,
      layer: 'near',
      mobilePos: { left: '77%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'atom',
      left: '76%',
      top: '54%',
      width: 74,
      tilt: 11,
      opacity: 0.08,
      tone: 'blue',
      drift: 'b',
      duration: 39,
      delay: -24,
      layer: 'near',
      mobilePos: { left: '74%', top: '74%', scale: 0.68 },
    },
    {
      motif: 'openBook',
      left: '90%',
      top: '58%',
      width: 80,
      tilt: -6,
      opacity: 0.075,
      tone: 'white',
      drift: 'd',
      duration: 34,
      delay: -11,
      layer: 'far',
    },
    {
      motif: 'compass',
      left: '58%',
      top: '52%',
      width: 68,
      tilt: 9,
      opacity: 0.07,
      tone: 'white',
      drift: 'a',
      duration: 31,
      delay: -28,
      layer: 'far',
    },
    {
      motif: 'eqEmc2',
      left: '54%',
      top: '14%',
      width: 80,
      tilt: -4,
      opacity: 0.065,
      tone: 'blue',
      drift: 'b',
      duration: 29,
      delay: -8,
      layer: 'far',
    },
    {
      motif: 'sigma',
      left: '38%',
      top: '8%',
      width: 38,
      tilt: 5,
      opacity: 0.055,
      tone: 'white',
      drift: 'd',
      duration: 26,
      delay: -14,
      layer: 'far',
      mobilePos: { left: '6%', top: '80%', scale: 0.76 },
    },
    {
      motif: 'angle',
      left: '1.2%',
      top: '64%',
      width: 48,
      tilt: -6,
      opacity: 0.055,
      tone: 'blue',
      drift: 'c',
      duration: 28,
      delay: -21,
      layer: 'far',
    },
  ],

  /* News & Circular Articles: official notices, letters & academic results */
  news: [
    {
      motif: 'documentSheet',
      left: '87%',
      top: '12%',
      width: 66,
      tilt: -6,
      opacity: 0.08,
      tone: 'blue',
      drift: 'b',
      duration: 35,
      delay: -7,
      layer: 'near',
      mobilePos: { left: '77%', top: '6%', scale: 0.7 },
    },
    {
      motif: 'fountainNib',
      left: '75%',
      top: '16%',
      width: 52,
      tilt: 18,
      opacity: 0.075,
      tone: 'white',
      drift: 'a',
      duration: 30,
      delay: -19,
      layer: 'near',
      mobilePos: { left: '80%', top: '46%', scale: 0.7 },
    },
    {
      motif: 'openBook',
      left: '82%',
      top: '58%',
      width: 82,
      tilt: 6,
      opacity: 0.075,
      tone: 'white',
      drift: 'c',
      duration: 37,
      delay: -13,
      layer: 'near',
      mobilePos: { left: '73%', top: '75%', scale: 0.68 },
    },
    {
      motif: 'envelope',
      left: '2%',
      top: '14%',
      width: 78,
      tilt: -7,
      opacity: 0.07,
      tone: 'blue',
      drift: 'd',
      duration: 33,
      delay: -25,
      layer: 'far',
    },
    {
      motif: 'graduationCap',
      left: '3%',
      top: '60%',
      width: 80,
      tilt: 7,
      opacity: 0.07,
      tone: 'white',
      drift: 'a',
      duration: 36,
      delay: -4,
      layer: 'far',
    },
    {
      motif: 'pencil',
      left: '66%',
      top: '68%',
      width: 82,
      tilt: -20,
      opacity: 0.065,
      tone: 'blue',
      drift: 'b',
      duration: 28,
      delay: -16,
      layer: 'far',
    },
    {
      motif: 'protractor',
      left: '56%',
      top: '8%',
      width: 82,
      tilt: -8,
      opacity: 0.055,
      tone: 'white',
      drift: 'c',
      duration: 39,
      delay: -29,
      layer: 'far',
    },
    {
      motif: 'pi',
      left: '93%',
      top: '52%',
      width: 38,
      tilt: -6,
      opacity: 0.07,
      tone: 'blue',
      drift: 'd',
      duration: 24,
      delay: -10,
      layer: 'far',
      mobilePos: { left: '6%', top: '80%', scale: 0.74 },
    },
  ],
};

function MotifGroup({ items }: { items: MotifPlacement[] }) {
  return (
    <>
      {items.map((item, idx) => (
        <div
          key={`${item.motif}-${idx}`}
          className={`hero-stem-item absolute ${
            item.mobilePos ? '' : 'hidden sm:block'
          } ${item.tone === 'white' ? 'text-white' : 'text-blue-100'}`}
          style={
            {
              '--stem-x': item.left,
              '--stem-y': item.top,
              '--stem-mx': item.mobilePos?.left ?? item.left,
              '--stem-my': item.mobilePos?.top ?? item.top,
              '--stem-mscale': String(item.mobilePos?.scale ?? 1),
              '--stem-tilt': `${item.tilt}deg`,
              width: `${item.width}px`,
              opacity: item.opacity,
            } as CSSProperties
          }
        >
          <div
            data-drift={item.drift}
            className="hero-stem-float"
            style={
              {
                '--stem-duration': `${item.duration}s`,
                '--stem-delay': `${item.delay}s`,
              } as CSSProperties
            }
          >
            {STEM_ART[item.motif]}
          </div>
        </div>
      ))}
    </>
  );
}

interface HeroStemBackdropProps {
  variant?: HeroBackdropVariant;
}

/**
 * Reusable animated school & STEM line-art backdrop shared by the homepage
 * hero and every inner page hero across the site.
 * - Pure inline stroke-only SVGs at low opacity (preserves WCAG AA contrast).
 * - Pauses CSS animations when off-screen or when the browser tab is hidden.
 * - Optional subtle desktop-only pointer parallax (transform-only, zero renders).
 * - Renders completely static under `prefers-reduced-motion: reduce`.
 */
export default function HeroStemBackdrop({
  variant = 'home',
}: HeroStemBackdropProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const items = VARIANT_MOTIFS[variant];
  const farItems = items.filter((m) => m.layer === 'far');
  const nearItems = items.filter((m) => m.layer === 'near');
  const maxParallaxX = variant === 'home' ? 9 : 6;
  const maxParallaxY = variant === 'home' ? 6 : 4;

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || typeof window === 'undefined') return;

    const host = field.closest('section, header') ?? field;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopPointer = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (min-width: 1024px)'
    );

    let inView = true;
    let tabHidden = document.hidden;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;

    const syncPauseState = () => {
      const paused = !inView || tabHidden || reducedMotion.matches;
      field.dataset.paused = paused ? 'true' : 'false';
      if (paused) {
        targetX = 0;
        targetY = 0;
      }
    };

    const stepParallax = () => {
      currentX += (targetX - currentX) * 0.065;
      currentY += (targetY - currentY) * 0.065;

      field.style.setProperty('--hero-px', `${currentX.toFixed(2)}px`);
      field.style.setProperty('--hero-py', `${currentY.toFixed(2)}px`);

      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        rafId = window.requestAnimationFrame(stepParallax);
      } else {
        rafId = null;
      }
    };

    const scheduleParallax = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(stepParallax);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (
        reducedMotion.matches ||
        !desktopPointer.matches ||
        !inView ||
        tabHidden
      ) {
        return;
      }
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = Math.max(-1, Math.min(1, nx)) * -maxParallaxX;
      targetY = Math.max(-1, Math.min(1, ny)) * -maxParallaxY;
      scheduleParallax();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!reducedMotion.matches && desktopPointer.matches) {
        scheduleParallax();
      }
    };

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              inView = entry.isIntersecting;
              syncPauseState();
            },
            { threshold: 0 }
          )
        : null;

    observer?.observe(host);

    const onVisibilityChange = () => {
      tabHidden = document.hidden;
      syncPauseState();
    };

    const onMotionChange = () => {
      if (reducedMotion.matches) {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
        currentX = 0;
        currentY = 0;
        field.style.setProperty('--hero-px', '0px');
        field.style.setProperty('--hero-py', '0px');
      }
      syncPauseState();
    };

    syncPauseState();

    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionChange);
    host.addEventListener('pointermove', onPointerMove as EventListener, {
      passive: true,
    });
    host.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionChange);
      host.removeEventListener('pointermove', onPointerMove as EventListener);
      host.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [maxParallaxX, maxParallaxY]);

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      data-paused="false"
      data-variant={variant}
      className="hero-stem-field pointer-events-none select-none absolute inset-0 z-[2] overflow-hidden"
    >
      <div className="hero-stem-layer-far absolute inset-0">
        <MotifGroup items={farItems} />
      </div>
      <div className="hero-stem-layer-near absolute inset-0">
        <MotifGroup items={nearItems} />
      </div>
    </div>
  );
}
